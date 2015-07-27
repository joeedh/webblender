"use strict";

import * as sdna from 'sdna';

export class ListBaseIter {
  constructor(listbase) {
    this.last = listbase.last;
    this.cur = listbase.first;
    
    this.ret = {done : false, value : undefined};
  }
  
  next() {
    var ret = this.ret;
    
    if (this.cur == 0 || typeof this.cur == "number" || 
        this.cur == undefined) 
    {
      ret.done = true;
      ret.value = undefined;
      return ret;
    }
    
    ret.value = this.cur;
    this.cur = this.cur.next;
    
    return ret;
  }
  
  [Symbol.iterator]() {
    return this;
  }
}

export class ListBase extends sdna.bases.ListBase {
  [Symbol.iterator]() {
    return new ListBaseIter(this);
  }
  
  get(index) {
    var item = this.first;
    
    if (typeof index == "string" || index instanceof String) {
      for (var item in this) {
        if (item.name == index || (item.id != undefined && item.id.name == index)) {
          return item;
        }
      }
      
      return undefined;
    }
    
    for (var i=0; i<index; i++) {
      item = item.next;
    }
    
    return typeof item == "number" ? undefined : item;
  }
}
sdna.types.register(ListBase);

