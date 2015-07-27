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
