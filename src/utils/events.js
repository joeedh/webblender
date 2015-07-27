import 'polyfill';
import * as util from 'util';

import {hashtable} from 'util';

import {Vector2, Vector3, Matrix4, Vector4} from 'vectormath';

//XXX implement me!
export function ignore_next_mouseup_event() {
  console.trace("Implement me! arguments: ", arguments);
}

/*
NOTE: we invert Y, so origin is at lower right!
*/

export class EventHandler {
  constructor() {
    this._event_parent = undefined;
    this._event_preproc = {};
    this._event_postproc = {};
  }
  
  bad_event(e) {
    //returns whether to drop event
  }
  
  _fire_process_callbacks(event, type) {
    var obj = type=="pre" ? this._event_preproc : this._event_postproc;
    
    if (event.type in this._event_preproc) {
      var list = this._event_preproc[event.type];
      
      for (var i=0; i<list.length; i++) {
        var ret = list[i][0].call(list[i][1], event);;
        
        //did preprocess function return new event instance?
        if (ret != undefined && typeof ret == "object") {
          event = ret;
        }
      }
    }
    
    return event;
  }
  
  addHandlers(event_manager) { //add child handlers
  }
  
  preProcessEvent(event) {
    return this._fire_process_callbacks(event, "pre");
  }
  
  postProcessEvent(event) {
    return this._fire_process_callbacks(event, "post");
  }
  
  addEventPre(type, func, thisvar=self) {
      if (!(type in this._event_preproc)) {
        this._event_preproc[type] = [];
      }
      
      this._event_preproc[type].push([func, thisvar]);
  }
  
  setEventParent(p) { //sets event parent; when parent is removed from stack, so are children
    this._event_parent = p;
  }
  /* note that in this class, event methods are optional.
     you add the methods you need.  
  
     examples handlers (note that event methods must exist 
                         to block events in modal mode):
    on_mousemove(e) {
    }
    on_mousedown(e) {
    }
    on_mouseup(e) {
    }
    on_keydown(e) {
    }
    on_keyup(e) {
    }
    on_tick(e) {
    }
    on_scrollwheel(e) {
    }
  */
}

class EventWrapper {
  constructor(e) {
    for (var k in e) {
      this[k] = e[k];
    }
    
    this.pageY = window.innerHeight - this.pageY;
    
    this.x = this.pageX;
    this.y = this.pageY;
    
    this._e = e;
    this._cancel = false;
  }
  
  preventDefault() {
    this._e.preventDefault();
  }
  
  stopPropagation() {
    this._cancel = true;
    this._e.stopPropagation();
  }
}

class FuncHandler {
  constructor(func) {
    this.func = func;
  }
}

var mouse_events = new util.set([
  "mousedown", "mousemove", "mouseup",
  "touchstart", "touchcancel", "touchmove",
  "touchend"
]);

export var dom_events = [
  "mousedown",
  "mousemove",
  "mouseup",
  "touchstart",
  "touchcancel",
  "touchmove",
  "touchend",
  "keydown",
  "keyup",
  "mousewheel",
  "tick"
]

export class EventManager extends EventHandler {
  constructor() {
    super();
    
    this.stack = [];
    this.modal_stack = [];
  }
  
  push_modal(handler) {
  }
  
  pop_modal() {
  }
  
  /*
  e.g.:
    addEventListener(some_EventHandler_subclass)
    addEventListener("mousemove", function(e) {
    });
  */
  addEventListener(type, handler) {
    if (handler == undefined) {
      handler = type;
      type = undefined;
    }

    if (handler == undefined) {
      console.log("Event system error!", type, handler);
      return;
    }
    
    if (typeof handler == "function" || handler instanceof Function) {
      handler = new FuncHandler(handler);
      handler["on_"+type] = handler.func;
    }
    
    this.stack.push(handler);
  }
  
  clearStack() {
    this.stack = [];
    this.modal_stack = [];
  }
  
  removeEventListener(handler) {
    var handler2;
    
    if (typeof handler == "function" || handler instanceof Function) {
      for (var i=this.stack.length-1; i>=0; i--) {
        if (this.stack[i].func === handler) {
          handler2 = i;
          break;
        }
      }
    } else {
      for (var i=this.stack.length-1; i >= 0; i--) {
        if (this.stack[i] === handler) {
          handler2 = i;
          break;
        }
      }
    }
    
    if (handler2 == undefined) {
      console.trace("WARNING: handler", handler, "not in event stack");
      return;
    }
    
    this.stack.pop_i(handler);
    
    var dellist = [];
    
    for (var i=0; i<this.stack.length; i++) {
      if (this.stack[i]._event_parent === handler) {
        dellist.push(this.stack[i]);
      }
    }
    
    for (var i=0; i<this.modal_stack.length; i++) {
      if (this.modal_stack[i]._event_parent === handler) {
        dellist.push(this.modal_stack[i]);
      }
    }
    
    for (var i=0; i<dellist.length; i++) {
      this.removeEventListener(dellist[i]);
    }
  }
  
  _make_type_str(type) {
    return "on_" + type.toLowerCase();
  }
  
  fireEvent(e) {
    e = new EventWrapper(e);
    
    if (this.modal_stack.length > 0 && e.type in this.modal_stack[this.modal_stack.length-1]) {
      e = handler.preProcessEvent(e);
      var ret = this.modal_stack[this.modal_stack.length-1][e.type](e);
      e = handler.postProcessEvent(e);
      
      return ret;
    }    
      
    for (var i=this.stack.length-1; i >= 0; i--) {
      var handler = this.stack[i];
      var methodname = this._make_type_str(e.type);
      
      if (!(methodname in handler))
        continue;
      
      e = handler.preProcessEvent(e);
      handler[methodname](e);
      e = handler.postProcessEvent(e);
      
      if (e._cancel) //handler consumed the event?
        break;
    }
  }
  
  bindDOM(domobj) {
    var this2 = this;
    
    function bind_event(type) {
      domobj.addEventListener(type, function(e) {
          this2.fireEvent(e);
      });
    }
    
    for (var i=0; i<dom_events.length; i++) {
        var type = dom_events[i];
        
        bind_event(type);
    }
  }
}


var valid_modifiers = {"SHIFT": 1, "CTRL": 2, "ALT": 4}

export var charmap_latin_1 = {
  "Space": 32,
  "Escape" : 27,
  "Enter": 13,
  "Up" : 38,
  "Down" : 40,
  "Left": 37,
  "Right": 39,
  
  "Num0": 96,
  "Num1": 97,
  "Num2": 98,
  "Num3": 99,
  "Num4": 100,
  "Num5": 101,
  "Num6": 102,
  "Num7": 103,
  "Num8": 104,
  "Num9": 105,
  "Home": 36,
  "End": 35,
  "Delete": 46,
  "Backspace": 8,
  "Insert": 45,
  "PageUp": 33,
  "PageDown": 34,
  "Tab" : 9,
  "-" : 189,
  "=" : 187,
  "NumPlus" : 107,
  "NumMinus" : 109,
  "Shift" : 16,
  "Ctrl" : 17,
  "Control" : 17,
  "Alt" : 18
}

for (var i=0; i<26; i++) {
  charmap_latin_1[String.fromCharCode(i+65)] = i+65
}
for (var i=0; i<10; i++) {
  charmap_latin_1[String.fromCharCode(i+48)] = i+48
}

for (var k in charmap_latin_1) {
  charmap_latin_1[charmap_latin_1[k]] = k;
}

var charmap_latin_1_rev = {}
for (var k in charmap_latin_1) {
  charmap_latin_1_rev[charmap_latin_1[k]] = k
}

export var charmap = charmap_latin_1;
export var charmap_rev = charmap_latin_1_rev;

window.charmap = charmap;
window.charmap_rev = charmap_rev;

export class KeyHandler {
  constructor(key, modifiers, uiname, menunum, ignore_charmap_error) { //menunum is optional, defaults to undefined
    if (!charmap.hasOwnProperty(key)) {
      if (ignore_charmap_error != undefined && ignore_charmap_error != true) {
        console.trace();
        console.log("Invalid hotkey " + key + "!");
      }
      
      this.key = 0;
      this.keyAscii = "[corrupted hotkey]"
      this.shift = this.alt = this.ctrl = false;
      return
    }
    
    if (typeof(key) == "string") {
      if (key.length == 1)
        key = key.toUpperCase()
    
      this.keyAscii = key
      this.key = charmap[key];
    } else {
      this.key = key;
      this.keyAscii = charmap[key]
    }
    
    this.shift = this.alt = this.ctrl = false;
    this.menunum = menunum
    
    for (var i=0; i<modifiers.length; i++) {
      if (modifiers[i] == "SHIFT") {
        this.shift = true;
      } else if (modifiers[i] == "ALT") {
        this.alt = true;
      } else if (modifiers[i] == "CTRL") {
        this.ctrl = true;
      } else {
        console.trace()
        console.log("Warning: invalid modifier " + modifiers[i] + " in KeyHandler")
      }
    }
  }
  
  build_str(add_menu_num) : String {
    var s = ""
    if (this.ctrl) s += "CTRL-"
    if (this.alt) s += "ALT-"
    if (this.shift) s += "SHIFT-"
    
    s += this.keyAscii
    
    return s;
  }
  
  __hash__() : String {
    return this.build_str(false)
  }
}

export class KeyMap extends hashtable {
  constructor() {
    hashtable.call(this);
    
    this.op_map = new hashtable();
  }

  get_tool_handler(toolstr) {
    if (this.op_map.has(toolstr))
      return this.op_map.get(toolstr);
  }

  add_tool(keyhandler, toolstr) {
    this.add(keyhandler, new ToolKeyHandler(toolstr));
    this.op_map.add(toolstr, keyhandler);
  }

  add_func(keyhandler, func) {
    this.add(keyhandler, new FuncKeyHandler(func));
  }

  add(keyhandler, value) {
    if (this.has(keyhandler)) {
      console.trace()
      console.log("Duplicate hotkey definition!")
    }
    
    if (value instanceof ToolKeyHandler && !(typeof value.tool == "string" || value.tool instanceof String)) {
      value.tool.keyhandler = keyhandler;
    }
    
    hashtable.prototype.add.call(this, keyhandler, value);
  }

  process_event(Context ctx, KeyboardEvent event) : Object {
    var modlist = []
    if (event.ctrlKey) modlist.push("CTRL")
    if (event.shiftKey) modlist.push("SHIFT")
    if (event.altKey) modlist.push("ALT")
    
    var key = new KeyHandler(event.keyCode, modlist, 0, 0, true);
    
    if (this.has(key)) {
      ctx.keymap_mpos = ctx.view2d.mpos;
      return this.get(key);
    }
    
    return undefined;
  }
}

export class KeyHandlerCls {
  handle(Context ctx) {
  }
}

export class ToolKeyHandler extends KeyHandlerCls {
  constructor(ToolOp tool) {
    this.tool = tool;
  }
  
  handle(ctx) {
    var tool = this.tool; 
    ctx.api.call_op(ctx, tool);
  }
}

export class FuncKeyHandler extends KeyHandlerCls {
  constructor(func) {
    this.handle = func;
  }
}

//helper class for implementing velocity pan
export class VelocityPan extends EventHandler {
  constructor() {
    this.start_mpos = new Vector2();
    this.last_mpos = new Vector2();
    
    this.mpos = new Vector2();

    this.start_time = 0;
    this.owner = undefined : EventHandler;
    
    this.coasting = false;
    this.panning = false;
    this.was_touch = false;
    
    this.enabled = true;
    
    this.vel = new Vector2();
    this.pan = new Vector2();
    this.damp = 0.99;
    
    this.can_coast = true;
    
    this.start_pan = new Vector2();
    
    this.first = false;
    this.last_ms = 0;
    this.vel = new Vector2();
  }
  
  on_tick() {
    if (!this.panning && this.coasting) {
      static vel = new Vector2();
      var damp = 0.99;
      
      vel.load(this.vel);
      vel.mulScalar(time_ms() - this.last_ms);
      this.vel.mulScalar(damp);
      
      this.last_ms = time_ms();
      
      this.pan.sub(vel);
      var was_clamped = this.clamp_pan();
      this.owner.on_pan(this.pan, this.start_pan);
      
      var stop = was_clamped != undefined && (was_clamped[0] && was_clamped[1])
      stop = stop || this.vel.vectorLength < 1;
      
      if (stop)
        this.coasting = false;
    }
  }
  
  calc_vel() {
    static vel = new Vector2();
    
    if (!this.can_coast) {
      this.vel.zero();
      this.coasting = false;
      this.last_ms = time_ms();
      return;
    }
    
    var t = time_ms() - this.start_time;
    if (t < 10) {
      console.log("small t!!!", t);
      return;
    }
    
    vel.load(this.last_mpos).sub(this.mpos).divideScalar(t);
    
    //blend with last value, if it exists
    this.vel.add(vel);
    /*if (this.vel.vectorLength() > 0.0) {
      this.vel.load(vel);
      this.vel.add(vel);
      this.vel.mulScalar(0.5);
    } else {
      this.vel.load(vel);
    }*/
    
    this.coasting = (this.vel.vectorLength() > 0.25);
    this.last_ms = time_ms();
  }
  
  start(Array<float> start_mpos, Array<float> last_mpos, UIElement owner, 
        Function push_modal_func, Function pop_modal_func) {
    
    if (this.panning) {
      console.trace("warning, duplicate call to VelocityPan.start()");
      //this.end();
      return;
    }
    
    this.vel.zero();
    
    this.pop_modal_func = pop_modal_func;
    this.coasting = false;
    this.first = false; //true;
    this.owner = owner;
    
    this.panning = true;
    push_modal_func(this);
    
    this.start_pan.load(this.pan);
    
    this.last_ms = time_ms();
    this.start_time = time_ms();
    this.was_touch = g_app_state.was_touch;
    
    this.start_mpos.load(start_mpos);
    this.last_mpos.load(start_mpos);
    this.mpos.load(start_mpos);
    
    this.do_mousemove(last_mpos);
  }
  
  end() {
    console.log("in end");
    
    if (this.panning) {
      console.log("  pop modal");
      this.pop_modal_func();
    }
    
    this.panning = false;
  }
  
  do_mousemove(Array<float> mpos) {
    //console.log("mpos", mpos);
    
    //its hard to get on_mousedown to always
    //give coordinates in same space as on_mousemove,
    //which is why init of these vars is down here,
    //not in .start().
    if (DEBUG.touch) {
      console.log("py", mpos[1]);
    }
    /*if (this.first) {
      this.mpos.load(mpos);
      this.last_mpos.load(mpos);
      this.start_mpos.load(mpos);
      this.first = false;
      return;
    }*/
    
    this.last_mpos.load(this.mpos);
    this.mpos.load(mpos);
    
    this.pan[0] = this.start_pan[0] + mpos[0] - this.start_mpos[0];
    this.pan[1] = this.start_pan[1] + mpos[1] - this.start_mpos[1];
    
    this.vel.zero();
    this.calc_vel();
    
    this.clamp_pan();
    this.owner.on_pan(this.pan, this.start_pan);
  }
  
  clamp_pan() {
    var bs = this.owner.pan_bounds;
    if (this.owner.state & 8192*4) return;
    //console.log("clamping", this.owner);
    
    var p = this.pan;
    static was_clamped = [0, 0];
    
    was_clamped[0] = false;
    was_clamped[1] = false;
    
    for (var i=0; i<2; i++) {
      var l = p[i];
      p[i] = Math.min(Math.max(bs[0][i], p[i]), bs[0][i]+bs[1][i]);
      
      if (p[i] != l)
        was_clamped[i] = true;
    }
    
    return was_clamped;
  }
  
  on_mouseup(MouseEvent event) {
    console.log("pan mouse up!", this.panning, this.owner);
    
    if (this.panning) {
      this.mpos.load([event.y, event.y]);
      this.calc_vel();
      this.end();
    }
  }
  
  on_mousemove(MouseEvent event) {
    this.do_mousemove([event.x, event.y]);
  }
  
  set_pan(Array<float> pan) {
    if (this.panning)
      this.end();
      
    this.pan.load(pan);
    this.coasting = false;
    this.vel.zero();
  }
}

export class TouchEventManager {
  constructor(EventHandler owner, int delay=100) {
    this.queue = new Array();
    this.queue_ms = new Array();
    this.delay = delay;
    this.owner = owner;
  }
  
  get_last(int type) {
    var i = this.queue.length;
    if (i == 0) return undefined;
    i--;
    
    var q = this.queue;
    
    while (i >= 0) {
      var e = q[i];
      if (e.type == type || e.type != MyMouseEvent.MOUSEMOVE)
        break;
      i--;
    }
    
    if (i < 0) i = 0;
    
    return q[i].type == type ? q[i] : undefined;
  }
  
  queue_event(MouseEvent event) {
    var last = this.get_last(event.type);

    if (DEBUG.touch && this == touch_manager)
      console.log("touch event", event.type);
    
    //merge repeated events, which may
    //contain different touch states
    if (last != undefined && last.type != MyMouseEvent.MOUSEMOVE) {
      var dis, same=true;
      
      for (var k in event.touches) {
        if (!(k in last.touches)) { 
          //same = false;
        }
      }
      
      //only compare same ids
      dis = new Vector2([event.x, event.y]).vectorDistance(new Vector2([last.x, last.y]));
      
      if (DEBUG.touch && this == touch_manager)
        console.log(dis);
      
      if (same && dis < 50) {
        if (DEBUG.touch && this == touch_manager)
          console.log("destroying duplicate event", last.type, event.x, event.y, event.touches);
        
        for (var k in event.touches) {
          last.touches[k] = event.touches[k];
        }
        
        return;
      }
    }
    
    this.queue.push(event);
    this.queue_ms.push(time_ms());
  }
  
  cancel(MouseEvent event) {
    var ts = event.touches;
    var dl = new Array;
    
    if (DEBUG.touch && this == touch_manager)
      console.log("touch cancel", event);
      
    for (var e in this.queue) {
      for (var k in ts) {
        if (k in e.touches) {
          delete e.touches;
        }
      }
      
      if (list(e.touches).length == 0) {
        dl.push(e);
      }
    }
    
    for (var e in dl) {
      var i = this.queue.indexOf(e);
      this.queue.remove(e);
      this.queue_ms.pop_i(i);
    }
  }
  
  process() {
    var owner = this.owner;
    
    var dl = new Array();
    var q = this.queue;
    var qm = this.queue_ms;
    var delay = this.delay;
    
    for (var i=0; i<q.length; i++) {
      if (time_ms() - qm[i] > delay) {
        dl.push(q[i]);
      }
    }
    
    //pop events from queue before firing them
    for (var e of dl) {
      var i = q.indexOf(e);
      
      q.remove(e);
      qm.pop_i(i);
    }
    
    //now, fire events
    for (var e of dl) {
      e._good = true;
      g_app_state.was_touch = true;
      
      try {
        if (e.type == MyMouseEvent.MOUSEDOWN) {
          if (DEBUG.touch)
            console.log("td1", e.x, e.y);
          owner._on_mousedown(e);
          if (DEBUG.touch)
            console.log("td2", e.x, e.y);
        } else if (e.type == MyMouseEvent.MOUSEMOVE) {
          owner._on_mousemove(e);
        } else if (e.type == MyMouseEvent.MOUSEUP) {
          owner._on_mouseup(e);
        }
      } catch (_err) {
        print_stack(_err)
        console.log("Error executing delayed touch event");
      }
    }
  }
  
  reset() {
    this.queue = new Array();
    this.queue_ms = new Array();
  }
}

window.TouchEventManager = TouchEventManager;
var touch_manager = window.touch_manager = new TouchEventManager(undefined, 20);
