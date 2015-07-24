export class EventHandler {
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

class EventStack extends EventHandler {
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
    if (type instanceof EventHandler) {
      handler = type;
      type = undefined;
    }
    
    if (typeof handler == "function" || handler instanceof Function) {
      handler = new FuncHandler(handler);
      handler["on_"+type] = handler.func;
    }
    
    this.stack.push(handler);
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
  }
  
  fireEvent(e) {
    e = new EventWrapper(e);
    
    if (this.modal_stack.length > 0 && e.type in this.modal_stack[this.modal_stack.length-1]) {
      return this.modal_stack[this.modal_stack.length-1][e.type](e);
    }
    
    for (var i=this.stack.length; i >= 0; i--) {
      var handler = this.stack[i];
      if (!(e.type in handler))
        continue;
        
      handler[e.type](e);
      
      if (e._cancel) //handler consumed the event?
        break;
    }
  }
}
