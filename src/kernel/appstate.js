import 'window';
import {ToolStack} from 'toolstack';
import {RNA_Api} from 'rna_api';
import 'mesh';
import {fetch_file} from 'net';
import {Vector2} from 'vectormath';
import {EventManager} from 'events';
import {RasterState} from 'raster';
import {patch_canvas2d_tranform} from 'canvas2d_matrix';
import {DataAPI} from 'data_api';

import {
    FileData, load_file
} from 'fileapi';

import {
  Main 
} from 'library';

var context2d, context3d;

export class AppState {
  constructor() {
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
  
  create_undo_file() {
  }
  
  load_undo_file(data) {
  }
  
  create_user_file() {
  }
  
  destroy() {
  }
  
  load_user_file(data) {
      var fdata = new FileData(data);
      var ret = load_file(fdata);
      
      this.destroy();
      var main = this.main = new Main();
      
      var fileglobal = undefined;
      
      for (var i=0; i<fdata.libblocks.length; i++) {
        var block = fdata.libblocks[i];
        
        if (block.id == undefined) {
          if (block._bl_sdna.name == "FileGlobal") {
            fileglobal = block;
            continue;
          }
          
          //console.log(block);
          main.garbage.push(block);
          continue;
        }
        
        var type = block.id.name;
        if (type.length == 0) {
          main.garbage.push(block);
          continue;
        }
        
        type = (type[0] + type[1]).toUpperCase();
        
        main.get(type).add(block);
      }
      
      main.fileglobal = fileglobal;
      this.curscene = main.fileglobal.curscene;
      
      window.last_fd = fdata;
      
      this.init_events();
      redraw_ui();
      redraw_viewports();
  }
  
  init_events() {
    this.event_manager.clearStack();
    var win = this.main.windows.get(0).winactive;
    
    console.log("add event listener", win);
    
    this.window = win;
    this.screen = win.screen;

    win.addHandlers(this.event_manager);
    win.on_resize({
        type   : "resize",
        width  : this.size[0],
        height : this.size[1]
    });
  }
  
  load_default_file() {
    
  }
    
  draw_ui() {
    if (this.window != undefined) {
      this.window.draw_ui(this.g);
    }
    
    var g = this.g; //2d canvas context
  }
  
  startup() {
      this.raster = new RasterState();
      
      var canvas2d = document.getElementById("canvas2d");

      var g = this.g = context2d = canvas2d.getContext("2d");
      patch_canvas2d_tranform(g);
      
      window._canvas2d_ctx = g; //ui code uses this global
      
      g.save();
      
      var this2 = this;
      var timer = window.setInterval(function() {
          if (window._startup_blend != undefined) {
              window.clearInterval(timer);
              this2.load_user_file(window._startup_blend);
          }
      }, 50);
      
      this.event_manager = new EventManager();
      this.event_manager.bindDOM(window);
      
      checksize();
      redraw_ui();
  }
};

export var G = new AppState();
window.G = G;

var canvas2d = document.getElementById("canvas2d");
var canvas3d = document.getElementById("canvas3d");

export var checksize = function() {
    var winwidth = window.innerWidth;
    var winheight = window.innerHeight;
    
    if (G.size[0] != winwidth || G.size[1] != winheight) {
        var oldsize = [G.size[0], G.size[1]];
        
        G.size[0] = winwidth, G.size[1] = winheight;
        
        canvas2d.width = G.size[0];
        canvas2d.height = G.size[1];
        
        canvas3d.width = G.size[0];
        canvas3d.height = G.size[1];

        var g = context2d;
        if (g._matrix_stack.length > 0) {
          g.restore();
        } else {
          console.log("Eek!");
        }
        
        g._matrix.makeIdentity();
        g.save();
        
        g.translate(0.0, G.size[1]);
        g.scale(1.0, -1.0);
        
        G.event_manager.fireEvent({
          type      : "resize",
          oldWidth  : oldsize[0],
          oldHeight : oldsize[1],
          width     : oldsize[0],
          height    : oldsize[1]
        });
    }
}

window.setInterval(checksize, 10);

window.redraw_viewports = function() {
}

var _ui_animreq = undefined;

window.redraw_ui = function() {
  if (_ui_animreq != undefined) return;
  
  _ui_animreq = requestAnimationFrame(function() {
    _ui_animreq = undefined;
    G.draw_ui();
  });
}

