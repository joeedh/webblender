import {EventHandler} from 'events';
import {G} from 'appstate';

//import {} from 'rna_properties'
//import {} from 'context'

class ToolOp extends EventHandler {
  constructor(ctx) {
    super();
  }
  
  //subclasses must implement this
  static info() { return {
    apiname  : "(error)",
    uiname   : "(untitled)",
    flag     : 0,
    undoflag : 0,
    
    is_modal : false,
    inputs   : {
    },
    outputs  : {
    },

    description : "",
    icon     : -1,
  }}
  
  poll(ctx) { //returns true if can call with context ctx
  }
  
  //execution function.
  exec(ctx) {
  }
  
  //undo functions
  //  default undo: copy entire file into memory
  undo_pre(ctx) {
    this._undo = G.create_undo_file();
  }
  
  undo(ctx) {
    G.load_undo_file(this._undo);
  }
  
  //modal functions
  modal_pre(ctx) {
  }
  
  modal_post(ctx) {
  }
  
  start_modal(ctx) {
  }
  
  end_modal(ctx) {
  }
  
  //event handlers
  on_mousedown(e) {
  }
  
  on_mousemove(e) {
  }
  
  on_mouseup(e) {
  }
  
  on_keydown(e) {
  }
  
  on_keyup(e) {
  }
  
  on_mousewheel(e) {
  }
}
