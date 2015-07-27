import {EventHandler} from 'events';

export var ToolFlags = {
  SELECT            : 1,
  USE_DEFAULT_INPUT : 2
};

export var UndoFlags = {
  IGNORE_UNDO : 1
};

export var defined_tools = [];
export function register(toolop) {
  defined_tools.push(toolop);
}

//import {} from 'rna_properties'
//import {} from 'context'

export class ToolOp extends EventHandler {
  //subclasses must implement this
  static info() { return {
    apiname  : "(error)",
    uiname   : "(untitled)",
    flag     : 0,
    undoflag : 0,
    
    is_modal : false,
    
    inputs   : { //rna properties
    },
    outputs  : { //rna properties
    },

    description : "",
    icon     : -1,
  }}
  
  static default_inputs(ctx, toolop) {
  }
  
  constructor(ctx) {
    super();
    
    var info = this.constructor.info();
    this.inputs = {};
    this.outputs = {};
    
    for (var k in info.inputs) {
      this.inputs[k] = info.inputs[k].copy();
    }
    
    for (var k in info.outputs) {
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
