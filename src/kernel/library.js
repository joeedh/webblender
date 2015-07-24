import 'listbase';
import * as sdna from 'sdna';

export class Library extends sdna.bases.Library {

}
sdna.types.register(Library);


export class ID extends sdna.bases.ID {

}
sdna.types.register(ID);

export class BlockListIter {
  constructor(list) {
    this.list = list;
    this.i = 0;
    this.ret = {done : false, value : undefined};
  }
  
  [Symbol.iterator]() {
    return this;
  }
  
  next() {
    var ret = this.ret;
    
    if (this.i >= this.list.length) {
      ret.done = true;
      ret.value = undefined;
      
      return ret;
    }
    
    ret.value = this.list[this.i++];
    return ret;
  }
}

export class BlockList {
  constructor(type) {
      this.list = [];
      this.namemap = {};
      this.type = type;
  }
  
  [Symbol.iterator]() {
    return new BlockListIter(this);
  }
  
  rename(block) {
    throw new Error("implement me!");
  }
  
  add(block) {
    this.namemap[block.id.name] = block;
    this.list.push(block);
    
    return this;
  }
  
  get(int_or_name) {
    if (typeof int_or_name == "number") {
      return this.list[int_or_name];
    } else {
      return this.namemap[int_or_name];
    }
  }
}

export class Main {
  constructor() {
    this.lists = {};
    this.garbage = [];
    
    this.materials = this.get("MA");
    this.meshes = this.get("ME");
    this.objects = this.get("OB");
    this.scenes = this.get("SC");
    this.screens = this.get("SR");
    this.windows = this.get("WM");
  }
  
  get(type) {
    if (!(type in this.lists)) {
      this.lists[type] = new BlockList(type);
    }
    
    return this.lists[type];
  }
}