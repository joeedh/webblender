es6_module_define('UIWidgets', ["units", "rna_properties", "math", "events", "UIElement", "UIFrame", "vectormath"], function _UIWidgets_module(_es6_module) {
  "use strict";
  var $_mh;
  var $_swapt;
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var Unit=es6_import_item(_es6_module, 'units', 'Unit');
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIHoverHint=es6_import_item(_es6_module, 'UIElement', 'UIHoverHint');
  var inrect_2d_button=es6_import_item(_es6_module, 'UIElement', 'inrect_2d_button');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  function UIButtonAbstract(ctx, path, pos, size) {
    if (path==undefined) {
        path = undefined;
    }
    if (pos==undefined) {
        pos = undefined;
    }
    if (size==undefined) {
        size = undefined;
    }
    UIHoverHint.call(this, ctx, path, pos, size);
    this.text_size = undefined;
    this.can_pan = true;
    this.clicked = false;
    this.click_on_down = false;
    this.modal_click = undefined;
    this.was_touch = false;
    this.start_mpos = new Vector2();
  }
  /*test for IE bug*/;
  if (UIButtonAbstract.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIButtonAbstract.name = 'UIButtonAbstract';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIButtonAbstract = inherit_multiple(UIButtonAbstract, [UIHoverHint], _es6_module, "UIButtonAbstract");
  UIButtonAbstract.prototype.on_click = function(event) {
  }
  UIButtonAbstract.prototype.on_mousedown = function(event) {
    if (!this.clicked) {
        this.was_touch = G.was_touch;
        this.modal_click = !this.click_on_down||this.was_touch;
        this.start_mpos.load([event.x, event.y]);
        if (event.button==0&&!this.clicked) {
            if (this.modal_click)
              this.parent.push_modal(this);
            this.stop_hover();
            this.clicked = true;
            this.do_recalc();
            if (!this.was_touch&&this.click_on_down) {
                this.on_click(event);
            }
        }
    }
    else {
      if (this.parent.modalhandler==this) {
          this.parent.pop_modal();
      }
    }
  }
  UIButtonAbstract.prototype.on_mouseup = function(event) {
    if (event.button==0&&this.clicked) {
        if (this.modal_click)
          this.parent.pop_modal();
        this.modal_click = false;
        this.clicked = false;
        this.do_recalc();
        var click=this.was_touch||!this.click_on_down;
        if (click) {
            this.on_click(event);
        }
    }
  }
  UIButtonAbstract.prototype.on_mousemove = function(event) {
    if (!this.clicked) {
        this.start_hover();
    }
    if (this.can_pan&&this.was_touch) {
        var mpos=[event.x, event.y];
        var dis=this.start_mpos.vectorDistance(mpos);
        if (dis>60) {
            if (this.clicked&&this.modal_click)
              this.parent.pop_modal();
            this.modal_click = false;
            this.stop_hover();
            this.clicked = false;
            this.do_recalc();
            this.start_pan([event.x, event.y]);
        }
    }
  }
  _es6_module.add_class(UIButtonAbstract);
  UIButtonAbstract = _es6_module.add_export('UIButtonAbstract', UIButtonAbstract);
  function UIButton(ctx, text, pos, size, path, callback, hint) {
    if (path==undefined) {
        path = undefined;
    }
    if (callback==undefined) {
        callback = undefined;
    }
    if (hint==undefined) {
        hint = undefined;
    }
    UIButtonAbstract.call(this, ctx, path, pos, size);
    this.clicked = false;
    this.text = text;
    this.hint = hint;
    this.path_exec_widget = false;
    this.callback = callback;
    this._do_err_on_draw = false;
  }
  /*test for IE bug*/;
  if (UIButton.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIButton.name = 'UIButton';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIButton = inherit_multiple(UIButton, [UIButtonAbstract], _es6_module, "UIButton");
  UIButton.prototype.get_hint = function() {
    var ctx=this.ctx;
    if (this.hint!=undefined) {
        return this.hint;
    }
    else 
      if (this.state&UIFlags.USE_PATH) {
        var op=this.ctx.api.get_op(this.ctx, this.data_path);
        if (op==undefined)
          return undefined;
        var hotkey=ctx.api.get_op_keyhandler(ctx, this.data_path);
        var ret=op.description==undefined ? "" : op.description;
        if (hotkey!=undefined) {
            if (ret!="")
              ret+="\n";
            ret+="      Hotkey: "+hotkey.build_str(true)+"  ";
        }
        return ret=="" ? undefined : ret;
    }
  }
  UIButton.prototype.on_click = function(event) {
    if (this.callback!=undefined) {
        this.callback(this);
    }
    if (this.state&UIFlags.USE_PATH) {
        if (this.path_exec_widget) {
            var ctx=this.ctx;
            if (ctx.view2d.manipulators.active)
              ctx.view2d.manipulators.active.end();
            var op=this.ctx.api.get_op(ctx, this.data_path);
            if (op!=undefined) {
                op.constructor.create_widgets(ctx.view2d.manipulators, ctx);
            }
        }
        else {
          this.ctx.api.call_op(this.ctx, this.data_path);
        }
    }
  }
  UIButton.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    if (this._do_err_on_draw) {
        throw new Error("test exception");
    }
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.clicked)
      canvas.invbox([0, 0], this.size);
    else 
      if (this.state&UIFlags.HIGHLIGHT)
      canvas.hlightbox([0, 0], this.size);
    else 
      canvas.box([0, 0], this.size);
    var tsize=canvas.textsize(this.text, this.text_size);
    if (tsize[0]<this.size[0])
      canvas.text([(this.size[0]-tsize[0])*0.5, (this.size[1]-tsize[1])*0.5], this.text, uicolors["BoxText"], this.text_size);
    else 
      canvas.text([5, (this.size[1]-tsize[1])*0.5], this.text, uicolors["BoxText"], this.text_size);
    canvas.end(this);
  }
  UIButton.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text, this.text_size)[0]+12, 26];
  }
  _es6_module.add_class(UIButton);
  UIButton = _es6_module.add_export('UIButton', UIButton);
  function UIButtonIcon(ctx, text, icon, pos, size, path, callback, hint, use_small_icon) {
    if (path==undefined) {
        path = undefined;
    }
    if (callback==undefined) {
        callback = undefined;
    }
    if (hint==undefined) {
        hint = undefined;
    }
    if (use_small_icon==undefined) {
        use_small_icon = false;
    }
    UIButton.call(this, ctx, text, pos, size, path, callback, hint);
    this.icon = icon;
    this.small_icon = use_small_icon;
    this.bgmode = "button";
    this.pad = 2;
    this._min_size = [0, 0];
  }
  /*test for IE bug*/;
  if (UIButtonIcon.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIButtonIcon.name = 'UIButtonIcon';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIButtonIcon = inherit_multiple(UIButtonIcon, [UIButton], _es6_module, "UIButtonIcon");
  UIButtonIcon.prototype.get_min_size = function(canvas, isvertical) {
    var ret=this._min_size;
    var pad=this.pad;
    if (this.small_icon)
      pad+=4;
    var iconsheet=this.small_icon ? canvas.iconsheet16 : canvas.iconsheet;
    ret[0] = iconsheet.cellsize[0]+pad*2.0;
    ret[1] = iconsheet.cellsize[1]+pad*2.0;
    return ret;
  }
  UIButtonIcon.prototype.get_hint = function() {
    var ret=prior(UIButtonIcon, this).get_hint.call(this);
    if (this.text)
      ret = "%b"+this.text+"%/b \n\n"+ret;
    return ret;
  }
  var $pos_UIButtonIcon_build_draw=[0, 0];
  var $high_clr_UIButtonIcon_build_draw=[0.9, 0.9, 0.9, 0.2];
  var $size_UIButtonIcon_build_draw=[0, 0];
  var $inset_clr_UIButtonIcon_build_draw=[0.3, 0.3, 0.3, 0.2];
  UIButtonIcon.prototype.build_draw = function(canvas) {
    if (this._do_err_on_draw) {
        throw new Error("test exception");
    }
    canvas.begin(this);
    if (this.icon==-1) {
        if (!(this.state&UIFlags.ENABLED))
          canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
        else 
          if (this.clicked)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, uicolors["IconInv"]);
        else 
          if (this.state&UIFlags.HIGHLIGHT)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, uicolors["HighlightIcon"]);
        else 
          canvas.box($pos_UIButtonIcon_build_draw, this.size, uicolors["IconBox"]);
        return ;
    }
    var pad=this.pad;
    var isize=this.small_icon ? canvas.iconsheet16.cellsize : canvas.iconsheet.cellsize;
    if (isize[0]>this.size[0])
      $pos_UIButtonIcon_build_draw[0] = 1;
    else 
      $pos_UIButtonIcon_build_draw[0] = 1;
    $pos_UIButtonIcon_build_draw[1] = 0;
    var $size_UIButtonIcon_build_draw=this.size;
    if (this.bgmode=="button") {
        if (!(this.state&UIFlags.ENABLED))
          canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
        else 
          if (this.clicked)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, uicolors["IconInv"]);
        else 
          if (this.state&UIFlags.HIGHLIGHT)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, uicolors["HighlightIcon"]);
        else 
          canvas.box($pos_UIButtonIcon_build_draw, this.size, uicolors["IconBox"]);
    }
    else 
      if (this.bgmode=="flat") {
        if (!(this.state&UIFlags.ENABLED))
          canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
        else 
          if (this.clicked)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, $inset_clr_UIButtonIcon_build_draw);
        else 
          if (this.state&UIFlags.HIGHLIGHT)
          canvas.box($pos_UIButtonIcon_build_draw, $size_UIButtonIcon_build_draw, $high_clr_UIButtonIcon_build_draw);
    }
    if ($size_UIButtonIcon_build_draw[0]>isize[0])
      $pos_UIButtonIcon_build_draw[0]+=($size_UIButtonIcon_build_draw[0]-isize[0])*0.5;
    if ($size_UIButtonIcon_build_draw[1]>isize[1])
      $pos_UIButtonIcon_build_draw[1]+=($size_UIButtonIcon_build_draw[1]-isize[1])*0.5;
    if (this.small_icon)
      canvas.icon(this.icon, $pos_UIButtonIcon_build_draw, 0.75, true);
    else 
      canvas.icon(this.icon, $pos_UIButtonIcon_build_draw, 0.75, false);
    canvas.end(this);
  }
  _es6_module.add_class(UIButtonIcon);
  UIButtonIcon = _es6_module.add_export('UIButtonIcon', UIButtonIcon);
  function UIMenuButton(ctx, menu, pos, size, path, description) {
    if (description==undefined) {
        description = "";
    }
    UIButtonAbstract.call(this, ctx, path);
    this.menu = menu;
    this.click_on_down = true;
    this.description = "";
    this.ctx = ctx;
    this.text = "";
    this.val = 0;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
    this.prop = undefined;
    if (this.state&UIFlags.USE_PATH) {
        this.build_menu();
    }
    else {
      var subcallback=menu.callback;
      var this2=this;
      function callback(entry, id) {
        this2.text = entry.label;
        this2.do_recalc();
        subcallback(entry, id);
      }
      menu.callback = callback;
    }
  }
  /*test for IE bug*/;
  if (UIMenuButton.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIMenuButton.name = 'UIMenuButton';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIMenuButton = inherit_multiple(UIMenuButton, [UIButtonAbstract], _es6_module, "UIMenuButton");
  UIMenuButton.prototype.on_tick = function() {
    UIHoverHint.prototype.on_tick.call(this);
    if (this.state&UIFlags.USE_PATH) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (val==undefined)
          val = "(undefined)";
        if (val!=this.val) {
            this.val = val;
            if (this.prop.ui_value_names[val]!=undefined)
              this.text = this.prop.ui_value_names[val];
            else 
              this.text = val.toString();
            if (!DEBUG.data_api_timing)
              this.do_recalc();
        }
    }
    if (this.menu!=undefined&&this.menu.closed) {
        if (this.clicked) {
            this.do_recalc();
        }
        this.clicked = false;
    }
  }
  UIMenuButton.prototype.build_menu = function() {
    var this2=this;
    function callback(entry, id) {
      this2.val = id;
      this2.text = this2.prop.ui_value_names[this2.val];
      this2.clicked = false;
      this2.do_recalc();
      this2.set_prop_data(this2.val);
    }
    var menu=new UIMenu("", callback);
    this.prop = this.ctx.api.get_prop_meta(this.ctx, this.data_path);
    var __iter_k=__get_iter(this.prop.ui_value_names);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var hotkey;
      if (this.prop.hotkey_ref!=undefined) {
          hotkey = this.prop.hotkey_ref.build_str();
      }
      else {
        hotkey = "";
      }
      menu.add_item(this.prop.ui_value_names[k], hotkey, k);
    }
    this.menu = menu;
  }
  UIMenuButton.prototype.on_click = function(event) {
    var canvas=this.get_canvas();
    var viewport=canvas.viewport;
    var menu=this.menu;
    var vx=G.window.sizex;
    var vy=G.window.sizey;
    menu.minwidth = this.size[0];
    menu.packmenu(canvas);
    var off=[0, Math.floor(this.size[1]-3)];
    if (this.abspos[1]+off[1]+menu.size[1]>vy) {
        off = [0, -menu.size[1]];
    }
    this.call_menu(menu, off, this.size[0]);
  }
  UIMenuButton.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.clicked)
      canvas.invbox([0, 0], this.size);
    else 
      if (this.state&UIFlags.HIGHLIGHT)
      canvas.hlightbox([0, 0], this.size);
    else 
      canvas.box([0, 0], this.size);
    var siz=this.size[1]/2.5;
    var p=3;
    var tsize=canvas.textsize(this.text, this.text_size);
    var x=Math.floor((this.size[0]-tsize[0]-siz-p*3)/2);
    var y=Math.floor((this.size[1]-tsize[1])/4);
    if (!this.clicked)
      canvas.text([x, y], this.text, uicolors["BoxText"], this.text_size);
    var clr=uicolors["Arrow"];
    var x=this.size[0]-siz-p*3, y=this.size[1]-siz*1.5-p;
    canvas.line([x-p*2, 2, 0], [x-p*2, this.size[1]-1, 0], clr, clr, 2.0);
    canvas.tri([x, y, 0], [x+siz, y, 0], [x+siz/2, y+siz, 0], clr);
    canvas.end(this);
  }
  UIMenuButton.prototype.get_min_size = function(canvas, isvertical) {
    if (this.menu!=undefined) {
        this.menu.packmenu(canvas);
        var size=[canvas.textsize(this.text+"     ")[0], 26];
        var __iter_c=__get_iter(this.menu.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          var size2=c.get_min_size(canvas, isvertical);
          size[0] = Math.max(size[0], size2[0]);
          size[1] = Math.max(size[1], size2[1]);
        }
        return [size[0]+canvas.textsize("     ")[0]+20, 26];
    }
    else {
      return [canvas.textsize(this.text+"     ")[0]+20, 26];
    }
  }
  _es6_module.add_class(UIMenuButton);
  UIMenuButton = _es6_module.add_export('UIMenuButton', UIMenuButton);
  function UICheckBox(ctx, text, pos, size, path, use_check) {
    if (use_check==undefined) {
        use_check = true;
    }
    UIHoverHint.call(this, ctx, path);
    this.draw_check = use_check;
    this.ctx = ctx;
    this.set = false;
    this.mdown = false;
    this.text = text;
    this.update_callback = undefined;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
    this.update_callback = undefined;
    this.prop = undefined;
    if (this.state&UIFlags.USE_PATH) {
        this.prop = this.get_prop_meta();
    }
  }
  /*test for IE bug*/;
  if (UICheckBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UICheckBox.name = 'UICheckBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UICheckBox = inherit_multiple(UICheckBox, [UIHoverHint], _es6_module, "UICheckBox");
  UICheckBox.prototype.on_tick = function() {
    UIHoverHint.prototype.on_tick.call(this);
    if (!this.mdown&&this.update_callback!=undefined) {
        this.update_callback(this);
    }
    else 
      if (!this.mdown&&(this.state&UIFlags.USE_PATH)) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (val!=this.set) {
            this.set = !!val;
            if (!DEBUG.data_api_timing)
              this.do_recalc();
        }
    }
  }
  UICheckBox.prototype.on_mousemove = function(event) {
    if (!this.mdown) {
        this.start_hover();
    }
  }
  UICheckBox.prototype.on_mousedown = function(event) {
    if (event.button==0&&!this.mdown) {
        this.push_modal();
        this.stop_hover();
        this.mdown = true;
        this.set^=true;
        if (this.callback!=undefined)
          this.callback(this, this.set);
        if (this.state&UIFlags.USE_PATH) {
            console.log("prop set!", this.setter_path, this.set, "|");
            this.set_prop_data(this.set);
        }
        this.do_recalc();
    }
  }
  UICheckBox.prototype.on_mouseup = function(event) {
    if (this.mdown) {
        this.pop_modal();
        this.mdown = false;
        if (this.callback!=undefined) {
            this.callback(this, this.set);
        }
    }
  }
  UICheckBox.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    var csize=[20, 20];
    var this2=this;
    function draw_check() {
      var h1=7;
      var h2=-3;
      var ox=5;
      var r=20;
      var v1=[0+ox, h1, 0];
      var v2=[10+ox, 5+h2, 0];
      var v3=[10+ox, 10+h2, 0];
      var v4=[0+ox, h1+5, 0];
      var clr=this2.state&UIFlags.ENABLED ? uicolors["Check"] : uicolors["DisabledBox"];
      canvas.quad_aa(v1, v2, v3, v4, clr);
      var v1=[5+ox, h1+2, 0];
      var v2=[10+ox, h1, 0];
      var v3=[15+ox, h1+15, 0];
      var v4=[10+ox, h1+15, 0];
      canvas.quad_aa(v1, v2, v3, v4, clr);
    }
    if (!(this.state&UIFlags.ENABLED)) {
        canvas.box([2, 0], [csize[0], csize[1]], this.do_flash_color(uicolors["DisabledBox"]));
        if (this.draw_check)
          draw_check();
    }
    else 
      if ((this.state&UIFlags.HIGHLIGHT)&&this.draw_check) {
        canvas.simple_box([2, 0], [this.size[0], csize[1]]);
        var mul=this.set ? 1.0 : 0.3;
        canvas.hlightbox([0, 0], csize, mul, 2);
        if (this.set)
          draw_check();
    }
    else 
      if (this.set) {
        canvas.invbox([2, 0], csize, undefined, 2);
        if (this.draw_check)
          draw_check();
    }
    else {
      canvas.box([2, 0], csize, undefined, 2);
    }
    var tsize=canvas.textsize(this.text);
    canvas.text([csize[0]+5, (this.size[1]-tsize[1])*0.25], this.text);
    canvas.end(this);
  }
  UICheckBox.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text)[0]+22, 22];
  }
  _es6_module.add_class(UICheckBox);
  UICheckBox = _es6_module.add_export('UICheckBox', UICheckBox);
  function UINumBox(ctx, text, range, val, pos, size, path) {
    if (range==undefined) {
        range = [0, 100];
    }
    if (val==undefined) {
        val = range[0];
    }
    if (pos==undefined) {
        pos = [0, 0];
    }
    if (size==undefined) {
        size = [1, 1];
    }
    if (path==undefined) {
        path = undefined;
    }
    UIHoverHint.call(this, ctx, path);
    this.unit = undefined;
    this.clicked = false;
    this.range = range;
    this.val = val;
    this.start_val;
    this.ctx = ctx;
    this.set = true;
    this.text = text;
    this.is_int = false;
    this.slide_power = 2.0;
    this.slide_mul = 1.0;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
    this.start_mpos = [0, 0];
    if (this.state&UIFlags.USE_PATH) {
        var prop=this.get_prop_meta(ctx);
        if (prop.type==PropTypes.INT) {
            this.is_int = true;
        }
    }
  }
  /*test for IE bug*/;
  if (UINumBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UINumBox.name = 'UINumBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UINumBox = inherit_multiple(UINumBox, [UIHoverHint], _es6_module, "UINumBox");
  UINumBox.prototype.set_val = function(val) {
    this.val = val;
    this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
    if (this.state&UIFlags.USE_PATH) {
        this.set_prop_data(this.val);
    }
    this.do_recalc();
  }
  UINumBox.prototype.on_mousedown = function(event) {
    var numbox=this;
    if (event.button==0&&!this.clicked&&!event.shiftKey) {
        if (this.state&UIFlags.USE_PATH) {
            this.set_prop_data(this.val, true);
        }
        this.push_modal();
        this.start_mpos = [event.x, event.y];
        this.start_val = this.val;
        this.stop_hover();
        this.clicked = true;
        this.do_recalc();
    }
    else 
      if (event.button==2&&!this.clicked) {
        var this2=this;
        function callback(entry, id) {
          if (id==0) {
              this2.swap_textbox();
          }
        }
        var menu=new UIMenu("", callback);
        menu.add_item("Manual input", "", 0);
        this.call_menu(menu);
    }
    else 
      if (event.shiftKey) {
        this.swap_textbox();
    }
  }
  UINumBox.prototype.swap_textbox = function() {
    var numbox=this;
    function unit_error(numbox) {
      console.log(["numbox error", numbox]);
      numbox.flash(UIFlags.REDERROR);
      numbox.do_recalc();
    }
    function on_end_edit(tbox, cancelled) {
      tbox.parent.replace(tbox, numbox);
      numbox.set_val(Unit.parse(tbox.text, numbox.val, unit_error, numbox, numbox.unit));
    }
    var unit=this.unit;
    var valstr=Unit.gen_string(this.val, unit);
    var textbox=new UITextBox(this.ctx, valstr, this.pos, this.size);
    textbox.packflag|=PackFlags.NO_REPACK;
    this.parent.do_full_recalc();
    this.parent.replace(this, textbox);
    textbox.begin_edit(event);
    textbox.set_cursor();
    textbox.on_end_edit = on_end_edit;
  }
  UINumBox.prototype.on_mouseup = function(event) {
    if (this.clicked&&event.button==0) {
        this.pop_modal();
        this.clicked = false;
        var limit=G.was_touch ? 5 : 1;
        if (Math.abs(this.start_mpos[0]-event.x)<=limit&&Math.abs(this.start_mpos[1]-event.y)<=limit) {
            var df=Math.min((this.range[1]-this.range[0])*0.1, 1.0);
            if (event.x<this.size[0]/2.0) {
                df = -df;
            }
            this.val+=df;
            this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
        }
        if (this.callback!=undefined) {
            this.callback(this, this.val);
        }
        if (this.state&UIFlags.USE_PATH) {
            this.set_prop_data(this.val, false);
        }
        this.do_recalc();
    }
  }
  UINumBox.prototype.on_tick = function() {
    UIHoverHint.prototype.on_tick.call(this);
    if (this.state&UIFlags.USE_PATH) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (isNaN(val)||val=="NaN") {
            return ;
        }
        if (val!=this.val) {
            this.val = val;
            if (this.callback!=undefined) {
                this.callback(this, this.val);
            }
            if (!DEBUG.data_api_timing)
              this.do_recalc();
        }
    }
  }
  UINumBox.prototype.on_mousemove = function(event) {
    var mpos=[event.x, event.y];
    if (this.clicked) {
        var df=(mpos[0]-this.start_mpos[0])/300.0;
        var sign=df<0.0 ? -1.0 : 1.0;
        if (!this.is_int) {
            var odf=df;
            df = Math.pow(df, this.slide_power)*this.slide_mul;
            if (df==NaN)
              df = odf*odf;
            df*=sign;
        }
        df*=this.range[1]-this.range[0];
        this.val = this.start_val+df;
        this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
        if (this.is_int)
          this.val = Math.floor(this.val);
        this.do_recalc();
        if (this.state&UIFlags.USE_PATH) {
            this.set_prop_data(this.val, false);
        }
        if (this.callback!=undefined) {
            this.callback(this, this.val);
        }
    }
    else {
      this.start_hover();
    }
  }
  UINumBox.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    var clr=uicolors["Box"];
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.clicked)
      canvas.invbox([0, 0], this.size);
    else 
      if (!(this.state&UIFlags.FLASH)&&(this.state&UIFlags.HIGHLIGHT))
      canvas.hlightbox([0, 0], this.size, this.do_flash_color());
    else 
      canvas.box([0, 0], this.size, this.do_flash_color(clr));
    var unit=this.unit;
    var valstr=this.is_int ? this.val.toString() : Unit.gen_string(this.val, unit);
    var str=this.text+" "+valstr;
    var pad=15;
    while (str.length>1&&canvas.textsize(str)[0]>this.size[0]-pad*2) {
      str = str.slice(0, str.length-1);
    }
    var tsize=canvas.textsize(str);
    pad = (this.size[0]-tsize[0])*0.5;
    canvas.text([pad, 0.25*(this.size[1]-tsize[1])+1], str, uicolors["BoxText"]);
    var siz=this.size[1]/2.0;
    var x=4, y=(this.size[1]-siz)/2;
    var clr=uicolors["Arrow"];
    canvas.tri([x+siz/2, y, 0], [x+siz/2, y+siz, 0], [x, y+siz/2, 0], clr);
    x = this.size[0]-siz*0.5-3;
    y = (this.size[1]-siz)/2;
    canvas.tri([x-siz/2, y, 0], [x-siz/2, y+siz, 0], [x, y+siz/2, 0], clr);
    canvas.end(this);
  }
  UINumBox.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text)[0]+70, 26];
  }
  _es6_module.add_class(UINumBox);
  UINumBox = _es6_module.add_export('UINumBox', UINumBox);
  function UILabel(ctx, text, pos, size, path) {
    UIElement.call(this, ctx, path);
    this.start_mpos = new Vector2();
    this.prop = undefined;
    this.val = text;
    this.text = text;
    this.bgcolor = undefined;
    this.color = undefined;
    this.did_modal = false;
    this.clicked = false;
    this.was_touch = false;
    if (this.state&UIFlags.USE_PATH) {
        this.prop = ctx.api.get_prop_meta(ctx, this.data_path);
        this.val = this.prop.data;
        this.text = this.prop.uiname+": ";
    }
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
  }
  /*test for IE bug*/;
  if (UILabel.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UILabel.name = 'UILabel';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UILabel = inherit_multiple(UILabel, [UIElement], _es6_module, "UILabel");
  UILabel.prototype.set_background = function(color) {
    this.bgcolor = new Vector4(color);
    this.do_recalc();
  }
  UILabel.prototype.set_color = function(color) {
    this.color = new Vector4(color);
    this.do_recalc();
  }
  UILabel.prototype.set_text = function(text) {
    if (this.text!=text)
      this.do_recalc();
    this.text = text;
  }
  UILabel.prototype.on_tick = function() {
    prior(UILabel, this).on_tick.call(this);
    if (this.state&UIFlags.USE_PATH) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (val!=this.val) {
            this.val = val;
            this.text = this.prop.uiname+": "+val.toString();
            if (!DEBUG.data_api_timing)
              this.do_recalc();
        }
    }
  }
  UILabel.prototype.on_mousemove = function(event) {
    var dis=this.start_mpos.vectorDistance([event.x, event.y]);
    if (this.clicked) {
        var dis=this.start_mpos.vectorDistance([event.x, event.y]);
        console.log("-dis", dis, event.x, event.y, this.start_mpos[0], this.start_mpos[1]);
        if (dis>4) {
            if (this.did_modal) {
                this.pop_modal();
                this.did_modal = false;
            }
            this.clicked = false;
            this.start_pan(this.start_mpos, 0, [event.x, event.y]);
        }
    }
    else {
    }
    UIElement.prototype.on_mousemove.call(this, event);
  }
  UILabel.prototype.on_mousedown = function(event) {
    this.start_mpos.load([event.x, event.y]);
    this.was_touch = G.was_touch;
    if (this.clicked) {
        if (this.do_modal)
          this.push_modal();
        this.clicked = false;
        this.do_recalc();
    }
    if (!this.clicked&&event.button==0) {
        this.clicked = true;
        if (!this.was_touch&&this.callback!=undefined) {
            this.callback(this);
        }
        if (!this.did_modal) {
            this.push_modal();
            this.did_modal = true;
        }
    }
  }
  UILabel.prototype.on_mouseup = function(event) {
    if (this.did_modal) {
        this.pop_modal();
        this.did_modal = false;
    }
    if (this.clicked) {
        this.clicked = false;
        if (this.was_touch&&inrect_2d_button([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UILabel.prototype.build_draw = function(canvas, isVertical) {
    canvas.begin(this);
    if (this.bgcolor) {
        if (!(this.state&UIFlags.ENABLED))
          canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
        else 
          canvas.box([0, 0], this.size, this.bgcolor);
    }
    var tsize=canvas.textsize(this.text);
    canvas.text([(this.size[0]-tsize[0])*0.5, (this.size[1]-tsize[1])*0.25], this.text, this.color);
    canvas.end(this);
  }
  UILabel.prototype.get_min_size = function(canvas, isvertical) {
    var pad=this.bgcolor!=undefined ? 2 : 4;
    return [canvas.textsize(this.text)[0]+pad, 26];
  }
  _es6_module.add_class(UILabel);
  UILabel = _es6_module.add_export('UILabel', UILabel);
  function _HiddenMenuElement(ctx, src_menu_label, dst_menu_label) {
    UIElement.call(this, ctx);
    this.src_menu_label = src_menu_label;
    this.dst_menu_label = dst_menu_label;
  }
  /*test for IE bug*/;
  if (_HiddenMenuElement.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        _HiddenMenuElement.name = '_HiddenMenuElement';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  _HiddenMenuElement = inherit_multiple(_HiddenMenuElement, [UIElement], _es6_module, "_HiddenMenuElement");
  _HiddenMenuElement.prototype.on_mousemove = function(event) {
    if (DEBUG.ui_menus)
      console.log("In _HiddenMenuElement.on_mousemove()");
    this.src_menu_label.menu.end_menu();
    this.src_menu_label.clicked = false;
    this.src_menu_label.state&=~UIFlags.HIGHLIGHT;
    this.src_menu_label.do_recalc();
    this.dst_menu_label.clicked = true;
    this.dst_menu_label.spawn_menu();
  }
  _HiddenMenuElement.prototype.build_draw = function(canvas, isvertical) {
  }
  _es6_module.add_class(_HiddenMenuElement);
  _HiddenMenuElement = _es6_module.add_export('_HiddenMenuElement', _HiddenMenuElement);
  function UIMenuLabel(ctx, text, menu, gen_menu_func, pos, size) {
    UIElement.call(this, ctx);
    if (pos==undefined)
      pos = [0, 0];
    if (size==undefined)
      size = [0, 0];
    this.prop = undefined;
    this.val = text;
    this.text = text;
    this.clicked = false;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
    this.gen_menu = gen_menu_func;
    this.menu_callback = undefined;
    this.callback_override = undefined;
    this.off = [0, 0];
  }
  /*test for IE bug*/;
  if (UIMenuLabel.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIMenuLabel.name = 'UIMenuLabel';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIMenuLabel = inherit_multiple(UIMenuLabel, [UIElement], _es6_module, "UIMenuLabel");
  UIMenuLabel.prototype.on_tick = function() {
    prior(UIMenuLabel, this).on_tick.call(this);
    if (this.clicked&&this.menu!=undefined&&this.menu.closed) {
        this.clicked = false;
        if (!DEBUG.data_api_timing)
          this.do_recalc();
    }
  }
  UIMenuLabel.prototype.add_hidden_elements = function(menu) {
    var es=new Array();
    var __iter_c=__get_iter(this.parent.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c==this||c.constructor.name!=UIMenuLabel.name)
        continue;
      var e=new _HiddenMenuElement(this.ctx, this, c);
      e.size = c.size;
      e.pos = [c.pos[0]-this.pos[0]-this.off[0], c.pos[1]-this.pos[1]-this.off[1]];
      es.push(e);
    }
    var del=new Array();
    var __iter_c=__get_iter(menu.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name==_HiddenMenuElement.name)
        del.push(c);
    }
    var __iter_c=__get_iter(del);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      menu.children.remove(c);
    }
    var __iter_c=__get_iter(es);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      menu.add(c);
    }
  }
  UIMenuLabel.prototype.spawn_menu = function(mpos) {
    this.clicked = true;
    this.do_recalc();
    if (this.gen_menu!=undefined) {
        this.menu = this.gen_menu(this.ctx, this);
    }
    var menu=this.menu;
    if (menu==undefined)
      return ;
    var off=[0, 0];
    menu.packmenu(this.canvas);
    var absco=this.get_abs_pos();
    var scrsize=this.ctx.screen.size;
    if (scrsize[1]-absco[1]-this.size[1]<menu.size[1]) {
        off = this.off = [0, -menu.size[1]];
    }
    else {
      off = this.off = [0, this.size[1]];
    }
    var this2=this;
    if (this.menu.callback!=this.callback_override) {
        this.menu_callback = menu.callback;
        this.callback_override = menu.callback = function(entry, id) {
          this2.clicked = false;
          if (this2.menu_callback!=undefined) {
              this2.menu_callback(entry, id);
          }
          this2.do_recalc();
          this2.state&=~UIFlags.HIGHLIGHT;
        };
    }
    this.add_hidden_elements(menu);
    this.call_menu(menu, off);
  }
  UIMenuLabel.prototype.on_mousedown = function(event) {
    if (event.button==0&&this.clicked==false) {
        this.spawn_menu([event.x, event.y]);
    }
  }
  UIMenuLabel.prototype.on_mouseup = function(event) {
    if (event.button==0&&this.clicked==false) {
        this.clicked = false;
        if (inrect_2d_button([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UIMenuLabel.prototype.build_draw = function(canvas) {
    if (this.canvas==undefined)
      this.canvas = canvas;
    canvas.begin(this);
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.clicked)
      canvas.box([0, -2], [this.size[0], this.size[1]+4], uicolors["MenuLabelInv"], 10);
    else 
      if (this.state&UIFlags.HIGHLIGHT)
      canvas.box([0, -2], [this.size[0], this.size[1]+4], uicolors["MenuLabel"], 10);
    var tsize=canvas.textsize(this.text, menu_text_size);
    canvas.text([(this.size[0]-tsize[0])*0.5, (this.size[1]-tsize[1])*0.25], this.text, undefined, menu_text_size);
    canvas.end(this);
  }
  UIMenuLabel.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text, menu_text_size)[0]+4, 26];
  }
  _es6_module.add_class(UIMenuLabel);
  UIMenuLabel = _es6_module.add_export('UIMenuLabel', UIMenuLabel);
  function ScrollButton(ctx, pos, size, icon, callback, do_repeat) {
    if (do_repeat==undefined) {
        do_repeat = true;
    }
    UIElement.call(this, ctx);
    this.repeat = do_repeat;
    this.boxclr = undefined;
    this.highclr = undefined;
    this.invclr = undefined;
    this.icon = icon;
    this.clicked = false;
    this.do_modal = true;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = callback;
    this.repeat_ival = 100;
    this.last_ms = 0;
  }
  /*test for IE bug*/;
  if (ScrollButton.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ScrollButton.name = 'ScrollButton';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ScrollButton = inherit_multiple(ScrollButton, [UIElement], _es6_module, "ScrollButton");
  ScrollButton.prototype.on_tick = function() {
    if (this.clicked&&this.repeat&&time_ms()-this.last_ms>this.repeat_ival) {
        this.last_ms = time_ms();
        this.callback(this, [-1, -1]);
    }
  }
  ScrollButton.prototype.on_mousedown = function(event) {
    if (event.button==0&&!this.clicked) {
        if (this.do_modal)
          this.push_modal();
        this.clicked = true;
        this.do_recalc();
        if (inrect_2d([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this, [event.x, event.y]);
            }
        }
    }
  }
  ScrollButton.prototype.on_mouseup = function(event) {
    if (event.button==0) {
        if (this.do_modal)
          this.pop_modal();
        this.clicked = false;
        this.do_recalc();
    }
  }
  ScrollButton.prototype.build_draw = function(canvas, isVertical) {
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([1, 1], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.clicked)
      canvas.box2([1, 1], this.size, this.invclr);
    else 
      if (this.state&UIFlags.HIGHLIGHT)
      canvas.box2([1, 1], this.size, this.highclr);
    else 
      canvas.box2([1, 1], this.size, this.boxclr);
    if (this.icon!=undefined) {
        var clr=this.clicked ? undefined : [0.5, 0.5, 0.5, 1.0];
        canvas.icon(this.icon, IsMobile ? [3, 7] : [0, 0], undefined, true, clr);
    }
  }
  ScrollButton.prototype.get_min_size = function(canvas, isvertical) {
    if (IsMobile) {
        return [26, 26];
    }
    else {
      return [18, 18];
    }
  }
  _es6_module.add_class(ScrollButton);
  ScrollButton = _es6_module.add_export('ScrollButton', ScrollButton);
  function UIVScroll(ctx, range, pos, size, callback) {
    if (pos==undefined) {
        pos = [0, 0];
    }
    if (size==undefined) {
        size = [0, 0];
    }
    if (callback==undefined) {
        callback = undefined;
    }
    UIFrame.call(this, ctx);
    this.state|=UIFlags.NO_FRAME_CACHE;
    this.packflag|=PackFlags.INHERIT_HEIGHT;
    this.packflag|=PackFlags.ALIGN_RIGHT;
    this.step = undefined;
    this.clicked = false;
    this.click_sign = 1;
    this.range = range;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.val = 0;
    this.callback = callback;
    this.but1 = new ScrollButton(ctx, [0, 0], [0, 0], Icons.SCROLL_DOWN);
    this.but1.repeat = true;
    this.add(this.but1);
    this.but2 = new ScrollButton(ctx, [0, 0], [0, 0], Icons.SCROLL_UP);
    this.but2.repeat = true;
    this.add(this.but2);
    this.bar = new ScrollButton(ctx, [0, 0], [0, 0], undefined);
    this.bar.repeat = false;
    this.bar.do_modal = false;
    this.barsize = 32;
    this.add(this.bar);
    this.bar.boxclr = uicolors["ScrollBar"];
    this.bar.highclr = uicolors["ScrollBarHigh"];
    this.bar.invclr = uicolors["ScrollInv"];
    this.but1.boxclr = uicolors["ScrollButton"];
    this.but1.highclr = uicolors["ScrollButtonHigh"];
    this.but1.invclr = uicolors["ScrollInv"];
    this.but2.boxclr = uicolors["ScrollButton"];
    this.but2.highclr = uicolors["ScrollButtonHigh"];
    this.but2.invclr = uicolors["ScrollInv"];
    this.last_ms = 0;
    this.dragging = false;
    this.last_mpos = [0, 0];
    this.did_modal = false;
    var this2=this;
    function bar_callback(button, mpos) {
      mpos = [0, mpos[1]+button.pos[1]];
      this2.do_drag(mpos);
    }
    this.bar.callback = bar_callback;
    this.but1.callback = function(button, mpos) {
      this2.increment(1);
    }
    this.but2.callback = function(button, mpos) {
      this2.increment(-1);
    }
  }
  /*test for IE bug*/;
  if (UIVScroll.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIVScroll.name = 'UIVScroll';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIVScroll = inherit_multiple(UIVScroll, [UIFrame], _es6_module, "UIVScroll");
  UIVScroll.prototype.set_range = function(range) {
    if (this.range==undefined||this.range[0]!=range[0]||this.range[1]!=range[1])
      this.do_recalc();
    this.range = range;
    this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
    this.pack_bar();
  }
  UIVScroll.prototype.do_drag = function(mpos) {
    this.last_mpos = mpos;
    this.dragging = true;
    this.parent.push_modal(this);
  }
  UIVScroll.prototype.increment = function(sign) {
    var step=this.step;
    if (step==undefined)
      step = (this.range[1]-this.range[0])/10.0;
    this.val+=step*sign;
    this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
    if (this.callback!=undefined) {
        this.callback(this, this.val);
    }
  }
  UIVScroll.prototype.set_value = function(val) {
    val = Math.min(Math.max(val, this.range[0]), this.range[1]);
    if (this.val!=val)
      this.do_recalc();
    this.val = val;
  }
  UIVScroll.prototype.pack_bar = function() {
    var bar=this.bar;
    var range=this.range;
    var size1=this.barsize;
    size1 = this.size[1]-this.but1.size[1]-this.but2.size[1]-size1;
    bar.size[0] = this.size[0];
    bar.size[1] = this.barsize;
    var fac=size1/(this.range[1]-this.range[0]);
    bar.pos[1] = this.but1.size[1]+(this.range[1]-this.val-this.range[0]*2)*fac;
  }
  UIVScroll.prototype.on_inactive = function() {
    this.clicked = false;
    prior(UIVScroll, this).on_inactive.call(this);
  }
  UIVScroll.prototype.on_tick = function() {
    prior(UIVScroll, this).on_tick.call(this);
    this.state&=~UIFlags.USE_PAN;
    if (this.clicked&&this.modalhandler!=undefined) {
        this.clicked = false;
    }
    if (this.clicked&&time_ms()-this.last_ms>200) {
        this.increment(this.click_sign*4);
    }
  }
  UIVScroll.prototype.on_mousedown = function(event) {
    if (!this.dragging) {
        UIFrame.prototype.on_mousedown.call(this, event, false);
    }
    if (this.modalhandler==undefined&&this.active==undefined) {
        this.clicked = true;
        this.last_ms = time_ms()+200;
        if (event.y>this.bar.pos[1]+this.bar.size[1]) {
            this.click_sign = -1;
            this.increment(-4);
        }
        else {
          this.click_sign = 1;
          this.increment(4);
        }
    }
  }
  UIVScroll.prototype.on_mouseup = function(event) {
    this.clicked = false;
    if (this.dragging) {
        this.dragging = false;
        this.parent.pop_modal();
        this.bar.clicked = false;
        this.bar.do_recalc();
    }
    else {
      UIFrame.prototype.on_mouseup.call(this, event);
    }
  }
  UIVScroll.prototype.on_mousemove = function(event) {
    if (this.dragging) {
        var mpos=[event.y, event.y];
        var y=mpos[1]-this.last_mpos[1];
        if (Math.abs(y)<4)
          return ;
        var fac=(this.range[1]-this.range[0]);
        fac = fac/(this.size[1]-this.but1.size[1]-this.but2.size[1]-this.barsize);
        this.val-=fac*y+this.range[0];
        this.val = Math.min(Math.max(this.val, this.range[0]), this.range[1]);
        if (this.callback!=undefined) {
            this.callback(this, this.val);
        }
        this.last_mpos = mpos;
        this.bar.do_recalc();
        this.do_recalc();
    }
    else {
      UIFrame.prototype.on_mousemove.call(this, event);
    }
  }
  UIVScroll.prototype.pack = function(canvas, isVertical) {
    var sizey=Math.floor(this.size[0]*1.25);
    this.but1.size = [this.size[0], sizey];
    this.but2.pos = [0, this.size[1]-sizey-1];
    this.but2.size = [this.size[0], sizey];
    this.pack_bar();
  }
  UIVScroll.prototype.build_draw = function(canvas, isVertical) {
    canvas.frame_begin(this);
    this.pack(canvas, isVertical);
    if (this.range[1]-this.range[0]==0.0) {
        canvas.box2([1, 0], this.size, uicolors["ScrollBG"]);
        return ;
    }
    this.canvas = canvas;
    canvas.box2([1, 0], this.size, uicolors["ScrollBG"]);
    this.draw_background = false;
    UIFrame.prototype.build_draw.call(this, canvas, isVertical, false);
    canvas.frame_end(this);
  }
  UIVScroll.prototype.get_min_size = function(canvas, isvertical) {
    if (IsMobile)
      return [28, 28*3];
    else 
      return [15, 18*3];
  }
  _es6_module.add_class(UIVScroll);
  UIVScroll = _es6_module.add_export('UIVScroll', UIVScroll);
  function UIIconCheck(ctx, text, icon, pos, size, path, use_check) {
    if (use_check==undefined) {
        use_check = true;
    }
    UIHoverHint.call(this, ctx, path);
    this.ctx = ctx;
    this.set = false;
    this.mdown = false;
    this.text = text;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.callback = undefined;
    this.update_callback = undefined;
    this.icon = icon;
    this.prop = undefined;
    if (this.state&UIFlags.USE_PATH) {
        this.prop = this.get_prop_meta();
    }
  }
  /*test for IE bug*/;
  if (UIIconCheck.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIIconCheck.name = 'UIIconCheck';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIIconCheck = inherit_multiple(UIIconCheck, [UIHoverHint], _es6_module, "UIIconCheck");
  UIIconCheck.prototype.on_tick = function() {
    UIHoverHint.prototype.on_tick.call(this);
    if (!this.mdown&&this.update_callback!=undefined) {
        this.update_callback(this);
    }
    else 
      if (!this.mdown&&(this.state&UIFlags.USE_PATH)) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (val!=this.set) {
            this.set = val;
            if (!DEBUG.data_api_timing)
              this.do_recalc();
        }
    }
  }
  UIIconCheck.prototype.on_mousemove = function(event) {
    if (!this.mdown) {
        this.start_hover();
    }
  }
  UIIconCheck.prototype.on_mousedown = function(event) {
    if (event.button==0&&!this.mdown) {
        this.push_modal();
        this.stop_hover();
        this.mdown = true;
        this.set^=true;
        this.do_recalc();
    }
  }
  UIIconCheck.prototype.on_mouseup = function(event) {
    if (this.mdown) {
        this.pop_modal();
        this.mdown = false;
        if (this.callback!=undefined)
          this.callback(this, this.set);
        if (this.state&UIFlags.USE_PATH) {
            this.set_prop_data(this.set);
        }
    }
  }
  UIIconCheck.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    var csize=[24, 24];
    if (!(this.state&UIFlags.ENABLED)) {
        canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    }
    else 
      if (this.state&UIFlags.HIGHLIGHT) {
        canvas.simple_box([0, 0], [this.size[0], csize[1]]);
        if (this.set) {
            canvas.invbox([0, 0], this.size, 0.9, 2);
        }
        else {
          canvas.hlightbox([0, 0], this.size);
        }
    }
    else 
      if (this.set) {
        canvas.invbox([0, 0], this.size, undefined, 2);
    }
    else {
      canvas.box([0, 0], this.size, undefined, 2);
    }
    var tsize=canvas.textsize(this.text);
    canvas.text([csize[0]+5, (this.size[1]-tsize[1])*0.25], this.text);
    var pos=[4, 4];
    canvas.icon(this.icon, pos, 0.75, true);
    canvas.end(this);
  }
  UIIconCheck.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text)[0]+24, 24];
  }
  _es6_module.add_class(UIIconCheck);
  UIIconCheck = _es6_module.add_export('UIIconCheck', UIIconCheck);
});
es6_module_define('UIWidgets_special', ["UIPack", "UIElement", "math", "UIMenu", "UITextBox", "events", "UIFrame", "UIWidgets", "vectormath", "colorutils"], function _UIWidgets_special_module(_es6_module) {
  "use strict";
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var rgba_to_hsva=es6_import_item(_es6_module, 'colorutils', 'rgba_to_hsva');
  var hsva_to_rgba=es6_import_item(_es6_module, 'colorutils', 'hsva_to_rgba');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var UITextBox=es6_import_item(_es6_module, 'UITextBox', 'UITextBox');
  var UIMenu=es6_import_item(_es6_module, 'UIMenu', 'UIMenu');
  function UICollapseIcon(ctx, is_collapsed, user_callback) {
    if (is_collapsed==undefined) {
        is_collapsed = false;
    }
    if (user_callback==undefined) {
        user_callback = undefined;
    }
    UIButtonIcon.call(this, ctx, "+", Icons.UI_COLLAPSE);
    this._collapsed = 0;
    this.collapsed = is_collapsed;
    var this2=this;
    this._wrapped_callback = function() {
      this2.collapsed^=true;
      if (this2._callback!=undefined)
        this2._callback(this2, this2.collapsed);
    }
    this._callback = user_callback;
  }
  /*test for IE bug*/;
  if (UICollapseIcon.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UICollapseIcon.name = 'UICollapseIcon';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UICollapseIcon = inherit_multiple(UICollapseIcon, [UIButtonIcon], _es6_module, "UICollapseIcon");
  Object.defineProperty(UICollapseIcon.prototype, "collapsed", {get: function() {
    return this._collapsed;
  }, set: function(val) {
    if (!!val!=!!this._collapsed) {
        this.icon = val ? Icons.UI_EXPAND : Icons.UI_COLLAPSE;
        this._collapsed = val;
        this.do_recalc();
    }
  }, configurable: true});
  Object.defineProperty(UICollapseIcon.prototype, "callback", {get: function() {
    return this._wrapped_callback;
  }, set: function(callback) {
    this._callback = callback;
  }, configurable: true});
  _es6_module.add_class(UICollapseIcon);
  UICollapseIcon = _es6_module.add_export('UICollapseIcon', UICollapseIcon);
  function UIPanel(ctx, name, id, is_collapsed) {
    if (name==undefined) {
        name = "";
    }
    if (id==undefined) {
        id = name;
    }
    if (is_collapsed==undefined) {
        is_collapsed = false;
    }
    RowFrame.call(this, ctx);
    this.permid = id;
    this.stored_children = new Array();
    this.packflag|=PackFlags.ALIGN_LEFT;
    this.default_packflag|=PackFlags.INHERIT_WIDTH;
    this.state|=UIFlags.NO_FRAME_CACHE;
    this.user_opened = false;
    this.user_closed = false;
    var this2=this;
    function callback1(iconbut, do_collapse) {
      this2.collapsed^=true;
      this2.user_opened = !this2.collapsed;
      this2.user_closed = this2.collapsed;
    }
    this.pad[1] = 1;
    var tri=new UICollapseIcon(ctx, is_collapsed, callback1);
    tri.small_icon = true;
    tri.bgmode = "flat";
    this.tri = tri;
    var col=this.col();
    this.packflag|=PackFlags.NO_AUTO_SPACING;
    col.packflag|=PackFlags.ALIGN_LEFT|PackFlags.NO_AUTO_SPACING;
    col.default_packflag&=~PackFlags.INHERIT_WIDTH;
    if (IsMobile)
      col.label(" ");
    col.add(tri);
    this.text = name;
    this.title = col.label(name);
    this.title.color = uicolors["PanelText"];
    this._collapsed = false;
    this.collapsed = is_collapsed;
    this._color = uicolors["CollapsingPanel"];
    this.start_child = this.children.length;
  }
  /*test for IE bug*/;
  if (UIPanel.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIPanel.name = 'UIPanel';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIPanel = inherit_multiple(UIPanel, [RowFrame], _es6_module, "UIPanel");
  Object.defineProperty(UIPanel.prototype, "collapsed", {get: function() {
    return this._collapsed;
  }, set: function(is_collapsed) {
    if (!!is_collapsed==this._collapsed)
      return ;
    if (is_collapsed!=this._collapsed&&this.parent!=undefined)
      this.parent.do_full_recalc();
    this.tri.collapsed = is_collapsed;
    this._collapsed = is_collapsed;
    this.user_opened = false;
    this.user_closed = false;
    if (!is_collapsed) {
        if (this.stored_children.length>0) {
            var __iter_c=__get_iter(this.stored_children);
            var c;
            while (1) {
              var __ival_c=__iter_c.next();
              if (__ival_c.done) {
                  break;
              }
              c = __ival_c.value;
              this.add(c);
            }
            this.stored_children = new Array();
        }
    }
    else 
      if (this.children.length>this.start_child) {
        this.stored_children = this.children.slice(this.start_child, this.children.length);
        this.children = this.children.slice(0, this.start_child);
        this.do_recalc();
    }
  }, configurable: true});
  Object.defineProperty(UIPanel.prototype, "color", {get: function() {
    return this._color;
  }, set: function(color) {
    for (var i=0; i<4; i++) {
        if (color[i]!=this._color[i]) {
            this.do_recalc();
            break;
        }
    }
    this._color = color;
  }, configurable: true});
  UIPanel.prototype.on_saved_uidata = function(descend) {
    RowFrame.prototype.on_saved_uidata.call(this, descend);
    var __iter_c=__get_iter(this.stored_children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      descend(c);
    }
  }
  UIPanel.prototype.on_load_uidata = function(visit) {
    RowFrame.prototype.on_load_uidata.call(this, visit);
    var __iter_c=__get_iter(this.stored_children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      visit(c);
    }
  }
  UIPanel.prototype.get_uhash = function() {
    return RowFrame.prototype.get_uhash.call(this)+this.permid;
  }
  UIPanel.prototype.get_filedata = function() {
    return {collapsed: this._collapsed, user_opened: this.user_opened}
  }
  UIPanel.prototype.load_filedata = function(obj) {
    this.collapsed = obj.collapsed;
    this.user_opened = obj.user_opened;
  }
  UIPanel.prototype.add = function(child, packflag) {
    if (this._collapsed) {
        child.parent = this;
        child.packflag|=packflag|this.default_packflag;
        this.stored_children.push(child);
    }
    else {
      RowFrame.prototype.add.call(this, child);
    }
  }
  UIPanel.prototype.build_draw = function(canvas, isVertical) {
    this.title.color = uicolors["PanelText"];
    canvas.simple_box([0, 0], this.size, this.color);
    RowFrame.prototype.build_draw.call(this, canvas, isVertical);
  }
  _es6_module.add_class(UIPanel);
  UIPanel = _es6_module.add_export('UIPanel', UIPanel);
  var $ret_qo8H=undefined;
  function get_editor_list() {
    if ($ret_qo8H==undefined) {
        $ret_qo8H = new Array();
        var __iter_cls=__get_iter(defined_classes);
        var cls;
        while (1) {
          var __ival_cls=__iter_cls.next();
          if (__ival_cls.done) {
              break;
          }
          cls = __ival_cls.value;
          for (var i=0; i<cls.__parents__.length; i++) {
              if (cls.__parents__[i].name=="Area") {
                  $ret_qo8H.push(cls);
                  break;
              }
          }
        }
    }
    return $ret_qo8H;
  }
  function gen_editor_switcher(ctx, parent) {
    var editors=get_editor_list();
    var menu=new UIMenu("", undefined);
    var i=0;
    var __iter_e=__get_iter(editors);
    var e;
    while (1) {
      var __ival_e=__iter_e.next();
      if (__ival_e.done) {
          break;
      }
      e = __ival_e.value;
      if (!e.debug_only||!RELEASE)
        menu.add_item(e.uiname, "", e);
      i++;
    }
    var obj={}
    function callback(entry, cls) {
      console.log("editor switcher callback", cls.name);
      parent.parent.switch_editor(cls);
      obj.e.text = parent.constructor.uiname;
    }
    menu.callback = callback;
    var e=new UIMenuButton(ctx, menu, [0, 0], [1, 1], undefined, "Switch editors");
    obj.e = e;
    e.text = parent.constructor.uiname;
    return e;
  }
  gen_editor_switcher = _es6_module.add_export('gen_editor_switcher', gen_editor_switcher);
  var _hue_field=[[1, 0, 0, 1], [1, 1, 0, 1], [0, 1, 0, 1], [0, 1, 1, 1], [0, 0, 1, 1], [1, 0, 1, 1]];
  function UIColorField(ctx, callback) {
    if (callback==undefined) {
        callback = undefined;
    }
    UIElement.call(this, ctx);
    this.h = 0.0;
    this.s = 0.0;
    this.v = 1.0;
    this.huehgt = 25;
    this.mode = undefined;
    this.clicked = false;
    this.callback = callback;
  }
  /*test for IE bug*/;
  if (UIColorField.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIColorField.name = 'UIColorField';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIColorField = inherit_multiple(UIColorField, [UIElement], _es6_module, "UIColorField");
  UIColorField.prototype.get_min_size = function(canvas, isVertical) {
    return [150, 165];
  }
  var $pos_UIColorField_do_mouse=[0, 0];
  var $mpos_UIColorField_do_mouse=[0, 0];
  var $size_UIColorField_do_mouse=[0, 0];
  UIColorField.prototype.do_mouse = function(event) {
    $mpos_UIColorField_do_mouse[0] = event.x;
    $mpos_UIColorField_do_mouse[1] = event.y;
    if (this.mode=="h") {
        this.h = ($mpos_UIColorField_do_mouse[0]-7)/(this.size[0]-12-2);
        this.h = Math.min(Math.max(this.h, 0), 1.0);
        this.do_recalc();
        if (this.callback!=undefined) {
            this.callback(this, this.h, this.s, this.v);
        }
    }
    else 
      if (this.mode=="sv") {
        var v=$mpos_UIColorField_do_mouse[0]/this.size[0];
        v = Math.sqrt(v);
        var s=($mpos_UIColorField_do_mouse[1]-this.huehgt+2)/(this.size[1]-this.huehgt);
        this.v = Math.min(Math.max(v, 0), 1.0);
        this.s = Math.min(Math.max(s, 0), 1.0);
        this.do_recalc();
        if (this.callback!=undefined) {
            this.callback(this, this.h, this.s, this.v);
        }
    }
  }
  UIColorField.prototype.on_mousedown = function(event) {
    if (this.clicked==false) {
        this.clicked = true;
        this.mdown = true;
        this.push_modal();
        var pos=[1, 1];
        var size=[this.size[0]-2, this.huehgt];
        var mpos=[event.x, event.y];
        if (inrect_2d(mpos, pos, size)) {
            this.mode = "h";
        }
        else {
          this.mode = "sv";
        }
        this.do_mouse(event);
    }
  }
  UIColorField.prototype.on_mousemove = function(event) {
    if (this.clicked) {
        this.do_mouse(event);
    }
  }
  UIColorField.prototype.on_mouseup = function(event) {
    if (this.clicked) {
        this.clicked = false;
        this.pop_modal();
    }
  }
  var $sz_UIColorField_build_draw=[12, 12];
  var $v1_UIColorField_build_draw=new Vector2();
  var $v3_UIColorField_build_draw=new Vector2();
  var $clr_UIColorField_build_draw=[0, 0, 0, 1];
  var $pos1_UIColorField_build_draw=[0, 0];
  var $v2_UIColorField_build_draw=new Vector2();
  var $v4_UIColorField_build_draw=new Vector2();
  UIColorField.prototype.build_draw = function(canvas, isVertical) {
    
    canvas.simple_box([0, 0], this.size);
    var cs=_hue_field;
    var segs=cs.length;
    var wid=Math.ceil((this.size[0]-2-$sz_UIColorField_build_draw[0])/cs.length);
    var h=this.h, s=this.s, v=this.v;
    var halfx=Math.floor($sz_UIColorField_build_draw[0]*0.5);
    canvas.box([0, 0], [this.size[0], 26], [0, 0, 0, 1], 0, true);
    var y=this.huehgt;
    var c1, c2, c3, c4;
    canvas.box1([1, 1], [halfx, y], cs[0]);
    canvas.quad([1, 1], [1, y], [halfx+1, y], [halfx+1, 1], cs[0]);
    for (var i=0; i<segs; i++) {
        var i2=(i+1)%cs.length;
        var c1=cs[i], c2=cs[i2], c3=cs[i2], c4=cs[i];
        $v1_UIColorField_build_draw[0] = i*wid+1+halfx;
        $v1_UIColorField_build_draw[1] = 1;
        $v2_UIColorField_build_draw[0] = i*wid+1+halfx;
        $v2_UIColorField_build_draw[1] = y;
        $v3_UIColorField_build_draw[0] = i*wid+wid+1+halfx;
        $v3_UIColorField_build_draw[1] = y;
        $v4_UIColorField_build_draw[0] = i*wid+wid+1+halfx, $v4_UIColorField_build_draw[1] = 1;
        canvas.quad($v2_UIColorField_build_draw, $v3_UIColorField_build_draw, $v4_UIColorField_build_draw, $v1_UIColorField_build_draw, c1, c2, c3, c4, true);
    }
    canvas.quad($v4_UIColorField_build_draw, $v3_UIColorField_build_draw, [this.size[0]-1, y], [this.size[0]-1, 1], cs[0]);
    $v1_UIColorField_build_draw[0] = 0;
    $v1_UIColorField_build_draw[1] = y+2;
    $v2_UIColorField_build_draw[0] = 0;
    $v2_UIColorField_build_draw[1] = this.size[1];
    $v3_UIColorField_build_draw[0] = this.size[0];
    $v3_UIColorField_build_draw[1] = this.size[1];
    $v4_UIColorField_build_draw[0] = this.size[0];
    $v4_UIColorField_build_draw[1] = 27;
    var h1=Math.floor(h*cs.length)%cs.length;
    var h2=(h1+1)%cs.length;
    var t=h*cs.length-h1;
    if (isNaN(h1))
      h1 = 0;
    if (isNaN(h2))
      h2 = 0;
    if (isNaN(t))
      t = 0;
    if (t<0||t>1)
      t = 0;
    for (var i=0; i<3; i++) {
        $clr_UIColorField_build_draw[i] = cs[h1][i]+(cs[h2][i]-cs[h1][i])*t;
    }
    c1 = [0, 0, 0, 1];
    c2 = [0, 0, 0, 1];
    c3 = $clr_UIColorField_build_draw;
    c4 = [1, 1, 1, 1];
    canvas.colorfield([0, this.huehgt], [this.size[0], this.size[1]-this.huehgt], $clr_UIColorField_build_draw);
    $pos1_UIColorField_build_draw[0] = Math.floor(1+h*(this.size[0]-2-$sz_UIColorField_build_draw[0]));
    $pos1_UIColorField_build_draw[1] = Math.floor(y*0.5-$sz_UIColorField_build_draw[1]*0.5);
    canvas.box($pos1_UIColorField_build_draw, $sz_UIColorField_build_draw);
    $pos1_UIColorField_build_draw[0] = Math.floor((this.size[0]-$sz_UIColorField_build_draw[0])*v*v);
    $pos1_UIColorField_build_draw[1] = Math.floor((this.size[1]-y-4)*s+y+2-$sz_UIColorField_build_draw[1]*0.5);
    canvas.box($pos1_UIColorField_build_draw, $sz_UIColorField_build_draw);
  }
  _es6_module.add_class(UIColorField);
  UIColorField = _es6_module.add_export('UIColorField', UIColorField);
  function UIColorBox(ctx, color) {
    if (color==undefined) {
        color = undefined;
    }
    UIElement.call(this, ctx);
    if (color==undefined)
      this.color = [0, 0, 0, 1];
    else 
      this.color = [color[0], color[1], color[2], color[3]];
  }
  /*test for IE bug*/;
  if (UIColorBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIColorBox.name = 'UIColorBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIColorBox = inherit_multiple(UIColorBox, [UIElement], _es6_module, "UIColorBox");
  UIColorBox.prototype.get_min_size = function(canvas, isVertical) {
    return [40, 40];
  }
  var $white_UIColorBox_build_draw=[1.0, 1.0, 1.0, 1.0];
  var $grey_UIColorBox_build_draw=[0.3, 0.3, 0.3, 1.0];
  UIColorBox.prototype.build_draw = function(canvas, isVertical) {
    var tot=3;
    var wid=[this.size[0]/tot, this.size[1]/tot];
    var pos=[0, 0];
    for (var i=0; i<tot; i++) {
        pos[1] = 0;
        for (var j=0; j<tot; j++) {
            var k=(i+j)%2;
            canvas.box2(pos, wid, k ? $white_UIColorBox_build_draw : $grey_UIColorBox_build_draw);
            pos[1]+=wid[1];
        }
        pos[0]+=wid[0];
    }
    canvas.box2([0, 0], this.size, this.color);
  }
  _es6_module.add_class(UIColorBox);
  UIColorBox = _es6_module.add_export('UIColorBox', UIColorBox);
  function UIColorPicker(ctx, color) {
    if (color==undefined) {
        color = undefined;
    }
    RowFrame.call(this, ctx);
    this.last_valid_hue = 0;
    this.last_valid_sat = 0;
    if (color==undefined) {
        this._color = [1, 0, 0, 1];
    }
    else {
      this._color = [color[0], color[1], color[2], color[3]];
    }
    this.last_valid = [];
    for (var i=0; i<4; i++) {
        this.last_valid.push(this._color[i]);
    }
    var this2=this;
    function hsv_callback(field, h, s, v) {
      this2.hsv_callback(field, h, s, v);
    }
    this.setter_path = undefined;
    this.field = new UIColorField(ctx, hsv_callback);
    this.preview = new UIColorBox(ctx, this._color);
    var col=this.col();
    this.preview.packflag|=PackFlags.INHERIT_HEIGHT;
    col.add(this.field);
    col.add(this.preview, PackFlags.INHERIT_HEIGHT);
    var r=new UINumBox(ctx, "R", [0, 1]);
    var g=new UINumBox(ctx, "G", [0, 1]);
    var b=new UINumBox(ctx, "B", [0, 1]);
    var a=new UINumBox(ctx, "A", [0, 1]);
    r.slide_power = g.slide_power = b.slide_power = a.slide_power = 2.0;
    r.slide_mul = g.slide_mul = b.slide_mul = a.slide_mul = 4.0;
    var row=this.row(undefined, PackFlags.INHERIT_WIDTH, PackFlags.INHERIT_WIDTH);
    row.add(r);
    row.add(g);
    row.add(b);
    row.add(a);
    var this2=this;
    function slider_callback(axis) {
      function callback(slider, val) {
        this2._color[axis] = val;
        this2.update_widgets();
      }
      return callback;
    }
    r.callback = slider_callback(0);
    g.callback = slider_callback(1);
    b.callback = slider_callback(2);
    a.callback = slider_callback(3);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.update_widgets();
  }
  /*test for IE bug*/;
  if (UIColorPicker.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIColorPicker.name = 'UIColorPicker';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIColorPicker = inherit_multiple(UIColorPicker, [RowFrame], _es6_module, "UIColorPicker");
  Object.defineProperty(UIColorPicker.prototype, "color", {get: function() {
    return this._color;
  }, set: function(color) {
    var do_update=false;
    for (var i=0; i<4; i++) {
        if (color[i]!=undefined&&this._color[i]!=color[i]) {
            this._color[i] = color[i];
            do_update = true;
        }
    }
    if (do_update)
      this.update_widgets();
    this.do_path();
  }, configurable: true});
  UIColorPicker.prototype.on_tick = function() {
    if (this.state&UIFlags.USE_PATH) {
        var color=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        var same=true;
        for (var i=0; i<4; i++) {
            if (color[i]!=this._color[i]) {
                same = false;
            }
            this._color[i] = color[i];
        }
        if (!same&&this.modalhandler==undefined) {
            this.update_widgets();
        }
    }
  }
  UIColorPicker.prototype.do_path = function() {
    if (this.state&UIFlags.USE_PATH) {
        var clr=this.get_prop_data();
        if (clr==undefined)
          return ;
        for (var i=0; i<4; i++) {
            if (clr[i]!=this._color[i]) {
                this.set_prop_data(this._color);
                break;
            }
        }
    }
  }
  var $hsva_UIColorPicker_update_widgets=[0, 0, 0, 0];
  UIColorPicker.prototype.update_widgets = function() {
    var c=this._color, lasthue=undefined;
    for (var i=0; i<$hsva_UIColorPicker_update_widgets.length; i++) {
        if (isNaN($hsva_UIColorPicker_update_widgets[i]))
          $hsva_UIColorPicker_update_widgets[i] = 0.0;
    }
    for (var i=0; i<this._color.length; i++) {
        if (isNaN(this._color[i])) {
            this._color[i] = i==3 ? 1.0 : 0.0;
            this._color[i] = 0.0;
        }
    }
    for (var i=0; i<4; i++) {
        this.last_valid[i] = this._color[i];
    }
    this.last_valid_hue = rgba_to_hsva(this._color, $hsva_UIColorPicker_update_widgets, this.last_valid_hue);
    if ($hsva_UIColorPicker_update_widgets[1]<0) {
        $hsva_UIColorPicker_update_widgets[1] = this.last_valid_sat;
    }
    else {
      this.last_valid_sat = $hsva_UIColorPicker_update_widgets[1];
    }
    this.field.h = $hsva_UIColorPicker_update_widgets[0]*0.9999;
    this.field.s = $hsva_UIColorPicker_update_widgets[1];
    this.field.v = $hsva_UIColorPicker_update_widgets[2];
    this.field.do_recalc();
    this.preview.color = this._color;
    this.preview.do_recalc();
    this.r.set_val(this._color[0]);
    this.g.set_val(this._color[1]);
    this.b.set_val(this._color[2]);
    if (isNaN(this.color[2])) {
        console.log(this._color, $hsva_UIColorPicker_update_widgets);
    }
    this.a.set_val(this._color[3]);
    this.do_path();
  }
  var $hsva_UIColorPicker_hsv_callback=[0, 0, 0, 0];
  UIColorPicker.prototype.hsv_callback = function(field, h, s, v) {
    $hsva_UIColorPicker_hsv_callback[0] = h*0.9999;
    $hsva_UIColorPicker_hsv_callback[1] = s;
    $hsva_UIColorPicker_hsv_callback[2] = v;
    $hsva_UIColorPicker_hsv_callback[3] = this._color[3];
    this.last_valid_hue = h;
    this.last_valid_sat = s;
    this.last_valid_hue = hsva_to_rgba($hsva_UIColorPicker_hsv_callback, this._color, h*0.9999);
    this.update_widgets();
  }
  _es6_module.add_class(UIColorPicker);
  UIColorPicker = _es6_module.add_export('UIColorPicker', UIColorPicker);
  function UIBoxWColor(ctx, path) {
    ColumnFrame.call(this, ctx, path);
    try {
      this.prop("color");
      var row=this.prop("weights");
      row.packflag|=PackFlags.NO_AUTO_SPACING|PackFlags.ALIGN_BOTTOM;
      var i=1;
      var __iter_c=__get_iter(row.children);
      var c;
      while (1) {
        var __ival_c=__iter_c.next();
        if (__ival_c.done) {
            break;
        }
        c = __ival_c.value;
        if (__instance_of(c, UINumBox)) {
            c.slide_power = 2.0;
            c.slide_mul = 4.0;
            c.unit = undefined;
            c.text = ""+i;
            i++;
        }
      }
      row.children.reverse();
      row.pad[0] = 20;
    }
    catch (_err) {
        print_stack(_err);
        console.log("failed to create UIBoxWColor with weights");
        try {
          this.prop("color");
        }
        catch (_err) {
            console.log("failed to create UIBoxWColor without weights");
        }
    }
  }
  /*test for IE bug*/;
  if (UIBoxWColor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIBoxWColor.name = 'UIBoxWColor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIBoxWColor = inherit_multiple(UIBoxWColor, [ColumnFrame], _es6_module, "UIBoxWColor");
  _es6_module.add_class(UIBoxWColor);
  UIBoxWColor = _es6_module.add_export('UIBoxWColor', UIBoxWColor);
  function UIBoxColor() {
    RowFrame.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (UIBoxColor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIBoxColor.name = 'UIBoxColor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIBoxColor = inherit_multiple(UIBoxColor, [RowFrame], _es6_module, "UIBoxColor");
  _es6_module.add_class(UIBoxColor);
  UIBoxColor = _es6_module.add_export('UIBoxColor', UIBoxColor);
  function UIProgressBar(ctx, value, min, max, min_wid, min_hgt) {
    if (value==undefined) {
        value = 0.0;
    }
    if (min==undefined) {
        min = 0.0;
    }
    if (max==undefined) {
        max = 1.0;
    }
    if (min_wid==undefined) {
        min_wid = 200;
    }
    if (min_hgt==undefined) {
        min_hgt = 25;
    }
    UIElement.call(this, ctx);
    this.value = value;
    this.min = min;
    this.max = max;
    this.min_wid = min_wid;
    this.min_hgt = min_hgt;
    this.size[1] = min_hgt;
    this.size[0] = min_wid;
    this.last_value = this.value;
  }
  /*test for IE bug*/;
  if (UIProgressBar.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIProgressBar.name = 'UIProgressBar';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIProgressBar = inherit_multiple(UIProgressBar, [UIElement], _es6_module, "UIProgressBar");
  UIProgressBar.prototype.get_min_size = function(canvas, isVertical) {
    return [this.min_wid, this.min_hgt];
  }
  UIProgressBar.prototype.on_tick = function() {
    UIElement.prototype.on_tick.call(this);
    if (!(this.state&UIFlags.ENABLED))
      return ;
    if (this.last_value!=this.value) {
        this.do_recalc();
        this.last_value = this.value;
    }
  }
  UIProgressBar.prototype.set_value = function(value) {
    this.last_value = this.value;
    this.value = value;
  }
  var $zero_UIProgressBar_build_draw=[0, 0];
  var $size2_UIProgressBar_build_draw=[0, 0];
  var $one_UIProgressBar_build_draw=[1, 1];
  UIProgressBar.prototype.build_draw = function(canvas, isVertical) {
    canvas.begin(this);
    var perc=(this.value/(this.max-this.min));
    canvas.box($zero_UIProgressBar_build_draw, this.size, uicolors["ProgressBarBG"]);
    if (perc>0.0) {
        perc = Math.min(Math.max(0.0, perc), 1.0);
        $size2_UIProgressBar_build_draw[1] = this.size[1]-2;
        $size2_UIProgressBar_build_draw[0] = Math.floor(this.size[0]*perc)-2;
        canvas.box($one_UIProgressBar_build_draw, $size2_UIProgressBar_build_draw, uicolors["ProgressBar"]);
    }
    canvas.end(this);
  }
  _es6_module.add_class(UIProgressBar);
  UIProgressBar = _es6_module.add_export('UIProgressBar', UIProgressBar);
  function UIListEntry(ctx, text, id) {
    ColumnFrame.call(this, ctx);
    this.state&=~UIFlags.USE_PAN;
    this.packflag|=PackFlags.INHERIT_WIDTH;
    this.text = text;
    this.id = id;
    this.icon = -1;
    this.start_mpos = new Vector2();
    this.touchdown = false;
    this.text_edit_mode = false;
  }
  /*test for IE bug*/;
  if (UIListEntry.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIListEntry.name = 'UIListEntry';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIListEntry = inherit_multiple(UIListEntry, [ColumnFrame], _es6_module, "UIListEntry");
  UIListEntry.prototype.begin_text_edit = function() {
    if (this.text_edit_mode) {
        console.log("Warning, invalid call to begin_text_edit()!");
        return ;
    }
    var tbox=new UITextBox(this.ctx, this.text);
    this.add(tbox);
    tbox.begin_edit();
    var this2=this;
    tbox.on_end_edit = function(textbox, cancel) {
      this2.end_text_edit();
      if (this2.on_end_edit!=undefined) {
          this2.on_end_edit(textbox, cancel);
      }
    }
    this.text_edit_mode = true;
    this.textbox = tbox;
  }
  UIListEntry.prototype.end_text_edit = function() {
    if (!this.text_edit_mode) {
        console.log("Warning, invalid call to end_text_edit()!");
        return ;
    }
    this.text_edit_mode = false;
    if (this.textbox.editing) {
        this.textbox.end_edit();
    }
    this.text = this.textbox.text;
    this.remove(this.textbox);
    this.textbox = undefined;
  }
  UIListEntry.prototype.get_min_size = function(canvas, isvertical) {
    if (this.children.length>0) {
        return ColumnFrame.prototype.get_min_size.call(this, canvas, isvertical);
    }
    else {
      var pad=4;
      return [canvas.textsize(this.text)[0]+pad, 26];
    }
  }
  UIListEntry.prototype.on_mouseup = function(event) {
    ColumnFrame.prototype.on_mouseup.call(this, event);
  }
  UIListEntry.prototype.build_draw = function(canvas, isVertical) {
    this.state&=~UIFlags.USE_PAN;
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this==this.parent.parent.active_entry) {
        canvas.simple_box([0, 0], this.size);
        canvas.simple_box([0, 0], this.size);
    }
    else 
      if (this.state&UIFlags.HIGHLIGHT) {
        canvas.simple_box([0, 0], this.size, uicolors["MenuHighlight"]);
    }
    ColumnFrame.prototype.build_draw.call(this, canvas, isVertical);
    if (this.icon>=0) {
        canvas.icon(this.icon, [1, 1], undefined, true);
    }
    if (!this.text_edit_mode) {
        var tsize;
        if (this.text!=undefined)
          tsize = canvas.textsize(this.text);
        else 
          tsize = 50;
        canvas.text([22, (this.size[1]-tsize[1])*0.25], this.text, uicolors["ListBoxText"]);
    }
  }
  _es6_module.add_class(UIListEntry);
  UIListEntry = _es6_module.add_export('UIListEntry', UIListEntry);
  function UIListBox(ctx, pos, size, callback) {
    ColumnFrame.call(this, ctx);
    if (size!=undefined&&size[0]+size[1]!=0.0)
      this.size = size;
    else 
      this.size = [500, 350];
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    var pflag=PackFlags.IGNORE_LIMIT|PackFlags.NO_AUTO_SPACING;
    pflag|=PackFlags.INHERIT_WIDTH|PackFlags.ALIGN_LEFT;
    this.listbox = new RowFrame(ctx);
    this.listbox.packflag|=PackFlags.NO_AUTO_SPACING;
    this.listbox.pad[1] = 0;
    this.listbox.state|=UIFlags.HAS_PAN;
    this.add(this.listbox, pflag);
    this.active_entry = undefined;
    this.callback = callback;
    this.go_callback = undefined;
    this.mdown = false;
    this.vscroll = new UIVScroll(ctx, [0, 0]);
    this.vscroll.packflag|=PackFlags.INHERIT_HEIGHT;
    this.scrollx = 0;
    this.scrolly = 0;
    var this2=this;
    this.vscroll.callback = function(vscroll, value) {
      if (!this2.listbox.velpan.panning)
        this2._vscroll_callback(vscroll, value);
    }
    this.vscroll.step = 26;
    this.add(this.vscroll);
    this.packflag|=PackFlags.ALIGN_LEFT;
    this.state|=UIFlags.NO_FRAME_CACHE;
  }
  /*test for IE bug*/;
  if (UIListBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIListBox.name = 'UIListBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIListBox = inherit_multiple(UIListBox, [ColumnFrame], _es6_module, "UIListBox");
  UIListBox.prototype.on_tick = function() {
    prior(UIListBox, this).on_tick.call(this);
    this.vscroll.set_value(this.listbox.velpan.pan[1]);
    this.vscroll.do_recalc();
  }
  UIListBox.prototype.load_filedata = function(map) {
    ColumnFrame.prototype.load_filedata.call(this, map);
    if ("active_entry" in map) {
        var act=map["active_entry"];
        var i=0;
        var __iter_c=__get_iter(this.listbox.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          if (c.text==act) {
              this._set_active(c);
              break;
          }
        }
    }
  }
  UIListBox.prototype.get_filedata = function() {
    var ret=prior(UIListBox, this).get_filedata.call(this);
    if (ret==undefined)
      ret = {}
    if (this.active_entry!=undefined)
      ret["active_entry"] = this.active_entry.text;
    return ret;
  }
  var $pan_UIListBox__vscroll_callback=[0, 0];
  UIListBox.prototype._vscroll_callback = function(vscroll, value) {
    $pan_UIListBox__vscroll_callback[1] = value;
    this.listbox.velpan.set_pan($pan_UIListBox__vscroll_callback);
    this.listbox.do_full_recalc();
    this.do_full_recalc();
  }
  UIListBox.prototype.on_doubleclick = function(event) {
    console.log("LISTBOX double click!");
    if (event.button==0&&this.go_callback!=undefined) {
        this.go_callback(this, this.active_entry.text, this.active_entry.id);
    }
  }
  UIListBox.prototype.on_mousedown = function(event) {
    ColumnFrame.prototype.on_mousedown.call(this, event);
    this.mstart = new Vector2([event.x, event.y]);
    this.mdown = true;
    this.mtime = time_ms();
  }
  UIListBox.prototype.handle_clicked = function(event) {
  }
  UIListBox.prototype.on_mousemove = function(event) {
    ColumnFrame.prototype.on_mousemove.call(this, event);
    if (!this.listbox.velpan.panning&&this.mdown&&this.mstart.vectorDistance([event.x, event.y])>25) {
    }
  }
  UIListBox.prototype.on_mouseup = function(event) {
    ColumnFrame.prototype.on_mouseup.call(this, event);
    this.mdown = false;
    this.listbox.velpan.can_coast = true;
    console.log("  PANNING: ", this.listbox.velpan.panning);
    if (this.listbox.velpan.panning)
      return ;
    if (this.listbox.active!=undefined&&__instance_of(this.listbox.active, UIListEntry)) {
        this._set_active(this.listbox.active);
    }
  }
  UIListBox.prototype.jump = function(off, absolute) {
    if (absolute==undefined) {
        absolute = false;
    }
    var i;
    if (absolute) {
        i = off<0 ? this.listbox.children.length+off : off;
    }
    else {
      if (this.active_entry==undefined)
        return ;
      i = this.listbox.children.indexOf(this.active_entry)+off;
    }
    i = Math.min(Math.max(0, i), this.listbox.children.length-1);
    var active=this.listbox.children[i];
    if (active==undefined)
      return ;
    this._set_active(active);
    active.abspos[0] = 0;
    active.abspos[1] = 0;
    active.abs_transform(active.abspos);
    var y=active.abspos[1]-(this.abspos[1]+this.listbox.pos[1]);
    y+=this.listbox.velpan.pan[1];
    console.log("y", y, this.listbox.size[1]);
    if (y<0||y>this.listbox.size[1]) {
        var pan=[this.listbox.velpan.pan[0], this.listbox.velpan.pan[1]];
        if (y>this.listbox.size[1]) {
            pan[1] = -(active.pos[1]-this.size[1]+active.size[1]);
        }
        else {
          pan[1] = -active.pos[1];
        }
        this.vscroll.set_value(pan[1]);
        this.listbox.velpan.set_pan(pan);
        this.listbox.do_full_recalc();
        this.do_full_recalc();
        for (var j=0; j<this.listbox.children.length; j++) {
            this.listbox.children[j].abspos[0] = 0;
            this.listbox.children[j].abspos[1] = 0;
            this.listbox.children[j].abs_transform(this.listbox.children[j].abspos);
        }
    }
  }
  UIListBox.prototype.set_active = function(id) {
    var entry;
    for (var i=0; i<this.listbox.children.length; i++) {
        var entry2=this.listbox.children[i];
        if (entry2.id==id) {
            entry = entry2;
            break;
        }
    }
    this._set_active(entry);
  }
  UIListBox.prototype._set_active = function(entry, suppress_callback) {
    if (suppress_callback==undefined) {
        suppress_callback = false;
    }
    if (this.active_entry!=entry&&this.active_entry!=undefined) {
        this.active_entry.do_recalc();
    }
    this.active_entry = entry;
    this.do_full_recalc();
    if (entry!=undefined) {
        entry.do_recalc();
        if (this.callback!=undefined&&!suppress_callback) {
            this.callback(this, this.active_entry.text, this.active_entry.id);
        }
    }
  }
  UIListBox.prototype.on_keydown = function(event) {
    switch (event.keyCode) {
      case charmap["Enter"]:
        console.log("Enter go_callback");
        if (this.go_callback!=undefined) {
            this.go_callback(this, this.active_entry.text, this.active_entry.id);
        }
        break;
      case charmap["Up"]:
        this.jump(-1);
        this.do_full_recalc();
        break;
      case charmap["Down"]:
        this.jump(1);
        this.do_full_recalc();
        break;
    }
  }
  UIListBox.prototype.add_item = function(str, id) {
    var entry=new UIListEntry(this.ctx, str, id);
    entry.packflag|=PackFlags.ALIGN_LEFT|PackFlags.INHERIT_WIDTH;
    var this2=this;
    entry.callback = function(entry) {
      this2._set_active(entry);
    }
    this.listbox.add(entry, PackFlags.ALIGN_LEFT);
    this.do_recalc();
    var canvas=this.get_canvas();
    var hgt=canvas!=undefined ? entry.get_min_size(canvas) : 18;
    this.listbox.size[1]+=hgt;
    this.listbox.pan_bounds[1][1]+=hgt;
    this.vscroll.set_range([0, this.listbox.pan_bounds[1][1]]);
    if (canvas!=undefined)
      this.pack(this.get_canvas());
    return entry;
  }
  UIListBox.prototype.build_draw = function(canvas, isVertical) {
    canvas.push_scissor([0, 0], this.size);
    canvas.simple_box([0, 0], this.size, uicolors["ListBoxBG"]);
    ColumnFrame.prototype.build_draw.call(this, canvas, isVertical);
    canvas.pop_scissor();
  }
  UIListBox.prototype.reset = function() {
    this.listbox.children = new Array();
    this.listbox.velpan.pan[0] = this.listbox.velpan.pan[1] = 0.0;
    this.vscroll.set_value(0.0);
    this.do_recalc();
  }
  UIListBox.prototype.pack = function(canvas, is_vertical) {
    this.listbox.size[0] = this.size[0]-26;
    this.listbox.size[1] = this.size[1];
    this.listbox.packflag|=PackFlags.KEEP_SIZE;
    ColumnFrame.prototype.pack.call(this, canvas, is_vertical);
    this.listbox.pan_bounds[0][0] = 0;
    this.listbox.pan_bounds[0][1] = 0;
    this.vscroll.pos[1] = 0;
    this.vscroll.size[1] = this.size[1];
    this.vscroll.set_range([0, this.listbox.pan_bounds[1][1]]);
  }
  UIListBox.prototype.get_min_size = function(canvas, isVertical) {
    if (this.size!=undefined&&this.size[0]+this.size[1]!=0.0) {
        return this.size;
    }
    else {
      return CACHEARR2(500, 300);
    }
  }
  _es6_module.add_class(UIListBox);
  UIListBox = _es6_module.add_export('UIListBox', UIListBox);
  window.UIColorPicker = UIColorPicker;
});
es6_module_define('toolsystem', ["events"], function _toolsystem_module(_es6_module) {
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var ToolFlags={SELECT: 1, USE_DEFAULT_INPUT: 2}
  ToolFlags = _es6_module.add_export('ToolFlags', ToolFlags);
  var UndoFlags={IGNORE_UNDO: 1}
  UndoFlags = _es6_module.add_export('UndoFlags', UndoFlags);
  var defined_tools=[];
  defined_tools = _es6_module.add_export('defined_tools', defined_tools);
  function register(toolop) {
    defined_tools.push(toolop);
  }
  register = _es6_module.add_export('register', register);
  function ToolOp(ctx) {
    EventHandler.call(this);
    var info=this.constructor.info();
    this.inputs = {}
    this.outputs = {}
    var __iter_k=__get_iter(info.inputs);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.inputs[k] = info.inputs[k].copy();
    }
    var __iter_k=__get_iter(info.outputs);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.outputs[k] = info.outputs[k].copy();
    }
    this.apiname = info.apiname;
    this.uiname = info.uiname;
    this.flag = info.flag;
    this.undoflag = info.undoflag;
    this.is_modal = info.is_modal;
    this.description = info.description;
    this.icon = info.icon;
  }
  /*test for IE bug*/;
  if (ToolOp.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ToolOp.name = 'ToolOp';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ToolOp = inherit_multiple(ToolOp, [EventHandler], _es6_module, "ToolOp");
  define_static(ToolOp, "info", function() {
    return {apiname: "(error)", uiname: "(untitled)", flag: 0, undoflag: 0, is_modal: false, inputs: {}, outputs: {}, description: "", icon: -1}
  });
  define_static(ToolOp, "default_inputs", function(ctx, toolop) {
  });
  ToolOp.prototype.poll = function(ctx) {
  }
  ToolOp.prototype.exec = function(ctx) {
  }
  ToolOp.prototype.undo_pre = function(ctx) {
    this._undo = G.create_undo_file();
  }
  ToolOp.prototype.undo = function(ctx) {
    G.load_undo_file(this._undo);
  }
  ToolOp.prototype.modal_pre = function(ctx) {
  }
  ToolOp.prototype.modal_post = function(ctx) {
  }
  ToolOp.prototype.start_modal = function(ctx) {
  }
  ToolOp.prototype.end_modal = function(ctx) {
  }
  ToolOp.prototype.on_mousedown = function(e) {
  }
  ToolOp.prototype.on_mousemove = function(e) {
  }
  ToolOp.prototype.on_mouseup = function(e) {
  }
  ToolOp.prototype.on_keydown = function(e) {
  }
  ToolOp.prototype.on_keyup = function(e) {
  }
  ToolOp.prototype.on_mousewheel = function(e) {
  }
  _es6_module.add_class(ToolOp);
  ToolOp = _es6_module.add_export('ToolOp', ToolOp);
});
es6_module_define('view3d', ["UIPack", "util", "sdna", "events"], function _view3d_module(_es6_module) {
  var sdna=es6_import(_es6_module, 'sdna');
  var util=es6_import(_es6_module, 'util');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
});
es6_module_define('region', ["events", "sdna", "util"], function _region_module(_es6_module) {
  var sdna=es6_import(_es6_module, 'sdna');
  var util=es6_import(_es6_module, 'util');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
});
es6_module_define('screen', ["util", "UICanvas2D", "events", "UIFrame", "sdna"], function _screen_module(_es6_module) {
  "use strict";
  var sdna=es6_import(_es6_module, 'sdna');
  var util=es6_import(_es6_module, 'util');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var UICanvas=es6_import_item(_es6_module, 'UICanvas2D', 'UICanvas');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var ceil=Math.ceil;
  var pxround=function(f) {
    return ~~(f+0.5);
  }
  function Screen() {
    sdna.bases.Screen.call(this);
    EventHandler.call(this);
    this.is_active = false;
  }
  /*test for IE bug*/;
  if (Screen.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Screen.name = 'Screen';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Screen = inherit_multiple(Screen, [sdna.bases.Screen], _es6_module, "Screen");
  Screen.prototype.create = function() {
    console.log("activating!");
    this.is_active = true;
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      area.create();
    }
  }
  Screen.prototype.destroy = function() {
    console.log("inactivating");
    this.is_active = false;
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      area.destroy();
    }
  }
  Screen.prototype.on_mousedown = function(e) {
    if (this.active_area==undefined)
      return ;
    var r=this.active_area.totrct;
    e.x-=r.xmin;
    e.y-=r.ymin;
    var ret=this.active_area.on_mousedown(e);
    e.x+=r.xmin;
    e.y+=r.ymin;
    return ret;
  }
  Screen.prototype.on_tick = function(e) {
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      area.on_tick();
    }
  }
  Screen.prototype.on_mouseup = function(e) {
    if (this.active_area==undefined)
      return ;
    var r=this.active_area.totrct;
    e.x-=r.xmin;
    e.y-=r.ymin;
    var ret=this.active_area.on_mouseup(e);
    e.x+=r.xmin;
    e.y+=r.ymin;
    return ret;
  }
  Screen.prototype.on_mousemove = function(e) {
    var x=e.x, y=e.y;
    var ret;
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      var r=area.totrct;
      if (x>=r.xmin&&x<=r.xmax&&y>=r.ymin&&y<=r.ymax) {
          if (this.active_area!=area) {
              if (this.active_area!=undefined) {
                  this.active_area.on_inactive();
              }
              this.active_area = area;
              area.on_active();
          }
          e.x-=r.xmin;
          e.y-=r.ymin;
          var ret=area.on_mousemove(e);
          e.x+=r.xmin;
          e.y+=r.ymin;
          break;
      }
    }
    return ret;
  }
  Screen.prototype.draw_borders = function(g) {
    g.lineWidth = 2;
    g.strokeStyle = "green";
    g.beginPath();
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      g.beginPath();
      g.moveTo(area.v1.vec.x, area.v1.vec.y);
      g.lineTo(area.v2.vec.x, area.v2.vec.y);
      g.lineTo(area.v3.vec.x, area.v3.vec.y);
      g.lineTo(area.v4.vec.x, area.v4.vec.y);
      g.lineTo(area.v1.vec.x, area.v1.vec.y);
      g.stroke();
    }
    g.strokeStyle = "red";
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      var r=area.totrct;
      g.beginPath();
      g.rect(r.xmin, r.ymin, r.xmax-r.xmin, r.ymax-r.ymin);
      g.stroke();
    }
    g.strokeStyle = "yellow";
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      var __iter_region=__get_iter(area.regionbase);
      var region;
      while (1) {
        var __ival_region=__iter_region.next();
        if (__ival_region.done) {
            break;
        }
        region = __ival_region.value;
        if (!region.do_draw) {
            continue;
        }
        var r=region.winrct;
        g.beginPath();
        g.rect(r.xmin, r.ymin, r.xmax-r.xmin, r.ymax-r.ymin);
        g.stroke();
      }
    }
    g.strokeStyle = "black";
    var __iter_e=__get_iter(this.edgebase);
    var e;
    while (1) {
      var __ival_e=__iter_e.next();
      if (__ival_e.done) {
          break;
      }
      e = __ival_e.value;
      var v1=e.v1, v2=e.v2;
      g.beginPath();
      g.moveTo(v1.vec.x, v1.vec.y);
      g.lineTo(v2.vec.x, v2.vec.y);
      g.stroke();
    }
  }
  Screen.prototype.do_resize = function(fac) {
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      var winx=pxround(area.winx*fac[0]);
      var winy=pxround(area.winy*fac[1]);
      area.on_resize({width: winx, height: winy});
      area.winx = winx;
      area.winy = winy;
      area.totrct.xmin = pxround(area.totrct.xmin*fac[0]);
      area.totrct.xmax = pxround(area.totrct.xmax*fac[0]);
      area.totrct.ymin = pxround(area.totrct.ymin*fac[1]);
      area.totrct.ymax = pxround(area.totrct.ymax*fac[1]);
      var __iter_region=__get_iter(area.regionbase);
      var region;
      while (1) {
        var __ival_region=__iter_region.next();
        if (__ival_region.done) {
            break;
        }
        region = __ival_region.value;
        region.winx = pxround(region.winx*fac[0]);
        region.winy = pxround(region.winy*fac[1]);
        region.sizex = pxround(region.sizex*fac[0]);
        region.sizey = pxround(region.sizey*fac[1]);
        region.winrct.xmin = pxround(region.winrct.xmin*fac[0]);
        region.winrct.xmax = pxround(region.winrct.xmax*fac[0]);
        region.winrct.ymin = pxround(region.winrct.ymin*fac[1]);
        region.winrct.ymax = pxround(region.winrct.ymax*fac[1]);
        region.drawrct.xmin = pxround(region.drawrct.xmin*fac[0]);
        region.drawrct.xmax = pxround(region.drawrct.xmax*fac[0]);
        region.drawrct.ymin = pxround(region.drawrct.ymin*fac[1]);
        region.drawrct.ymax = pxround(region.drawrct.ymax*fac[1]);
        region.v2d.winx = region.winx;
        region.v2d.winy = region.winy;
      }
    }
    var __iter_vert=__get_iter(this.vertbase);
    var vert;
    while (1) {
      var __ival_vert=__iter_vert.next();
      if (__ival_vert.done) {
          break;
      }
      vert = __ival_vert.value;
      vert.vec.x = pxround(vert.vec.x*fac[0]);
      vert.vec.y = pxround(vert.vec.y*fac[1]);
    }
  }
  Screen.prototype.draw_gl = function(gl) {
  }
  Screen.prototype.draw_ui = function(g) {
    var __iter_area=__get_iter(this.areabase);
    var area;
    while (1) {
      var __ival_area=__iter_area.next();
      if (__ival_area.done) {
          break;
      }
      area = __ival_area.value;
      g.save();
      g.translate(area.totrct.xmin, area.totrct.ymin);
      area.draw_ui(g);
      g.restore();
    }
  }
  _es6_module.add_class(Screen);
  Screen = _es6_module.add_export('Screen', Screen);
  sdna.types.register(Screen);
  util.mixin(Screen, EventHandler);
});
es6_module_define('screenarea', ["UIWidgets", "util", "context", "sdna", "events", "UICanvas2D", "UIFrame", "UIPack"], function _screenarea_module(_es6_module) {
  var sdna=es6_import(_es6_module, 'sdna');
  var util=es6_import(_es6_module, 'util');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UICanvas=es6_import_item(_es6_module, 'UICanvas2D', 'UICanvas');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIContext=es6_import_item(_es6_module, 'context', 'UIContext');
  function SpaceDataMixin() {
  }
  /*test for IE bug*/;
  if (SpaceDataMixin.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SpaceDataMixin.name = 'SpaceDataMixin';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SpaceDataMixin = create_prototype(SpaceDataMixin, _es6_module, "SpaceDataMixin");
  _es6_module.add_class(SpaceDataMixin);
  SpaceDataMixin = _es6_module.add_export('SpaceDataMixin', SpaceDataMixin);
  function ScrArea() {
    sdna.bases.ScrArea.call(this);
    EventHandler.call(this);
    this.frame = undefined;
  }
  /*test for IE bug*/;
  if (ScrArea.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ScrArea.name = 'ScrArea';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ScrArea = inherit_multiple(ScrArea, [sdna.bases.ScrArea], _es6_module, "ScrArea");
  ScrArea.prototype.on_tick = function() {
    if (this.frame!=undefined) {
        this.frame.on_tick();
    }
  }
  ScrArea.prototype.on_mousedown = function(e) {
    console.log("area mousedown!", e.x, e.y);
    if (this.frame!=undefined)
      this.frame.on_mousedown(e);
  }
  ScrArea.prototype.on_mousemove = function(e) {
    if (this.frame!=undefined)
      this.frame.on_mousemove(e);
  }
  ScrArea.prototype.on_mouseup = function(e) {
    console.log("area mouseup!", e.x, e.y);
    if (this.frame!=undefined)
      this.frame.on_mouseup(e);
  }
  ScrArea.prototype.on_resize = function(e) {
    if (this.frame==undefined)
      return ;
    var oldsize=[this.winx, this.winy];
    var newsize=[e.width, e.height];
    this.frame.on_resize(newsize, oldsize);
  }
  ScrArea.prototype.create = function() {
    this.frame = new UIFrame(new UIContext());
    this.frame.pos[0] = 0;
    this.frame.pos[1] = 0;
    this.frame.size[0] = this.winx;
    this.frame.size[1] = this.winy;
    this.frame.canvas = new UICanvas([[0, 0], [window.innerWidth, window.innerHeight]]);
    var row=new ColumnFrame();
    row.add(new UIButton(new UIContext(), "test!"));
    row.add(new UIButton(new UIContext(), "test2!"));
    row.add(new UIButton(new UIContext(), "test3!"));
    row.add(new UIButton(new UIContext(), "test4!"));
    row.do_full_recalc();
    row.size[0] = this.winx;
    row.size[1] = 50;
    row.draw_background = true;
    this.frame.add(row);
    row.pack(this.frame.canvas);
  }
  ScrArea.prototype.destroy = function() {
  }
  ScrArea.prototype.on_active = function() {
  }
  ScrArea.prototype.on_inactive = function() {
  }
  ScrArea.prototype.draw_ui = function(g) {
    this.frame.canvas.root_start();
    this.frame.canvas.push_transform();
    this.frame.canvas.translate(this.totrct.xmin, this.totrct.ymin);
    this.frame.build_draw(this.canvas, false);
    this.frame.canvas.pop_transform();
    this.frame.canvas.root_end();
    g.beginPath();
    g.rect(0, 0, 20, 20);
    g.fill();
  }
  _es6_module.add_class(ScrArea);
  ScrArea = _es6_module.add_export('ScrArea', ScrArea);
  sdna.types.register(ScrArea);
  util.mixin(ScrArea, EventHandler);
});
es6_module_define('window', ["util", "events", "sdna"], function _window_module(_es6_module) {
  "use strict";
  var sdna=es6_import(_es6_module, 'sdna');
  var util=es6_import(_es6_module, 'util');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  function wmWindow() {
    sdna.bases.wmWindow.call(this);
    EventHandler.call(this);
  }
  /*test for IE bug*/;
  if (wmWindow.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        wmWindow.name = 'wmWindow';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  wmWindow = inherit_multiple(wmWindow, [sdna.bases.wmWindow], _es6_module, "wmWindow");
  wmWindow.prototype.on_mousemove = function(e) {
  }
  wmWindow.prototype.addHandlers = function(event_manager) {
    event_manager.addEventListener(this);
    event_manager.addEventListener(this.screen);
    this.screen.setEventParent(this);
    this.screen.addHandlers(event_manager);
  }
  wmWindow.prototype.on_resize = function(e) {
    var oldsize=[this.sizex, this.sizey];
    if (this.sizex==0||this.sizey==0) {
        return ;
    }
    if (e.width==0||e.height==0||isNaN(e.width)||isNaN(e.height)) {
        return ;
    }
    var fac=[e.width/this.sizex, e.height/this.sizey];
    if (isNaN(fac[0])||isNaN(fac[1])||fac[0]==0.0||fac[1]==0.0) {
        console.trace("error resizing!", fac, e.width, e.height, this);
    }
    this.screen.do_resize(fac);
    this.sizex = e.width;
    this.sizey = e.height;
    redraw_ui();
  }
  wmWindow.prototype.draw_gl = function(gl) {
    this.screen.draw_ui(gl);
  }
  wmWindow.prototype.draw_ui = function(g) {
    if (!this.screen.is_active) {
        this.screen.create();
    }
    this.screen.draw_borders(g);
    this.screen.draw_ui(g);
  }
  _es6_module.add_class(wmWindow);
  wmWindow = _es6_module.add_export('wmWindow', wmWindow);
  sdna.types.register(wmWindow);
  util.mixin(wmWindow, EventHandler);
});
es6_module_define('animdata', ["eventdag", "library", "rna_properties"], function _animdata_module(_es6_module) {
  "use strict";
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var DataPathNode=es6_import_item(_es6_module, 'eventdag', 'DataPathNode');
  var AnimKeyFlags={SELECT: 1}
  AnimKeyFlags = _es6_module.add_export('AnimKeyFlags', AnimKeyFlags);
  var AnimInterpModes={STEP: 1, CATMULL: 2, LINEAR: 4}
  AnimInterpModes = _es6_module.add_export('AnimInterpModes', AnimInterpModes);
  var IntProperty=es6_import_item(_es6_module, 'rna_properties', 'IntProperty');
  var FloatProperty=es6_import_item(_es6_module, 'rna_properties', 'FloatProperty');
  var DataTypes=es6_import_item(_es6_module, 'library', 'DataTypes');
  var DataNames=es6_import_item(_es6_module, 'library', 'DataNames');
  function AnimKey() {
    this.id = -1;
    this.flag = 0;
    this.time = 1.0;
    this.mode = AnimInterpModes.STEP;
    this.data = undefined;
    this.channel = undefined;
  }
  /*test for IE bug*/;
  if (AnimKey.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        AnimKey.name = 'AnimKey';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  AnimKey = inherit_multiple(AnimKey, [DataPathNode], _es6_module, "AnimKey");
  AnimKey.prototype.dag_get_datapath = function(ctx) {
    var owner=this.channel.owner;
    var path;
    if (owner.lib_id<=-1) {
        path = owner.dag_get_datapath();
    }
    else {
      var name=DataNames[owner.lib_type].toLowerCase();
      path = "datalib."+name+".items["+owner.lib_id+"]";
    }
    path+=".animkeys["+this.id+"]";
    return path;
  }
  AnimKey.prototype.set_time = function(time) {
    this.time = time;
    this.channel.resort = true;
  }
  define_static(AnimKey, "fromSTRUCT", function(reader) {
    var ret=new AnimKey();
    reader(ret);
    return ret;
  });
  _es6_module.add_class(AnimKey);
  AnimKey = _es6_module.add_export('AnimKey', AnimKey);
  define_static(AnimKey, "dag_inputs", {});
  define_static(AnimKey, "dag_outputs", {"depend": undefined, "id": 0.0});
  function AnimChannel(proptype, name, path) {
    this.keys = [];
    this.resort = false;
    this.proptype = proptype;
    this.name = name==undefined ? "unnamed" : name;
    this.path = path;
    this.owner = undefined;
    this.idgen = undefined;
    this.idmap = undefined;
  }
  /*test for IE bug*/;
  if (AnimChannel.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        AnimChannel.name = 'AnimChannel';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  AnimChannel = create_prototype(AnimChannel, _es6_module, "AnimChannel");
  AnimChannel.prototype.remove = function(key) {
    delete this.idmap[key.id];
    this.keys.remove(key);
    this.resort = true;
  }
  AnimChannel.prototype._do_resort = function() {
    this.keys.sort(function(a, b) {
      return a.time-b.time;
    });
    this.resort = false;
  }
  AnimChannel.prototype.get_propcls = function() {
    if (this.propcls==undefined) {
        switch (this.proptype) {
          case PropTypes.INT:
            this.propcls = IntProperty;
            break;
          case PropTypes.FLOAT:
            this.propcls = FloatProperty;
            break;
        }
    }
    return this.propcls;
  }
  AnimChannel.prototype.update = function(time, val) {
    if (this.resort) {
        this._do_resort();
    }
    for (var i=0; i<this.keys.length; i++) {
        if (this.keys[i].time==time) {
            this.keys[i].data.set_data(val);
            return ;
        }
    }
    var propcls=this.get_propcls();
    var key=new AnimKey();
    key.id = this.idgen.gen_id();
    this.idmap[key.id] = key;
    key.channel = this;
    key.data = new propcls();
    key.data.set_data(val);
    key.time = time;
    this.keys.push(key);
    this._do_resort();
  }
  AnimChannel.prototype.eval = function(time) {
    if (this.resort) {
        this._do_resort();
    }
    for (var i=0; i<this.keys.length; i++) {
        var k=this.keys[i];
        if (k.time>time) {
            break;
        }
    }
    var prev=i==0 ? this.keys[i] : this.keys[i-1];
    var key=i==this.keys.length ? this.keys[this.keys.length-1] : this.keys[i];
    var t;
    if (prev.time!=key.time) {
        t = (time-prev.time)/(key.time-prev.time);
    }
    else {
      t = 1.0;
    }
    var a=prev.data.data, b=key.data.data;
    var ret;
    if (key.mode==AnimInterpModes.STEP)
      ret = a;
    else 
      ret = a+(b-a)*t;
    if (this.proptype==PropTypes.INT)
      ret = Math.floor(ret+0.5);
    return ret;
  }
  define_static(AnimChannel, "fromSTRUCT", function(reader) {
    var ret=new AnimChannel();
    reader(ret);
    for (var i=0; i<ret.keys.length; i++) {
        ret.keys[i].channel = ret;
    }
    return ret;
  });
  _es6_module.add_class(AnimChannel);
  AnimChannel = _es6_module.add_export('AnimChannel', AnimChannel);
});
es6_module_define('appstate', ["canvas2d_matrix", "mesh", "raster", "toolstack", "window", "fileapi", "vectormath", "events", "net", "rna_api", "data_api", "library"], function _appstate_module(_es6_module) {
  es6_import(_es6_module, 'window');
  var ToolStack=es6_import_item(_es6_module, 'toolstack', 'ToolStack');
  var RNA_Api=es6_import_item(_es6_module, 'rna_api', 'RNA_Api');
  es6_import(_es6_module, 'mesh');
  var fetch_file=es6_import_item(_es6_module, 'net', 'fetch_file');
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var EventManager=es6_import_item(_es6_module, 'events', 'EventManager');
  var RasterState=es6_import_item(_es6_module, 'raster', 'RasterState');
  var patch_canvas2d_tranform=es6_import_item(_es6_module, 'canvas2d_matrix', 'patch_canvas2d_tranform');
  var DataAPI=es6_import_item(_es6_module, 'data_api', 'DataAPI');
  var FileData=es6_import_item(_es6_module, 'fileapi', 'FileData');
  var load_file=es6_import_item(_es6_module, 'fileapi', 'load_file');
  var Main=es6_import_item(_es6_module, 'library', 'Main');
  var context2d, context3d;
  function AppState() {
    this.toolstack = new ToolStack();
    this.api = new RNA_Api();
    this.was_touch = false;
    this.filepath = undefined;
    this.main = new Main();
    this.curscene = undefined;
    this.api = new DataAPI();
    this.size = new Vector2();
    this.window = undefined;
    this.screen = undefined;
    this.raster = undefined;
    this.event_manager = new EventManager();
  }
  /*test for IE bug*/;
  if (AppState.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        AppState.name = 'AppState';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  AppState = create_prototype(AppState, _es6_module, "AppState");
  AppState.prototype.create_undo_file = function() {
  }
  AppState.prototype.load_undo_file = function(data) {
  }
  AppState.prototype.create_user_file = function() {
  }
  AppState.prototype.destroy = function() {
  }
  AppState.prototype.load_user_file = function(data) {
    var fdata=new FileData(data);
    var ret=load_file(fdata);
    this.destroy();
    var main=this.main = new Main();
    var fileglobal=undefined;
    for (var i=0; i<fdata.libblocks.length; i++) {
        var block=fdata.libblocks[i];
        if (block.id==undefined) {
            if (block._bl_sdna.name=="FileGlobal") {
                fileglobal = block;
                continue;
            }
            main.garbage.push(block);
            continue;
        }
        var type=block.id.name;
        if (type.length==0) {
            main.garbage.push(block);
            continue;
        }
        type = (type[0]+type[1]).toUpperCase();
        main.get(type).add(block);
    }
    main.fileglobal = fileglobal;
    this.curscene = main.fileglobal.curscene;
    window.last_fd = fdata;
    this.init_events();
    redraw_ui();
    redraw_viewports();
  }
  AppState.prototype.init_events = function() {
    this.event_manager.clearStack();
    var win=this.main.windows.get(0).winactive;
    console.log("add event listener", win);
    this.window = win;
    this.screen = win.screen;
    win.addHandlers(this.event_manager);
    win.on_resize({type: "resize", width: this.size[0], height: this.size[1]});
  }
  AppState.prototype.load_default_file = function() {
  }
  AppState.prototype.draw_ui = function() {
    if (this.window!=undefined) {
        this.window.draw_ui(this.g);
    }
    var g=this.g;
  }
  AppState.prototype.startup = function() {
    this.raster = new RasterState();
    var canvas2d=document.getElementById("canvas2d");
    var g=this.g = context2d = canvas2d.getContext("2d");
    patch_canvas2d_tranform(g);
    window._canvas2d_ctx = g;
    g.save();
    var this2=this;
    var timer=window.setInterval(function() {
      if (window._startup_blend!=undefined) {
          window.clearInterval(timer);
          this2.load_user_file(window._startup_blend);
      }
    }, 50);
    this.event_manager = new EventManager();
    this.event_manager.bindDOM(window);
    checksize();
    redraw_ui();
  }
  _es6_module.add_class(AppState);
  AppState = _es6_module.add_export('AppState', AppState);
  
  var G=new AppState();
  G = _es6_module.add_export('G', G);
  window.G = G;
  var canvas2d=document.getElementById("canvas2d");
  var canvas3d=document.getElementById("canvas3d");
  var checksize=function() {
    var winwidth=window.innerWidth;
    var winheight=window.innerHeight;
    if (G.size[0]!=winwidth||G.size[1]!=winheight) {
        var oldsize=[G.size[0], G.size[1]];
        G.size[0] = winwidth, G.size[1] = winheight;
        canvas2d.width = G.size[0];
        canvas2d.height = G.size[1];
        canvas3d.width = G.size[0];
        canvas3d.height = G.size[1];
        var g=context2d;
        if (g._matrix_stack.length>0) {
            g.restore();
        }
        else {
          console.log("Eek!");
        }
        g._matrix.makeIdentity();
        g.save();
        g.translate(0.0, G.size[1]);
        g.scale(1.0, -1.0);
        G.event_manager.fireEvent({type: "resize", oldWidth: oldsize[0], oldHeight: oldsize[1], width: oldsize[0], height: oldsize[1]});
    }
  }
  checksize = _es6_module.add_export('checksize', checksize);
  window.setInterval(checksize, 10);
  window.redraw_viewports = function() {
  }
  var _ui_animreq=undefined;
  window.redraw_ui = function() {
    if (_ui_animreq!=undefined)
      return ;
    _ui_animreq = requestAnimationFrame(function() {
      _ui_animreq = undefined;
      G.draw_ui();
    });
  }
});
es6_module_define('context', [], function _context_module(_es6_module) {
  function ContextBase() {
  }
  /*test for IE bug*/;
  if (ContextBase.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ContextBase.name = 'ContextBase';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ContextBase = create_prototype(ContextBase, _es6_module, "ContextBase");
  Object.defineProperty(ContextBase.prototype, "meshes", {get: function() {
    return G.main.meshes;
  }, configurable: true});
  Object.defineProperty(ContextBase.prototype, "scene", {get: function() {
    return G.curscene;
  }, configurable: true});
  Object.defineProperty(ContextBase.prototype, "window", {get: function() {
    return G.window;
  }, configurable: true});
  Object.defineProperty(ContextBase.prototype, "screen", {get: function() {
    return G.screen;
  }, configurable: true});
  Object.defineProperty(ContextBase.prototype, "objects", {get: function() {
    return G.main.objects;
  }, configurable: true});
  Object.defineProperty(ContextBase.prototype, "active_object", {get: function() {
  }, configurable: true});
  _es6_module.add_class(ContextBase);
  ContextBase = _es6_module.add_export('ContextBase', ContextBase);
  function ToolContext() {
    ContextBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (ToolContext.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ToolContext.name = 'ToolContext';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ToolContext = inherit_multiple(ToolContext, [ContextBase], _es6_module, "ToolContext");
  _es6_module.add_class(ToolContext);
  ToolContext = _es6_module.add_export('ToolContext', ToolContext);
  function UIContext() {
    ToolContext.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (UIContext.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIContext.name = 'UIContext';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIContext = inherit_multiple(UIContext, [ToolContext], _es6_module, "UIContext");
  _es6_module.add_class(UIContext);
  UIContext = _es6_module.add_export('UIContext', UIContext);
  function ModalContext() {
    ContextBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (ModalContext.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ModalContext.name = 'ModalContext';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ModalContext = inherit_multiple(ModalContext, [ContextBase], _es6_module, "ModalContext");
  _es6_module.add_class(ModalContext);
  ModalContext = _es6_module.add_export('ModalContext', ModalContext);
  function SavedContext() {
    ContextBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (SavedContext.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SavedContext.name = 'SavedContext';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SavedContext = inherit_multiple(SavedContext, [ContextBase], _es6_module, "SavedContext");
  _es6_module.add_class(SavedContext);
  SavedContext = _es6_module.add_export('SavedContext', SavedContext);
});
es6_module_define('fileapi', ["polyfill", "sdna", "util"], function _fileapi_module(_es6_module) {
  "use strict";
  es6_import(_es6_module, 'polyfill');
  var hashtable=es6_import_item(_es6_module, 'util', 'hashtable');
  var util=es6_import(_es6_module, 'util');
  var SDNAParser=es6_import_item(_es6_module, 'sdna', 'SDNAParser');
  var ENDIAN_LITTLE=es6_import_item(_es6_module, 'sdna', 'ENDIAN_LITTLE');
  var ENDIAN_BIG=es6_import_item(_es6_module, 'sdna', 'ENDIAN_BIG');
  var sdna_mod=es6_import(_es6_module, 'sdna');
  if (DataView.prototype.getUint64Array==undefined) {
      DataView.prototype.getUint64 = function(i, endian) {
        var b1=this.getUint32(i, endian);
        var b2=this.getUint32(i+4, endian);
        if (endian)
          return b1+b2*Math.pow(2.0, 32);
        else 
          return b2+b1*Math.pow(2.0, 32);
      };
      DataView.prototype.getInt64 = function(i, endian) {
        var b1=this.getUint32(i, endian);
        var b2=this.getUint32(i+4, endian);
        if (!endian) {
            var t=b1;
            b1 = b2;
            b2 = t;
        }
        if (b2&((1<<32)-1)) {
            b1 = ~b1;
            b2 = ~b2;
            return -(b1+b2*Math.pow(2.0, 32));
        }
        return b1+b2*Math.pow(2.0, 32);
      };
  }
  var cachering=es6_import_item(_es6_module, 'util', 'cachering');
  var SEEK_SET=0;
  var SEEK_CUR=1;
  function FileData(buf) {
    this.main = {}
    this.buf = buf;
    this.i = 0;
    this.version = undefined;
    this.view = new DataView(buf);
    this.uview = new Uint8Array(buf);
    this.libblocks = undefined;
    this.directdata = undefined;
    this.oldmap = undefined;
    this.link_doneset = new util.set();
    this.endian = 1;
    this.ptrsize = 4;
    this.sdna = undefined;
    this.host_typemanager = sdna_mod.types;
  }
  /*test for IE bug*/;
  if (FileData.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        FileData.name = 'FileData';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  FileData = create_prototype(FileData, _es6_module, "FileData");
  FileData.prototype.seek = function(i, origin) {
    if (origin==undefined) {
        origin = SEEK_SET;
    }
    if (origin==SEEK_SET) {
        this.i = i;
    }
    else 
      if (origin==SEEK_CUR) {
        this.i+=i;
    }
  }
  FileData.prototype.skip = function(n) {
    this.i+=n;
  }
  FileData.prototype.rewind = function() {
    this.i = 0;
  }
  FileData.prototype.read_byte = function() {
    var ret=this.view.getUint8(this.i, this.endian);
    this.i+=1;
    return ret;
  }
  FileData.prototype.read_char = function() {
    var ret=this.view.getUint8(this.i, this.endian);
    this.i+=1;
    return String.fromCharCode(ret);
  }
  FileData.prototype.read_short = function() {
    var ret=this.view.getInt16(this.i, this.endian);
    this.i+=2;
    return ret;
  }
  FileData.prototype.read_ushort = function() {
    var ret=this.view.getUint16(this.i, this.endian);
    this.i+=2;
    return ret;
  }
  FileData.prototype.read_int = function() {
    var ret=this.view.getInt32(this.i, this.endian);
    this.i+=4;
    return ret;
  }
  FileData.prototype.read_uint = function() {
    var ret=this.view.getUint32(this.i, this.endian);
    this.i+=4;
    return ret;
  }
  FileData.prototype.read_long = function() {
    return this.read_int();
  }
  FileData.prototype.read_ulong = function() {
    return this.read_uint();
  }
  FileData.prototype.read_int64_t = function() {
    var ret=this.view.getInt64(this.i, this.endian);
    this.i+=8;
    return ret;
  }
  FileData.prototype.read_uint64_t = function() {
    var ret=this.view.getUint64(this.i, this.endian);
    this.i+=8;
    return ret;
  }
  FileData.prototype.read_float = function() {
    var ret=this.view.getFloat32(this.i, this.endian);
    this.i+=4;
    return ret;
  }
  FileData.prototype.read_double = function() {
    var ret=this.view.getFloat64(this.i, this.endian);
    this.i+=8;
    return ret;
  }
  FileData.prototype.tell = function() {
    return this.i;
  }
  FileData.prototype.read_pointer = function() {
    if (this.ptrsize==4) {
        return this.read_uint();
    }
    else {
      return this.read_uint64_t();
    }
  }
  FileData.prototype.read_bytes = function(n) {
    var ret=this.buf.slice(this.i, this.i+n);
    this.i+=n;
    return ret;
  }
  FileData.prototype.eof = function() {
    return this.i>=this.buf.byteLength;
  }
  FileData.prototype.read_string = function(size) {
    if (isNaN(size)) {
        throw new Error("Size was NaN");
    }
    var si=this.i, ei=si+size, hit_zero=false;
    var uview=this.uview;
    var s="";
    while (si<ei) {
      var v=uview[si];
      if (v==0) {
          hit_zero = true;
          si++;
          continue;
      }
      if (!hit_zero) {
          s+=String.fromCharCode(v);
      }
      si++;
    }
    this.i = si;
    return s;
  }
  _es6_module.add_class(FileData);
  FileData = _es6_module.add_export('FileData', FileData);
  function BHead() {
    this.code = undefined;
    this.len = 0;
    this.old = 0;
    this.sdna = 0;
    this.nr = 0;
  }
  /*test for IE bug*/;
  if (BHead.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BHead.name = 'BHead';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BHead = create_prototype(BHead, _es6_module, "BHead");
  _es6_module.add_class(BHead);
  BHead = _es6_module.add_export('BHead', BHead);
  var read_bhead_cache=cachering.fromConstructor(BHead, 64);
  function read_bhead(fd) {
    var bh=read_bhead_cache.next();
    bh.code = fd.read_string(4);
    bh.len = fd.read_int();
    bh.old = fd.read_pointer();
    bh.sdna = fd.read_int();
    bh.nr = fd.read_int();
    return bh;
  }
  read_bhead = _es6_module.add_export('read_bhead', read_bhead);
  function load_file(fd) {
    if (fd.read_string(7)!="BLENDER") {
        throw new Error("Invalid file");
    }
    var ptrsize=fd.read_char()=="-" ? 8 : 4;
    fd.ptrsize = ptrsize;
    var endian=fd.read_char()=="v";
    fd.endian = endian;
    var version=fd.read_string(3);
    fd.version = version;
    var filestart=fd.tell();
    var data=[];
    var libblocks=[];
    var olds=[];
    var snrs=[];
    var nrs=[];
    var oldmap=new hashtable();
    fd.oldmap = oldmap;
    var totbhead=0;
    var _ci=0;
    var dna=undefined;
    while (!fd.eof()) {
      var bh=read_bhead(fd);
      if (bh.code=="DNA1") {
          dna = fd.read_bytes(bh.len);
      }
      else {
        fd.skip(bh.len);
      }
      if (_ci++>100000) {
          console.log("infinite loop");
          break;
      }
    }
    if (dna==undefined) {
        throw new Error("Could not find SDNA");
    }
    var parser=new SDNAParser();
    dna = new Uint8Array(dna);
    var sdna=parser.parse(dna, fd.endian ? ENDIAN_LITTLE : ENDIAN_BIG, fd.ptrsize);
    fd.sdna = sdna;
    console.log(sdna);
    fd.seek(filestart);
    var _ci=0;
    while (!fd.eof()) {
      var bh=read_bhead(fd);
      var next=fd.tell()+bh.len;
      if (bh.code=="DATA") {
          var obj=sdna.read(bh, fd);
          oldmap.set(bh.old, obj);
          data.push(obj);
      }
      else 
        if (bh.code=="ENDB") {
          break;
      }
      else 
        if (bh.code!="DNA1") {
          var block=sdna.read(bh, fd);
          oldmap.set(bh.old, block);
          libblocks.push(block);
      }
      fd.seek(next);
      if (_ci++>100000) {
          console.log("infinite loop");
          break;
      }
    }
    fd.oldmap = oldmap;
    fd.libblocks = libblocks;
    fd.directdata = data;
    var libblocks2=[];
    for (var i=0; i<libblocks.length; i++) {
        var block=libblocks[i];
        if (block.constructor===Array) {
            for (var j=0; j<block.length; j++) {
                libblocks2.push(block[j]);
            }
        }
        else {
          libblocks2.push(block);
        }
    }
    libblocks = libblocks2;
    for (var i=0; i<libblocks.length; i++) {
        var block=libblocks[i];
        block._bl_sdna.link(block, fd);
    }
    for (var i=0; i<data.length; i++) {
        var d=data[i];
        if (d.constructor===Array) {
            for (var j=0; j<d.length; j++) {
                d[j]._bl_sdna.link(d[j], fd);
            }
        }
        else {
          d._bl_sdna.link(d, fd);
        }
    }
  }
  load_file = _es6_module.add_export('load_file', load_file);
});
es6_module_define('library', ["sdna", "listbase"], function _library_module(_es6_module) {
  es6_import(_es6_module, 'listbase');
  var sdna=es6_import(_es6_module, 'sdna');
  var DataTypes={}
  DataTypes = _es6_module.add_export('DataTypes', DataTypes);
  var DataNames={}
  DataNames = _es6_module.add_export('DataNames', DataNames);
  function Library() {
    sdna.bases.Library.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (Library.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Library.name = 'Library';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Library = inherit_multiple(Library, [sdna.bases.Library], _es6_module, "Library");
  _es6_module.add_class(Library);
  Library = _es6_module.add_export('Library', Library);
  sdna.types.register(Library);
  function IDRef() {
    this.name = "";
    this.library = "";
    this.type = "";
  }
  /*test for IE bug*/;
  if (IDRef.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        IDRef.name = 'IDRef';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  IDRef = create_prototype(IDRef, _es6_module, "IDRef");
  IDRef.prototype[Symbol.keystr] = function() {
    return this.type+this.name+":"+this.library;
  }
  _es6_module.add_class(IDRef);
  IDRef = _es6_module.add_export('IDRef', IDRef);
  function ID() {
    sdna.bases.ID.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (ID.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ID.name = 'ID';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ID = inherit_multiple(ID, [sdna.bases.ID], _es6_module, "ID");
  _es6_module.add_class(ID);
  ID = _es6_module.add_export('ID', ID);
  sdna.types.register(ID);
  function BlockListIter(list) {
    this.list = list;
    this.i = 0;
    this.ret = {done: false, value: undefined}
  }
  /*test for IE bug*/;
  if (BlockListIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BlockListIter.name = 'BlockListIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BlockListIter = create_prototype(BlockListIter, _es6_module, "BlockListIter");
  BlockListIter.prototype[Symbol.iterator] = function() {
    return this;
  }
  BlockListIter.prototype.next = function() {
    var ret=this.ret;
    if (this.i>=this.list.length) {
        ret.done = true;
        ret.value = undefined;
        return ret;
    }
    ret.value = this.list[this.i++];
    return ret;
  }
  _es6_module.add_class(BlockListIter);
  BlockListIter = _es6_module.add_export('BlockListIter', BlockListIter);
  function BlockList(type) {
    this.list = [];
    this.namemap = {}
    this.type = type;
  }
  /*test for IE bug*/;
  if (BlockList.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BlockList.name = 'BlockList';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BlockList = create_prototype(BlockList, _es6_module, "BlockList");
  BlockList.prototype[Symbol.iterator] = function() {
    return new BlockListIter(this);
  }
  BlockList.prototype.rename = function(block) {
    throw new Error("implement me!");
  }
  BlockList.prototype.add = function(block) {
    this.namemap[block.id.name] = block;
    this.list.push(block);
    return this;
  }
  BlockList.prototype.get = function(int_or_name) {
    if (typeof int_or_name=="number") {
        return this.list[int_or_name];
    }
    else {
      return this.namemap[int_or_name];
    }
  }
  _es6_module.add_class(BlockList);
  BlockList = _es6_module.add_export('BlockList', BlockList);
  function Main() {
    this.lists = {}
    this.garbage = [];
    this.materials = this.get("MA");
    this.meshes = this.get("ME");
    this.objects = this.get("OB");
    this.scenes = this.get("SC");
    this.screens = this.get("SR");
    this.windows = this.get("WM");
  }
  /*test for IE bug*/;
  if (Main.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Main.name = 'Main';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Main = create_prototype(Main, _es6_module, "Main");
  Main.prototype.get = function(type) {
    if (!(type in this.lists)) {
        this.lists[type] = new BlockList(type);
    }
    return this.lists[type];
  }
  _es6_module.add_class(Main);
  Main = _es6_module.add_export('Main', Main);
});
es6_module_define('listbase', ["sdna"], function _listbase_module(_es6_module) {
  "use strict";
  var sdna=es6_import(_es6_module, 'sdna');
  function ListBaseIter(listbase) {
    this.last = listbase.last;
    this.cur = listbase.first;
    this.ret = {done: false, value: undefined}
  }
  /*test for IE bug*/;
  if (ListBaseIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ListBaseIter.name = 'ListBaseIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ListBaseIter = create_prototype(ListBaseIter, _es6_module, "ListBaseIter");
  ListBaseIter.prototype.next = function() {
    var ret=this.ret;
    if (this.cur==0||typeof this.cur=="number"||this.cur==undefined) {
        ret.done = true;
        ret.value = undefined;
        return ret;
    }
    ret.value = this.cur;
    this.cur = this.cur.next;
    return ret;
  }
  ListBaseIter.prototype[Symbol.iterator] = function() {
    return this;
  }
  _es6_module.add_class(ListBaseIter);
  ListBaseIter = _es6_module.add_export('ListBaseIter', ListBaseIter);
  function ListBase() {
    sdna.bases.ListBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (ListBase.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ListBase.name = 'ListBase';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ListBase = inherit_multiple(ListBase, [sdna.bases.ListBase], _es6_module, "ListBase");
  ListBase.prototype[Symbol.iterator] = function() {
    return new ListBaseIter(this);
  }
  ListBase.prototype.get = function(index) {
    var item=this.first;
    if (typeof index=="string"||__instance_of(index, String)) {
        var __iter_item_0=__get_iter(this);
        var item_0;
        while (1) {
          var __ival_item_0=__iter_item_0.next();
          if (__ival_item_0.done) {
              break;
          }
          item_0 = __ival_item_0.value;
          if (item_0.name==index||(item_0.id!=undefined&&item_0.id.name==index)) {
              return item_0;
          }
        }
        return undefined;
    }
    for (var i=0; i<index; i++) {
        item = item.next;
    }
    return typeof item=="number" ? undefined : item;
  }
  _es6_module.add_class(ListBase);
  ListBase = _es6_module.add_export('ListBase', ListBase);
  sdna.types.register(ListBase);
});
es6_module_define('mesh', ["sdna"], function _mesh_module(_es6_module) {
  var sdna=es6_import(_es6_module, 'sdna');
  function Mesh() {
    sdna.bases.Mesh.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (Mesh.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Mesh.name = 'Mesh';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Mesh = inherit_multiple(Mesh, [sdna.bases.Mesh], _es6_module, "Mesh");
  _es6_module.add_class(Mesh);
  Mesh = _es6_module.add_export('Mesh', Mesh);
  sdna.types.register(Mesh);
});
es6_module_define('net', [], function _net_module(_es6_module) {
  "use strict";
  var filecache={}
  filecache = _es6_module.add_export('filecache', filecache);
  function fetch_file(url, response_type) {
    if (response_type==undefined) {
        response_type = "arraybuffer";
    }
    if (url in filecache) {
        return new Promise(function(resolve, reject) {
          resolve(filecache[url]);
        });
    }
    var promise=new Promise(function(resolve, reject) {
      var req=new XMLHttpRequest();
      req.responseType = response_type;
      req.onreadystatechange = function() {
        if (req.status==200&&req.response!=null) {
            filecache[url] = req.response;
            resolve(req.response);
        }
        else 
          if (req.status>=400) {
            reject(req.statusText);
        }
      }
      req.open("GET", url, true);
      req.send();
    });
    return promise;
  }
  fetch_file = _es6_module.add_export('fetch_file', fetch_file);
  var href=document.location.href;
  if (href[href.length-1]!="/") {
      href+="/";
  }
  var startup_url=href+"blendfile.blend";
  startup_url = _es6_module.add_export('startup_url', startup_url);
  fetch_file(startup_url).then(function(data) {
    console.log("got startup .blend");
    window._startup_blend = data;
  });
});
es6_module_define('toolstack', ["context"], function _toolstack_module(_es6_module) {
  var ModalContext=es6_import_item(_es6_module, 'context', 'ModalContext');
  var ToolContext=es6_import_item(_es6_module, 'context', 'ToolContext');
  function ToolStack() {
    this.undostack = [];
    this.undocur = -1;
  }
  /*test for IE bug*/;
  if (ToolStack.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ToolStack.name = 'ToolStack';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ToolStack = create_prototype(ToolStack, _es6_module, "ToolStack");
  ToolStack.prototype.default_inputs = function(ctx, toolop) {
  }
  ToolStack.prototype.exec_tool = function(tool) {
    var ctx=tool.is_modal ? new ModalContext() : new ToolContext();
    if (!tool.poll(ctx)) {
        console.trace("Cannot run tool", tool);
        return ;
    }
    if (this.undocur>this.undostack.length) {
        this.undostack = this.undostack.slice(0, this.undocur);
    }
    else {
      this.undocur++;
    }
    this.undostack.push(tool);
    tool.undo_pre(ctx);
    tool.exec(ctx);
  }
  _es6_module.add_class(ToolStack);
  ToolStack = _es6_module.add_export('ToolStack', ToolStack);
});
es6_module_define('math', ["vectormath"], function _math_module(_es6_module) {
  "use strict";
  var $_mh;
  var $_swapt;
  var feps=2.22e-16;
  feps = _es6_module.add_export('feps', feps);
  var COLINEAR=1;
  COLINEAR = _es6_module.add_export('COLINEAR', COLINEAR);
  var LINECROSS=2;
  LINECROSS = _es6_module.add_export('LINECROSS', LINECROSS);
  var _cross_vec1=new Vector3();
  var _cross_vec2=new Vector3();
  var FLOAT_MIN=-1e+21;
  FLOAT_MIN = _es6_module.add_export('FLOAT_MIN', FLOAT_MIN);
  var FLOAT_MAX=1e+22;
  FLOAT_MAX = _es6_module.add_export('FLOAT_MAX', FLOAT_MAX);
  es6_import(_es6_module, 'vectormath');
  function Matrix4UI(loc, rot, size) {
    if (rot==undefined) {
        rot = undefined;
    }
    if (size==undefined) {
        size = undefined;
    }
    if (__instance_of(loc, Matrix4)) {
        this.load(loc);
        return ;
    }
    if (rot==undefined)
      rot = [0, 0, 0];
    if (size==undefined)
      size = [1.0, 1.0, 1.0];
    this.makeIdentity();
    this.calc(loc, rot, size);
  }
  /*test for IE bug*/;
  if (Matrix4UI.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Matrix4UI.name = 'Matrix4UI';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Matrix4UI = inherit_multiple(Matrix4UI, [Matrix4], _es6_module, "Matrix4UI");
  Object.defineProperty(Matrix4UI.prototype, "rot", {get: function() {
    var t=new Vector3();
    this.decompose(undefined, t);
    return t;
  }, set: function(rot) {
    var l=new Vector3(), r=new Vector3(), s=new Vector3();
    this.decompose(l, r, s);
    this.calc(l, rot, s);
  }, configurable: true});
  Object.defineProperty(Matrix4UI.prototype, "size", {get: function() {
    var t=new Vector3();
    this.decompose(undefined, undefined, t);
    return t;
  }, set: function(size) {
    var l=new Vector3(), r=new Vector3(), s=new Vector3();
    this.decompose(l, r, s);
    this.calc(l, r, size);
  }, configurable: true});
  Object.defineProperty(Matrix4UI.prototype, "loc", {get: function() {
    var t=new Vector3();
    this.decompose(t);
    return t;
  }, set: function(loc) {
    var l=new Vector3(), r=new Vector3(), s=new Vector3();
    this.decompose(l, r, s);
    this.calc(loc, r, s);
  }, configurable: true});
  Matrix4UI.prototype.calc = function(loc, rot, size) {
    this.rotate(rot[0], rot[1], rot[2]);
    this.scale(size[0], size[1], size[2]);
    this.translate(loc[0], loc[1], loc[2]);
  }
  _es6_module.add_class(Matrix4UI);
  Matrix4UI = _es6_module.add_export('Matrix4UI', Matrix4UI);
  if (FLOAT_MIN!=FLOAT_MIN||FLOAT_MAX!=FLOAT_MAX) {
      FLOAT_MIN = 1e-05;
      FLOAT_MAX = 1000000.0;
      console.log("Floating-point 16-bit system detected!");
  }
  var _static_grp_points4=new Array(4);
  var _static_grp_points8=new Array(8);
  function get_rect_points(p, size) {
    var cs;
    if (p.length==2) {
        cs = _static_grp_points4;
        cs[0] = p;
        cs[1] = [p[0], p[1]+size[1]];
        cs[2] = [p[0]+size[0], p[1]+size[1]];
        cs[3] = [p[0]+size[0], p[1]];
    }
    else 
      if (p.length==3) {
        cs = _static_grp_points8;
        cs[0] = p;
        cs[1] = [p[0]+size[0], p[1], p[2]];
        cs[2] = [p[0]+size[0], p[1]+size[1], p[2]];
        cs[3] = [p[0], p[1]+size[0], p[2]];
        cs[4] = [p[0], p[1], p[2]+size[2]];
        cs[5] = [p[0]+size[0], p[1], p[2]+size[2]];
        cs[6] = [p[0]+size[0], p[1]+size[1], p[2]+size[2]];
        cs[7] = [p[0], p[1]+size[0], p[2]+size[2]];
    }
    else {
      throw "get_rect_points has no implementation for "+p.length+"-dimensional data";
    }
    return cs;
  }
  get_rect_points = _es6_module.add_export('get_rect_points', get_rect_points);
  function get_rect_lines(p, size) {
    var ps=get_rect_points(p, size);
    if (p.length==2) {
        return [[ps[0], ps[1]], [ps[1], ps[2]], [ps[2], ps[3]], [ps[3], ps[0]]];
    }
    else 
      if (p.length==3) {
        var l1=[[ps[0], ps[1]], [ps[1], ps[2]], [ps[2], ps[3]], [ps[3], ps[0]]];
        var l2=[[ps[4], ps[5]], [ps[5], ps[6]], [ps[6], ps[7]], [ps[7], ps[4]]];
        l1.concat(l2);
        l1.push([ps[0], ps[4]]);
        l1.push([ps[1], ps[5]]);
        l1.push([ps[2], ps[6]]);
        l1.push([ps[3], ps[7]]);
        return l1;
    }
    else {
      throw "get_rect_points has no implementation for "+p.length+"-dimensional data";
    }
  }
  get_rect_lines = _es6_module.add_export('get_rect_lines', get_rect_lines);
  var $vs_glj5_simple_tri_aabb_isect=[0, 0, 0];
  function simple_tri_aabb_isect(v1, v2, v3, min, max) {
    $vs_glj5_simple_tri_aabb_isect[0] = v1;
    $vs_glj5_simple_tri_aabb_isect[1] = v2;
    $vs_glj5_simple_tri_aabb_isect[2] = v3;
    for (var i=0; i<3; i++) {
        var isect=true;
        for (var j=0; j<3; j++) {
            if ($vs_glj5_simple_tri_aabb_isect[j][i]<min[i]||$vs_glj5_simple_tri_aabb_isect[j][i]>=max[i])
              isect = false;
        }
        if (isect)
          return true;
    }
    return false;
  }
  simple_tri_aabb_isect = _es6_module.add_export('simple_tri_aabb_isect', simple_tri_aabb_isect);
  function MinMax(totaxis) {
    if (totaxis==undefined) {
        totaxis = 1;
    }
    this.totaxis = totaxis;
    if (totaxis!=1) {
        this._min = new Array(totaxis);
        this._max = new Array(totaxis);
        this.min = new Array(totaxis);
        this.max = new Array(totaxis);
    }
    else {
      this.min = this.max = 0;
      this._min = FLOAT_MAX;
      this._max = FLOAT_MIN;
    }
    this.reset();
    this._static_mr_co = new Array(this.totaxis);
    this._static_mr_cs = new Array(this.totaxis*this.totaxis);
  }
  /*test for IE bug*/;
  if (MinMax.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        MinMax.name = 'MinMax';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  MinMax = create_prototype(MinMax, _es6_module, "MinMax");
  MinMax.prototype.load = function(mm) {
    if (this.totaxis==1) {
        this.min = mm.min;
        this.max = mm.max;
        this._min = mm.min;
        this._max = mm.max;
    }
    else {
      this.min = new Vector3(mm.min);
      this.max = new Vector3(mm.max);
      this._min = new Vector3(mm._min);
      this._max = new Vector3(mm._max);
    }
  }
  MinMax.prototype.reset = function() {
    var totaxis=this.totaxis;
    if (totaxis==1) {
        this.min = this.max = 0;
        this._min = FLOAT_MAX;
        this._max = FLOAT_MIN;
    }
    else {
      for (var i=0; i<totaxis; i++) {
          this._min[i] = FLOAT_MAX;
          this._max[i] = FLOAT_MIN;
          this.min[i] = 0;
          this.max[i] = 0;
      }
    }
  }
  MinMax.prototype.minmax_rect = function(p, size) {
    var totaxis=this.totaxis;
    var cs=this._static_mr_cs;
    if (totaxis==2) {
        cs[0] = p;
        cs[1] = [p[0]+size[0], p[1]];
        cs[2] = [p[0]+size[0], p[1]+size[1]];
        cs[3] = [p[0], p[1]+size[1]];
    }
    else 
      if (totaxis = 3) {
        cs[0] = p;
        cs[1] = [p[0]+size[0], p[1], p[2]];
        cs[2] = [p[0]+size[0], p[1]+size[1], p[2]];
        cs[3] = [p[0], p[1]+size[0], p[2]];
        cs[4] = [p[0], p[1], p[2]+size[2]];
        cs[5] = [p[0]+size[0], p[1], p[2]+size[2]];
        cs[6] = [p[0]+size[0], p[1]+size[1], p[2]+size[2]];
        cs[7] = [p[0], p[1]+size[0], p[2]+size[2]];
    }
    else {
      throw "Minmax.minmax_rect has no implementation for "+totaxis+"-dimensional data";
    }
    for (var i=0; i<cs.length; i++) {
        this.minmax(cs[i]);
    }
  }
  MinMax.prototype.minmax = function(p) {
    var totaxis=this.totaxis;
    if (totaxis==1) {
        this._min = this.min = Math.min(this._min, p);
        this._max = this.max = Math.max(this._max, p);
    }
    else {
      for (var i=0; i<totaxis; i++) {
          this._min[i] = this.min[i] = Math.min(this._min[i], p[i]);
          this._max[i] = this.max[i] = Math.max(this._max[i], p[i]);
      }
    }
  }
  _es6_module.add_class(MinMax);
  MinMax = _es6_module.add_export('MinMax', MinMax);
  function winding(a, b, c) {
    for (var i=0; i<a.length; i++) {
        _cross_vec1[i] = b[i]-a[i];
        _cross_vec2[i] = c[i]-a[i];
    }
    if (a.length==2) {
        _cross_vec1[2] = 0.0;
        _cross_vec2[2] = 0.0;
    }
    _cross_vec1.cross(_cross_vec2);
    return _cross_vec1[2]>0.0;
  }
  function inrect_2d(p, pos, size) {
    if (p==undefined||pos==undefined||size==undefined) {
        console.trace();
        console.log("Bad paramters to inrect_2d()");
        console.log("p: ", p, ", pos: ", pos, ", size: ", size);
        return false;
    }
    return p[0]>=pos[0]&&p[0]<=pos[0]+size[0]&&p[1]>=pos[1]&&p[1]<=pos[1]+size[1];
  }
  inrect_2d = _es6_module.add_export('inrect_2d', inrect_2d);
  var $smin_g1d0_aabb_isect_line_2d=new Vector2();
  var $ssize_Z_oC_aabb_isect_line_2d=new Vector2();
  var $sv1_iYEZ_aabb_isect_line_2d=new Vector2();
  var $ps_A7K__aabb_isect_line_2d=[new Vector2(), new Vector2(), new Vector2()];
  var $l1_E6TP_aabb_isect_line_2d=[0, 0];
  var $smax_OmdJ_aabb_isect_line_2d=new Vector2();
  var $sv2_4xad_aabb_isect_line_2d=new Vector2();
  var $l2_0CCy_aabb_isect_line_2d=[0, 0];
  function aabb_isect_line_2d(v1, v2, min, max) {
    for (var i=0; i<2; i++) {
        $smin_g1d0_aabb_isect_line_2d[i] = Math.min(min[i], v1[i]);
        $smax_OmdJ_aabb_isect_line_2d[i] = Math.max(max[i], v2[i]);
    }
    $smax_OmdJ_aabb_isect_line_2d.sub($smin_g1d0_aabb_isect_line_2d);
    $ssize_Z_oC_aabb_isect_line_2d.load(max).sub(min);
    if (!aabb_isect_2d($smin_g1d0_aabb_isect_line_2d, $smax_OmdJ_aabb_isect_line_2d, min, $ssize_Z_oC_aabb_isect_line_2d))
      return false;
    for (var i=0; i<4; i++) {
        if (inrect_2d(v1, min, $ssize_Z_oC_aabb_isect_line_2d))
          return true;
        if (inrect_2d(v2, min, $ssize_Z_oC_aabb_isect_line_2d))
          return true;
    }
    $ps_A7K__aabb_isect_line_2d[0] = min;
    $ps_A7K__aabb_isect_line_2d[1][0] = min[0];
    $ps_A7K__aabb_isect_line_2d[1][1] = max[1];
    $ps_A7K__aabb_isect_line_2d[2] = max;
    $ps_A7K__aabb_isect_line_2d[3][0] = max[0];
    $ps_A7K__aabb_isect_line_2d[3][1] = min[1];
    $l1_E6TP_aabb_isect_line_2d[0] = v1;
    $l1_E6TP_aabb_isect_line_2d[1] = v2;
    for (var i=0; i<4; i++) {
        var a=$ps_A7K__aabb_isect_line_2d[i], b=$ps_A7K__aabb_isect_line_2d[(i+1)%4];
        $l2_0CCy_aabb_isect_line_2d[0] = a;
        $l2_0CCy_aabb_isect_line_2d[1] = b;
        if (line_line_cross($l1_E6TP_aabb_isect_line_2d, $l2_0CCy_aabb_isect_line_2d))
          return true;
    }
    return false;
  }
  aabb_isect_line_2d = _es6_module.add_export('aabb_isect_line_2d', aabb_isect_line_2d);
  function aabb_isect_minmax2d(_min1, _max1, _min2, _max2, margin) {
    if (margin==undefined) {
        margin = 0;
    }
    var ret=0;
    for (var i=0; i<2; i++) {
        var min1=_min1[i]-margin, max1=_max1[i]+margin, min2=_min2[i]-margin, max2=_max2[i]+margin;
        if (max1>=min2&&min1<=max2)
          ret+=1;
    }
    return ret==2;
  }
  aabb_isect_minmax2d = _es6_module.add_export('aabb_isect_minmax2d', aabb_isect_minmax2d);
  function aabb_isect_2d(pos1, size1, pos2, size2) {
    var ret=0;
    for (var i=0; i<2; i++) {
        var a=pos1[i];
        var b=pos1[i]+size1[i];
        var c=pos2[i];
        var d=pos2[i]+size2[i];
        if (b>=c&&a<=d)
          ret+=1;
    }
    return ret==2;
  }
  aabb_isect_2d = _es6_module.add_export('aabb_isect_2d', aabb_isect_2d);
  function expand_rect2d(pos, size, margin) {
    pos[0]-=Math.floor(margin[0]);
    pos[1]-=Math.floor(margin[1]);
    size[0]+=Math.floor(margin[0]*2.0);
    size[1]+=Math.floor(margin[1]*2.0);
  }
  function expand_line(l, margin) {
    var c=new Vector3();
    c.add(l[0]);
    c.add(l[1]);
    c.mulScalar(0.5);
    l[0].sub(c);
    l[1].sub(c);
    var l1=l[0].vectorLength();
    var l2=l[1].vectorLength();
    l[0].normalize();
    l[1].normalize();
    l[0].mulScalar(margin+l1);
    l[1].mulScalar(margin+l2);
    l[0].add(c);
    l[1].add(c);
    return l;
  }
  function colinear(a, b, c) {
    for (var i=0; i<3; i++) {
        _cross_vec1[i] = b[i]-a[i];
        _cross_vec2[i] = c[i]-a[i];
    }
    var limit=2.2e-16;
    if (a.vectorDistance(b)<feps*100&&a.vectorDistance(c)<feps*100) {
        return true;
    }
    if (_cross_vec1.dot(_cross_vec1)<limit||_cross_vec2.dot(_cross_vec2)<limit)
      return true;
    _cross_vec1.cross(_cross_vec2);
    return _cross_vec1.dot(_cross_vec1)<limit;
  }
  var _llc_l1=[new Vector3(), new Vector3()];
  var _llc_l2=[new Vector3(), new Vector3()];
  function line_line_cross(l1, l2) {
    var limit=feps*1000;
    if (Math.abs(l1[0].vectorDistance(l2[0])+l1[1].vectorDistance(l2[0])-l1[0].vectorDistance(l1[1]))<limit) {
        return true;
    }
    if (Math.abs(l1[0].vectorDistance(l2[1])+l1[1].vectorDistance(l2[1])-l1[0].vectorDistance(l1[1]))<limit) {
        return true;
    }
    if (Math.abs(l2[0].vectorDistance(l1[0])+l2[1].vectorDistance(l1[0])-l2[0].vectorDistance(l2[1]))<limit) {
        return true;
    }
    if (Math.abs(l2[0].vectorDistance(l1[1])+l2[1].vectorDistance(l1[1])-l2[0].vectorDistance(l2[1]))<limit) {
        return true;
    }
    var a=l1[0];
    var b=l1[1];
    var c=l2[0];
    var d=l2[1];
    var w1=winding(a, b, c);
    var w2=winding(c, a, d);
    var w3=winding(a, b, d);
    var w4=winding(c, b, d);
    return (w1==w2)&&(w3==w4)&&(w1!=w3);
  }
  function point_in_tri(p, v1, v2, v3) {
    var w1=winding(p, v1, v2);
    var w2=winding(p, v2, v3);
    var w3=winding(p, v3, v1);
    return w1==w2&&w2==w3;
  }
  function convex_quad(v1, v2, v3, v4) {
    return line_line_cross([v1, v3], [v2, v4]);
  }
  var $e1_40ft=new Vector3();
  var $e3_7bq4=new Vector3();
  var $e2_giMN=new Vector3();
  function normal_tri(v1, v2, v3) {
    $e1_40ft[0] = v2[0]-v1[0];
    $e1_40ft[1] = v2[1]-v1[1];
    $e1_40ft[2] = v2[2]-v1[2];
    $e2_giMN[0] = v3[0]-v1[0];
    $e2_giMN[1] = v3[1]-v1[1];
    $e2_giMN[2] = v3[2]-v1[2];
    $e3_7bq4[0] = $e1_40ft[1]*$e2_giMN[2]-$e1_40ft[2]*$e2_giMN[1];
    $e3_7bq4[1] = $e1_40ft[2]*$e2_giMN[0]-$e1_40ft[0]*$e2_giMN[2];
    $e3_7bq4[2] = $e1_40ft[0]*$e2_giMN[1]-$e1_40ft[1]*$e2_giMN[0];
    
    var _len=Math.sqrt(($e3_7bq4[0]*$e3_7bq4[0]+$e3_7bq4[1]*$e3_7bq4[1]+$e3_7bq4[2]*$e3_7bq4[2]));
    if (_len>1e-05)
      _len = 1.0/_len;
    $e3_7bq4[0]*=_len;
    $e3_7bq4[1]*=_len;
    $e3_7bq4[2]*=_len;
    return $e3_7bq4;
  }
  var $n2_sohS=new Vector3();
  function normal_quad(v1, v2, v3, v4) {
    var n=normal_tri(v1, v2, v3);
    $n2_sohS[0] = n[0];
    $n2_sohS[1] = n[1];
    $n2_sohS[2] = n[2];
    n = normal_tri(v1, v3, v4);
    $n2_sohS[0] = $n2_sohS[0]+n[0];
    $n2_sohS[1] = $n2_sohS[1]+n[1];
    $n2_sohS[2] = $n2_sohS[2]+n[2];
    var _len=Math.sqrt(($n2_sohS[0]*$n2_sohS[0]+$n2_sohS[1]*$n2_sohS[1]+$n2_sohS[2]*$n2_sohS[2]));
    if (_len>1e-05)
      _len = 1.0/_len;
    $n2_sohS[0]*=_len;
    $n2_sohS[1]*=_len;
    $n2_sohS[2]*=_len;
    return $n2_sohS;
  }
  var _li_vi=new Vector3();
  function line_isect(v1, v2, v3, v4, calc_t) {
    if (calc_t==undefined) {
        calc_t = false;
    }
    var div=(v2[0]-v1[0])*(v4[1]-v3[1])-(v2[1]-v1[1])*(v4[0]-v3[0]);
    if (div==0.0)
      return [new Vector3(), COLINEAR, 0.0];
    var vi=_li_vi;
    vi[0] = 0;
    vi[1] = 0;
    vi[2] = 0;
    vi[0] = ((v3[0]-v4[0])*(v1[0]*v2[1]-v1[1]*v2[0])-(v1[0]-v2[0])*(v3[0]*v4[1]-v3[1]*v4[0]))/div;
    vi[1] = ((v3[1]-v4[1])*(v1[0]*v2[1]-v1[1]*v2[0])-(v1[1]-v2[1])*(v3[0]*v4[1]-v3[1]*v4[0]))/div;
    if (calc_t||v1.length==3) {
        var n1=new Vector2(v2).sub(v1);
        var n2=new Vector2(vi).sub(v1);
        var t=n2.vectorLength()/n1.vectorLength();
        n1.normalize();
        n2.normalize();
        if (n1.dot(n2)<0.0) {
            t = -t;
        }
        if (v1.length==3) {
            vi[2] = v1[2]+(v2[2]-v1[2])*t;
        }
        return [vi, LINECROSS, t];
    }
    return [vi, LINECROSS];
  }
  var dtl_v3=new Vector3();
  var dtl_v4=new Vector3();
  var dtl_v5=new Vector3();
  function dist_to_line_v2(p, v1, v2) {
    var v3=dtl_v3, v4=dtl_v4;
    var v5=dtl_v5;
    v3.load(v1);
    v4.load(v2);
    v4.sub(v3);
    v5[0] = -v4[1];
    v5[1] = v4[0];
    v3 = p;
    v4.load(v5);
    v4.add(v3);
    var ret=line_isect(v1, v2, v3, v4);
    if (ret[1]==COLINEAR) {
        var d1=p.vectorDistance(v1);
        var d2=p.vectorDistance(v2);
        return Math.min(d1, d2);
    }
    else {
      var t1=ret[0].vectorDistance(v1);
      var t2=ret[0].vectorDistance(v2);
      var t3=v1.vectorDistance(v2);
      if (t1>t3||t2>t3) {
          var d1=p.vectorDistance(v1);
          var d2=p.vectorDistance(v2);
          return Math.min(d1, d2);
      }
      else {
        return p.vectorDistance(ret[0]);
      }
    }
  }
  dist_to_line_v2 = _es6_module.add_export('dist_to_line_v2', dist_to_line_v2);
  function closest_point_on_line(p, v1, v2) {
    var v3=dtl_v3, v4=dtl_v4;
    var v5=dtl_v5;
    v3.load(v1);
    v4.load(v2);
    v4.sub(v3);
    v5[0] = -v4[1];
    v5[1] = v4[0];
    v3 = p;
    v4.load(v5);
    v4.add(v3);
    var ret=line_isect(v1, v2, v3, v4);
    if (ret[1]==COLINEAR) {
        var v3=dtl_v3;
        v4 = dtl_v4;
        var v5=dtl_v5;
        p = new Vector3(p);
        v3.load(v1);
        v4.load(v2);
        v4.sub(v3);
        p.sub(v4);
        v5[0] = -v4[1];
        v5[1] = v4[0];
        v3 = p;
        v4.load(v5);
        v4.add(v3);
        ret = line_isect(v1, v2, v3, v4);
    }
    return [new Vector3(ret[0]), v1.vectorDistance(ret[0])];
  }
  closest_point_on_line = _es6_module.add_export('closest_point_on_line', closest_point_on_line);
  var _gtc_e1=new Vector3();
  var _gtc_e2=new Vector3();
  var _gtc_e3=new Vector3();
  var _gtc_p1=new Vector3();
  var _gtc_p2=new Vector3();
  var _gtc_v1=new Vector3();
  var _gtc_v2=new Vector3();
  var _gtc_p12=new Vector3();
  var _gtc_p22=new Vector3();
  function get_tri_circ(a, b, c) {
    var e1=_gtc_e1;
    var e2=_gtc_e2;
    var e3=_gtc_e3;
    for (var i=0; i<3; i++) {
        e1[i] = b[i]-a[i];
        e2[i] = c[i]-b[i];
        e3[i] = a[i]-c[i];
    }
    var p1=_gtc_p1;
    var p2=_gtc_p2;
    for (var i=0; i<3; i++) {
        p1[i] = (a[i]+b[i])*0.5;
        p2[i] = (c[i]+b[i])*0.5;
    }
    e1.normalize();
    var v1=_gtc_v1;
    var v2=_gtc_v2;
    v1[0] = -e1[1];
    v1[1] = e1[0];
    v1[2] = e1[2];
    v2[0] = -e2[1];
    v2[1] = e2[0];
    v2[2] = e2[2];
    v1.normalize();
    v2.normalize();
    var cent;
    var type;
    for (var i=0; i<3; i++) {
        _gtc_p12[i] = p1[i]+v1[i];
        _gtc_p22[i] = p2[i]+v2[i];
    }
    var ret=line_isect(p1, _gtc_p12, p2, _gtc_p22);
    cent = ret[0];
    type = ret[1];
    e1.load(a);
    e2.load(b);
    e3.load(c);
    var r=e1.sub(cent).vectorLength();
    if (r<feps)
      r = e2.sub(cent).vectorLength();
    if (r<feps)
      r = e3.sub(cent).vectorLength();
    return [cent, r];
  }
  function gen_circle(m, origin, r, stfeps) {
    var pi=Math.PI;
    var f=-pi/2;
    var df=(pi*2)/stfeps;
    var verts=new Array();
    for (var i=0; i<stfeps; i++) {
        var x=origin[0]+r*Math.sin(f);
        var y=origin[1]+r*Math.cos(f);
        var v=m.make_vert(new Vector3([x, y, origin[2]]));
        verts.push(v);
        f+=df;
    }
    for (var i=0; i<verts.length; i++) {
        var v1=verts[i];
        var v2=verts[(i+1)%verts.length];
        m.make_edge(v1, v2);
    }
    return verts;
  }
  function makeCircleMesh(gl, radius, stfeps) {
    var mesh=new Mesh();
    var verts1=gen_circle(mesh, new Vector3(), radius, stfeps);
    var verts2=gen_circle(mesh, new Vector3(), radius/1.75, stfeps);
    mesh.make_face_complex([verts1, verts2]);
    return mesh;
  }
  function minmax_verts(verts) {
    var min=new Vector3([1000000000000.0, 1000000000000.0, 1000000000000.0]);
    var max=new Vector3([-1000000000000.0, -1000000000000.0, -1000000000000.0]);
    var __iter_v=__get_iter(verts);
    var v;
    while (1) {
      var __ival_v=__iter_v.next();
      if (__ival_v.done) {
          break;
      }
      v = __ival_v.value;
      for (var i=0; i<3; i++) {
          min[i] = Math.min(min[i], v.co[i]);
          max[i] = Math.max(max[i], v.co[i]);
      }
    }
    return [min, max];
  }
  minmax_verts = _es6_module.add_export('minmax_verts', minmax_verts);
  function unproject(vec, ipers, iview) {
    var newvec=new Vector3(vec);
    newvec.multVecMatrix(ipers);
    newvec.multVecMatrix(iview);
    return newvec;
  }
  function project(vec, pers, view) {
    var newvec=new Vector3(vec);
    newvec.multVecMatrix(pers);
    newvec.multVecMatrix(view);
    return newvec;
  }
  var _sh_minv=new Vector3();
  var _sh_maxv=new Vector3();
  var _sh_start=[];
  var _sh_end=[];
  function spatialhash(init, cellsize) {
    if (cellsize==undefined)
      cellsize = 0.25;
    this.cellsize = cellsize;
    this.shash = {}
    this.items = {}
    this.length = 0;
    this.hashlookup = function(x, y, z, create) {
      if (create==undefined)
        create = false;
      var h=this.hash(x, y, z);
      var b=this.shash[h];
      if (b==undefined) {
          if (!create)
            return null;
          var ret={};
          this.shash[h] = ret;
          return ret;
      }
      else {
        return b;
      }
    }
    this.hash = function(x, y, z) {
      return z*125000000+y*250000+x;
    }
    this._op = function(item, mode) {
      var csize=this.cellsize;
      var minv=_sh_minv;
      minv.zero();
      var maxv=_sh_maxv;
      maxv.zero();
      if (item.type==MeshTypes.EDGE) {
          for (var i=0; i<3; i++) {
              minv[i] = Math.min(item.v1.co[i], item.v2.co[i]);
              maxv[i] = Math.max(item.v1.co[i], item.v2.co[i]);
          }
      }
      else 
        if (item.type==MeshTypes.FACE) {
          var firstl=item.looplists[0].loop;
          var l=firstl;
          do {
            for (var i=0; i<3; i++) {
                minv[i] = Math.min(minv[i], l.v.co[i]);
                maxv[i] = Math.max(maxv[i], l.v.co[i]);
            }
            l = l.next;
          } while (l!=firstl);
          
      }
      else 
        if (item.type==MeshTypes.VERT) {
          minv.load(item.co);
          maxv.load(item.co);
      }
      else {
        console.trace();
        throw "Invalid type for spatialhash";
      }
      var start=_sh_start;
      var end=_sh_end;
      for (var i=0; i<3; i++) {
          start[i] = Math.floor(minv[i]/csize);
          end[i] = Math.floor(maxv[i]/csize);
      }
      for (var x=start[0]; x<=end[0]; x++) {
          for (var y=start[1]; y<=end[1]; y++) {
              for (var z=start[2]; z<=end[2]; z++) {
                  var bset=this.hashlookup(x, y, z, true);
                  if (mode=="a") {
                      bset[item.__hash__()] = item;
                  }
                  else 
                    if (mode=="r") {
                      delete bset[item.__hash__()];
                  }
              }
          }
      }
    }
    this.add = function(item) {
      this._op(item, "a");
      if (this.items[item.__hash__()]==undefined) {
          this.items[item.__hash__()] = item;
          this.length++;
      }
    }
    this.remove = function(item) {
      this._op(item, "r");
      delete this.items[item.__hash__()];
      this.length--;
    }
    this[Symbol.iterator] = function() {
      return new obj_value_iter(this.items);
    }
    this.query_radius = function(co, radius) {
      var min=new Vector3(co).sub(new Vector3(radius, radius, radius));
      var max=new Vector3(co).add(new Vector3(radius, radius, radius));
      return this.query(min, max);
    }
    this.query = function(start, end) {
      var csize=this.cellsize;
      var minv=_sh_minv.zero();
      var maxv=_sh_maxv.zero();
      for (var i=0; i<3; i++) {
          minv[i] = Math.min(start[i], end[i]);
          maxv[i] = Math.max(start[i], end[i]);
      }
      var start=_sh_start;
      var end=_sh_end;
      for (var i=0; i<3; i++) {
          start[i] = Math.floor(minv[i]/csize);
          end[i] = Math.floor(maxv[i]/csize);
      }
      var ret=new set();
      for (var x=start[0]; x<=end[0]; x++) {
          for (var y=start[1]; y<=end[1]; y++) {
              for (var z=start[2]; z<=end[2]; z++) {
                  var bset=this.hashlookup(x, y, z, false);
                  if (bset!=null) {
                      var __iter_r=__get_iter(new obj_value_iter(bset));
                      var r;
                      while (1) {
                        var __ival_r=__iter_r.next();
                        if (__ival_r.done) {
                            break;
                        }
                        r = __ival_r.value;
                        ret.add(r);
                      }
                  }
              }
          }
      }
      return ret;
    }
    this.union = function(b) {
      var newh=new spatialhash();
      newh.cellsize = Math.min(this.cellsize, b.cellsize);
      var __iter_item=__get_iter(this);
      var item;
      while (1) {
        var __ival_item=__iter_item.next();
        if (__ival_item.done) {
            break;
        }
        item = __ival_item.value;
        newh.add(item);
      }
      var __iter_item=__get_iter(b);
      var item;
      while (1) {
        var __ival_item=__iter_item.next();
        if (__ival_item.done) {
            break;
        }
        item = __ival_item.value;
        newh.add(item);
      }
      return newh;
    }
    this.has = function(b) {
      return this.items[b.__hash__()]!=undefined;
    }
    if (init!=undefined) {
        var __iter_item=__get_iter(init);
        var item;
        while (1) {
          var __ival_item=__iter_item.next();
          if (__ival_item.done) {
              break;
          }
          item = __ival_item.value;
          this.add(item);
        }
    }
  }
  var static_cent_gbw=new Vector3();
  function get_boundary_winding(points) {
    var cent=static_cent_gbw.zero();
    if (points.length==0)
      return false;
    for (var i=0; i<points.length; i++) {
        cent.add(points[i]);
    }
    cent.divideScalar(points.length);
    var w=0, totw=0;
    for (var i=0; i<points.length; i++) {
        var v1=points[i];
        var v2=points[(i+1)%points.length];
        if (!colinear(v1, v2, cent)) {
            w+=winding(v1, v2, cent);
            totw+=1;
        }
    }
    if (totw>0)
      w/=totw;
    return Math.round(w)==1;
  }
  function PlaneOps(normal) {
    var no=normal;
    this.axis = [0, 0, 0];
    this.reset_axis(normal);
  }
  /*test for IE bug*/;
  if (PlaneOps.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        PlaneOps.name = 'PlaneOps';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  PlaneOps = create_prototype(PlaneOps, _es6_module, "PlaneOps");
  PlaneOps.prototype.reset_axis = function(no) {
    var ax, ay, az;
    var nx=Math.abs(no[0]), ny=Math.abs(no[1]), nz=Math.abs(no[2]);
    if (nz>nx&&nz>ny) {
        ax = 0;
        ay = 1;
        az = 2;
    }
    else 
      if (nx>ny&&nx>nz) {
        ax = 2;
        ay = 1;
        az = 0;
    }
    else {
      ax = 0;
      ay = 2;
      az = 1;
    }
    this.axis = [ax, ay, az];
  }
  PlaneOps.prototype.convex_quad = function(v1, v2, v3, v4) {
    var ax=this.axis;
    v1 = new Vector3([v1[ax[0]], v1[ax[1]], v1[ax[2]]]);
    v2 = new Vector3([v2[ax[0]], v2[ax[1]], v2[ax[2]]]);
    v3 = new Vector3([v3[ax[0]], v3[ax[1]], v3[ax[2]]]);
    v4 = new Vector3([v4[ax[0]], v4[ax[1]], v4[ax[2]]]);
    return convex_quad(v1, v2, v3, v4);
  }
  PlaneOps.prototype.line_isect = function(v1, v2, v3, v4) {
    var ax=this.axis;
    var orig1=v1, orig2=v2;
    v1 = new Vector3([v1[ax[0]], v1[ax[1]], v1[ax[2]]]);
    v2 = new Vector3([v2[ax[0]], v2[ax[1]], v2[ax[2]]]);
    v3 = new Vector3([v3[ax[0]], v3[ax[1]], v3[ax[2]]]);
    v4 = new Vector3([v4[ax[0]], v4[ax[1]], v4[ax[2]]]);
    var ret=line_isect(v1, v2, v3, v4, true);
    var vi=ret[0];
    if (ret[1]==LINECROSS) {
        ret[0].load(orig2).sub(orig1).mulScalar(ret[2]).add(orig1);
    }
    return ret;
  }
  PlaneOps.prototype.line_line_cross = function(l1, l2) {
    var ax=this.axis;
    var v1=l1[0], v2=l1[1], v3=l2[0], v4=l2[1];
    v1 = new Vector3([v1[ax[0]], v1[ax[1]], 0.0]);
    v2 = new Vector3([v2[ax[0]], v2[ax[1]], 0.0]);
    v3 = new Vector3([v3[ax[0]], v3[ax[1]], 0.0]);
    v4 = new Vector3([v4[ax[0]], v4[ax[1]], 0.0]);
    return line_line_cross([v1, v2], [v3, v4]);
  }
  PlaneOps.prototype.winding = function(v1, v2, v3) {
    var ax=this.axis;
    if (v1==undefined)
      console.trace();
    v1 = new Vector3([v1[ax[0]], v1[ax[1]], 0.0]);
    v2 = new Vector3([v2[ax[0]], v2[ax[1]], 0.0]);
    v3 = new Vector3([v3[ax[0]], v3[ax[1]], 0.0]);
    return winding(v1, v2, v3);
  }
  PlaneOps.prototype.colinear = function(v1, v2, v3) {
    var ax=this.axis;
    v1 = new Vector3([v1[ax[0]], v1[ax[1]], 0.0]);
    v2 = new Vector3([v2[ax[0]], v2[ax[1]], 0.0]);
    v3 = new Vector3([v3[ax[0]], v3[ax[1]], 0.0]);
    return colinear(v1, v2, v3);
  }
  PlaneOps.prototype.get_boundary_winding = function(points) {
    var ax=this.axis;
    var cent=new Vector3();
    if (points.length==0)
      return false;
    for (var i=0; i<points.length; i++) {
        cent.add(points[i]);
    }
    cent.divideScalar(points.length);
    var w=0, totw=0;
    for (var i=0; i<points.length; i++) {
        var v1=points[i];
        var v2=points[(i+1)%points.length];
        if (!this.colinear(v1, v2, cent)) {
            w+=this.winding(v1, v2, cent);
            totw+=1;
        }
    }
    if (totw>0)
      w/=totw;
    return Math.round(w)==1;
  }
  _es6_module.add_class(PlaneOps);
  var _isrp_ret=new Vector3();
  function isect_ray_plane(planeorigin, planenormal, rayorigin, raynormal) {
    var p=planeorigin, n=planenormal;
    var r=rayorigin, v=raynormal;
    var d=p.vectorLength();
    var t=-(r.dot(n)-p.dot(n))/v.dot(n);
    _isrp_ret.load(v);
    _isrp_ret.mulScalar(t);
    _isrp_ret.add(r);
    return _isrp_ret;
  }
  function mesh_find_tangent(mesh, viewvec, offvec, projmat, verts) {
    if (verts==undefined)
      verts = mesh.verts.selected;
    var vset=new set();
    var eset=new set();
    var __iter_v=__get_iter(verts);
    var v;
    while (1) {
      var __ival_v=__iter_v.next();
      if (__ival_v.done) {
          break;
      }
      v = __ival_v.value;
      vset.add(v);
    }
    var __iter_v=__get_iter(vset);
    var v;
    while (1) {
      var __ival_v=__iter_v.next();
      if (__ival_v.done) {
          break;
      }
      v = __ival_v.value;
      var __iter_e=__get_iter(v.edges);
      var e;
      while (1) {
        var __ival_e=__iter_e.next();
        if (__ival_e.done) {
            break;
        }
        e = __ival_e.value;
        if (vset.has(e.other_vert(v))) {
            eset.add(e);
        }
      }
    }
    if (eset.length==0) {
        return new Vector3(offvec);
    }
    var tanav=new Vector3();
    var evec=new Vector3();
    var tan=new Vector3();
    var co2=new Vector3();
    var __iter_e=__get_iter(eset);
    var e;
    while (1) {
      var __ival_e=__iter_e.next();
      if (__ival_e.done) {
          break;
      }
      e = __ival_e.value;
      evec.load(e.v1.co).multVecMatrix(projmat);
      co2.load(e.v2.co).multVecMatrix(projmat);
      evec.sub(co2);
      evec.normalize();
      tan[0] = evec[1];
      tan[1] = -evec[0];
      tan[2] = 0.0;
      if (tan.dot(offvec)<0.0)
        tan.mulScalar(-1.0);
      tanav.add(tan);
    }
    tanav.normalize();
    return tanav;
  }
  function Mat4Stack() {
    this.stack = [];
    this.matrix = new Matrix4();
    this.matrix.makeIdentity();
    this.update_func = undefined;
  }
  /*test for IE bug*/;
  if (Mat4Stack.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Mat4Stack.name = 'Mat4Stack';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Mat4Stack = create_prototype(Mat4Stack, _es6_module, "Mat4Stack");
  Mat4Stack.prototype.set_internal_matrix = function(mat, update_func) {
    this.update_func = update_func;
    this.matrix = mat;
  }
  Mat4Stack.prototype.reset = function(mat) {
    this.matrix.load(mat);
    this.stack = [];
    if (this.update_func!=undefined)
      this.update_func();
  }
  Mat4Stack.prototype.load = function(mat) {
    this.matrix.load(mat);
    if (this.update_func!=undefined)
      this.update_func();
  }
  Mat4Stack.prototype.multiply = function(mat) {
    this.matrix.multiply(mat);
    if (this.update_func!=undefined)
      this.update_func();
  }
  Mat4Stack.prototype.identity = function() {
    this.matrix.loadIdentity();
    if (this.update_func!=undefined)
      this.update_func();
  }
  Mat4Stack.prototype.push = function(mat2) {
    this.stack.push(new Matrix4(this.matrix));
    if (mat2!=undefined) {
        this.matrix.load(mat2);
        if (this.update_func!=undefined)
          this.update_func();
    }
  }
  Mat4Stack.prototype.pop = function() {
    var mat=this.stack.pop(this.stack.length-1);
    this.matrix.load(mat);
    if (this.update_func!=undefined)
      this.update_func();
    return mat;
  }
  _es6_module.add_class(Mat4Stack);
  function WrapperVecPool(nsize2, psize, nsize) {
    if (psize==undefined) {
        psize = 512;
    }
    if (nsize==undefined) {
        nsize = 3;
    }
    if (nsize2!=undefined)
      nsize = nsize2;
    this.pools = [];
    this.cur = 0;
    this.psize = psize;
    this.bytesize = 4;
    this.nsize = nsize;
    this.new_pool();
  }
  /*test for IE bug*/;
  if (WrapperVecPool.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        WrapperVecPool.name = 'WrapperVecPool';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  WrapperVecPool = create_prototype(WrapperVecPool, _es6_module, "WrapperVecPool");
  WrapperVecPool.prototype.new_pool = function() {
    var pool=new Float32Array(this.psize*this.nsize);
    this.pools.push(pool);
    this.cur = 0;
  }
  WrapperVecPool.prototype.get = function() {
    if (this.cur>=this.psize)
      this.new_pool();
    var pool=this.pools[this.pools.length-1];
    var n=this.nsize;
    var cur=this.cur;
    var bs=this.bytesize;
    var view=new Float32Array(pool.buffer, Math.floor(cur*n*bs), n);
    this.cur++;
    return new WVector3(view);
  }
  _es6_module.add_class(WrapperVecPool);
  var test_vpool=new WrapperVecPool();
  function WVector3(view, arg) {
    if (arg==undefined) {
        arg = undefined;
    }
    this.view = view;
    Vector3.call(this, arg);
  }
  /*test for IE bug*/;
  if (WVector3.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        WVector3.name = 'WVector3';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  WVector3 = inherit_multiple(WVector3, [Vector3], _es6_module, "WVector3");
  Object.defineProperty(WVector3.prototype, "2", {get: function() {
    return this.view[2];
  }, set: function(n) {
    this.view[2] = n;
  }, configurable: true});
  Object.defineProperty(WVector3.prototype, "1", {get: function() {
    return this.view[1];
  }, set: function(n) {
    this.view[1] = n;
  }, configurable: true});
  Object.defineProperty(WVector3.prototype, "0", {get: function() {
    return this.view[0];
  }, set: function(n) {
    this.view[0] = n;
  }, configurable: true});
  _es6_module.add_class(WVector3);
  var cos=Math.cos;
  var sin=Math.sin;
  function rot2d(vec, A, axis) {
    if (axis==undefined) {
        axis = 0;
    }
    var x=vec[0];
    var y=vec[1];
    if (axis==1) {
        vec[0] = x*cos(A)+y*sin(A);
        vec[1] = y*cos(A)-x*sin(A);
    }
    else {
      vec[0] = x*cos(A)-y*sin(A);
      vec[1] = y*cos(A)+x*sin(A);
    }
    return vec;
  }
  rot2d = _es6_module.add_export('rot2d', rot2d);
});
es6_module_define('vectormath', ["util"], function _vectormath_module(_es6_module) {
  "use strict";
  var util=es6_import(_es6_module, 'util');
  var sin=Math.sin, cos=Math.cos, abs=Math.abs, log=Math.log, asin=Math.asin, exp=Math.exp, acos=Math.acos, fract=Math.fract, sign=Math.sign, tent=Math.tent, atan2=Math.atan2, atan=Math.atan, pow=Math.pow, sqrt=Math.sqrt, floor=Math.floor, ceil=Math.ceil, min=Math.min, max=Math.max, PI=Math.PI, E=2.718281828459045;
  var M_SQRT2=Math.sqrt(2.0);
  var FLT_EPSILON=2.22e-16;
  var DOT_NORM_SNAP_LIMIT=1e-11;
  var basic_funcs={zero: [[], "0.0;"], negate: [[], "-this[X];"], loadXYZ: [["x", "y", "z"], "arguments[X]"], combine: [["b", "u", "v"], "this[X]*u + this[X]*v;"], interp: [["b", "t"], "this[X] + (b[X] - this[X])*t;"], add: [["b"], "this[X] + b[X];"], addFac: [["b", "F"], "this[X] + b[X]*F;"], sub: [["b"], "this[X] - b[X];"], mul: [["b"], "this[X] * b[X];"], div: [["b"], "this[X] / b[X];"], mulScalar: [["b"], "this[X] * b;"], divScalar: [["b"], "this[X] / b;"], addScalar: [["b"], "this[X] + b;"], subScalar: [["b"], "this[X] - b;"], ceil: [[], "Math.ceil(this[X])"], floor: [[], "Math.floor(this[X])"], abs: [[], "Math.abs(this[X])"], min: [[], "Math.min(this[X])"], max: [[], "Math.max(this[X])"], clamp: [["MIN", "MAX"], "min(max(this[X], MAX), MIN)"]}
  function bounded_acos(fac) {
    if (fac<=-1.0)
      return Math.pi;
    else 
      if (fac>=1.0)
      return 0.0;
    else 
      return Math.acos(fac);
  }
  function saasin(fac) {
    if (fac<=-1.0)
      return -Math.pi/2.0;
    else 
      if (fac>=1.0)
      return Math.pi/2.0;
    else 
      return Math.asin(fac);
  }
  var HasCSSMatrix=false;
  var HasCSSMatrixCopy=false;
  var M_SQRT2=Math.sqrt(2.0);
  var FLT_EPSILON=2.22e-16;
  function internal_matrix() {
    this.m11 = 0.0;
    this.m12 = 0.0;
    this.m13 = 0.0;
    this.m14 = 0.0;
    this.m21 = 0.0;
    this.m22 = 0.0;
    this.m23 = 0.0;
    this.m24 = 0.0;
    this.m31 = 0.0;
    this.m32 = 0.0;
    this.m33 = 0.0;
    this.m34 = 0.0;
    this.m41 = 0.0;
    this.m42 = 0.0;
    this.m43 = 0.0;
    this.m44 = 0.0;
  }
  function Matrix4(m) {
    if (HasCSSMatrix)
      this.$matrix = new WebKitCSSMatrix;
    else 
      this.$matrix = new internal_matrix();
    this.isPersp = false;
    if (typeof m=='object') {
        if ("length" in m&&m.length>=16) {
            this.load(m);
            return ;
        }
        else 
          if (__instance_of(m, Matrix4)) {
            this.load(m);
            return ;
        }
    }
    this.makeIdentity();
  }
  /*test for IE bug*/;
  if (Matrix4.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Matrix4.name = 'Matrix4';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Matrix4 = create_prototype(Matrix4, _es6_module, "Matrix4");
  Matrix4.prototype.clone = function() {
    return new Matrix4(this);
  }
  Matrix4.prototype.load = function() {
    if (arguments.length==1&&typeof arguments[0]=='object') {
        var matrix;
        if (__instance_of(arguments[0], Matrix4)) {
            matrix = arguments[0].$matrix;
            this.isPersp = arguments[0].isPersp;
            this.$matrix.m11 = matrix.m11;
            this.$matrix.m12 = matrix.m12;
            this.$matrix.m13 = matrix.m13;
            this.$matrix.m14 = matrix.m14;
            this.$matrix.m21 = matrix.m21;
            this.$matrix.m22 = matrix.m22;
            this.$matrix.m23 = matrix.m23;
            this.$matrix.m24 = matrix.m24;
            this.$matrix.m31 = matrix.m31;
            this.$matrix.m32 = matrix.m32;
            this.$matrix.m33 = matrix.m33;
            this.$matrix.m34 = matrix.m34;
            this.$matrix.m41 = matrix.m41;
            this.$matrix.m42 = matrix.m42;
            this.$matrix.m43 = matrix.m43;
            this.$matrix.m44 = matrix.m44;
            return this;
        }
        else 
          matrix = arguments[0];
        if ("length" in matrix&&matrix.length>=16) {
            this.$matrix.m11 = matrix[0];
            this.$matrix.m12 = matrix[1];
            this.$matrix.m13 = matrix[2];
            this.$matrix.m14 = matrix[3];
            this.$matrix.m21 = matrix[4];
            this.$matrix.m22 = matrix[5];
            this.$matrix.m23 = matrix[6];
            this.$matrix.m24 = matrix[7];
            this.$matrix.m31 = matrix[8];
            this.$matrix.m32 = matrix[9];
            this.$matrix.m33 = matrix[10];
            this.$matrix.m34 = matrix[11];
            this.$matrix.m41 = matrix[12];
            this.$matrix.m42 = matrix[13];
            this.$matrix.m43 = matrix[14];
            this.$matrix.m44 = matrix[15];
            return this;
        }
    }
    this.makeIdentity();
    return this;
  }
  Matrix4.prototype.toJSON = function() {
    return {isPersp: this.isPersp, items: this.getAsArray()}
  }
  define_static(Matrix4, "fromJSON", function(json) {
    var mat=new Matrix4();
    mat.load(json.items);
    mat.isPersp = json.isPersp;
    return mat;
  });
  Matrix4.prototype.getAsArray = function() {
    return [this.$matrix.m11, this.$matrix.m12, this.$matrix.m13, this.$matrix.m14, this.$matrix.m21, this.$matrix.m22, this.$matrix.m23, this.$matrix.m24, this.$matrix.m31, this.$matrix.m32, this.$matrix.m33, this.$matrix.m34, this.$matrix.m41, this.$matrix.m42, this.$matrix.m43, this.$matrix.m44];
  }
  Matrix4.prototype.getAsFloat32Array = function() {
    if (HasCSSMatrixCopy) {
        var array=new Float32Array(16);
        this.$matrix.copy(array);
        return array;
    }
    return new Float32Array(this.getAsArray());
  }
  Matrix4.prototype.setUniform = function(ctx, loc, transpose) {
    if (Matrix4.setUniformArray==undefined) {
        Matrix4.setUniformWebGLArray = new Float32Array(16);
        Matrix4.setUniformArray = new Array(16);
    }
    if (HasCSSMatrixCopy)
      this.$matrix.copy(Matrix4.setUniformWebGLArray);
    else {
      Matrix4.setUniformArray[0] = this.$matrix.m11;
      Matrix4.setUniformArray[1] = this.$matrix.m12;
      Matrix4.setUniformArray[2] = this.$matrix.m13;
      Matrix4.setUniformArray[3] = this.$matrix.m14;
      Matrix4.setUniformArray[4] = this.$matrix.m21;
      Matrix4.setUniformArray[5] = this.$matrix.m22;
      Matrix4.setUniformArray[6] = this.$matrix.m23;
      Matrix4.setUniformArray[7] = this.$matrix.m24;
      Matrix4.setUniformArray[8] = this.$matrix.m31;
      Matrix4.setUniformArray[9] = this.$matrix.m32;
      Matrix4.setUniformArray[10] = this.$matrix.m33;
      Matrix4.setUniformArray[11] = this.$matrix.m34;
      Matrix4.setUniformArray[12] = this.$matrix.m41;
      Matrix4.setUniformArray[13] = this.$matrix.m42;
      Matrix4.setUniformArray[14] = this.$matrix.m43;
      Matrix4.setUniformArray[15] = this.$matrix.m44;
      Matrix4.setUniformWebGLArray.set(Matrix4.setUniformArray);
    }
    ctx.uniformMatrix4fv(loc, transpose, Matrix4.setUniformWebGLArray);
  }
  Matrix4.prototype.makeIdentity = function() {
    this.$matrix.m11 = 1;
    this.$matrix.m12 = 0;
    this.$matrix.m13 = 0;
    this.$matrix.m14 = 0;
    this.$matrix.m21 = 0;
    this.$matrix.m22 = 1;
    this.$matrix.m23 = 0;
    this.$matrix.m24 = 0;
    this.$matrix.m31 = 0;
    this.$matrix.m32 = 0;
    this.$matrix.m33 = 1;
    this.$matrix.m34 = 0;
    this.$matrix.m41 = 0;
    this.$matrix.m42 = 0;
    this.$matrix.m43 = 0;
    this.$matrix.m44 = 1;
  }
  Matrix4.prototype.transpose = function() {
    var tmp=this.$matrix.m12;
    this.$matrix.m12 = this.$matrix.m21;
    this.$matrix.m21 = tmp;
    tmp = this.$matrix.m13;
    this.$matrix.m13 = this.$matrix.m31;
    this.$matrix.m31 = tmp;
    tmp = this.$matrix.m14;
    this.$matrix.m14 = this.$matrix.m41;
    this.$matrix.m41 = tmp;
    tmp = this.$matrix.m23;
    this.$matrix.m23 = this.$matrix.m32;
    this.$matrix.m32 = tmp;
    tmp = this.$matrix.m24;
    this.$matrix.m24 = this.$matrix.m42;
    this.$matrix.m42 = tmp;
    tmp = this.$matrix.m34;
    this.$matrix.m34 = this.$matrix.m43;
    this.$matrix.m43 = tmp;
  }
  Matrix4.prototype.invert = function() {
    if (HasCSSMatrix) {
        this.$matrix = this.$matrix.inverse();
        return ;
    }
    var det=this._determinant4x4();
    if (Math.abs(det)<1e-08)
      return null;
    this._makeAdjoint();
    this.$matrix.m11/=det;
    this.$matrix.m12/=det;
    this.$matrix.m13/=det;
    this.$matrix.m14/=det;
    this.$matrix.m21/=det;
    this.$matrix.m22/=det;
    this.$matrix.m23/=det;
    this.$matrix.m24/=det;
    this.$matrix.m31/=det;
    this.$matrix.m32/=det;
    this.$matrix.m33/=det;
    this.$matrix.m34/=det;
    this.$matrix.m41/=det;
    this.$matrix.m42/=det;
    this.$matrix.m43/=det;
    this.$matrix.m44/=det;
  }
  Matrix4.prototype.translate = function(x, y, z) {
    if (typeof x=='object'&&"length" in x) {
        var t=x;
        x = t[0];
        y = t[1];
        z = t[2];
    }
    else {
      if (x==undefined)
        x = 0;
      if (y==undefined)
        y = 0;
      if (z==undefined)
        z = 0;
    }
    if (HasCSSMatrix) {
        this.$matrix = this.$matrix.translate(x, y, z);
        return ;
    }
    var matrix=new Matrix4();
    matrix.$matrix.m41 = x;
    matrix.$matrix.m42 = y;
    matrix.$matrix.m43 = z;
    this.multiply(matrix);
  }
  Matrix4.prototype.scale = function(x, y, z) {
    if (typeof x=='object'&&"length" in x) {
        var t=x;
        x = t[0];
        y = t[1];
        z = t[2];
    }
    else {
      if (x==undefined)
        x = 1;
      if (z==undefined) {
          if (y==undefined) {
              y = x;
              z = x;
          }
          else 
            z = 1;
      }
      else 
        if (y==undefined)
        y = x;
    }
    if (HasCSSMatrix) {
        this.$matrix = this.$matrix.scale(x, y, z);
        return ;
    }
    var matrix=new Matrix4();
    matrix.$matrix.m11 = x;
    matrix.$matrix.m22 = y;
    matrix.$matrix.m33 = z;
    this.multiply(matrix);
  }
  Matrix4.prototype.euler_rotate = function(x, y, z, order) {
    if (order==undefined)
      order = "xyz";
    else 
      order = order.toLowerCase();
    var xmat=new Matrix4();
    var m=xmat.$matrix;
    var c=Math.cos(x), s=Math.sin(x);
    m.m22 = c;
    m.m23 = s;
    m.m32 = -s;
    m.m33 = c;
    var ymat=new Matrix4();
    c = Math.cos(y);
    s = Math.sin(y);
    var m=ymat.$matrix;
    m.m11 = c;
    m.m13 = s;
    m.m31 = -s;
    m.m33 = c;
    ymat.multiply(xmat);
    var zmat=new Matrix4();
    c = Math.cos(z);
    s = Math.sin(z);
    var m=zmat.$matrix;
    m.m11 = c;
    m.m12 = -s;
    m.m21 = s;
    m.m22 = c;
    zmat.multiply(ymat);
    this.preMultiply(zmat);
  }
  Matrix4.prototype.toString = function() {
    var s="";
    var m=this.$matrix;
    function dec(d) {
      var ret=d.toFixed(3);
      if (ret[0]!="-")
        ret = " "+ret;
      return ret;
    }
    s = dec(m.m11)+", "+dec(m.m12)+", "+dec(m.m13)+", "+dec(m.m14)+"\n";
    s+=dec(m.m21)+", "+dec(m.m22)+", "+dec(m.m23)+", "+dec(m.m24)+"\n";
    s+=dec(m.m31)+", "+dec(m.m32)+", "+dec(m.m33)+", "+dec(m.m34)+"\n";
    s+=dec(m.m41)+", "+dec(m.m42)+", "+dec(m.m43)+", "+dec(m.m44)+"\n";
    return s;
  }
  Matrix4.prototype.rotate = function(angle, x, y, z) {
    if (typeof x=='object'&&"length" in x) {
        var t=x;
        x = t[0];
        y = t[1];
        z = t[2];
    }
    else {
      if (arguments.length==1) {
          x = 0;
          y = 0;
          z = 1;
      }
      else 
        if (arguments.length==3) {
          this.rotate(angle, 1, 0, 0);
          this.rotate(x, 0, 1, 0);
          this.rotate(y, 0, 0, 1);
          return ;
      }
    }
    if (HasCSSMatrix) {
        this.$matrix = this.$matrix.rotateAxisAngle(x, y, z, angle);
        return ;
    }
    angle/=2;
    var sinA=Math.sin(angle);
    var cosA=Math.cos(angle);
    var sinA2=sinA*sinA;
    var len=Math.sqrt(x*x+y*y+z*z);
    if (len==0) {
        x = 0;
        y = 0;
        z = 1;
    }
    else 
      if (len!=1) {
        x/=len;
        y/=len;
        z/=len;
    }
    var mat=new Matrix4();
    if (x==1&&y==0&&z==0) {
        mat.$matrix.m11 = 1;
        mat.$matrix.m12 = 0;
        mat.$matrix.m13 = 0;
        mat.$matrix.m21 = 0;
        mat.$matrix.m22 = 1-2*sinA2;
        mat.$matrix.m23 = 2*sinA*cosA;
        mat.$matrix.m31 = 0;
        mat.$matrix.m32 = -2*sinA*cosA;
        mat.$matrix.m33 = 1-2*sinA2;
        mat.$matrix.m14 = mat.$matrix.m24 = mat.$matrix.m34 = 0;
        mat.$matrix.m41 = mat.$matrix.m42 = mat.$matrix.m43 = 0;
        mat.$matrix.m44 = 1;
    }
    else 
      if (x==0&&y==1&&z==0) {
        mat.$matrix.m11 = 1-2*sinA2;
        mat.$matrix.m12 = 0;
        mat.$matrix.m13 = -2*sinA*cosA;
        mat.$matrix.m21 = 0;
        mat.$matrix.m22 = 1;
        mat.$matrix.m23 = 0;
        mat.$matrix.m31 = 2*sinA*cosA;
        mat.$matrix.m32 = 0;
        mat.$matrix.m33 = 1-2*sinA2;
        mat.$matrix.m14 = mat.$matrix.m24 = mat.$matrix.m34 = 0;
        mat.$matrix.m41 = mat.$matrix.m42 = mat.$matrix.m43 = 0;
        mat.$matrix.m44 = 1;
    }
    else 
      if (x==0&&y==0&&z==1) {
        mat.$matrix.m11 = 1-2*sinA2;
        mat.$matrix.m12 = 2*sinA*cosA;
        mat.$matrix.m13 = 0;
        mat.$matrix.m21 = -2*sinA*cosA;
        mat.$matrix.m22 = 1-2*sinA2;
        mat.$matrix.m23 = 0;
        mat.$matrix.m31 = 0;
        mat.$matrix.m32 = 0;
        mat.$matrix.m33 = 1;
        mat.$matrix.m14 = mat.$matrix.m24 = mat.$matrix.m34 = 0;
        mat.$matrix.m41 = mat.$matrix.m42 = mat.$matrix.m43 = 0;
        mat.$matrix.m44 = 1;
    }
    else {
      var x2=x*x;
      var y2=y*y;
      var z2=z*z;
      mat.$matrix.m11 = 1-2*(y2+z2)*sinA2;
      mat.$matrix.m12 = 2*(x*y*sinA2+z*sinA*cosA);
      mat.$matrix.m13 = 2*(x*z*sinA2-y*sinA*cosA);
      mat.$matrix.m21 = 2*(y*x*sinA2-z*sinA*cosA);
      mat.$matrix.m22 = 1-2*(z2+x2)*sinA2;
      mat.$matrix.m23 = 2*(y*z*sinA2+x*sinA*cosA);
      mat.$matrix.m31 = 2*(z*x*sinA2+y*sinA*cosA);
      mat.$matrix.m32 = 2*(z*y*sinA2-x*sinA*cosA);
      mat.$matrix.m33 = 1-2*(x2+y2)*sinA2;
      mat.$matrix.m14 = mat.$matrix.m24 = mat.$matrix.m34 = 0;
      mat.$matrix.m41 = mat.$matrix.m42 = mat.$matrix.m43 = 0;
      mat.$matrix.m44 = 1;
    }
    this.multiply(mat);
  }
  Matrix4.prototype.preMultiply = function(mat) {
    var tmp=new Matrix4();
    tmp.multiply(this);
    tmp.multiply(mat);
    this.load(tmp);
  }
  Matrix4.prototype.multiply = function(mat) {
    if (HasCSSMatrix) {
        this.$matrix = this.$matrix.multiply(mat.$matrix);
        return ;
    }
    var m11=(mat.$matrix.m11*this.$matrix.m11+mat.$matrix.m12*this.$matrix.m21+mat.$matrix.m13*this.$matrix.m31+mat.$matrix.m14*this.$matrix.m41);
    var m12=(mat.$matrix.m11*this.$matrix.m12+mat.$matrix.m12*this.$matrix.m22+mat.$matrix.m13*this.$matrix.m32+mat.$matrix.m14*this.$matrix.m42);
    var m13=(mat.$matrix.m11*this.$matrix.m13+mat.$matrix.m12*this.$matrix.m23+mat.$matrix.m13*this.$matrix.m33+mat.$matrix.m14*this.$matrix.m43);
    var m14=(mat.$matrix.m11*this.$matrix.m14+mat.$matrix.m12*this.$matrix.m24+mat.$matrix.m13*this.$matrix.m34+mat.$matrix.m14*this.$matrix.m44);
    var m21=(mat.$matrix.m21*this.$matrix.m11+mat.$matrix.m22*this.$matrix.m21+mat.$matrix.m23*this.$matrix.m31+mat.$matrix.m24*this.$matrix.m41);
    var m22=(mat.$matrix.m21*this.$matrix.m12+mat.$matrix.m22*this.$matrix.m22+mat.$matrix.m23*this.$matrix.m32+mat.$matrix.m24*this.$matrix.m42);
    var m23=(mat.$matrix.m21*this.$matrix.m13+mat.$matrix.m22*this.$matrix.m23+mat.$matrix.m23*this.$matrix.m33+mat.$matrix.m24*this.$matrix.m43);
    var m24=(mat.$matrix.m21*this.$matrix.m14+mat.$matrix.m22*this.$matrix.m24+mat.$matrix.m23*this.$matrix.m34+mat.$matrix.m24*this.$matrix.m44);
    var m31=(mat.$matrix.m31*this.$matrix.m11+mat.$matrix.m32*this.$matrix.m21+mat.$matrix.m33*this.$matrix.m31+mat.$matrix.m34*this.$matrix.m41);
    var m32=(mat.$matrix.m31*this.$matrix.m12+mat.$matrix.m32*this.$matrix.m22+mat.$matrix.m33*this.$matrix.m32+mat.$matrix.m34*this.$matrix.m42);
    var m33=(mat.$matrix.m31*this.$matrix.m13+mat.$matrix.m32*this.$matrix.m23+mat.$matrix.m33*this.$matrix.m33+mat.$matrix.m34*this.$matrix.m43);
    var m34=(mat.$matrix.m31*this.$matrix.m14+mat.$matrix.m32*this.$matrix.m24+mat.$matrix.m33*this.$matrix.m34+mat.$matrix.m34*this.$matrix.m44);
    var m41=(mat.$matrix.m41*this.$matrix.m11+mat.$matrix.m42*this.$matrix.m21+mat.$matrix.m43*this.$matrix.m31+mat.$matrix.m44*this.$matrix.m41);
    var m42=(mat.$matrix.m41*this.$matrix.m12+mat.$matrix.m42*this.$matrix.m22+mat.$matrix.m43*this.$matrix.m32+mat.$matrix.m44*this.$matrix.m42);
    var m43=(mat.$matrix.m41*this.$matrix.m13+mat.$matrix.m42*this.$matrix.m23+mat.$matrix.m43*this.$matrix.m33+mat.$matrix.m44*this.$matrix.m43);
    var m44=(mat.$matrix.m41*this.$matrix.m14+mat.$matrix.m42*this.$matrix.m24+mat.$matrix.m43*this.$matrix.m34+mat.$matrix.m44*this.$matrix.m44);
    this.$matrix.m11 = m11;
    this.$matrix.m12 = m12;
    this.$matrix.m13 = m13;
    this.$matrix.m14 = m14;
    this.$matrix.m21 = m21;
    this.$matrix.m22 = m22;
    this.$matrix.m23 = m23;
    this.$matrix.m24 = m24;
    this.$matrix.m31 = m31;
    this.$matrix.m32 = m32;
    this.$matrix.m33 = m33;
    this.$matrix.m34 = m34;
    this.$matrix.m41 = m41;
    this.$matrix.m42 = m42;
    this.$matrix.m43 = m43;
    this.$matrix.m44 = m44;
  }
  Matrix4.prototype.divide = function(divisor) {
    this.$matrix.m11/=divisor;
    this.$matrix.m12/=divisor;
    this.$matrix.m13/=divisor;
    this.$matrix.m14/=divisor;
    this.$matrix.m21/=divisor;
    this.$matrix.m22/=divisor;
    this.$matrix.m23/=divisor;
    this.$matrix.m24/=divisor;
    this.$matrix.m31/=divisor;
    this.$matrix.m32/=divisor;
    this.$matrix.m33/=divisor;
    this.$matrix.m34/=divisor;
    this.$matrix.m41/=divisor;
    this.$matrix.m42/=divisor;
    this.$matrix.m43/=divisor;
    this.$matrix.m44/=divisor;
  }
  Matrix4.prototype.ortho = function(left, right, bottom, top, near, far) {
    var tx=(left+right)/(left-right);
    var ty=(top+bottom)/(top-bottom);
    var tz=(far+near)/(far-near);
    var matrix=new Matrix4();
    matrix.$matrix.m11 = 2/(left-right);
    matrix.$matrix.m12 = 0;
    matrix.$matrix.m13 = 0;
    matrix.$matrix.m14 = 0;
    matrix.$matrix.m21 = 0;
    matrix.$matrix.m22 = 2/(top-bottom);
    matrix.$matrix.m23 = 0;
    matrix.$matrix.m24 = 0;
    matrix.$matrix.m31 = 0;
    matrix.$matrix.m32 = 0;
    matrix.$matrix.m33 = -2/(far-near);
    matrix.$matrix.m34 = 0;
    matrix.$matrix.m41 = tx;
    matrix.$matrix.m42 = ty;
    matrix.$matrix.m43 = tz;
    matrix.$matrix.m44 = 1;
    this.multiply(matrix);
  }
  Matrix4.prototype.frustum = function(left, right, bottom, top, near, far) {
    var matrix=new Matrix4();
    var A=(right+left)/(right-left);
    var B=(top+bottom)/(top-bottom);
    var C=-(far+near)/(far-near);
    var D=-(2*far*near)/(far-near);
    matrix.$matrix.m11 = (2*near)/(right-left);
    matrix.$matrix.m12 = 0;
    matrix.$matrix.m13 = 0;
    matrix.$matrix.m14 = 0;
    matrix.$matrix.m21 = 0;
    matrix.$matrix.m22 = 2*near/(top-bottom);
    matrix.$matrix.m23 = 0;
    matrix.$matrix.m24 = 0;
    matrix.$matrix.m31 = A;
    matrix.$matrix.m32 = B;
    matrix.$matrix.m33 = C;
    matrix.$matrix.m34 = -1;
    matrix.$matrix.m41 = 0;
    matrix.$matrix.m42 = 0;
    matrix.$matrix.m43 = D;
    matrix.$matrix.m44 = 0;
    this.isPersp = true;
    this.multiply(matrix);
  }
  Matrix4.prototype.perspective = function(fovy, aspect, zNear, zFar) {
    var top=Math.tan(fovy*Math.PI/360)*zNear;
    var bottom=-top;
    var left=aspect*bottom;
    var right=aspect*top;
    this.frustum(left, right, bottom, top, zNear, zFar);
  }
  Matrix4.prototype.lookat = function(eyex, eyey, eyez, centerx, centery, centerz, upx, upy, upz) {
    if (typeof eyez=='object'&&"length" in eyez) {
        var t=eyez;
        upx = t[0];
        upy = t[1];
        upz = t[2];
        t = eyey;
        centerx = t[0];
        centery = t[1];
        centerz = t[2];
        t = eyex;
        eyex = t[0];
        eyey = t[1];
        eyez = t[2];
    }
    var matrix=new Matrix4();
    var zx=eyex-centerx;
    var zy=eyey-centery;
    var zz=eyez-centerz;
    var mag=Math.sqrt(zx*zx+zy*zy+zz*zz);
    if (mag) {
        zx/=mag;
        zy/=mag;
        zz/=mag;
    }
    var yx=upx;
    var yy=upy;
    var yz=upz;
    var xx, xy, xz;
    xx = yy*zz-yz*zy;
    xy = -yx*zz+yz*zx;
    xz = yx*zy-yy*zx;
    yx = zy*xz-zz*xy;
    yy = -zx*xz+zz*xx;
    yx = zx*xy-zy*xx;
    mag = Math.sqrt(xx*xx+xy*xy+xz*xz);
    if (mag) {
        xx/=mag;
        xy/=mag;
        xz/=mag;
    }
    mag = Math.sqrt(yx*yx+yy*yy+yz*yz);
    if (mag) {
        yx/=mag;
        yy/=mag;
        yz/=mag;
    }
    matrix.$matrix.m11 = xx;
    matrix.$matrix.m12 = xy;
    matrix.$matrix.m13 = xz;
    matrix.$matrix.m14 = 0;
    matrix.$matrix.m21 = yx;
    matrix.$matrix.m22 = yy;
    matrix.$matrix.m23 = yz;
    matrix.$matrix.m24 = 0;
    matrix.$matrix.m31 = zx;
    matrix.$matrix.m32 = zy;
    matrix.$matrix.m33 = zz;
    matrix.$matrix.m34 = 0;
    matrix.$matrix.m41 = 0;
    matrix.$matrix.m42 = 0;
    matrix.$matrix.m43 = 0;
    matrix.$matrix.m44 = 1;
    matrix.translate(-eyex, -eyey, -eyez);
    this.multiply(matrix);
  }
  Matrix4.prototype.decompose = function(_translate, _rotate, _scale, _skew, _perspective) {
    if (this.$matrix.m44==0)
      return false;
    var translate, rotate, scale, skew, perspective;
    var translate=(_translate==undefined||!("length" in _translate)) ? new Vector3 : _translate;
    var rotate=(_rotate==undefined||!("length" in _rotate)) ? new Vector3 : _rotate;
    var scale=(_scale==undefined||!("length" in _scale)) ? new Vector3 : _scale;
    var skew=(_skew==undefined||!("length" in _skew)) ? new Vector3 : _skew;
    var perspective=(_perspective==undefined||!("length" in _perspective)) ? new Array(4) : _perspective;
    var matrix=new Matrix4(this);
    matrix.divide(matrix.$matrix.m44);
    var perspectiveMatrix=new Matrix4(matrix);
    perspectiveMatrix.$matrix.m14 = 0;
    perspectiveMatrix.$matrix.m24 = 0;
    perspectiveMatrix.$matrix.m34 = 0;
    perspectiveMatrix.$matrix.m44 = 1;
    if (perspectiveMatrix._determinant4x4()==0)
      return false;
    if (matrix.$matrix.m14!=0||matrix.$matrix.m24!=0||matrix.$matrix.m34!=0) {
        var rightHandSide=[matrix.$matrix.m14, matrix.$matrix.m24, matrix.$matrix.m34, matrix.$matrix.m44];
        var inversePerspectiveMatrix=new Matrix4(perspectiveMatrix);
        inversePerspectiveMatrix.invert();
        var transposedInversePerspectiveMatrix=new Matrix4(inversePerspectiveMatrix);
        transposedInversePerspectiveMatrix.transpose();
        var v4=new Vector3(rightHandSide);
        v4.multVecMatrix(transposedInversePerspectiveMatrix);
        perspective[0] = v4[0];
        perspective[1] = v4[1];
        perspective[2] = v4[2];
        perspective[3] = v4[3];
        matrix.$matrix.m14 = matrix.$matrix.m24 = matrix.$matrix.m34 = 0;
        matrix.$matrix.m44 = 1;
    }
    else {
      perspective[0] = perspective[1] = perspective[2] = 0;
      perspective[3] = 1;
    }
    translate[0] = matrix.$matrix.m41;
    matrix.$matrix.m41 = 0;
    translate[1] = matrix.$matrix.m42;
    matrix.$matrix.m42 = 0;
    translate[2] = matrix.$matrix.m43;
    matrix.$matrix.m43 = 0;
    var row0=new Vector3([matrix.$matrix.m11, matrix.$matrix.m12, matrix.$matrix.m13]);
    var row1=new Vector3([matrix.$matrix.m21, matrix.$matrix.m22, matrix.$matrix.m23]);
    var row2=new Vector3([matrix.$matrix.m31, matrix.$matrix.m32, matrix.$matrix.m33]);
    scale[0] = row0.vectorLength();
    row0.divide(scale[0]);
    skew[0] = row0.dot(row1);
    row1.combine(row0, 1.0, -skew[0]);
    scale[1] = row1.vectorLength();
    row1.divide(scale[1]);
    skew[0]/=scale[1];
    skew[1] = row1.dot(row2);
    row2.combine(row0, 1.0, -skew[1]);
    skew[2] = row1.dot(row2);
    row2.combine(row1, 1.0, -skew[2]);
    scale[2] = row2.vectorLength();
    row2.divide(scale[2]);
    skew[1]/=scale[2];
    skew[2]/=scale[2];
    var pdum3=new Vector3(row1);
    pdum3.cross(row2);
    if (row0.dot(pdum3)<0) {
        for (var i=0; i<3; i++) {
            scale[i]*=-1;
            row[0][i]*=-1;
            row[1][i]*=-1;
            row[2][i]*=-1;
        }
    }
    rotate[1] = Math.asin(-row0[2]);
    if (Math.cos(rotate[1])!=0) {
        rotate[0] = Math.atan2(row1[2], row2[2]);
        rotate[2] = Math.atan2(row0[1], row0[0]);
    }
    else {
      rotate[0] = Math.atan2(-row2[0], row1[1]);
      rotate[2] = 0;
    }
    var rad2deg=180/Math.PI;
    rotate[0]*=rad2deg;
    rotate[1]*=rad2deg;
    rotate[2]*=rad2deg;
    return true;
  }
  Matrix4.prototype._determinant2x2 = function(a, b, c, d) {
    return a*d-b*c;
  }
  Matrix4.prototype._determinant3x3 = function(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
    return a1*this._determinant2x2(b2, b3, c2, c3)-b1*this._determinant2x2(a2, a3, c2, c3)+c1*this._determinant2x2(a2, a3, b2, b3);
  }
  Matrix4.prototype._determinant4x4 = function() {
    var a1=this.$matrix.m11;
    var b1=this.$matrix.m12;
    var c1=this.$matrix.m13;
    var d1=this.$matrix.m14;
    var a2=this.$matrix.m21;
    var b2=this.$matrix.m22;
    var c2=this.$matrix.m23;
    var d2=this.$matrix.m24;
    var a3=this.$matrix.m31;
    var b3=this.$matrix.m32;
    var c3=this.$matrix.m33;
    var d3=this.$matrix.m34;
    var a4=this.$matrix.m41;
    var b4=this.$matrix.m42;
    var c4=this.$matrix.m43;
    var d4=this.$matrix.m44;
    return a1*this._determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4)-b1*this._determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4)+c1*this._determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4)-d1*this._determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
  }
  Matrix4.prototype._makeAdjoint = function() {
    var a1=this.$matrix.m11;
    var b1=this.$matrix.m12;
    var c1=this.$matrix.m13;
    var d1=this.$matrix.m14;
    var a2=this.$matrix.m21;
    var b2=this.$matrix.m22;
    var c2=this.$matrix.m23;
    var d2=this.$matrix.m24;
    var a3=this.$matrix.m31;
    var b3=this.$matrix.m32;
    var c3=this.$matrix.m33;
    var d3=this.$matrix.m34;
    var a4=this.$matrix.m41;
    var b4=this.$matrix.m42;
    var c4=this.$matrix.m43;
    var d4=this.$matrix.m44;
    this.$matrix.m11 = this._determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4);
    this.$matrix.m21 = -this._determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4);
    this.$matrix.m31 = this._determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4);
    this.$matrix.m41 = -this._determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
    this.$matrix.m12 = -this._determinant3x3(b1, b3, b4, c1, c3, c4, d1, d3, d4);
    this.$matrix.m22 = this._determinant3x3(a1, a3, a4, c1, c3, c4, d1, d3, d4);
    this.$matrix.m32 = -this._determinant3x3(a1, a3, a4, b1, b3, b4, d1, d3, d4);
    this.$matrix.m42 = this._determinant3x3(a1, a3, a4, b1, b3, b4, c1, c3, c4);
    this.$matrix.m13 = this._determinant3x3(b1, b2, b4, c1, c2, c4, d1, d2, d4);
    this.$matrix.m23 = -this._determinant3x3(a1, a2, a4, c1, c2, c4, d1, d2, d4);
    this.$matrix.m33 = this._determinant3x3(a1, a2, a4, b1, b2, b4, d1, d2, d4);
    this.$matrix.m43 = -this._determinant3x3(a1, a2, a4, b1, b2, b4, c1, c2, c4);
    this.$matrix.m14 = -this._determinant3x3(b1, b2, b3, c1, c2, c3, d1, d2, d3);
    this.$matrix.m24 = this._determinant3x3(a1, a2, a3, c1, c2, c3, d1, d2, d3);
    this.$matrix.m34 = -this._determinant3x3(a1, a2, a3, b1, b2, b3, d1, d2, d3);
    this.$matrix.m44 = this._determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3);
  }
  _es6_module.add_class(Matrix4);
  Matrix4 = _es6_module.add_export('Matrix4', Matrix4);
  function make_norm_safe_dot(cls) {
    var _dot=cls.prototype.dot;
    cls.prototype._dot = _dot;
    cls.prototype.dot = function(b) {
      var ret=_dot.call(this, b);
      if (ret>=1.0-DOT_NORM_SNAP_LIMIT&&ret<=1.0+DOT_NORM_SNAP_LIMIT)
        return 1.0;
      if (ret>=-1.0-DOT_NORM_SNAP_LIMIT&&ret<=-1.0+DOT_NORM_SNAP_LIMIT)
        return -1.0;
      return ret;
    }
  }
  function BaseVector(smaller_class) {
    Array.call(this);
  }
  /*test for IE bug*/;
  if (BaseVector.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BaseVector.name = 'BaseVector';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BaseVector = create_prototype(BaseVector, _es6_module, "BaseVector");
  BaseVector.prototype.load = function(data) {
    throw new Error("Implement me!");
  }
  BaseVector.prototype.init_swizzle = function(size) {
    var ret={}
    var cls=size==4 ? Vector4 : (size==3 ? Vector3 : Vector2);
    var __iter_k=__get_iter(cls.prototype);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var v=cls.prototype[k];
      if (typeof v!="function"&&!(__instance_of(v, Function)))
        continue;
      ret[k] = v.bind(this);
    }
    return ret;
  }
  BaseVector.prototype.vectorLength = function() {
    return sqrt(this.dot(this));
  }
  BaseVector.prototype.normalize = function() {
    var l=this.vectorLength();
    if (l>1e-08) {
        this.mulScalar(1.0/l);
    }
    return this;
  }
  define_static(BaseVector, "inherit", function(cls, vectorsize) {
    make_norm_safe_dot(cls);
    var f;
    var vectorDistance="f = function vectorDistance(b) {\n";
    for (var i=0; i<vectorsize; i++) {
        vectorDistance+="var d"+i+" = this["+i+"]-b["+i+"];\n";
    }
    vectorDistance+="return sqrt(";
    for (var i=0; i<vectorsize; i++) {
        if (i>0)
          vectorDistance+=" + ";
        vectorDistance+="d"+i+"*d"+i;
    }
    vectorDistance+=");\n";
    vectorDistance+="};";
    cls.prototype.vectorDistance = eval(vectorDistance);
    var __iter_k=__get_iter(basic_funcs);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var func=basic_funcs[k];
      var args=func[0];
      var line=func[1];
      var f;
      var code="f = function "+k+"(";
      for (var i=0; i<args.length; i++) {
          if (i>0)
            code+=", ";
          line = line.replace(args[i], args[i].toLowerCase());
          code+=args[i].toLowerCase();
      }
      code+=") {\n";
      for (var i=0; i<vectorsize; i++) {
          var line2=line.replace(/X/g, ""+i);
          code+="    this["+i+"] = "+line2+"\n";
      }
      code+="return this;";
      code+="}\n";
      var f=eval(code);
      cls.prototype[k] = f;
    }
  });
  _es6_module.add_class(BaseVector);
  BaseVector = _es6_module.add_export('BaseVector', BaseVector);
  function Vector4(data) {
    BaseVector.call(this);
    if (arguments.length>1) {
        throw new Error("unexpected argument");
    }
    this.length = 4;
    this[0] = this[1] = this[2] = this[3] = 0.0;
    if (data!=undefined) {
        this.load(data);
    }
  }
  /*test for IE bug*/;
  if (Vector4.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vector4.name = 'Vector4';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vector4 = inherit_multiple(Vector4, [BaseVector], _es6_module, "Vector4");
  Vector4.prototype.load = function(data) {
    if (data==undefined)
      return this;
    this[0] = data[0];
    this[1] = data[1];
    this[2] = data[2];
    this[3] = data[3];
    return this;
  }
  Vector4.prototype.dot = function(b) {
    return this[0]*b[0]+this[1]*b[1]+this[2]*b[2]+this[3]*b[3];
  }
  Vector4.prototype.mulVecQuat = function(q) {
    var t0=-this[1]*this[0]-this[2]*this[1]-this[3]*this[2];
    var t1=this[0]*this[0]+this[2]*this[2]-this[3]*this[1];
    var t2=this[0]*this[1]+this[3]*this[0]-this[1]*this[2];
    this[2] = this[0]*this[2]+this[1]*this[1]-this[2]*this[0];
    this[0] = t1;
    this[1] = t2;
    t1 = t0*-this[1]+this[0]*this[0]-this[1]*this[3]+this[2]*this[2];
    t2 = t0*-this[2]+this[1]*this[0]-this[2]*this[1]+this[0]*this[3];
    this[2] = t0*-this[3]+this[2]*this[0]-this[0]*this[2]+this[1]*this[1];
    this[0] = t1;
    this[1] = t2;
    return this;
  }
  Vector4.prototype.multVecMatrix = function(matrix) {
    var x=this[0];
    var y=this[1];
    var z=this[2];
    var w=this[3];
    this[0] = matrix.$matrix.m41+x*matrix.$matrix.m11+y*matrix.$matrix.m21+z*matrix.$matrix.m31+w*matrix.$matrix.m41;
    this[1] = matrix.$matrix.m42+x*matrix.$matrix.m12+y*matrix.$matrix.m22+z*matrix.$matrix.m32+w*matrix.$matrix.m42;
    this[2] = matrix.$matrix.m43+x*matrix.$matrix.m13+y*matrix.$matrix.m23+z*matrix.$matrix.m33+w*matrix.$matrix.m43;
    this[3] = w*matrix.$matrix.m44+x*matrix.$matrix.m14+y*matrix.$matrix.m24+z*matrix.$matrix.m34;
    return w;
  }
  Vector4.prototype.cross = function(v) {
    var x=this[1]*v[2]-this[2]*v[1];
    var y=this[2]*v[0]-this[0]*v[2];
    var z=this[0]*v[1]-this[1]*v[0];
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this;
  }
  Vector4.prototype.preNormalizedAngle = function(v2) {
    if (this.dot(v2)<0.0) {
        var vec=new Vector4();
        vec[0] = -v2[0];
        vec[1] = -v2[1];
        vec[2] = -v2[2];
        vec[3] = -v2[3];
        return Math.pi-2.0*saasin(vec.vectorDistance(this)/2.0);
    }
    else 
      return 2.0*saasin(v2.vectorDistance(this)/2.0);
  }
  _es6_module.add_class(Vector4);
  Vector4 = _es6_module.add_export('Vector4', Vector4);
  
  var _v3nd_n1_normalizedDot, _v3nd_n2_normalizedDot;
  var _v3nd4_n1_normalizedDot4, _v3nd4_n2_normalizedDot4;
  function Vector3(data) {
    BaseVector.call(this);
    if (arguments.length>1) {
        throw new Error("unexpected argument");
    }
    this.length = 3;
    this[0] = this[1] = this[2] = 0.0;
    if (data!=undefined) {
        this.load(data);
    }
  }
  /*test for IE bug*/;
  if (Vector3.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vector3.name = 'Vector3';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vector3 = inherit_multiple(Vector3, [BaseVector], _es6_module, "Vector3");
  Vector3.prototype.load = function(data) {
    if (data==undefined)
      return this;
    this[0] = data[0];
    this[1] = data[1];
    this[2] = data[2];
    return this;
  }
  Vector3.prototype.dot = function(b) {
    return this[0]*b[0]+this[1]*b[1]+this[2]*b[2];
  }
  Vector3.prototype.normalizedDot = function(v) {
    $_v3nd_n1_normalizedDot.load(this);
    $_v3nd_n2_normalizedDot.load(v);
    $_v3nd_n1_normalizedDot.normalize();
    $_v3nd_n2_normalizedDot.normalize();
    return $_v3nd_n1_normalizedDot.dot($_v3nd_n2_normalizedDot);
  }
  define_static(Vector3, "normalizedDot4", function(v1, v2, v3, v4) {
    $_v3nd4_n1_normalizedDot4.load(v2).sub(v1).normalize();
    $_v3nd4_n2_normalizedDot4.load(v4).sub(v3).normalize();
    return $_v3nd4_n1_normalizedDot4.dot($_v3nd4_n2_normalizedDot4);
  });
  Vector3.prototype.multVecMatrix = function(matrix, ignore_w) {
    if (ignore_w==undefined) {
        ignore_w = false;
    }
    var x=this[0];
    var y=this[1];
    var z=this[2];
    this[0] = matrix.$matrix.m41+x*matrix.$matrix.m11+y*matrix.$matrix.m21+z*matrix.$matrix.m31;
    this[1] = matrix.$matrix.m42+x*matrix.$matrix.m12+y*matrix.$matrix.m22+z*matrix.$matrix.m32;
    this[2] = matrix.$matrix.m43+x*matrix.$matrix.m13+y*matrix.$matrix.m23+z*matrix.$matrix.m33;
    var w=matrix.$matrix.m44+x*matrix.$matrix.m14+y*matrix.$matrix.m24+z*matrix.$matrix.m34;
    if (!ignore_w&&w!=1&&w!=0&&matrix.isPersp) {
        this[0]/=w;
        this[1]/=w;
        this[2]/=w;
    }
    return w;
  }
  Vector3.prototype.cross = function(v) {
    var x=this[1]*v[2]-this[2]*v[1];
    var y=this[2]*v[0]-this[0]*v[2];
    var z=this[0]*v[1]-this[1]*v[0];
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this;
  }
  Vector3.prototype.rot2d = function(A, axis) {
    var x=this[0];
    var y=this[1];
    if (axis==1) {
        this[0] = x*cos(A)+y*sin(A);
        this[1] = y*cos(A)-x*sin(A);
    }
    else {
      this[0] = x*cos(A)-y*sin(A);
      this[1] = y*cos(A)+x*sin(A);
    }
    return this;
  }
  Vector3.prototype.preNormalizedAngle = function(v2) {
    if (this.dot(v2)<0.0) {
        var vec=new Vector3();
        vec[0] = -v2[0];
        vec[1] = -v2[1];
        vec[2] = -v2[2];
        return Math.pi-2.0*saasin(vec.vectorDistance(this)/2.0);
    }
    else 
      return 2.0*saasin(v2.vectorDistance(this)/2.0);
  }
  _es6_module.add_class(Vector3);
  Vector3 = _es6_module.add_export('Vector3', Vector3);
  function Vector2(data) {
    BaseVector.call(this, undefined);
    if (arguments.length>1) {
        throw new Error("unexpected argument");
    }
    this.length = 2;
    this[0] = this[1] = this[2] = 0.0;
    if (data!=undefined) {
        this.load(data);
    }
  }
  /*test for IE bug*/;
  if (Vector2.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vector2.name = 'Vector2';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vector2 = inherit_multiple(Vector2, [BaseVector], _es6_module, "Vector2");
  Vector2.prototype.load = function(data) {
    if (data==undefined)
      return this;
    this[0] = data[0];
    this[1] = data[1];
    return this;
  }
  Vector2.prototype.rot2d = function(A, axis) {
    var x=this[0];
    var y=this[1];
    if (axis==1) {
        this[0] = x*cos(A)+y*sin(A);
        this[1] = y*cos(A)-x*sin(A);
    }
    else {
      this[0] = x*cos(A)-y*sin(A);
      this[1] = y*cos(A)+x*sin(A);
    }
    return this;
  }
  Vector2.prototype.dot = function(b) {
    return this[0]*b[0]+this[1]*b[1]+this[2]*b[2];
  }
  Vector2.prototype.mulVecQuat = function(q) {
    var t0=-this[1]*this[0]-this[2]*this[1]-this[3]*this[2];
    var t1=this[0]*this[0]+this[2]*this[2]-this[3]*this[1];
    var t2=this[0]*this[1]+this[3]*this[0]-this[1]*this[2];
    this[2] = this[0]*this[2]+this[1]*this[1]-this[2]*this[0];
    this[0] = t1;
    this[1] = t2;
    t1 = t0*-this[1]+this[0]*this[0]-this[1]*this[3]+this[2]*this[2];
    t2 = t0*-this[2]+this[1]*this[0]-this[2]*this[1]+this[0]*this[3];
    this[2] = t0*-this[3]+this[2]*this[0]-this[0]*this[2]+this[1]*this[1];
    this[0] = t1;
    this[1] = t2;
    return this;
  }
  _es6_module.add_class(Vector2);
  Vector2 = _es6_module.add_export('Vector2', Vector2);
  function Quat() {
    Vector4.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (Quat.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Quat.name = 'Quat';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Quat = inherit_multiple(Quat, [Vector4], _es6_module, "Quat");
  Quat.prototype.makeUnitQuat = function() {
    this[0] = 1.0;
    this[1] = this[2] = this[3] = 0.0;
  }
  Quat.prototype.isZero = function() {
    return (this[0]==0&&this[1]==0&&this[2]==0&&this[3]==0);
  }
  Quat.prototype.mulQuat = function(qt) {
    var a=this[0]*qt[0]-this[1]*qt[1]-this[2]*qt[2]-this[3]*qt[3];
    var b=this[0]*qt[1]+this[1]*qt[0]+this[2]*qt[3]-this[3]*qt[2];
    var c=this[0]*qt[2]+this[2]*qt[0]+this[3]*qt[1]-this[1]*qt[3];
    this[3] = this[0]*qt[3]+this[3]*qt[0]+this[1]*qt[2]-this[2]*qt[1];
    this[0] = a;
    this[1] = b;
    this[2] = c;
  }
  Quat.prototype.conjugate = function() {
    this[1] = -this[1];
    this[2] = -this[2];
    this[3] = -this[3];
  }
  Quat.prototype.dotWithQuat = function(q2) {
    return this[0]*q2[0]+this[1]*q2[1]+this[2]*q2[2]+this[3]*q2[3];
  }
  Quat.prototype.invert = function() {
    var f=this.dot(this);
    if (f==0.0)
      return ;
    conjugate_qt(q);
    this.mulscalar(1.0/f);
  }
  Quat.prototype.sub = function(q2) {
    var nq2=new Quat();
    nq2[0] = -q2[0];
    nq2[1] = q2[1];
    nq2[2] = q2[2];
    nq2[3] = q2[3];
    this.mul(nq2);
  }
  Quat.prototype.mulScalarWithFactor = function(fac) {
    var angle=fac*bounded_acos(this[0]);
    var co=Math.cos(angle);
    var si=Math.sin(angle);
    this[0] = co;
    var last3=Vector3([this[1], this[2], this[3]]);
    last3.normalize();
    last3.mulScalar(si);
    this[1] = last3[0];
    this[2] = last3[1];
    this[3] = last3[2];
    return this;
  }
  Quat.prototype.toMatrix = function() {
    var m=new Matrix4();
    var q0=M_SQRT2*this[0];
    var q1=M_SQRT2*this[1];
    var q2=M_SQRT2*this[2];
    var q3=M_SQRT2*this[3];
    var qda=q0*q1;
    var qdb=q0*q2;
    var qdc=q0*q3;
    var qaa=q1*q1;
    var qab=q1*q2;
    var qac=q1*q3;
    var qbb=q2*q2;
    var qbc=q2*q3;
    var qcc=q3*q3;
    m.$matrix.m11 = (1.0-qbb-qcc);
    m.$matrix.m12 = (qdc+qab);
    m.$matrix.m13 = (-qdb+qac);
    m.$matrix.m14 = 0.0;
    m.$matrix.m21 = (-qdc+qab);
    m.$matrix.m22 = (1.0-qaa-qcc);
    m.$matrix.m23 = (qda+qbc);
    m.$matrix.m24 = 0.0;
    m.$matrix.m31 = (qdb+qac);
    m.$matrix.m32 = (-qda+qbc);
    m.$matrix.m33 = (1.0-qaa-qbb);
    m.$matrix.m34 = 0.0;
    m.$matrix.m41 = m.$matrix.m42 = m.$matrix.m43 = 0.0;
    m.$matrix.m44 = 1.0;
    return m;
  }
  Quat.prototype.matrixToQuat = function(wmat) {
    var mat=new Matrix4(wmat);
    mat.$matrix.m41 = mat.$matrix.m42 = mat.$matrix.m43 = 0;
    mat.$matrix.m44 = 1.0;
    var r1=new Vector3([mat.$matrix.m11, mat.$matrix.m12, mat.$matrix.m13]);
    var r2=new Vector3([mat.$matrix.m21, mat.$matrix.m22, mat.$matrix.m23]);
    var r3=new Vector3([mat.$matrix.m31, mat.$matrix.m32, mat.$matrix.m33]);
    r1.normalize();
    r2.normalize();
    r3.normalize();
    mat.$matrix.m11 = r1[0];
    mat.$matrix.m12 = r1[1];
    mat.$matrix.m13 = r1[2];
    mat.$matrix.m21 = r2[0];
    mat.$matrix.m22 = r2[1];
    mat.$matrix.m23 = r2[2];
    mat.$matrix.m31 = r3[0];
    mat.$matrix.m32 = r3[1];
    mat.$matrix.m33 = r3[2];
    var tr=0.25*(1.0+mat.$matrix.m11+mat.$matrix.m22+mat.$matrix.m33);
    var s=0;
    if (tr>FLT_EPSILON) {
        s = Math.sqrt(tr);
        this[0] = s;
        s = 1.0/(4.0*s);
        this[1] = ((mat.$matrix.m23-mat.$matrix.m32)*s);
        this[2] = ((mat.$matrix.m31-mat.$matrix.m13)*s);
        this[3] = ((mat.$matrix.m12-mat.$matrix.m21)*s);
    }
    else {
      if (mat.$matrix.m11>mat.$matrix.m22&&mat.$matrix.m11>mat.$matrix.m33) {
          s = 2.0*Math.sqrt(1.0+mat.$matrix.m11-mat.$matrix.m22-mat.$matrix.m33);
          this[1] = (0.25*s);
          s = 1.0/s;
          this[0] = ((mat.$matrix.m32-mat.$matrix.m23)*s);
          this[2] = ((mat.$matrix.m21+mat.$matrix.m12)*s);
          this[3] = ((mat.$matrix.m31+mat.$matrix.m13)*s);
      }
      else 
        if (mat.$matrix.m22>mat.$matrix.m33) {
          s = 2.0*Math.sqrt(1.0+mat.$matrix.m22-mat.$matrix.m11-mat.$matrix.m33);
          this[2] = (0.25*s);
          s = 1.0/s;
          this[0] = ((mat.$matrix.m31-mat.$matrix.m13)*s);
          this[1] = ((mat.$matrix.m21+mat.$matrix.m12)*s);
          this[3] = ((mat.$matrix.m32+mat.$matrix.m23)*s);
      }
      else {
        s = 2.0*Math.sqrt(1.0+mat.$matrix.m33-mat.$matrix.m11-mat.$matrix.m22);
        this[3] = (0.25*s);
        s = 1.0/s;
        this[0] = ((mat.$matrix.m21-mat.$matrix.m12)*s);
        this[1] = ((mat.$matrix.m31+mat.$matrix.m13)*s);
        this[2] = ((mat.$matrix.m32+mat.$matrix.m23)*s);
      }
    }
    this.normalize();
  }
  Quat.prototype.normalize = function() {
    var len=Math.sqrt(this.dot(this));
    if (len!=0.0) {
        this.mulScalar(1.0/len);
    }
    else {
      this[1] = 1.0;
      this[0] = this[2] = this[3] = 0.0;
    }
    return this;
  }
  Quat.prototype.axisAngleToQuat = function(axis, angle) {
    var nor=new Vector3(axis);
    if (nor.normalize()!=0.0) {
        var phi=angle/2.0;
        var si=Math.sin(phi);
        this[0] = Math.cos(phi);
        this[1] = nor[0]*si;
        this[2] = nor[1]*si;
        this[3] = nor[2]*si;
    }
    else {
      this.makeUnitQuat();
    }
  }
  Quat.prototype.rotationBetweenVecs = function(v1, v2) {
    v1 = new Vector3(v1);
    v2 = new Vector3(v2);
    v1.normalize();
    v2.normalize();
    var axis=new Vector3(v1);
    axis.cross(v2);
    var angle=v1.preNormalizedAngle(v2);
    this.axisAngleToQuat(axis, angle);
  }
  Quat.prototype.quatInterp = function(quat2, t) {
    var quat=new Quat();
    var cosom=this[0]*quat2[0]+this[1]*quat2[1]+this[2]*quat2[2]+this[3]*quat2[3];
    if (cosom<0.0) {
        cosom = -cosom;
        quat[0] = -this[0];
        quat[1] = -this[1];
        quat[2] = -this[2];
        quat[3] = -this[3];
    }
    else {
      quat[0] = this[0];
      quat[1] = this[1];
      quat[2] = this[2];
      quat[3] = this[3];
    }
    var omega, sinom, sc1, sc2;
    if ((1.0-cosom)>0.0001) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        sc1 = Math.sin((1.0-t)*omega)/sinom;
        sc2 = Math.sin(t*omega)/sinom;
    }
    else {
      sc1 = 1.0-t;
      sc2 = t;
    }
    this[0] = sc1*quat[0]+sc2*quat2[0];
    this[1] = sc1*quat[1]+sc2*quat2[1];
    this[2] = sc1*quat[2]+sc2*quat2[2];
    this[3] = sc1*quat[3]+sc2*quat2[3];
    return this;
  }
  _es6_module.add_class(Quat);
  Quat = _es6_module.add_export('Quat', Quat);
  _v3nd4_n1_normalizedDot4 = new Vector3();
  _v3nd4_n2_normalizedDot4 = new Vector3();
  _v3nd_n1_normalizedDot = new Vector3();
  _v3nd_n2_normalizedDot = new Vector3();
  BaseVector.inherit(Vector4, 4);
  BaseVector.inherit(Vector3, 3);
  BaseVector.inherit(Vector2, 2);
  window.Vector2 = Vector2;
  window.Vector3 = Vector3;
  window.Vector4 = Vector4;
  window.Quat = Quat;
  window.Matrix4 = Matrix4;
});
es6_module_define('simplemesh', ["vectormath", "math", "util"], function _simplemesh_module(_es6_module) {
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var math=es6_import(_es6_module, 'math');
  var cachering=es6_import_item(_es6_module, 'util', 'cachering');
  function EditorBase() {
    this.mesh = undefined;
    this.idx = -1;
  }
  /*test for IE bug*/;
  if (EditorBase.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        EditorBase.name = 'EditorBase';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  EditorBase = create_prototype(EditorBase, _es6_module, "EditorBase");
  EditorBase.prototype.bind = function(idx, mesh) {
    this.mesh = mesh;
    this.idx = idx;
  }
  _es6_module.add_class(EditorBase);
  EditorBase = _es6_module.add_export('EditorBase', EditorBase);
  function PointEditor() {
    EditorBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (PointEditor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        PointEditor.name = 'PointEditor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  PointEditor = inherit_multiple(PointEditor, [EditorBase], _es6_module, "PointEditor");
  _es6_module.add_class(PointEditor);
  PointEditor = _es6_module.add_export('PointEditor', PointEditor);
  function LineEditor() {
    EditorBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (LineEditor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        LineEditor.name = 'LineEditor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  LineEditor = inherit_multiple(LineEditor, [EditorBase], _es6_module, "LineEditor");
  _es6_module.add_class(LineEditor);
  LineEditor = _es6_module.add_export('LineEditor', LineEditor);
  function TriEditor() {
    EditorBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (TriEditor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TriEditor.name = 'TriEditor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TriEditor = inherit_multiple(TriEditor, [EditorBase], _es6_module, "TriEditor");
  TriEditor.prototype.colors = function(c1, c2, c3) {
    var i=this.i*4*3;
    var layer=this.mesh.tris.colors;
    var data=layer.datalayers[layer.actlayer];
    data[i++] = c1[0];
    data[i++] = c1[1];
    data[i++] = c1[2];
    data[i++] = c1.length>3 ? c1[3] : 1.0;
    data[i++] = c2[0];
    data[i++] = c2[1];
    data[i++] = c2[2];
    data[i++] = c2.length>3 ? c2[3] : 1.0;
    data[i++] = c2[0];
    data[i++] = c2[1];
    data[i++] = c2[2];
    data[i++] = c2.length>3 ? c2[3] : 1.0;
    return this;
  }
  _es6_module.add_class(TriEditor);
  TriEditor = _es6_module.add_export('TriEditor', TriEditor);
  function IndexedTriEditor() {
    EditorBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (IndexedTriEditor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        IndexedTriEditor.name = 'IndexedTriEditor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  IndexedTriEditor = inherit_multiple(IndexedTriEditor, [EditorBase], _es6_module, "IndexedTriEditor");
  _es6_module.add_class(IndexedTriEditor);
  IndexedTriEditor = _es6_module.add_export('IndexedTriEditor', IndexedTriEditor);
  function QuadEditor() {
    EditorBase.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (QuadEditor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        QuadEditor.name = 'QuadEditor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  QuadEditor = inherit_multiple(QuadEditor, [EditorBase], _es6_module, "QuadEditor");
  _es6_module.add_class(QuadEditor);
  QuadEditor = _es6_module.add_export('QuadEditor', QuadEditor);
  function DrawBuffer(name, size) {
    this.name = name;
    this.size = size;
    this.datalayers = [[]];
  }
  /*test for IE bug*/;
  if (DrawBuffer.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DrawBuffer.name = 'DrawBuffer';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DrawBuffer = create_prototype(DrawBuffer, _es6_module, "DrawBuffer");
  _es6_module.add_class(DrawBuffer);
  DrawBuffer = _es6_module.add_export('DrawBuffer', DrawBuffer);
  function DrawBuffers(tot_element, default_layers) {
    this.layers = [];
    this.tot = 0;
    this.esize = tot_element;
    var __iter_k=__get_iter(default_layers);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.layers.push(new DrawBuffer(k, default_layers[k]));
      this[k] = this.layers[this.layers.length-1];
    }
  }
  /*test for IE bug*/;
  if (DrawBuffers.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DrawBuffers.name = 'DrawBuffers';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DrawBuffers = create_prototype(DrawBuffers, _es6_module, "DrawBuffers");
  DrawBuffers.prototype.add_layer = function(name, size) {
    this.layers.push(new DrawBuffer(name, size));
    this[name] = this.layers[this.layers.length-1];
  }
  DrawBuffers.prototype.new_element = function() {
    var idx=this.tot;
    for (var i=0; i<this.layers.length; i++) {
        var layer=this.layers[i];
        for (var i=0; i<layer.datalayers.length; i++) {
            var sublayer=layer.datalayers[i];
            var len=layer.size*this.esize;
            for (var j=0; j<len; j++) {
                sublayer.push(0.0);
            }
        }
    }
    return idx;
  }
  _es6_module.add_class(DrawBuffers);
  DrawBuffers = _es6_module.add_export('DrawBuffers', DrawBuffers);
  function InstanceBuffers() {
    DrawBuffers.apply(this, arguments);
  }
  /*test for IE bug*/;
  if (InstanceBuffers.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        InstanceBuffers.name = 'InstanceBuffers';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  InstanceBuffers = inherit_multiple(InstanceBuffers, [DrawBuffers], _es6_module, "InstanceBuffers");
  _es6_module.add_class(InstanceBuffers);
  InstanceBuffers = _es6_module.add_export('InstanceBuffers', InstanceBuffers);
  function SimpleMeshIsland(do_index) {
    if (do_index) {
        this.tris = new DrawBuffers(3, {index: 1});
    }
    else {
      this.tris = new DrawBuffers(3, {cos: 3, normals: 3, colors: 4});
    }
    this.lines = new DrawBuffers(2, {cos: 3, colors: 4});
    this.verts = new DrawBuffers(1, {cos: 3, normals: 3, colors: 4});
    if (do_index) {
        this.indexed_tri_mode = true;
        this.tris.add_layer("index", 1);
    }
    else {
      this.indexed_tri_mode = false;
    }
    this.indexed_tri_editors = cachering.fromConstructor(IndexedTriEditor, 64);
    this.tri_editors = cachering.fromConstructor(TriEditor, 64);
  }
  /*test for IE bug*/;
  if (SimpleMeshIsland.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SimpleMeshIsland.name = 'SimpleMeshIsland';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SimpleMeshIsland = create_prototype(SimpleMeshIsland, _es6_module, "SimpleMeshIsland");
  SimpleMeshIsland.prototype.tri = function(v1, v2, v3) {
    if (this.indexed_tri_mode) {
        var idx=this.tris.tot;
        this.tris.new_element();
        var data=this.tris.index.datalayers[0];
        data[tot*3] = v1;
        data[tot*3+1] = v2;
        data[tot*3+2] = v3;
        return this.indexed_tri_editors.next().bind(idx, this);
    }
    else {
      var idx=this.tris.new_element();
      var normals=this.tris.normals.datalayers[0];
      var colors=this.tris.colors.datalayers[0];
      for (var i=0; i<3; i++) {
          normals[idx*(3*3)+3*i+2] = 1.0;
          colors[idx*(3*4)+4*i+3] = 1.0;
      }
      return this.tri_editors.next().bind(idx, this);
    }
  }
  _es6_module.add_class(SimpleMeshIsland);
  SimpleMeshIsland = _es6_module.add_export('SimpleMeshIsland', SimpleMeshIsland);
  function SimpleMesh() {
  }
  /*test for IE bug*/;
  if (SimpleMesh.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SimpleMesh.name = 'SimpleMesh';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SimpleMesh = create_prototype(SimpleMesh, _es6_module, "SimpleMesh");
  _es6_module.add_class(SimpleMesh);
  SimpleMesh = _es6_module.add_export('SimpleMesh', SimpleMesh);
});
es6_module_define('data_api', ["rna_properties", "context", "object_cache", "animdata", "rna_context", "data_api_parser", "data_api_types", "toolsystem", "library", "util"], function _data_api_module(_es6_module) {
  "use strict";
  es6_import(_es6_module, 'object_cache');
  var util=es6_import(_es6_module, 'util');
  var context=es6_import(_es6_module, 'context');
  var DataPath=es6_import_item(_es6_module, 'data_api_types', 'DataPath');
  var DataStruct=es6_import_item(_es6_module, 'data_api_types', 'DataStruct');
  var DataStructArray=es6_import_item(_es6_module, 'data_api_types', 'DataStructArray');
  var DataPathTypes=es6_import_item(_es6_module, 'data_api_types', 'DataPathTypes');
  var DataFlags=es6_import_item(_es6_module, 'data_api_types', 'DataFlags');
  var rna_define_context=es6_import_item(_es6_module, 'rna_context', 'rna_define_context');
  var Context=context.UIContext;
  var TinyParserError={"TinyParserError": 0}
  TinyParserError = _es6_module.add_export('TinyParserError', TinyParserError);
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var PropFlags=es6_import_item(_es6_module, 'rna_properties', 'PropFlags');
  var RNAProperty=es6_import_item(_es6_module, 'rna_properties', 'RNAProperty');
  var IntProperty=es6_import_item(_es6_module, 'rna_properties', 'IntProperty');
  var FloatProperty=es6_import_item(_es6_module, 'rna_properties', 'FloatProperty');
  var Vec3Property=es6_import_item(_es6_module, 'rna_properties', 'Vec3Property');
  var StringProperty=es6_import_item(_es6_module, 'rna_properties', 'StringProperty');
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var ID=es6_import_item(_es6_module, 'library', 'ID');
  var apiparser=es6_import_item(_es6_module, 'data_api_parser', 'apiparser');
  function DataAPIError(msg) {
    Error.call(this, msg);
  }
  /*test for IE bug*/;
  if (DataAPIError.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataAPIError.name = 'DataAPIError';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataAPIError = inherit_multiple(DataAPIError, [Error], _es6_module, "DataAPIError");
  _es6_module.add_class(DataAPIError);
  DataAPIError = _es6_module.add_export('DataAPIError', DataAPIError);
  var ContextStruct;
  function init_data_api() {
    startup_report("initializing data api. . .");
    ContextStruct = rna_define_context();
    G.api = new DataAPI();
  }
  init_data_api = _es6_module.add_export('init_data_api', init_data_api);
  var _TOKEN=0;
  var _WORD=1;
  var _LP="(";
  var _RP=")";
  var _LS="[";
  var _RS="]";
  var _CM=",";
  var _EQ="=";
  var _DT=".";
  function TinyParser(data) {
    var tpl=TinyParser.ctemplates;
    this.toks = objcache.fetch(tpl.toks);
    this.toks.length = 0;
    this.split_chars = TinyParser.split_chars;
    this.ws = TinyParser.ws;
    this.data = data;
    this.cur = 0;
  }
  /*test for IE bug*/;
  if (TinyParser.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TinyParser.name = 'TinyParser';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TinyParser = create_prototype(TinyParser, _es6_module, "TinyParser");
  TinyParser.prototype.reset = function(data) {
    this.cur = 0;
    this.toks.length = 0;
    this.data = data;
    if (data!=undefined&&data!="")
      this.lex();
  }
  TinyParser.prototype.gen_tok = function(a, b) {
    var ret=objcache.fetch(TinyParser.ctemplates.token);
    ret[0] = a;
    ret[1] = b;
    ret.length = 2;
    return ret;
  }
  TinyParser.prototype.lex = function(data) {
    var gt=this.gen_tok;
    if (data==undefined)
      data = this.data;
    var toks=this.toks;
    var tok=undefined;
    var i=0;
    while (i<data.length) {
      var c=data[i];
      if (this.ws.has(c)) {
          if (tok!=undefined&&tok[1]==_WORD) {
              tok = undefined;
          }
      }
      else 
        if (this.split_chars.has(c)) {
          toks.push(gt(c, _TOKEN));
          tok = undefined;
      }
      else {
        if (tok==undefined) {
            tok = gt("", _WORD);
            toks.push(tok);
        }
        tok[0]+=c;
      }
      i+=1;
    }
  }
  TinyParser.prototype.next = function() {
    this.cur++;
    if (this.cur-1<this.toks.length) {
        return this.toks[this.cur-1];
    }
    return undefined;
  }
  TinyParser.prototype.peek = function() {
    if (this.cur<this.toks.length) {
        return this.toks[this.cur];
    }
    return undefined;
  }
  TinyParser.prototype.expect = function(type, val) {
    if (this.peek()[1]!=type) {
        console.log("Unexpected token "+this.peek[0]+", expected "+(type==_WORD ? "WORD" : val));
        console.trace();
        throw new TinyParserError();
    }
    if (type==_TOKEN&&this.peek()[0]!=val) {
        console.log("Unexpected token "+this.peek[0]);
        console.trace();
        throw new TinyParserError();
    }
    return this.next()[0];
  }
  _es6_module.add_class(TinyParser);
  
  var AnimKey=es6_import_item(_es6_module, 'animdata', 'AnimKey');
  var AnimChannel=es6_import_item(_es6_module, 'animdata', 'AnimChannel');
  var AnimKeyFlags=es6_import_item(_es6_module, 'animdata', 'AnimKeyFlags');
  var AnimInterpModes=es6_import_item(_es6_module, 'animdata', 'AnimInterpModes');
  TinyParser.ctemplates = {toks: {obj: Array(64), init: function(val) {
    val.length = 0;
  }}, token: {obj: ["", ""], cachesize: 512}}
  TinyParser.split_chars = new util.set([",", "=", "(", ")", ".", "$", "[", "]"]);
  TinyParser.ws = new util.set([" ", "\n", "\t", "\r"]);
  function DataAPI(appstate) {
    this.appstate = appstate;
    this.ops = [];
    this.parser = new TinyParser();
    this.parser2 = apiparser();
    this.root_struct = ContextStruct;
    this.cache = {}
    this.evalcache = {}
  }
  /*test for IE bug*/;
  if (DataAPI.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataAPI.name = 'DataAPI';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataAPI = create_prototype(DataAPI, _es6_module, "DataAPI");
  DataAPI.prototype.parse_call_line_intern = function(ctx, line) {
    var p=this.parser;
    function parse_argval(p) {
      var val=p.expect(_WORD);
      var args;
      if (p.peek()[0]==_LP) {
          args = parse_call(p);
      }
      return [val, args];
    }
    function parse_arg(p) {
      var arg=p.expect(_WORD);
      var val=undefined;
      if (p.peek()[0]==_EQ) {
          p.next();
          val = parse_argval(p);
      }
      return [arg, val];
    }
    function parse_call(p) {
      p.expect(_TOKEN, _LP);
      var args=[];
      var t=undefined;
      while (p.peek()!=undefined) {
        if (p.peek()[1]==_WORD) {
            args.push(parse_arg(p));
        }
        else 
          if (p.peek()[0]==_CM) {
            p.next();
        }
        else {
          p.expect(_TOKEN, _RP);
          break;
        }
      }
      return args;
    }
    if (line.contains(_LP)==0)
      throw TinyParserError;
    var li=line.find(_LP);
    var path=line.slice(0, li);
    line = line.slice(li, line.length);
    p.reset(line);
    var call=parse_call(p);
    path = path.trimRight().trimLeft();
    var ret=objcache.array(2);
    ret[0] = path;
    ret[1] = call;
    return ret;
  }
  DataAPI.prototype.parse_call_line = function(ctx, line) {
    try {
      var ret=this.parse_call_line_intern(ctx, line);
      return ret;
    }
    catch (error) {
        if (error!=TinyParserError) {
            throw error;
        }
        else {
          console.log("Could not parse tool call line "+line+"!");
        }
    }
  }
  DataAPI.prototype.do_selectmode = function(ctx, args) {
    return ctx.view2d.selectmode;
  }
  DataAPI.prototype.do_mesh_selected = function(ctx, args) {
    if (args==undefined||args.length==0||args[0].length!=2) {
        console.log("Invalid arguments to do_mesh_selected()");
        throw TinyParserError();
    }
    var val=args[0][0];
    var typemask=0;
    for (var i=0; i<val.length; i++) {
        c = val[i].toLowerCase();
        if (c=="v") {
            typemask|=MeshTypes.VERT;
        }
        else 
          if (c=="e") {
            typemask|=MeshTypes.EDGE;
        }
        else 
          if (c=="f") {
            typemask|=MeshTypes.FACE;
        }
        else {
          console.log("Invalid arguments to do_mesh_select(): "+c);
          throw TinyParserError();
        }
    }
    var mesh=ctx.mesh;
    if (mesh==undefined) {
        console.trace();
        console.log("Mesh operation called with bad context");
        console.log("Creating dummy mesh. . .");
        console.log(ctx);
        mesh = new Mesh();
    }
    return new MSelectIter(typemask, mesh);
  }
  DataAPI.prototype.prepare_args = function(ctx, call) {
    var args={}
    for (var i=0; i<call.length; i++) {
        var a=call[i];
        if (a[1]!=undefined) {
            if ("do_"+a[1][0] in this) {
                args[a[0]] = this["do_"+a[1][0]](ctx, a[1][1], a[1], a);
            }
            else 
              if (typeof a[1][0]=="number"||parseFloat(a[1][0])!=NaN) {
                args[a[0]] = parseFloat(a[1][0]);
            }
            else {
              console.log("Invalid initializer"+a[1][1], a[1]);
            }
        }
        else {
          console.log("Error: No parameter for undefined argument "+a[0]);
          throw TinyParserError;
        }
    }
    return args;
  }
  DataAPI.prototype.get_op_intern = function(ctx, str) {
    var ret=this.parse_call_line(ctx, str);
    if (ret==undefined)
      return ;
    var call=ret[1];
    var path=ret[0];
    if (!(path in this.ops)) {
        console.log("Invalid api call "+str+"!");
        return ;
    }
    var args=this.prepare_args(ctx, call);
    var op=this.ops[path](ctx, args);
    return op;
  }
  DataAPI.prototype.get_op_keyhandler = function(ctx, str) {
    function find_hotkey_recurse(element) {
      if (element==undefined)
        return undefined;
      var maps=element.get_keymaps();
      for (var i=0; i<maps.length; i++) {
          var km=maps[i];
          var handler=km.get_tool_handler(str);
          if (handler!=undefined)
            return handler;
      }
      if (element.constructor.name=="UIFrame"&&element.active!=undefined) {
          return find_hotkey_recurse(element.active);
      }
    }
    return find_hotkey_recurse(ctx.screen);
  }
  DataAPI.prototype.call_op = function(ctx, str) {
    if (RELEASE)
      return this.call_op_release(ctx, str);
    else 
      return this.call_op_debug(ctx, str);
  }
  DataAPI.prototype.call_op_debug = function(ctx, str) {
    console.log("calling op", str);
    var op=this.get_op_intern(ctx, str);
    if (op==undefined) {
        throw new Error("Unknown tool '"+str+"'!");
    }
    if (op.flag&ToolFlags.USE_DEFAULT_INPUT) {
        this.appstate.toolstack.default_inputs(ctx, op);
    }
    this.appstate.toolstack.exec_tool(op);
  }
  DataAPI.prototype.call_op_release = function(ctx, str) {
    try {
      var op=this.get_op_intern(ctx, str);
      if (op.flag&ToolFlags.USE_DEFAULT_INPUT) {
          this.appstate.toolstack.default_inputs(ctx, op);
      }
      this.appstate.toolstack.exec_tool(op);
    }
    catch (error) {
        console.log("Error calling "+str);
        console.trace();
    }
  }
  DataAPI.prototype.get_op_uiname = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    try {
      var op=this.get_op_intern(ctx, str);
      return op.uiname;
    }
    catch (error) {
        if (error!=TinyParserError) {
            throw error;
        }
        else {
          console.log("Error calling "+str);
          console.trace();
        }
    }
  }
  DataAPI.prototype.get_op = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    try {
      var op=this.get_op_intern(ctx, str);
      return op;
    }
    catch (error) {
        if (error!=TinyParserError) {
            throw error;
        }
        else {
          console.log("Error calling "+str);
          console.trace();
        }
    }
  }
  DataAPI.prototype.copy_path = function(path) {
    var ret=[];
    ret.push(path[0]);
    for (var i=1; i<path.length; i++) {
        ret.push(copy_object_deep(path[i]));
    }
    return ret;
  }
  DataAPI.prototype._build_path = function(dp) {
    var s="";
    while (dp!=undefined) {
      if (__instance_of(dp, DataPath))
        s = dp.path+"."+s;
      dp = dp.parent;
    }
    s = s.slice(0, s.length-1);
    return s;
  }
  DataAPI.prototype.on_frame_change = function(ctx, time) {
    var __iter_id=__get_iter(ctx.datalib.idmap);
    var id;
    while (1) {
      var __ival_id=__iter_id.next();
      if (__ival_id.done) {
          break;
      }
      id = __ival_id.value;
      var block=ctx.datalib.idmap[id];
      var __iter_ch=__get_iter(block.lib_anim_channels);
      var ch;
      while (1) {
        var __ival_ch=__iter_ch.next();
        if (__ival_ch.done) {
            break;
        }
        ch = __ival_ch.value;
        this.set_prop(ctx, ch.path, ch.eval(time));
      }
    }
  }
  DataAPI.prototype.key_animpath = function(ctx, owner, path, time) {
    if (ctx==undefined) {
        time = path;
        path = ctx;
        ctx = new Context();
    }
    path = path.trim();
    var ret=this.resolve_path_intern(ctx, path);
    if (ret==undefined||ret[0]==undefined) {
        console.log("Error, cannot set keyframe for path", path, "!");
        return ;
    }
    var prop=ret[0];
    if (!(path in owner.lib_anim_pathmap)) {
        var name=path.split(".");
        name = name[name.length-1];
        var ch=new AnimChannel(prop.type, name, path);
        ch.idgen = owner.lib_anim_idgen;
        ch.idmap = owner.lib_anim_idmap;
        ch.owner = owner;
        owner.lib_anim_pathmap[path] = ch;
        owner.lib_anim_channels.push(ch);
    }
    var ch=owner.lib_anim_pathmap[path];
    var val=this.get_prop(ctx, path);
    ch.update(time, val);
  }
  var $cache_DataAPI_resolve_path_intern={}
  DataAPI.prototype.resolve_path_intern = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    if (str==undefined) {
        warntrace("Warning, undefined path in resolve_path_intern (forgot to pass ctx?)");
        return undefined;
    }
    try {
      if (!(str in $cache_DataAPI_resolve_path_intern)) {
          var ret=this.resolve_path_intern2(ctx, str);
          var ret2=[];
          for (var i=0; i<ret.length; i++) {
              ret2.push(ret[i]);
          }
          $cache_DataAPI_resolve_path_intern[str] = ret2;
      }
      else {
        var ret=$cache_DataAPI_resolve_path_intern[str];
        if (ret[0]!=undefined&&!ret[0].cache_good()) {
            delete $cache_DataAPI_resolve_path_intern[str];
            return this.resolve_path_intern(ctx, str);
        }
      }
      return ret;
    }
    catch (_err) {
        print_stack(_err);
        console.log("error: ", str);
    }
    return undefined;
  }
  var $sret_DataAPI_resolve_path_intern2=[0, 0, 0, 0];
  DataAPI.prototype.resolve_path_intern2 = function(ctx, str) {
    var parser=this.parser2;
    var arr_index=undefined;
    var build_path=this._build_path;
    var pathout=[""];
    var spathout=["ContextStruct"];
    var mass_set=undefined;
    function do_eval(node, scope, pathout, spathout) {
      if (node.type=="ID") {
          if (scope==undefined) {
              console.log("data api error: ", str+", "+pathout[0]+", "+spathout[0]);
          }
          if (scope.pathmap==undefined||!(node.val in scope.pathmap))
            return undefined;
          var ret=scope.pathmap[node.val];
          if (ret==undefined)
            return undefined;
          if (ret.use_path) {
              if (ret.path[0]!="["&&ret.path[0]!="(")
                pathout[0] = pathout[0]+"."+ret.path;
              else 
                pathout[0]+=ret.path;
          }
          spathout[0] = spathout[0]+".pathmap."+node.val;
          return ret;
      }
      else 
        if (node.type=="CODE") {
          mass_set = {filter: node.children[1].value, path: str.slice(0, node.children[1].lexstart), subpath: str.slice(node.children[1].lexend, str.length).trim(), do_mass_set: true};
          if (mass_set.subpath[0]==".")
            mass_set.subpath = mass_set.subpath.slice(1, mass_set.subpath.length);
          return mass_set;
      }
      else 
        if (node.type==".") {
          var n2=do_eval(node.children[0], scope, pathout, spathout);
          if (n2!=undefined) {
              if (__instance_of(n2, DataPath))
                n2 = n2.data;
              return do_eval(node.children[1], n2, pathout, spathout);
          }
      }
      else 
        if (node.type=="ARRAY") {
          var array=do_eval(node.children[0], scope, pathout, spathout);
          var index=do_eval(node.children[1], scope, pathout, spathout);
          if (array==undefined)
            return undefined;
          if (index==undefined)
            index = node.children[1].val;
          arr_index = index;
          if (array.type==DataPathTypes.PROP&&array.data.type==PropTypes.FLAG) {
              index = array.data.keys[index];
              spathout[0]+=".data.data & "+index;
          }
          else 
            if (array.type==DataPathTypes.PROP) {
              spathout[0]+=".data.data["+index+"]";
          }
          if (!array.use_path) {
              return array;
          }
          else {
            var path=pathout[0];
            path = path.slice(1, path.length);
            if (array.type==DataPathTypes.PROP&&array.data.type==PropTypes.FLAG) {
                pathout[0]+="&"+index;
            }
            else 
              if (array.type==DataPathTypes.STRUCT_ARRAY) {
                pathout[0]+=array.data.getitempath(index);
            }
            else {
              pathout[0]+="["+index+"]";
            }
            if (array.type==DataPathTypes.STRUCT_ARRAY) {
                var stt=array.data.getter(eval(path)[index]);
                stt.parent = array;
                spathout[0]+=".getter("+path+"["+index+"]"+")";
                return stt;
            }
            else {
              return array;
            }
          }
      }
      else 
        if (node.type=="NUM") {
          return node.val;
      }
    }
    var ast=parser.parse(str);
    $sret_DataAPI_resolve_path_intern2[0] = do_eval(ast, ContextStruct, pathout, spathout);
    pathout[0] = pathout[0].slice(1, pathout[0].length);
    $sret_DataAPI_resolve_path_intern2[1] = pathout[0];
    $sret_DataAPI_resolve_path_intern2[2] = spathout[0];
    $sret_DataAPI_resolve_path_intern2[3] = mass_set;
    return $sret_DataAPI_resolve_path_intern2;
  }
  DataAPI.prototype.eval = function(ctx, str, scope) {
    try {
      if (str in this.evalcache) {
          return this.evalcache[str](ctx, scope);
      }
      var func;
      var script="\n        func = function(ctx, scope) {\n          return $s\n        }\n      ".replace("$s", str);
      func = eval(script);
      this.evalcache[str] = func;
      return func(ctx, scope);
    }
    catch (error) {
        print_stack(error);
        throw new DataAPIError(error.message);
    }
  }
  DataAPI.prototype.get_object = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    var ret=this.resolve_path_intern(ctx, str);
    if (ret==undefined||ret[0]==undefined||ret[0].type==DataPathTypes.PROP) {
        console.trace("Not a direct object reference", str);
        return undefined;
    }
    else {
      var path=ret[1];
      var val=this.eval(ctx, path);
      return val;
    }
  }
  DataAPI.prototype.get_prop = function(ctx, str) {
    try {
      return this.get_prop_intern(ctx, str);
    }
    catch (error) {
        if (!(__instance_of(error, DataAPIError))) {
            print_stack(error);
            console.log("Data API error! path:", str);
        }
        throw error;
    }
  }
  DataAPI.prototype.get_prop_intern = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    var ret=this.resolve_path_intern(ctx, str);
    if (ret==undefined)
      return ret;
    var val=ret[0];
    if (ret[0].type==DataPathTypes.PROP) {
        if (ret[0].use_path) {
            var path=ret[1];
            val = this.eval(ctx, path);
        }
        else {
          val = this.eval(ctx, ret[2]);
          if (__instance_of(val, DataPath))
            val = val.data;
          if (__instance_of(val, RNAProperty))
            val = val.data;
        }
        var prop=ret[0].data;
        if (prop.type==PropTypes.ENUM&&(val in prop.keys))
          val = prop.keys[val];
    }
    else {
      var path=ret[1];
      val = this.eval(ctx, path);
      return val;
    }
    return val;
  }
  DataAPI.prototype.build_mass_set_paths = function(ctx, listpath, subpath, value, filterstr) {
    if (ctx==undefined) {
        var filterfunc=value;
        value = subpath;
        subpath = listpath;
        listpath = ctx;
        ctx = new Context();
    }
    var filtercode="\n      function filter($) {\n\n        return "+filterstr+"\n;\n      }";
    eval(filtercode);
    var list=this.get_object(listpath);
    var ret=this.resolve_path_intern(ctx, listpath);
    var sta=ret[0].data;
    var ret=[];
    var __iter_key=__get_iter(sta.getkeyiter.call(list));
    var key;
    while (1) {
      var __ival_key=__iter_key.next();
      if (__ival_key.done) {
          break;
      }
      key = __ival_key.value;
      var item=sta.getitem.call(list, key);
      console.log("  key:", key, filter(item), item, item.level, ctx.spline.actlevel);
      if (!filter(item))
        continue;
      var path=(listpath+"["+key+"]"+"."+subpath).trim();
      ret.push(path);
    }
    return ret;
  }
  DataAPI.prototype.mass_set_prop = function(ctx, listpath, subpath, value, filterstr) {
    if (ctx==undefined) {
        filterfunc = value;
        value = subpath;
        subpath = listpath;
        listpath = ctx;
        ctx = new Context();
    }
    var paths=this.build_mass_set_paths(ctx, listpath, subpath, value, filterstr);
    for (var i=0; i<paths.length; i++) {
        this.set_prop(ctx, paths[i], value);
    }
  }
  var $scope_DataAPI_set_prop=[0, 0];
  DataAPI.prototype.set_prop = function(ctx, str, value) {
    var ret=this.resolve_path_intern(ctx, str);
    if (ret==undefined)
      return ret;
    if (ret[0]==undefined&&ret[3]!=undefined&&ret[3].do_mass_set) {
        this.mass_set_prop(ctx, ret[3].path, ret[3].subpath, value, ret[3].filter);
        return ;
    }
    else 
      if (ret[0]==undefined) {
        console.trace("Error! Unknown path", str, "!");
        return ;
    }
    if (ret[0].type!=DataPathTypes.PROP) {
        console.trace();
        console.log("Error: non-property in set_prop()", ret[0], ret[1], ret[2]);
        return ;
    }
    if (ret[0].type==DataPathTypes.PROP) {
        var path;
        if (ret[0].use_path) {
            path = ret[1];
        }
        else {
          path = ret[2];
        }
        var prop=ret[0].data;
        prop.ctx = ctx;
        if (prop.type==PropTypes.FLAG) {
            console.log("FLAG prop set!");
            console.log(path, "value", value);
            if (path.contains("&")) {
                var mask=Number.parseInt(path.slice(path.find("&")+1, path.length).trim());
                var path2=path.slice(0, path.find("&"));
                console.log(path2, "");
                var val=this.eval(ctx, path2);
                if (value)
                  val|=mask;
                else 
                  val&=~mask;
                prop.set_data(val);
                path2+=" = scope[0];";
                $scope_DataAPI_set_prop[0] = val;
                this.eval(ctx, path2, $scope_DataAPI_set_prop);
            }
            else {
              path+=" = "+value;
              this.eval(ctx, path);
              prop.set_data(value);
            }
        }
        else {
          if (prop.type==PropTypes.ENUM) {
              value = prop.values[value];
              if (__instance_of(value, String)||typeof value=="string") {
                  value = '"'+value+'"';
              }
          }
          else 
            if (prop.type==PropTypes.STRING) {
              value = '"'+value+'"';
          }
          var valpath=path;
          if (path.endsWith("]")) {
              var i=path.length-1;
              while (i>=0&&path[i]!="[") {
                i--              }
              valpath = path.slice(0, i);
          }
          else 
            if (!ret[0].use_path) {
              valpath+=".data.data";
              path+=".data.data";
          }
          var oval=this.eval(ctx, path);
          if (typeof value!="number"&&(prop.type==PropTypes.VEC3||prop.type==PropTypes.VEC4)) {
              var arr=this.eval(ctx, path);
              for (var i=0; i<arr.length; i++) {
                  arr[i] = value[i];
              }
          }
          else {
            path+=" = "+value;
            this.eval(ctx, path);
          }
          prop.set_data(this.eval(ctx, valpath));
        }
        ret[0].ctx = ctx;
        if (ret[0].update!=undefined)
          ret[0].update.call(ret[0]);
    }
  }
  DataAPI.prototype.get_struct = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    var ret=this.resolve_path_intern(ctx, str);
    if (ret==undefined||ret[0]==undefined)
      return undefined;
    if (__instance_of(ret[0], DataPath)) {
        return ret[0].data;
    }
    return ret[0];
  }
  DataAPI.prototype.get_prop_meta = function(ctx, str) {
    if (str==undefined) {
        str = ctx;
        ctx = new Context();
    }
    var ret=this.resolve_path_intern(ctx, str);
    if (ret==undefined||ret[0]==undefined)
      return undefined;
    return ret[0].data;
  }
  _es6_module.add_class(DataAPI);
  DataAPI = _es6_module.add_export('DataAPI', DataAPI);
});
es6_module_define('data_api_parser', ["parseutil"], function _data_api_parser_module(_es6_module) {
  "use strict";
  var parseutil=es6_import(_es6_module, 'parseutil');
  function apiparser() {
    function tk(name, re, func) {
      return new parseutil.tokdef(name, re, func);
    }
    var tokens=[tk("ID", /[a-zA-Z_]+[a-zA-Z$0-9_]*/), tk("EQUALS", /=/), tk("COLON", /:/), tk("LSBRACKET", /\[/), tk("RSBRACKET", /\]/), tk("LPARAM", /\(/), tk("RPARAM", /\)/), tk("CODE", /\{.*\}/, function(t) {
      t.value = t.value.slice(1, t.value.length-1).trim();
      return t;
    }), tk("COMMA", /,/), tk("DOT", /\./), tk("NUM", /[0-9]+/), tk("SEMI", /;/), tk("NEWLINE", /\n/, function(t) {
      t.lexer.lineno+=1;
    }), tk("SPACE", / |\t/, function(t) {
    })];
    function errfunc(lexer) {
      return true;
    }
    var lex=new parseutil.lexer(tokens, errfunc);
    var parser=new parseutil.parser(lex);
    function numnode(token, n) {
      return {type: "NUM", val: n, children: [], lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function valnode(token, id) {
      return {type: "ID", val: id, children: [], lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function varnode(token, id, val) {
      if (val==undefined) {
          val = undefined;
      }
      var cs=val!=undefined ? [val] : [];
      return {type: "VAR", val: id, children: cs, lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function bnode(token, l, r, op) {
      return {type: op, children: [l, r], lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function funcnode(token, name_expr, args) {
      var cs=[name_expr];
      for (var i=0; i<args.length; i++) {
          cs.push(args[i]);
      }
      return {type: "FUNC", children: cs, lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function arrnode(token, name_expr, ref) {
      return {type: "ARRAY", children: [name_expr, ref], lexstart: token.lexpos, lexend: token.lexpos+token.lexlen}
    }
    function p_FuncCall(p, name_expr) {
      var args=[];
      var lexstart1=p.lexer.lexpos;
      p.expect("LPARAM");
      while (!p.at_end()) {
        var t=p.peeknext();
        if (t==undefined) {
            p.error(t, "func");
        }
        if (t.type=="RPARAM") {
            p.next();
            break;
        }
        var lexstart=p.lexer.lexpos;
        var arg=p.expect("ID");
        var val=undefined;
        if (p.peeknext().type=="EQUALS") {
            p.next();
            var val=p_Expr(p, ",)");
        }
        var lexend=p.lexer.lexpos;
        args.push({lexpos: lexstart, lexlen: lexstart-lexend}, varnode(arg, val));
        var t=p.next();
        if (t.type=="RPARAM") {
            break;
        }
        else 
          if (t.type!="COMMA") {
            p.error(t, "invalid token in function call");
        }
      }
      var lexlen=p.lexer.lexpos-lexstart1;
      var ret=funcnode({lexpos: lexstart, lexlen: lexlen}, name_expr, args);
      return ret;
    }
    function p_Expr(p, end_chars) {
      if (end_chars==undefined) {
          end_chars = "";
      }
      var lexstart=p.lexer.lexpos;
      var t=p.peeknext();
      var ast;
      if (t.type=="ID")
        ast = valnode(t, p.expect("ID"));
      else 
        if (t.type=="NUM")
        ast = numnode(t, p.expect("NUM"));
      else 
        p.error("Invalid token "+t.type+"'"+t.value+"'");
      while (!p.at_end()) {
        var t=p.peeknext();
        if (t.type=="DOT") {
            p.next();
            var t2=p.peeknext();
            var id=p.expect("ID", "expected id after '.'");
            ast = bnode({lexpos: lexstart, lexlen: t.lexpos+t.lexlen}, ast, valnode(t2, id), ".");
        }
        else 
          if (t.type=="LPARAM") {
            ast = p_FuncCall(p, ast);
        }
        else 
          if (t.type=="LSBRACKET") {
            p.expect("LSBRACKET");
            var val=p_Expr(p, "]");
            p.expect("RSBRACKET");
            ast = arrnode({lexpos: lexstart, lexlen: t.lexpos+t.lexlen}, ast, val);
        }
        else 
          if (t.type=="CODE") {
            p.next();
            var n2={type: "STRING", lexstart: t.lexpos, lexend: t.lexpos+t.lexlen, value: t.value};
            ast = bnode({lexpos: lexstart, lexlen: t.lexpos+t.lexlen}, ast, n2, "CODE");
        }
        else 
          if (end_chars.contains(t.value)) {
            return ast;
        }
        else {
          p.error(t, "Invalid token "+t.type+"'"+t.value+"'");
        }
      }
      return ast;
    }
    parser.start = p_Expr;
    return parser;
  }
  apiparser = _es6_module.add_export('apiparser', apiparser);
  function fmt_ast(ast, tlevel) {
    if (tlevel==undefined) {
        tlevel = 0;
    }
    var s="";
    var t="";
    for (var i=0; i<tlevel; i++) {
t+=" "
    }
    s+=t+ast["type"];
    if (ast["type"]=="ID"||ast["type"]=="VAR"||ast["type"]=="NUM")
      s+=" "+ast["val"];
    s+=" {\n";
    var cs=ast["children"];
    if (cs==undefined)
      cs = [];
    for (var i=0; i<cs.length; i++) {
        s+=fmt_ast(cs[i], tlevel+1);
    }
    s+=t+"}\n";
    return s;
  }
});
es6_module_define('data_api_types', ["rna_properties"], function _data_api_types_module(_es6_module) {
  "use strict";
  var DataPathTypes={PROP: 0, STRUCT: 1, STRUCT_ARRAY: 2}
  DataPathTypes = _es6_module.add_export('DataPathTypes', DataPathTypes);
  var DataFlags={NO_CACHE: 1, RECALC_CACHE: 2}
  DataFlags = _es6_module.add_export('DataFlags', DataFlags);
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var PropFlags=es6_import_item(_es6_module, 'rna_properties', 'PropFlags');
  var RNAProperty=es6_import_item(_es6_module, 'rna_properties', 'RNAProperty');
  var IntProperty=es6_import_item(_es6_module, 'rna_properties', 'IntProperty');
  var FloatProperty=es6_import_item(_es6_module, 'rna_properties', 'FloatProperty');
  var Vec3Property=es6_import_item(_es6_module, 'rna_properties', 'Vec3Property');
  var StringProperty=es6_import_item(_es6_module, 'rna_properties', 'StringProperty');
  function DataPath(prop, name, path, dest_is_prop, use_path, flag) {
    if (dest_is_prop==undefined) {
        dest_is_prop = false;
    }
    if (use_path==undefined) {
        use_path = true;
    }
    if (flag==undefined) {
        flag = 0;
    }
    this.flag = flag;
    this.dest_is_prop = dest_is_prop;
    if (prop==undefined)
      this.type = dest_is_prop ? DataPathTypes.PROP : DataPathTypes.STRUCT;
    if (prop!=undefined&&__instance_of(prop, RNAProperty)) {
        this.type = DataPathTypes.PROP;
    }
    else 
      if (prop!=undefined&&__instance_of(prop, DataStruct)) {
        this.type = DataPathTypes.STRUCT;
        prop.parent = this;
        this.pathmap = prop.pathmap;
    }
    else 
      if (prop!=undefined&&__instance_of(prop, DataStructArray)) {
        this.type = DataPathTypes.STRUCT_ARRAY;
        prop.parent = this;
        this.getter = prop.getter;
    }
    this.name = name;
    this.data = prop;
    this.path = path;
    this.update = undefined;
    this.use_path = use_path;
    this.parent = undefined;
  }
  /*test for IE bug*/;
  if (DataPath.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataPath.name = 'DataPath';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataPath = create_prototype(DataPath, _es6_module, "DataPath");
  DataPath.prototype.cache_good = function() {
    var p=this;
    while (p!=undefined) {
      if (p.flag&DataFlags.RECALC_CACHE)
        return false;
      p = p.parent;
    }
    return true;
  }
  _es6_module.add_class(DataPath);
  DataPath = _es6_module.add_export('DataPath', DataPath);
  function DataStructIter(s) {
    this.ret = {done: false, value: undefined}
    this.cur = 0;
    this.strct = s;
    this.value = undefined;
  }
  /*test for IE bug*/;
  if (DataStructIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataStructIter.name = 'DataStructIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataStructIter = create_prototype(DataStructIter, _es6_module, "DataStructIter");
  DataStructIter.prototype[Symbol.iterator] = function() {
    return this;
  }
  DataStructIter.prototype.reset = function() {
    this.cur = 0;
    this.ret.done = false;
    this.ret.value = undefined;
  }
  DataStructIter.prototype.next = function() {
    if (this.cur>=this.strct.paths.length) {
        var ret=this.ret;
        this.cur = 0;
        ret.done = true;
        this.ret = {done: false, value: undefined};
        return ret;
    }
    var p=this.strct.paths[this.cur++];
    p.data.path = p.path;
    this.ret.value = p;
    return this.ret;
  }
  _es6_module.add_class(DataStructIter);
  DataStructIter = _es6_module.add_export('DataStructIter', DataStructIter);
  function DataStructArray(array_item_struct_getter, getitempath, getitem, getiter, getkeyiter, getlength) {
    this.getter = array_item_struct_getter;
    this.getiter = getiter;
    this.getlength = getlength;
    this.getkeyiter = getkeyiter;
    this.getitem = getitem;
    this.getitempath = getitempath;
    this.type = DataPathTypes.STRUCT_ARRAY;
  }
  /*test for IE bug*/;
  if (DataStructArray.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataStructArray.name = 'DataStructArray';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataStructArray = create_prototype(DataStructArray, _es6_module, "DataStructArray");
  _es6_module.add_class(DataStructArray);
  DataStructArray = _es6_module.add_export('DataStructArray', DataStructArray);
  function DataStruct(paths) {
    this.paths = new Array();
    if (paths!=undefined) {
        for (var i=0; i<paths.length; i++) {
            this.paths.push(paths[i]);
        }
    }
    this.pathmap = {}
    this.parent = undefined;
    this._flag = 0;
    var __iter_p=__get_iter(this.paths);
    var p;
    while (1) {
      var __ival_p=__iter_p.next();
      if (__ival_p.done) {
          break;
      }
      p = __ival_p.value;
      p.parent = this;
      this.pathmap[p.name] = p;
      if (p.type==DataPathTypes.PROP) {
          p.data.path = p.path;
      }
    }
    this.type = DataPathTypes.STRUCT;
  }
  /*test for IE bug*/;
  if (DataStruct.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataStruct.name = 'DataStruct';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataStruct = create_prototype(DataStruct, _es6_module, "DataStruct");
  Object.defineProperty(DataStruct.prototype, "flag", {get: function() {
    return this._flag;
  }, set: function(val) {
    this._flag = val;
    function recurse(p, flag) {
      p.flag|=flag;
      if (__instance_of(p, DataStruct)) {
          var __iter_p2=__get_iter(p.paths);
          var p2;
          while (1) {
            var __ival_p2=__iter_p2.next();
            if (__ival_p2.done) {
                break;
            }
            p2 = __ival_p2.value;
            if (__instance_of(p2, DataStruct)) {
                p2.flag|=flag;
            }
            else {
              recurse(p2, flag);
            }
          }
      }
    }
    if (val&DataFlags.NO_CACHE) {
        var __iter_p=__get_iter(this.paths);
        var p;
        while (1) {
          var __ival_p=__iter_p.next();
          if (__ival_p.done) {
              break;
          }
          p = __ival_p.value;
          recurse(p, DataFlags.NO_CACHE);
        }
    }
    if (val&DataFlags.RECALC_CACHE) {
        var __iter_p=__get_iter(this.paths);
        var p;
        while (1) {
          var __ival_p=__iter_p.next();
          if (__ival_p.done) {
              break;
          }
          p = __ival_p.value;
          recurse(p, DataFlags.RECALC_CACHE);
        }
    }
  }, configurable: true});
  DataStruct.prototype.Float = function(apiname, path, uiname, description) {
    var ret=new FloatProperty(0, apiname, uiname, description);
    ret = new DataPath(ret, apiname, path, path!=undefined);
    this.add(ret);
    return ret;
  }
  DataStruct.prototype.Struct = function(apiname, path, uiname, description) {
    var ret=new DataStruct([]);
    var path=new DataPath(ret, apiname, path, path!=undefined);
    this.add(path);
    return ret;
  }
  DataStruct.prototype.Int = function(apiname, path, uiname, description) {
    var ret=new IntProperty(0, apiname, uiname, description);
    ret = new DataPath(ret, apiname, path, path!=undefined);
    this.add(ret);
    return ret;
  }
  DataStruct.prototype[Symbol.iterator] = function() {
    return new DataStructIter(this);
  }
  DataStruct.prototype.cache_good = function() {
    var p=this;
    while (p!=undefined) {
      if (p.flag&DataFlags.RECALC_CACHE)
        return false;
      p = p.parent;
    }
    return true;
  }
  DataStruct.prototype.add = function(p) {
    if (this._flag&DataFlags.NO_CACHE)
      p._flag|=DataFlags.NO_CACHE;
    this.pathmap[p.name] = p;
    this.paths.push(p);
    p.parent = this;
  }
  DataStruct.prototype.replace = function(p, p2) {
    var __iter_p2_0=__get_iter(this.paths);
    var p2_0;
    while (1) {
      var __ival_p2_0=__iter_p2_0.next();
      if (__ival_p2_0.done) {
          break;
      }
      p2_0 = __ival_p2_0.value;
      if (p2_0.name==p.name) {
          this.flag|=DataFlags.RECALC_CACHE;
          this.paths.remove(p2_0);
          delete this.pathmap[p2_0.name];
          break;
      }
    }
    this.add(p);
  }
  _es6_module.add_class(DataStruct);
  DataStruct = _es6_module.add_export('DataStruct', DataStruct);
});
es6_module_define('rna_api', [], function _rna_api_module(_es6_module) {
  "use strict";
  function RNA_Api() {
  }
  /*test for IE bug*/;
  if (RNA_Api.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        RNA_Api.name = 'RNA_Api';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  RNA_Api = create_prototype(RNA_Api, _es6_module, "RNA_Api");
  _es6_module.add_class(RNA_Api);
  RNA_Api = _es6_module.add_export('RNA_Api', RNA_Api);
  function init_rna() {
  }
  init_rna = _es6_module.add_export('init_rna', init_rna);
});
es6_module_define('rna_context', ["data_api_types", "rna_properties"], function _rna_context_module(_es6_module) {
  "use strict";
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var PropFlags=es6_import_item(_es6_module, 'rna_properties', 'PropFlags');
  var RNAProperty=es6_import_item(_es6_module, 'rna_properties', 'RNAProperty');
  var IntProperty=es6_import_item(_es6_module, 'rna_properties', 'IntProperty');
  var FloatProperty=es6_import_item(_es6_module, 'rna_properties', 'FloatProperty');
  var Vec3Property=es6_import_item(_es6_module, 'rna_properties', 'Vec3Property');
  var StringProperty=es6_import_item(_es6_module, 'rna_properties', 'StringProperty');
  var DataStructArray=es6_import_item(_es6_module, 'data_api_types', 'DataStructArray');
  var DataStruct=es6_import_item(_es6_module, 'data_api_types', 'DataStruct');
  var DataStructArray=es6_import_item(_es6_module, 'data_api_types', 'DataStructArray');
  var DataPath=es6_import_item(_es6_module, 'data_api_types', 'DataPath');
  function rna_define_window() {
    return new DataStruct([new DataPath(new FloatProperty(), "sizex", "sizex", true), new DataPath(new FloatProperty(), "sizey", "sizey", true)]);
  }
  rna_define_window = _es6_module.add_export('rna_define_window', rna_define_window);
  function rna_define_screen() {
    return new DataStruct([]);
  }
  rna_define_screen = _es6_module.add_export('rna_define_screen', rna_define_screen);
  function rna_define_context() {
    var ContextStruct=new DataStruct([new DataPath(rna_define_screen(), "screen", "ctx.screen", true), new DataPath(rna_define_window(), "window", "ctx.window", true)]);
    return ContextStruct;
  }
  rna_define_context = _es6_module.add_export('rna_define_context', rna_define_context);
});
es6_module_define('rna_properties', ["rna_property_iter"], function _rna_properties_module(_es6_module) {
  "use strict";
  var PropTypes={INT: 0, FLOAT: 1, STRING: 4, VEC3: 6, VEC4: 7, BOOL: 8, MATRIX3: 12, MATRIX4: 13, ENUM: 14, STRUCT: 15, FLAG: 16, DATAREF: 17, DATAREFLIST: 18, TRANSFORM: 19, COLLECTION: 20, VEC2: 21}
  PropTypes = _es6_module.add_export('PropTypes', PropTypes);
  var PropFlags={PRIVATE: 1, LABEL: 2, COLL_LOOSE_TYPE: 4, USE_UNDO: 8, UNDO_SIMPLE: 16}
  PropFlags = _es6_module.add_export('PropFlags', PropFlags);
  function RNAProperty(type, apiname, uiname, description, flag) {
    if (apiname==undefined) {
        apiname = "";
    }
    if (uiname==undefined) {
        uiname = apiname;
    }
    if (description==undefined) {
        description = "";
    }
    if (flag==undefined) {
        flag = 0;
    }
    this.type = type;
    this.data = null;
    this.apiname = apiname;
    if (uiname==undefined)
      uiname = apiname;
    this.listeners = new Array();
    this.uiname = uiname;
    this.flag = flag;
    this.description = description;
    this.userdata = undefined;
    this.ctx = undefined;
    this.path = undefined;
    this.hotkey_ref = undefined;
    this.unit = undefined;
    this.icon = -1;
  }
  /*test for IE bug*/;
  if (RNAProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        RNAProperty.name = 'RNAProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  RNAProperty = create_prototype(RNAProperty, _es6_module, "RNAProperty");
  RNAProperty.prototype.copyTo = function(dst, copy_data) {
    if (copy_data==undefined) {
        copy_data = false;
    }
    dst.flag = this.flag;
    dst.icon = this.icon;
    dst.unit = this.unit;
    dst.hotkey_ref = this.hotkey_ref;
    dst.uiname = this.uiname;
    dst.apiname = this.apiname;
    if (copy_data)
      dst.data = this.data;
    return dst;
  }
  RNAProperty.prototype.add_listener = function(owner, callback) {
    var __iter_l=__get_iter(this.listeners);
    var l;
    while (1) {
      var __ival_l=__iter_l.next();
      if (__ival_l.done) {
          break;
      }
      l = __ival_l.value;
      if (l[0]==owner) {
          l[1] = callback;
          return ;
      }
    }
    this.listeners.push([owner, callback]);
  }
  RNAProperty.prototype.remove_listener = function(owner, silent_fail) {
    if (silent_fail==undefined) {
        silent_fail = false;
    }
    var __iter_l=__get_iter(this.listeners);
    var l;
    while (1) {
      var __ival_l=__iter_l.next();
      if (__ival_l.done) {
          break;
      }
      l = __ival_l.value;
      if (l[0]==owner) {
          console.log("removing listener");
          this.listeners.remove(l);
          return ;
      }
    }
    if (!silent_fail)
      console.trace("warning: remove_listener called for unknown owner:", owner);
  }
  RNAProperty.prototype._exec_listeners = function() {
    var __iter_l=__get_iter(this.listeners);
    var l;
    while (1) {
      var __ival_l=__iter_l.next();
      if (__ival_l.done) {
          break;
      }
      l = __ival_l.value;
      if (RELEASE) {
          try {
            l[1](l[0], this);
          }
          catch (_err) {
              print_stack(_err);
              console.log("Warning: a property event listener failed", "property:", this, "callback:", l[1], "owner:", l[0]);
          }
      }
      else {
        l[1](l[0], this);
      }
    }
  }
  RNAProperty.prototype.load_ui_data = function(prop) {
    this.uiname = prop.uiname;
    this.apiname = prop.apiname;
    this.description = prop.description;
    this.unit = prop.unit;
    this.hotkey_ref = prop.hotkey_ref;
  }
  RNAProperty.prototype.user_set_data = function(this_input) {
  }
  RNAProperty.prototype.update = function(prop_this) {
  }
  RNAProperty.prototype.api_update = function(ctx, path) {
  }
  RNAProperty.prototype.pack = function(data) {
    pack_int(data, this.type);
    var unit=this.unit!=undefined ? "" : this.unit;
    pack_static_string(data, unit, 16);
  }
  RNAProperty.prototype.unpack = function(data, uctx) {
    this.unit = unpack_static_string(data, 16);
    if (this.unit=="")
      this.unit = undefined;
  }
  RNAProperty.prototype.set_data = function(data, set_data) {
    if (set_data==undefined) {
        set_data = true;
    }
    if (set_data)
      this.data = data;
    this.api_update(this.ctx, this.path);
    this.update.call(this);
    this._exec_listeners();
  }
  RNAProperty.prototype.toJSON = function() {
    return {type: this.type, data: this.data}
  }
  RNAProperty.prototype.loadJSON = function(prop, json) {
    switch (json.type) {
      case PropTypes.INT:
      case PropTypes.FLOAT:
      case PropTypes.STRING:
      case PropTypes.BOOL:
      case PropTypes.FLOAT_ARRAY:
      case PropTypes.INT_ARRAY:
      case PropTypes.ENUM:
      case PropTypes.FLAG:
        prop.set_data(json.data);
        break;
      case PropTypes.ELEMENTS:
        prop.set_data(new Array(json.data));
        break;
      case PropTypes.VEC3:
        prop.set_data(new Vector3(json.data));
        break;
      case PropTypes.VEC4:
        prop.set_data(new Vector4(json.data));
        break;
    }
  }
  _es6_module.add_class(RNAProperty);
  RNAProperty = _es6_module.add_export('RNAProperty', RNAProperty);
  function DataRefProperty(value, allowed_types, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.DATAREF, apiname, uiname, description, flag);
    if (allowed_types==undefined)
      allowed_types = new set();
    if (!(__instance_of(allowed_types, set))) {
        if (__instance_of(allowed_types, Array))
          allowed_types = new set(allowed_types);
        else 
          allowed_types = new set([allowed_types]);
    }
    this.types = allowed_types;
    if (value!=undefined)
      this.set_data(value);
  }
  /*test for IE bug*/;
  if (DataRefProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        DataRefProperty.name = 'DataRefProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  DataRefProperty = inherit_multiple(DataRefProperty, [RNAProperty], _es6_module, "DataRefProperty");
  DataRefProperty.prototype.get_block = function(ctx) {
    if (this.data==undefined)
      return undefined;
    else 
      return ctx.datalib.get(this.data);
  }
  DataRefProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    if (this.data!=undefined)
      this.data = this.data.copy();
    dst.types = new set(this.types);
    if (this.data!=undefined)
      dst.set_data(this.data);
    return dst;
  }
  DataRefProperty.prototype.copy = function() {
    return this.copyTo(new DataRefProperty());
  }
  DataRefProperty.prototype.set_data = function(value) {
    if (value==undefined) {
        RNAProperty.prototype.set_data.call(this, undefined);
    }
    else 
      if (!(__instance_of(value, DataRef))) {
        if (!this.types.has(value.lib_type)) {
            console.trace();
            console.log("Invalid datablock type "+value.lib_type+" passed to DataRefProperty.set_value()");
            return ;
        }
        value = new DataRef(value);
        RNAProperty.prototype.set_data.call(this, value);
    }
    else {
      RNAProperty.prototype.set_data.call(this, value);
    }
  }
  _es6_module.add_class(DataRefProperty);
  DataRefProperty = _es6_module.add_export('DataRefProperty', DataRefProperty);
  function RefListProperty(value, allowed_types, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.DATAREFLIST, apiname, uiname, description, flag);
    if (allowed_types==undefined)
      allowed_types = [];
    if (!(__instance_of(allowed_types, set))) {
        allowed_types = new set([allowed_types]);
    }
    this.types = allowed_types;
    this.set_data(value);
  }
  /*test for IE bug*/;
  if (RefListProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        RefListProperty.name = 'RefListProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  RefListProperty = inherit_multiple(RefListProperty, [RNAProperty], _es6_module, "RefListProperty");
  RefListProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.types = new set(this.types);
    if (this.data!=undefined)
      dst.set_data(this.data);
    return dst;
  }
  RefListProperty.prototype.copy = function() {
    return this.copyTo(new RefListProperty());
  }
  RefListProperty.prototype.set_data = function(value) {
    if (value!=undefined&&value.constructor.name=="Array")
      value = new Array(value);
    if (value==undefined) {
        RNAProperty.prototype.set_data.call(this, undefined);
    }
    else {
      var lst=new DataRefList();
      for (var i=0; i<value.length; i++) {
          var block=value[i];
          if (block==undefined||!this.types.has(block.lib_type)) {
              console.trace();
              if (block==undefined)
                console.log("Undefined datablock in list passed to RefListProperty.set_data");
              else 
                console.log("Invalid datablock type "+block.lib_type+" passed to RefListProperty.set_value()");
              continue;
          }
          lst.push(block);
      }
      value = lst;
      RNAProperty.prototype.set_data.call(this, value);
    }
  }
  _es6_module.add_class(RefListProperty);
  RefListProperty = _es6_module.add_export('RefListProperty', RefListProperty);
  function FlagProperty(value, maskmap, uinames, apiname, uiname, description, range, uirange, flag) {
    RNAProperty.call(this, PropTypes.FLAG, apiname, uiname, description, flag);
    if (value==undefined&&maskmap==undefined) {
        this.ui_value_names = {};
        this.keys = {};
        this.values = {};
        return ;
    }
    this.data = 0;
    this.ui_key_names = {}
    if (uinames==undefined) {
        this.ui_value_names = {};
        var __iter_k=__get_iter(maskmap);
        var k;
        while (1) {
          var __ival_k=__iter_k.next();
          if (__ival_k.done) {
              break;
          }
          k = __ival_k.value;
          var key=k[0].toUpperCase()+k.slice(1, k.length).toLowerCase();
          key = key.replace(/\_/g, " ").replace(/\-/g, " ");
          this.ui_value_names[key] = k;
          this.ui_key_names[k] = key;
        }
    }
    else {
      this.ui_value_names = uinames;
      var __iter_k=__get_iter(uinames);
      var k;
      while (1) {
        var __ival_k=__iter_k.next();
        if (__ival_k.done) {
            break;
        }
        k = __ival_k.value;
        this.ui_key_names[uinames[k]] = k;
      }
    }
    this.keys = {}
    this.values = {}
    var __iter_k=__get_iter(maskmap);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.values[maskmap[k]] = maskmap[k];
      this.keys[k] = maskmap[k];
    }
    this.set_flag(value);
  }
  /*test for IE bug*/;
  if (FlagProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        FlagProperty.name = 'FlagProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  FlagProperty = inherit_multiple(FlagProperty, [RNAProperty], _es6_module, "FlagProperty");
  FlagProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    var __iter_k=__get_iter(this.keys);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      dst.keys[k] = this.keys[k];
    }
    var __iter_k=__get_iter(this.values);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      dst.values[k] = this.values[k];
    }
    var __iter_k=__get_iter(this.ui_value_names);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      dst.ui_value_names[k] = this.ui_value_names[k];
    }
    return dst;
  }
  FlagProperty.prototype.copy = function() {
    return this.copyTo(new FlagProperty());
  }
  FlagProperty.prototype.pack = function(data) {
    pack_int(this.data);
  }
  FlagProperty.prototype.set_flag = function(value) {
    var flag;
    if (this.values.hasOwnProperty(value)) {
        flag = value;
    }
    else 
      if (this.keys.hasOwnProperty(value)) {
        flag = this.keys[value];
    }
    else {
      console.trace("WARNING: bad flag value!", value, this.values);
    }
    this.data|=flag;
  }
  FlagProperty.prototype.unset_flag = function(value) {
    var flag;
    if (this.values.hasOwnProperty(value)) {
        flag = value;
    }
    else 
      if (this.keys.hasOwnProperty(value)) {
        flag = this.keys[value];
    }
    else {
      console.log(value, this.values);
      console.trace();
      throw new Error("Bad flag value");
    }
    this.data&=~flag;
  }
  _es6_module.add_class(FlagProperty);
  FlagProperty = _es6_module.add_export('FlagProperty', FlagProperty);
  function FloatProperty(i, apiname, uiname, description, range, uirange, flag) {
    RNAProperty.call(this, PropTypes.FLOAT, apiname, uiname, description, flag);
    if (uirange==undefined) {
        uirange = range;
    }
    this.ui_range = uirange;
    this.range = range;
    this.data = i;
  }
  /*test for IE bug*/;
  if (FloatProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        FloatProperty.name = 'FloatProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  FloatProperty = inherit_multiple(FloatProperty, [RNAProperty], _es6_module, "FloatProperty");
  FloatProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    dst.ui_range = this.ui_range;
    dst.range = this.range;
    return dst;
  }
  FloatProperty.prototype.copy = function() {
    return this.copyTo(new FloatProperty());
  }
  _es6_module.add_class(FloatProperty);
  FloatProperty = _es6_module.add_export('FloatProperty', FloatProperty);
  function IntProperty(i, apiname, uiname, description, range, uirange, flag) {
    RNAProperty.call(this, PropTypes.INT, apiname, uiname, description, flag);
    if (uirange==undefined) {
        uirange = range;
    }
    this.ui_range = uirange;
    this.range = range;
    this.data = i;
  }
  /*test for IE bug*/;
  if (IntProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        IntProperty.name = 'IntProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  IntProperty = inherit_multiple(IntProperty, [RNAProperty], _es6_module, "IntProperty");
  IntProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    dst.ui_range = this.ui_range;
    dst.range = this.range;
    return dst;
  }
  IntProperty.prototype.copy = function() {
    return this.copyTo(new IntProperty());
  }
  _es6_module.add_class(IntProperty);
  IntProperty = _es6_module.add_export('IntProperty', IntProperty);
  function BoolProperty(bool, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.BOOL, apiname, uiname, description, flag);
    this.data = bool ? true : false;
  }
  /*test for IE bug*/;
  if (BoolProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BoolProperty.name = 'BoolProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BoolProperty = inherit_multiple(BoolProperty, [RNAProperty], _es6_module, "BoolProperty");
  BoolProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    dst.ui_range = this.ui_range;
    dst.range = this.range;
    return dst;
  }
  BoolProperty.prototype.copy = function() {
    return this.copyTo(new BoolProperty());
  }
  _es6_module.add_class(BoolProperty);
  BoolProperty = _es6_module.add_export('BoolProperty', BoolProperty);
  function StringProperty(string, apiname, uiname, description, flag) {
    if (string==undefined)
      string = "";
    RNAProperty.call(this, PropTypes.STRING, apiname, uiname, description, flag);
    this.data = string;
  }
  /*test for IE bug*/;
  if (StringProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        StringProperty.name = 'StringProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  StringProperty = inherit_multiple(StringProperty, [RNAProperty], _es6_module, "StringProperty");
  StringProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    dst.ui_range = this.ui_range;
    dst.range = this.range;
    return dst;
  }
  StringProperty.prototype.copy = function() {
    return this.copyTo(new StringProperty());
  }
  _es6_module.add_class(StringProperty);
  StringProperty = _es6_module.add_export('StringProperty', StringProperty);
  function TransformProperty(value, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.TRANSFORM, apiname, uiname, description, flag);
    if (value!=undefined)
      RNAProperty.prototype.set_data.call(this, new Matrix4UI(value));
  }
  /*test for IE bug*/;
  if (TransformProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TransformProperty.name = 'TransformProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TransformProperty = inherit_multiple(TransformProperty, [RNAProperty], _es6_module, "TransformProperty");
  TransformProperty.prototype.set_data = function(data) {
    this.data.load(data);
    RNAProperty.prototype.set_data.call(this, undefined, false);
  }
  TransformProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.data = new Matrix4UI(new Matrix4());
    dst.data.load(this.data);
    return dst;
  }
  TransformProperty.prototype.copy = function() {
    return this.copyTo(new TransformProperty());
  }
  _es6_module.add_class(TransformProperty);
  TransformProperty = _es6_module.add_export('TransformProperty', TransformProperty);
  function EnumProperty(string, valid_values, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.ENUM, apiname, uiname, description, flag);
    this.values = {}
    this.keys = {}
    this.ui_value_names = {}
    if (valid_values==undefined)
      return ;
    if (__instance_of(valid_values, Array)||__instance_of(valid_values, String)) {
        for (var i=0; i<valid_values.length; i++) {
            this.values[valid_values[i]] = valid_values[i];
            this.keys[valid_values[i]] = valid_values[i];
        }
    }
    else {
      var __iter_k=__get_iter(valid_values);
      var k;
      while (1) {
        var __ival_k=__iter_k.next();
        if (__ival_k.done) {
            break;
        }
        k = __ival_k.value;
        this.values[k] = valid_values[k];
        this.keys[valid_values[k]] = k;
      }
    }
    if (string==undefined) {
        this.data = Iterator(valid_values).next();
    }
    else {
      this.set_value(string);
    }
    var __iter_k=__get_iter(this.values);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var uin=k[0].toUpperCase()+k.slice(1, k.length);
      uin = uin.replace(/\_/g, " ");
      this.ui_value_names[k] = uin;
    }
    this.iconmap = {}
  }
  /*test for IE bug*/;
  if (EnumProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        EnumProperty.name = 'EnumProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  EnumProperty = inherit_multiple(EnumProperty, [RNAProperty], _es6_module, "EnumProperty");
  EnumProperty.prototype.load_ui_data = function(prop) {
    RNAProperty.prototype.load_ui_data.call(this, prop);
    this.ui_value_names = Object.create(prop.ui_value_names);
    this.iconmap = Object.create(prop.iconmap);
    this.values = Object.create(prop.values);
    this.keys = Object.create(prop.keys);
  }
  EnumProperty.prototype.add_icons = function(iconmap) {
    var __iter_k=__get_iter(iconmap);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.iconmap[k] = iconmap[k];
    }
  }
  EnumProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, true);
    p.keys = Object.create(this.keys);
    p.values = Object.create(this.values);
    p.data = this.data;
    p.ui_value_names = this.ui_value_names;
    p.update = this.update;
    p.api_update = this.api_update;
    var __iter_k=__get_iter(this.iconmap);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      p.iconmap[k] = this.iconmap[k];
    }
    return p;
  }
  EnumProperty.prototype.copy = function() {
    var p=new EnumProperty("dummy", {"dummy": 0}, this.apiname, this.uiname, this.description, this.flag);
    p.keys = Object.create(this.keys);
    p.values = Object.create(this.values);
    p.data = this.data;
    p.ui_value_names = this.ui_value_names;
    p.update = this.update;
    p.api_update = this.api_update;
    var __iter_k=__get_iter(this.iconmap);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      p.iconmap[k] = this.iconmap[k];
    }
    return p;
  }
  EnumProperty.prototype.pack = function(data) {
    pack_string(this.data);
  }
  EnumProperty.prototype.get_value = function() {
    if (this.data in this.values)
      return this.values[this.data];
    else 
      return this.data;
  }
  EnumProperty.prototype.set_value = function(val) {
    if (!(val in this.values)&&(val in this.keys))
      val = this.keys[val];
    if (!(val in this.values)) {
        console.trace("Invalid value for enum!");
        console.log("Invalid value for enum!", val, this.values);
        return ;
    }
    this.data = new String(val);
  }
  _es6_module.add_class(EnumProperty);
  EnumProperty = _es6_module.add_export('EnumProperty', EnumProperty);
  function Vec2Property(vec2, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.VEC2, apiname, uiname, description, flag);
    this.unit = "default";
    this.range = [undefined, undefined];
    this.real_range = [undefined, undefined];
    this.data = new Vector3(vec2);
  }
  /*test for IE bug*/;
  if (Vec2Property.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vec2Property.name = 'Vec2Property';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vec2Property = inherit_multiple(Vec2Property, [RNAProperty], _es6_module, "Vec2Property");
  Vec2Property.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.data = new Vector3(this.data);
    dst.real_range = this.real_range;
    dst.range = this.range;
    return dst;
  }
  Vec2Property.prototype.set_data = function(data) {
    this.data.load(data);
    RNAProperty.prototype.set_data.call(this, undefined, false);
  }
  Vec2Property.prototype.copy = function() {
    return this.copyTo(new Vec2Property());
  }
  _es6_module.add_class(Vec2Property);
  Vec2Property = _es6_module.add_export('Vec2Property', Vec2Property);
  function Vec3Property(vec3, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.VEC3, apiname, uiname, description, flag);
    this.unit = "default";
    this.range = [undefined, undefined];
    this.real_range = [undefined, undefined];
    this.data = new Vector3(vec3);
  }
  /*test for IE bug*/;
  if (Vec3Property.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vec3Property.name = 'Vec3Property';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vec3Property = inherit_multiple(Vec3Property, [RNAProperty], _es6_module, "Vec3Property");
  Vec3Property.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.data = new Vector3(this.data);
    dst.real_range = this.real_range;
    dst.range = this.range;
    return dst;
  }
  Vec3Property.prototype.set_data = function(data) {
    this.data.load(data);
    RNAProperty.prototype.set_data.call(this, undefined, false);
  }
  Vec3Property.prototype.copy = function() {
    return this.copyTo(new Vec3Property());
  }
  _es6_module.add_class(Vec3Property);
  Vec3Property = _es6_module.add_export('Vec3Property', Vec3Property);
  function Vec4Property(vec4, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.VEC4, apiname, uiname, description, flag);
    this.subtype==PropTypes.VEC4;
    this.unit = "default";
    this.range = [undefined, undefined];
    this.real_range = [undefined, undefined];
    this.data = new Vector4(vec4);
  }
  /*test for IE bug*/;
  if (Vec4Property.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Vec4Property.name = 'Vec4Property';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Vec4Property = inherit_multiple(Vec4Property, [RNAProperty], _es6_module, "Vec4Property");
  Vec4Property.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.data = new Vector4();
    dst.real_range = this.real_range;
    dst.range = this.range;
    dst.data.load(this.data);
    return dst;
  }
  Vec4Property.prototype.set_data = function(data) {
    this.data.load(data);
    RNAProperty.prototype.set_data.call(this, undefined, false);
  }
  Vec4Property.prototype.copy = function() {
    return this.copyTo(new Vec4Property());
  }
  _es6_module.add_class(Vec4Property);
  Vec4Property = _es6_module.add_export('Vec4Property', Vec4Property);
  var ToolIter=es6_import_item(_es6_module, 'rna_property_iter', 'ToolIter');
  function type_filter_iter(iter, typefilter, ctx) {
    this.types = typefilter;
    this.ret = {done: false, value: undefined}
    this.iter = iter;
    this._ctx = ctx;
  }
  /*test for IE bug*/;
  if (type_filter_iter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        type_filter_iter.name = 'type_filter_iter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  type_filter_iter = inherit_multiple(type_filter_iter, [ToolIter], _es6_module, "type_filter_iter");
  Object.defineProperty(type_filter_iter.prototype, "ctx", {get: function() {
    return this._ctx;
  }, set: function(ctx) {
    this._ctx = ctx;
    this.iter.ctx = ctx;
  }, configurable: true});
  type_filter_iter.prototype.reset = function() {
    this.iter.ctx = this.ctx;
    this.iter.reset();
  }
  type_filter_iter.prototype.next = function() {
    var ret=this.iter.next();
    var types=this.types;
    var tlen=this.types.length;
    var this2=this;
    function has_type(obj) {
      for (var i=0; i<tlen; i++) {
          if (__instance_of(obj, types[i]))
            return true;
      }
      return false;
    }
    while (!ret.done&&!has_type(ret.value)) {
      ret = this.iter.next();
    }
    this.ret.done = ret.done;
    this.ret.value = ret.value;
    ret = this.ret;
    if (ret.done&&this.iter.reset) {
        this.iter.reset();
    }
    return ret;
  }
  _es6_module.add_class(type_filter_iter);
  type_filter_iter = _es6_module.add_export('type_filter_iter', type_filter_iter);
  function CollectionProperty(data, filter_types, apiname, uiname, description, flag) {
    RNAProperty.call(this, PropTypes.COLLECTION, apiname, uiname, description, flag);
    this.flag|=PropFlags.COLL_LOOSE_TYPE;
    this.types = filter_types;
    this._data = undefined;
    this._ctx = undefined;
    this.set_data(data);
  }
  /*test for IE bug*/;
  if (CollectionProperty.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        CollectionProperty.name = 'CollectionProperty';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  CollectionProperty = inherit_multiple(CollectionProperty, [RNAProperty], _es6_module, "CollectionProperty");
  Object.defineProperty(CollectionProperty.prototype, "ctx", {get: function() {
    return this._ctx;
  }, set: function(data) {
    this._ctx = data;
    if (this._data!=undefined)
      this._data.ctx = data;
  }, configurable: true});
  Object.defineProperty(CollectionProperty.prototype, "data", {get: function() {
    return this._data;
  }, set: function(data) {
    this.set_data(data);
  }, configurable: true});
  CollectionProperty.prototype.copyTo = function(dst) {
    RNAProperty.prototype.copyTo.call(this, dst, false);
    dst.types = this.types;
    this.set_data(this.data);
    return dst;
  }
  CollectionProperty.prototype.copy = function() {
    var ret=this.copyTo(new CollectionProperty());
    ret.types = this.types;
    ret._ctx = this._ctx;
    if (this._data!=undefined&&this._data.copy!=undefined)
      ret.set_data(this._data.copy());
    return ret;
  }
  CollectionProperty.prototype.set_data = function(data) {
    if (data==undefined) {
        this._data = undefined;
        return ;
    }
    if ("__tooliter__" in data&&typeof data.__tooliter__=="function") {
        this.set_data(data.__tooliter__());
        return ;
    }
    else 
      if (!(this.flag&PropFlags.COLL_LOOSE_TYPE)&&!(__instance_of(data, TPropIterable))) {
        console.trace();
        console.log("ERROR: bad data '", data, "' was passed to CollectionProperty.set_data!");
        throw new Error("ERROR: bad data '", data, "' was passed to CollectionProperty.set_data!");
    }
    this._data = data;
    this._data.ctx = this.ctx;
    RNAProperty.prototype.set_data.call(this, undefined, false);
  }
  CollectionProperty.prototype[Symbol.iterator] = function() {
    if (this._data==undefined)
      return {next: function() {
      return {done: true, value: undefined}
    }}
    this._data.ctx = this._ctx;
    if (this.types!=undefined&&this.types.length>0)
      return new type_filter_iter(this.data[Symbol.iterator](), this.types, this._ctx);
    else 
      return this.data[Symbol.iterator]();
  }
  _es6_module.add_class(CollectionProperty);
  CollectionProperty = _es6_module.add_export('CollectionProperty', CollectionProperty);
  function BlankArray() {
  }
  /*test for IE bug*/;
  if (BlankArray.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BlankArray.name = 'BlankArray';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BlankArray = create_prototype(BlankArray, _es6_module, "BlankArray");
  _es6_module.add_class(BlankArray);
  BlankArray = _es6_module.add_export('BlankArray', BlankArray);
  BlankArray.STRUCT = "\n  BlankArray {\n    length : int | 0;\n  }\n";
  window.BlankArray = BlankArray;
});
es6_module_define('rna_property_iter', [], function _rna_property_iter_module(_es6_module) {
  "use strict";
  function TPropIterable() {
  }
  /*test for IE bug*/;
  if (TPropIterable.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TPropIterable.name = 'TPropIterable';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TPropIterable = create_prototype(TPropIterable, _es6_module, "TPropIterable");
  TPropIterable.prototype[Symbol.iterator] = function() {
  }
  _es6_module.add_class(TPropIterable);
  TPropIterable = _es6_module.add_export('TPropIterable', TPropIterable);
  window.TPropIterable = TPropIterable;
  function TCanSafeIter() {
  }
  /*test for IE bug*/;
  if (TCanSafeIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TCanSafeIter.name = 'TCanSafeIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TCanSafeIter = create_prototype(TCanSafeIter, _es6_module, "TCanSafeIter");
  TCanSafeIter.prototype.__tooliter__ = function() {
  }
  _es6_module.add_class(TCanSafeIter);
  TCanSafeIter = _es6_module.add_export('TCanSafeIter', TCanSafeIter);
  window.TCanSafeIter = TCanSafeIter;
  function ToolIter(itemtypes) {
    if (itemtypes==undefined) {
        itemtypes = [];
    }
    TPropIterable.call(this);
    this.itemtypes = itemtypes;
    this.ctx = undefined;
    this.ret = {done: true, value: undefined}
  }
  /*test for IE bug*/;
  if (ToolIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ToolIter.name = 'ToolIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ToolIter = inherit_multiple(ToolIter, [TPropIterable], _es6_module, "ToolIter");
  ToolIter.prototype.next = function() {
  }
  ToolIter.prototype.reset = function() {
  }
  ToolIter.prototype.spawn = function() {
  }
  ToolIter.prototype._get_block = function(ref) {
    if (this.ctx!=undefined) {
        if (ref.lib_id==this.ctx.object.lib_id)
          return this.ctx.object;
        else 
          return this.ctx.datalib.get(ref);
    }
  }
  ToolIter.prototype[Symbol.iterator] = function() {
    return this;
  }
  _es6_module.add_class(ToolIter);
  ToolIter = _es6_module.add_export('ToolIter', ToolIter);
  function MSelectIter(typemask, mesh) {
    ToolIter.call(this);
    this.meshref = new DataRef(mesh);
    this.mask = typemask;
    this.mesh = undefined;
    this.init = true;
    this.iter = undefined;
  }
  /*test for IE bug*/;
  if (MSelectIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        MSelectIter.name = 'MSelectIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  MSelectIter = inherit_multiple(MSelectIter, [ToolIter], _es6_module, "MSelectIter");
  MSelectIter.prototype[Symbol.iterator] = function() {
    if (this.init) {
        return this;
    }
    else {
      return new MSelectIter(this.mask, this.meshref);
    }
  }
  MSelectIter.prototype.reset = function() {
    this.init = true;
    this.mesh = undefined;
    this.iter = undefined;
  }
  MSelectIter.prototype.next = function() {
    if (this.init) {
        this.mesh = this._get_block(this.meshref);
        this.init = false;
        this.iter = new selectiter(this.mesh, this.mask);
    }
    var ret=this.iter.next();
    if (ret.done) {
        this.reset();
    }
    return ret;
  }
  _es6_module.add_class(MSelectIter);
  function element_iter_convert(iter, type) {
    ToolIter.call(this);
    if (!(__instance_of(iter, TPropIterable))) {
        throw new Error("element_iter_convert requires a 'safe' TPropIterable-derived iterator");
    }
    this.vset = new set();
    this.iter = iter[Symbol.iterator]();
    this.subiter = undefined;
    if (type==MeshTypes.VERT)
      this.type = Vertex;
    else 
      if (type==MeshTypes.EDGE)
      this.type = Edge;
    else 
      if (type==MeshTypes.LOOP)
      this.type = Loop;
    else 
      if (type==MeshTypes.FACE)
      this.type = Face;
  }
  /*test for IE bug*/;
  if (element_iter_convert.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        element_iter_convert.name = 'element_iter_convert';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  element_iter_convert = inherit_multiple(element_iter_convert, [ToolIter], _es6_module, "element_iter_convert");
  element_iter_convert.prototype.reset = function() {
    if (this.iter.reset!=undefined)
      this.iter.reset();
    this.vset = new set();
    this.iter.ctx = this.ctx;
  }
  element_iter_convert.prototype[Symbol.iterator] = function() {
    return this;
  }
  element_iter_convert.prototype.next = function() {
    if (this.mesh!=undefined)
      this.iter.mesh = this.mesh;
    var v=this._next();
    if (v.done)
      return v;
    var vset=this.vset;
    while ((!v.done)&&(v.value==undefined||vset.has(v.value))) {
      v = this._next();
    }
    if (!v.done)
      vset.add(v.value);
    return v;
  }
  element_iter_convert.prototype._next = function() {
    if (this.subiter==undefined) {
        var next=this.iter.next();
        if (next.done) {
            this.reset();
            return next;
        }
        if (next.value.constructor.name==this.type.name)
          return next;
        this.subiter = next.value.verts[Symbol.iterator]();
    }
    var vset=this.vset;
    var v=this.subiter.next();
    if (v.done) {
        this.subiter = undefined;
        return this._next();
    }
    return v;
  }
  _es6_module.add_class(element_iter_convert);
});
es6_module_define('rna_view', [], function _rna_view_module(_es6_module) {
  "use strict";
});
es6_module_define('parse_sdna', ["sdna_code", "util"], function _parse_sdna_module(_es6_module) {
  "use strict";
  var sdna=es6_import_item(_es6_module, 'sdna_code', 'sdna');
  var IDGen=es6_import_item(_es6_module, 'util', 'IDGen');
  var ENDIAN_BIG=0;
  ENDIAN_BIG = _es6_module.add_export('ENDIAN_BIG', ENDIAN_BIG);
  var ENDIAN_LITTLE=1;
  ENDIAN_LITTLE = _es6_module.add_export('ENDIAN_LITTLE', ENDIAN_LITTLE);
  var sdna_instance_idgen=new IDGen();
  sdna_instance_idgen = _es6_module.add_export('sdna_instance_idgen', sdna_instance_idgen);
  var _debug=0;
  function SDNASubClass() {
  }
  /*test for IE bug*/;
  if (SDNASubClass.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNASubClass.name = 'SDNASubClass';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNASubClass = create_prototype(SDNASubClass, _es6_module, "SDNASubClass");
  _es6_module.add_class(SDNASubClass);
  SDNASubClass = _es6_module.add_export('SDNASubClass', SDNASubClass);
  var SDNATypes={INT: 1, SHORT: 2, CHAR: 3, FLOAT: 4, DOUBLE: 5, LONG: 6, INT64_T: 7, POINTER: 7, STRUCT: 8, ARRAY: 9, VOID: 10, UNSIGNED: 64, TYPEMASK: 15}
  SDNATypes = _es6_module.add_export('SDNATypes', SDNATypes);
  var SDNATypeNames={}
  function build_SDNATypeNames() {
    var __iter_k=__get_iter(SDNATypes);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      SDNATypeNames[SDNATypes[k]] = k;
    }
  }
  build_SDNATypeNames();
  var BasicTypes={"char": SDNATypes.CHAR, "uchar": SDNATypes.CHAR, "short": SDNATypes.SHORT, "ushort": SDNATypes.SHORT|SDNATypes.UNSIGNED, "int": SDNATypes.INT, "uint": SDNATypes.INT|SDNATypes.UNSIGNED, "long": SDNATypes.LONG, "ulong": SDNATypes.LONG|SDNATypes.UNSIGNED, "float": SDNATypes.FLOAT, "double": SDNATypes.DOUBLE, "int64_t": SDNATypes.INT64_T, "uint64_t": SDNATypes.INT64_T|SDNATypes.UNSIGNED, "void": SDNATypes.VOID}
  BasicTypes = _es6_module.add_export('BasicTypes', BasicTypes);
  function tab(size) {
    var s="";
    for (var i=0; i<size; i++) {
        s+=" ";
    }
    return s;
  }
  function SizingVisitor(sdna) {
    this.sdna = sdna;
  }
  /*test for IE bug*/;
  if (SizingVisitor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SizingVisitor.name = 'SizingVisitor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SizingVisitor = create_prototype(SizingVisitor, _es6_module, "SizingVisitor");
  SizingVisitor.prototype.STRUCT = function(type) {
    var size=0;
    var stt=type.subtype;
    for (var i=0; i<stt.fields.length; i++) {
        size+=this.visit(stt.fields[i].type);
    }
    return size;
  }
  SizingVisitor.prototype.visit = function(type) {
    return this[SDNATypeNames[type.type]](type);
  }
  SizingVisitor.prototype.INT = function() {
    return 4;
  }
  SizingVisitor.prototype.FLOAT = function() {
    return 4;
  }
  SizingVisitor.prototype.DOUBLE = function() {
    return 4;
  }
  SizingVisitor.prototype.INT64_T = function() {
    return 8;
  }
  SizingVisitor.prototype.VOID = function() {
    return 0;
  }
  SizingVisitor.prototype.CHAR = function() {
    return 1;
  }
  SizingVisitor.prototype.SHORT = function() {
    return 2;
  }
  SizingVisitor.prototype.POINTER = function() {
    return this.sdna.pointer_size;
  }
  _es6_module.add_class(SizingVisitor);
  SizingVisitor = _es6_module.add_export('SizingVisitor', SizingVisitor);
  var _sizing_visitor=new SizingVisitor();
  var SDNAType_read_stack=new Array(4096);
  function SDNAType(type, subtype, params) {
    if (subtype==undefined) {
        subtype = -1;
    }
    if (params==undefined) {
        params = undefined;
    }
    this.type = type;
    this.subtype = subtype;
    this.params = params;
  }
  /*test for IE bug*/;
  if (SDNAType.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNAType.name = 'SDNAType';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNAType = create_prototype(SDNAType, _es6_module, "SDNAType");
  SDNAType.prototype.read_stack = function(fd) {
    var stack=SDNAType_read_stack;
    var _stack_cur=0;
    function push(item) {
      if (stack.length==_stack_cur)
        stack.push(0);
      if (_stack_cur<0) {
          console.log(_stack_cur, stack, item);
          throw new Error("eek!");
      }
      stack[_stack_cur++] = item;
    }
    function pop() {
      if (_stack_cur<0)
        return undefined;
      return stack[_stack_cur--];
    }
    function top(i) {
      if (i==undefined) {
          i = 0;
      }
      if (_stack_cur-i<0)
        return undefined;
      return stack[_stack_cur-i];
    }
    var STATE_RETURN=0;
    var STATE_ENTER=1;
    push(this);
    push(fd);
    push(STATE_ENTER);
    var _ci=0;
    while (stack.length>0) {
      var state=stack.pop(0);
      var val=undefined;
      if (state==STATE_RETURN) {
          val = stack.pop();
      }
      var fd=top(0);
      var typethis=top(1);
      if (_ci++>10000) {
          console.log("infinite loop");
          break;
      }
      console.log(_ci, stack, typethis, fd);
      var type=typethis.type&SDNATypes.TYPEMASK;
      if (type!=SDNATypes.Array&&type!=SDNATypes.STRUCT) {
          pop();
          pop();
      }
      if (state==STATE_RETURN) {
          var val=pop();
          if (stack.length==0) {
              return val;
          }
          fd = top(0);
          typethis = top(1);
          type = typethis.type&SDNATypes.TYPEMASK;
          if (type==SDNATypes.ARRAY) {
              var array=top(2);
              array.push(val);
              if (array.length<typethis.params) {
                  pop();
                  pop();
                  push(STATE_RETURN);
              }
          }
          else 
            if (type==SDNATypes.STRUCT) {
              pop();
              pop();
              push(STATE_RETURN);
          }
      }
      var unsign=typethis.type&SDNATypes.UNSIGNED;
      switch (typethis.type&SDNATypes.TYPEMASK) {
        case SDNATypes.INT:
          push(unsign ? fd.read_uint() : fd.read_int());
          push(STATE_RETURN);
          break;
        case SDNATypes.SHORT:
          push(unsign ? fd.read_ushort() : fd.read_short());
          push(STATE_RETURN);
          break;
        case SDNATypes.CHAR:
          push(fd.read_byte());
          push(STATE_RETURN);
          break;
        case SDNATypes.FLOAT:
          push(fd.read_float());
          push(STATE_RETURN);
          break;
        case SDNATypes.DOUBLE:
          push(fd.read_double());
          push(STATE_RETURN);
          break;
        case SDNATypes.LONG:
          push(unsign ? fd.read_ulong : fd.read_long());
          push(STATE_RETURN);
          break;
        case SDNATypes.INT64_T:
          push(unsign ? fd.read_uint64_t() : fd.read_int64_t());
          push(STATE_RETURN);
          break;
        case SDNATypes.POINTER:
          push(fd.read_pointer());
          push(STATE_RETURN);
          break;
        case SDNATypes.STRUCT:
          push(typethis.subtype.read(fd));
          push(STATE_RETURN);
          break;
        case SDNATypes.ARRAY:
          var ret=[];
          if (typethis.subtype.type==SDNATypes.CHAR) {
              ret = fd.read_string(typethis.params);
              console.log(tab(depth)+"string", ret);
              push(ret);
              push(STATE_RETURN);
              break;
          }
          stack.push([]);
          stack.push(typethis.subtype);
          stack.push(fd);
          stack.push(STATE_ENTER);
          break;
        case SDNATypes.VOID:
          push(undefined);
          push(STATE_RETURN);
          break;
      }
    }
  }
  SDNAType.prototype.read = function(fd, depth) {
    if (depth==undefined) {
        depth = 0;
    }
    var unsign=this.type&SDNATypes.UNSIGNED;
    if (_debug) {
        console.log(tab(depth)+"reading", this.name);
    }
    switch (this.type&SDNATypes.TYPEMASK) {
      case SDNATypes.INT:
        return unsign ? fd.read_uint() : fd.read_int();
      case SDNATypes.SHORT:
        return unsign ? fd.read_ushort() : fd.read_short();
      case SDNATypes.CHAR:
        return fd.read_byte();
      case SDNATypes.FLOAT:
        return fd.read_float();
      case SDNATypes.DOUBLE:
        return fd.read_double();
      case SDNATypes.LONG:
        return unsign ? fd.read_ulong : fd.read_long();
      case SDNATypes.INT64_T:
        return unsign ? fd.read_uint64_t() : fd.read_int64_t();
      case SDNATypes.POINTER:
        return fd.read_pointer();
      case SDNATypes.STRUCT:
        return this.subtype.read(fd, depth+1);
      case SDNATypes.ARRAY:
        var ret=[];
        if (this.subtype.type==SDNATypes.CHAR) {
            ret = fd.read_string(this.params);
            if (_debug) {
                console.log(tab(depth)+"string", ret);
            }
            return ret;
        }
        for (var i=0; i<this.params; i++) {
            ret.push(this.subtype.read(fd, depth+1));
        }
        return ret;
        break;
      case SDNATypes.VOID:
        return undefined;
    }
  }
  SDNAType.prototype.calcsize = function(sdna) {
    _sizing_visitor.sdna = sdna;
    return _sizing_visitor.visit(this);
  }
  define_static(SDNAType, "array", function(type, dimensions) {
    return new SDNAType(SDNATypes.ARRAY, type, dimensions);
  });
  define_static(SDNAType, "pointer", function(type) {
    return new SDNAType(SDNATypes.POINTER, type, undefined);
  });
  define_static(SDNAType, "struct", function(type) {
    return new SDNAType(SDNATypes.STRUCT, type, undefined);
  });
  define_static(SDNAType, "from_string", function(type, name, sdna) {
    name = name.trim();
    var do_print=false;
    if (name.search("uv")>=0&&name.search("\\[")>=0) {
    }
    if (type in sdna.structs) {
        type = SDNAType.struct(sdna.structs[type]);
    }
    else 
      if (type in BasicTypes) {
        type = new SDNAType(BasicTypes[type]);
    }
    else {
      type = new SDNAType(SDNATypes.VOID);
    }
    var i=0;
    var name2="";
    while (i<name.length) {
      var c=name[i];
      if (i==0&&c=="*") {
          type = SDNAType.pointer(type);
      }
      else 
        if (c=="[") {
          var dim="";
          i++;
          while (name[i]!="]") {
            dim+=name[i];
            i++;
          }
          dim = parseInt(dim);
          type = SDNAType.array(type, dim);
      }
      else 
        if (c!="["&&c!="]"&&c!="("&&c!=")"&&c!="*"&&c!=" "&&c!="\t") {
          name2+=c;
      }
      i++;
    }
    if (do_print) {
        console.log(name, type);
    }
    type.name = name2;
    return type;
  });
  _es6_module.add_class(SDNAType);
  SDNAType = _es6_module.add_export('SDNAType', SDNAType);
  function SDNAParseError(message) {
    Error.call(this, message);
  }
  /*test for IE bug*/;
  if (SDNAParseError.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNAParseError.name = 'SDNAParseError';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNAParseError = inherit_multiple(SDNAParseError, [Error], _es6_module, "SDNAParseError");
  _es6_module.add_class(SDNAParseError);
  SDNAParseError = _es6_module.add_export('SDNAParseError', SDNAParseError);
  function SDNAField(name, type) {
    this.name = name;
    this.type = type;
    this.off = -1;
  }
  /*test for IE bug*/;
  if (SDNAField.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNAField.name = 'SDNAField';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNAField = create_prototype(SDNAField, _es6_module, "SDNAField");
  SDNAField.prototype.read = function(fd, depth) {
    if (depth==undefined) {
        depth = 0;
    }
    var ret=this.type.read(fd, depth);
    return ret;
  }
  SDNAField.prototype.copy = function() {
    var ret=new SDNAField();
    ret.name = this.name;
    ret.type = this.type.copy();
    ret.off = this.off;
    return ret;
  }
  _es6_module.add_class(SDNAField);
  SDNAField = _es6_module.add_export('SDNAField', SDNAField);
  function SDNAStruct(name, typeid, fields) {
    this.name = name;
    this.typeid = typeid;
    this.fields = fields;
    this._fields = undefined;
  }
  /*test for IE bug*/;
  if (SDNAStruct.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNAStruct.name = 'SDNAStruct';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNAStruct = create_prototype(SDNAStruct, _es6_module, "SDNAStruct");
  SDNAStruct.prototype.read_field = function(fd, field, depth) {
    if (depth==undefined) {
        depth = 0;
    }
    return field.read(fd, depth);
  }
  SDNAStruct.prototype.read_into = function(fd, obj, depth) {
    if (depth==undefined) {
        depth = 0;
    }
    for (var i=0; i<this._fields.length; i++) {
        var field=this._fields[i];
        obj[field.name] = this.read_field(fd, field, depth);
    }
    return obj;
  }
  SDNAStruct.prototype.read = function(fd, depth) {
    if (depth==undefined) {
        depth = 0;
    }
    var typemanager=fd.host_typemanager;
    if (this.name in typemanager) {
        var ret=new typemanager[this.name]();
        if (ret._bl_instance_id==undefined) {
            console.trace("WARNING: you forgot to call super() in an SDNA-derived type constructor!", this.name);
            ret._bl_instance_id = sdna_instance_idgen.next();
        }
    }
    else {
      var ret={};
      ret._bl_sdna = this;
      ret._bl_instance_id = sdna_instance_idgen.next();
      ret.constructor = {};
      ret.constructor.name = this.name;
      ret.constructor.prototype = Object.create(SDNASubClass.prototype);
      ret.prototype = ret.constructor.prototype;
    }
    this.read_into(fd, ret, depth);
    return ret;
  }
  SDNAStruct.prototype.link = function(block, fd) {
    if (fd.link_doneset.has(block._bl_instance_id)) {
        return ;
    }
    function field_recurse(data, type) {
      if (type.type==SDNATypes.POINTER) {
          if (fd.oldmap.has(data)) {
              data = fd.oldmap.get(data);
          }
      }
      else 
        if (type.type==SDNATypes.ARRAY) {
          for (var i=0; i<type.type.params; i++) {
              data[i] = field_recurse(data[i], type.subtype);
          }
      }
      return data;
    }
    for (var i=0; i<this._fields.length; i++) {
        var f=this._fields[i];
        if (f.type.type==SDNATypes.STRUCT) {
            var ob=block[f.name];
            ob._bl_sdna.link(ob, fd);
            continue;
        }
        if (f.type.type!=SDNATypes.POINTER&&f.type.type!=SDNATypes.ARRAY)
          continue;
        if (f.type.type==SDNATypes.POINTER) {
        }
        var member=block[f.name];
        member = field_recurse(member, f.type);
        block[f.name] = member;
    }
    fd.link_doneset.add(block._bl_instance_id);
  }
  SDNAStruct.prototype.copy = function() {
    var ret=new SDNAStruct();
    ret.name = this.name;
    ret.typeid = this.typeid;
    ret.fields = {}
    ret._fields = [];
    var __iter_k=__get_iter(this.fields);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var field=this.fields[k].copy();
      ret._fields.push(field);
      ret.fields[k] = field;
    }
    return ret;
  }
  _es6_module.add_class(SDNAStruct);
  SDNAStruct = _es6_module.add_export('SDNAStruct', SDNAStruct);
  function SDNA(structs, types, typelens, structlist, ptrsize, endian) {
    this.pointer_size = ptrsize;
    this.endian = endian;
    this.structs = structs;
    this.structlist = structlist;
    this.types = types;
    this.typelens = typelens;
  }
  /*test for IE bug*/;
  if (SDNA.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNA.name = 'SDNA';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNA = create_prototype(SDNA, _es6_module, "SDNA");
  SDNA.prototype.read = function(bhead, fd) {
    var stt=this.structlist[bhead.sdna];
    if (bhead.nr>1) {
        var ret=[];
        for (var i=0; i<bhead.nr; i++) {
            ret.push(stt.read(fd));
        }
        return ret;
    }
    else {
      return stt.read(fd);
    }
  }
  _es6_module.add_class(SDNA);
  SDNA = _es6_module.add_export('SDNA', SDNA);
  function SDNAParser() {
  }
  /*test for IE bug*/;
  if (SDNAParser.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNAParser.name = 'SDNAParser';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNAParser = create_prototype(SDNAParser, _es6_module, "SDNAParser");
  SDNAParser.prototype.parse = function(code, endian, ptrsize) {
    var view=new DataView(code.buffer);
    var ci=8;
    function streq(off, str) {
      var str2="";
      for (var i=off; i<off+str.length; i++) {
          str2+=String.fromCharCode(code[i]);
      }
      return str2==str;
    }
    function read_strn(len) {
      var str2="";
      var off=ci;
      for (var i=off; i<off+len; i++) {
          str2+=String.fromCharCode(code[i]);
      }
      ci = i;
      return str2;
    }
    if (!streq(0, "SDNA")) {
        throw new SDNAParseError("expected SDNA");
    }
    if (!streq(4, "NAME")) {
        throw new SDNAParseError("expected NAME");
    }
    function read_int(off) {
      if (off==undefined) {
          off = ci;
      }
      ci+=4;
      return view.getInt32(off, endian==ENDIAN_LITTLE);
    }
    function read_short(off) {
      if (off==undefined) {
          off = ci;
      }
      ci+=2;
      return view.getInt16(off, endian==ENDIAN_LITTLE);
    }
    function read_str(off) {
      if (off==undefined) {
          off = ci;
      }
      var i=off;
      var ret="";
      while (code[i]) {
        ret+=String.fromCharCode(code[i]);
        i++;
      }
      ci = i+1;
      return ret;
    }
    var totname=read_int();
    var names=[], types=[], typelens=[], structs=[];
    console.log("totname", totname, "str", read_str(4, 4));
    while (!code[ci]) {
      ci++;
    }
    for (var i=0; i<totname; i++) {
        var name=read_str();
        names.push(name);
    }
    ci = (ci+3)&~3;
    if (read_strn(4)!="TYPE") {
        throw new Error("missing type column!");
    }
    var tottype=read_int();
    for (var i=0; i<tottype; i++) {
        var type=read_str();
        if (type=="bScreen") {
            type = "Screen";
        }
        types.push(type);
    }
    ci = (ci+3)&~3;
    if (read_strn(4)!="TLEN") {
        throw new Error("missing type len column!");
    }
    for (var i=0; i<tottype; i++) {
        typelens.push(read_short());
    }
    ci = (ci+3)&~3;
    if (read_strn(4)!="STRC") {
        throw new Error("missing struct column!");
    }
    var last_totfield=0;
    var totstruct=read_int();
    for (var i=0; i<totstruct; i++) {
        if (ci+4>=code.length) {
            console.log("Bounds error!!", last_totfield, structs);
            break;
        }
        var type=read_short();
        var totfield=read_short();
        var fields=[];
        last_totfield = totfield;
        for (var j=0; j<totfield; j++) {
            fields.push([types[read_short()], names[read_short()]]);
        }
        structs.push([type, totfield, fields]);
    }
    var smap={}
    var structlist=[];
    for (var i=0; i<structs.length; i++) {
        var stt=structs[i];
        var name=types[stt[0]];
        stt = new SDNAStruct(name, stt[0], stt[2]);
        smap[name] = stt;
        structlist.push(stt);
    }
    var __iter_k=__get_iter(smap);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var stt=smap[k];
      var fields={};
      for (var i=0; i<stt.fields.length; i++) {
          var type=stt.fields[i][0];
          fields[stt.fields[i][1]] = stt.fields[i] = new SDNAField(stt.fields[i][1], type);
      }
      stt._fields = stt.fields;
      stt.fields = fields;
    }
    this.sdna = new SDNA(smap, types, typelens, structlist, ptrsize, endian);
    sdna.typelens = typelens;
    var __iter_k=__get_iter(this.sdna.structs);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var stt=this.sdna.structs[k];
      stt.fields = {};
      for (var i=0; i<stt._fields.length; i++) {
          var f=stt._fields[i];
          f.type = SDNAType.from_string(f.type, f.name, this.sdna);
          f.name = f.type.name;
          stt.fields[f.name] = f;
      }
    }
    return this.sdna;
  }
  _es6_module.add_class(SDNAParser);
  SDNAParser = _es6_module.add_export('SDNAParser', SDNAParser);
});
es6_module_define('sdna', ["parse_sdna", "sdna_code"], function _sdna_module(_es6_module) {
  var parse_sdna=es6_import(_es6_module, 'parse_sdna');
  var sdna_code=es6_import(_es6_module, 'sdna_code');
  var _parse_sdna=es6_import(_es6_module, 'parse_sdna');
  var __iter_k=__get_iter(_parse_sdna);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    _es6_module.add_export(k, _parse_sdna[k], true);
  }
  var SDNA=parse_sdna.SDNA;
  SDNA = _es6_module.add_export('SDNA', SDNA);
  var SDNAParser=parse_sdna.SDNAParser;
  SDNAParser = _es6_module.add_export('SDNAParser', SDNAParser);
  var SDNASubClass=parse_sdna.SDNASubClass;
  var _sdna_prototype_idgen=0;
  var _sdna_prototype_maps={}
  _sdna_prototype_maps = _es6_module.add_export('_sdna_prototype_maps', _sdna_prototype_maps);
  function makeSDNAClass(stt) {
    var code="\n  var CLSNAME;\n\n  CLSNAME = function CLSNAME() {\n    this._bl_instance_id = parse_sdna.sdna_instance_idgen.next();\n  };\n  ".replace(/CLSNAME/g, stt.name);
    var cls=eval(code);
    inherit_multiple_intern(cls, [SDNASubClass]);
    cls.prototype._sdna_prototype_id = _sdna_prototype_idgen++;
    cls.prototype._bl_sdna = stt;
    _sdna_prototype_maps[cls.prototype._sdna_prototype_id] = cls;
    cls.sdna_write = function() {
    }
    cls.sdna_read = function(view, off) {
    }
    cls._bl_sdna = stt;
    return cls;
  }
  function SDNATypeManager() {
    this.sdna = undefined;
    this.bases = {}
  }
  /*test for IE bug*/;
  if (SDNATypeManager.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SDNATypeManager.name = 'SDNATypeManager';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SDNATypeManager = create_prototype(SDNATypeManager, _es6_module, "SDNATypeManager");
  SDNATypeManager.prototype.register = function(cls) {
    var stt=cls.prototype._bl_sdna;
    var sid=cls.prototype._sdna_prototype_id;
    _sdna_prototype_maps[sid] = cls;
    this[stt.name] = cls;
    startup_report("registered sdna.types."+stt.name, "blue");
  }
  SDNATypeManager.prototype.load_code = function(code) {
    var parser=new parse_sdna.SDNAParser();
    var sdna=parser.parse(code, parse_sdna.ENDIAN_LITTLE, 8);
    this.sdna = sdna;
    var __iter_k=__get_iter(sdna.structs);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this[k] = this.bases[k] = makeSDNAClass(sdna.structs[k]);
    }
    console.log(sdna);
  }
  _es6_module.add_class(SDNATypeManager);
  SDNATypeManager = _es6_module.add_export('SDNATypeManager', SDNATypeManager);
  var types=new SDNATypeManager();
  types = _es6_module.add_export('types', types);
  var bases=types.bases;
  bases = _es6_module.add_export('bases', bases);
  startup_report("  parsing sdna structs. . .", "teal");
  types.load_code(sdna_code.sdna);
  function init_sdna() {
  }
  init_sdna = _es6_module.add_export('init_sdna', init_sdna);
});
