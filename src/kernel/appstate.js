import {ToolStack} from 'toolstack';
import {RNA_Api} from 'rna_api';
import 'mesh';
import {fetch_file} from 'net';

import {
    FileData, load_file
} from 'fileapi';

import {
  Main 
} from 'library';

export class AppState {
  constructor() {
    this.toolstack = new ToolStack();
    this.api = new RNA_Api();
    this.filepath = undefined;
    this.main = new Main();
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
          
          console.log(block);
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
  }
  
  load_default_file() {
    
  }
  
  startup() {
      var this2 = this;
      var timer = window.setInterval(function() {
          if (window._startup_blend != undefined) {
              window.clearInterval(timer);
              this2.load_user_file(window._startup_blend);
          }
      }, 50);
  }
};

export var G = new AppState();
