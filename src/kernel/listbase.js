import * as sdna from 'sdna';

export class ListBaseIter {
  constructor(listbase) {
    this.last = listbase.last;
    this.cur = listbase.first;
    
    this.ret = {done : false, value : undefined};
  }
  
  next() {
    var ret = this.ret;
    
    if (this.cur == 0 || this.cur == undefined) {
      ret.done == true;
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
}
sdna.types.register(ListBase);

