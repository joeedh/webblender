export class ContextBase {
  get scene() {
    return G.curscene;
  }
  
  get active_object() {
      
  }
  
  get screen() {
    return G.screen;
  }
  
  get window() {
    return G.window;
  }
  
  get objects() {
    return G.main.objects;
  }
  
  get meshes() {
    return G.main.meshes;
  }
}

export class ToolContext extends ContextBase {
  
}

export class UIContext extends ToolContext {
  
}

export class ModalContext extends ContextBase {
}

export class SavedContext extends ContextBase {
}