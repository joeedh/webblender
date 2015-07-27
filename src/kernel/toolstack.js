/*
THIS IS NOT A REAL PROCEDURAL TOOL STACK

. . . for that to work, you have to do things like pass 
mesh selection to tools by via world-space vertex positions
(then find the actual selected verts via ray picking).
*/
import {ModalContext, ToolContext} from 'context';

export class ToolStack {
  constructor() {
    this.undostack = [];
    this.undocur = -1;
  }
  
  default_inputs(ctx, toolop) {
  }
  
  exec_tool(tool) {
    var ctx = tool.is_modal ? new ModalContext() : new ToolContext();
    
    if (!tool.poll(ctx)) {
      console.trace("Cannot run tool", tool);
      return;
    }
    
    if (this.undocur > this.undostack.length) {
      this.undostack = this.undostack.slice(0, this.undocur);
    } else {
      this.undocur++;
    }
    
    this.undostack.push(tool);
    tool.undo_pre(ctx);
    tool.exec(ctx);
  }
}
