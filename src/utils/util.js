//the all-important object recycling class
export class cachering extends Array {
  constructor(func, size) {
    super();
    
    for (var i=0; i<size; i++) {
      this.push(func());
    }
    
    this.cur = 0;
  }
  
  static fromConstructor(cls, size) {
    return new cachering(function() {
      return new cls();
    }, size);
  }
  
  next() {
    var ret = this[this.cur];
    this.cur = (this.cur+1)%this.length;
    
    return ret;
  }
}

class SetIter {
  constructor(set) {
    this.set = set;
    this.i = 0;
    this.ret = {done : false, value : undefined};
    this.list = set.list;
  }
  
  [Symbol.iterator]() {
    return this;
  }
  
  cache_init() {
    this.i = 0;
    this.ret.done = false;
    this.ret.value = undefined;
    this.list = this.set.list;
    
    return this;
  }
  
  next() {
    var list = this.list;
    var len = list.length;
    
    while (this.i < len && list[this.i] === _set_null) {
      this.i++;
    }
    
    if (this.i >= len) {
      this.ret.done = true;
      this.ret.value = undefined;
      return this.ret;
    }
    
    this.ret.value = list[this.i];
    this.i++;
    
    return this.ret;
  }
  
  reset() {
    this.cache_init();
  }
}

export class set {
  constructor(Object input) {
    this.items = {};
    this.list = [];
    this.freelist = [];
    this.length = 0;
    
    var this2 = this;
    
    this._itercache = new cachering(function() {
      return new SetIter(this2);
    }, 64);
    
    if (input != undefined) {
      if (input instanceof Array || input instanceof String) {
        for (var i=0; i<input.length; i++) {
          this.add(input[i]);
        }
      } else {
        for (var item of input) {
          this.add(item);
        }
      }
    }
  }
  
  forEach(cb, thisvar) {
    if (thisvar == undefined) 
      thisvar = self;
    
    for (var item of this) {
      cb.call(thisvar, item);
    }
  }
  
  add(item) {
    var hash = item[Symbol.keystr]();
    if (hash in this.items)
      return;
      
    var i;
    if (this.freelist.length > 0) {
      i = this.freelist.pop();
      this.list[i] = item;
    } else {
      i = this.list.length;
      this.list.push(item);
    }
    
    this.items[hash] = i;
    this.length++;
  }
  
  remove(item) {
    var hash = item[Symbol.keystr]();
    if (!(hash in this.items))
      return;
      
    var i = this.items[hash];
    this.list[i] = _set_null;
    this.freelist.push(i);

    delete this.items[hash];
    this.length--;
    
    return item;
  }
  
  has(item) {
    var hash = item[Symbol.keystr]();
    
    return hash in this.items;
  }
  
  union(set2) {
    var ret = new set();
    
    for (var item of this) {
      ret.add(item);
    }
    
    for (var item of set2) {
      ret.add(item);
    }
    
    return ret;
  }
  
  [Symbol.iterator]() {
    return this._itercache.next().cache_init(this);
  }

  asArray() : Array<Object> {
    var arr = new Array(this.length);
    
    for (var item of this) {
      arr[i++] = item;
    }
    
    return arr;
  }

  toJSON() : Array<Object> {
    return this.asArray();
  }

  toSource() : String {
    return "new set(" + list(this).toSource() + ")";
  }
}

class HashKeyIter {
  constructor(hashtable hash) {
    this.ret = {done : false, value : undefined};
    this.hash = hash;
    this.iter = Iterator(hash.items);
  }
  
  next() : IterRet {
    var reti = this.ret;
    var iter = this.iter;
    var items = this.hash.items;
    
    var item = iter.next();
    
    if (item.done)
      return item;
      
    while (!items.hasOwnProperty(item.value[0])) {
      if (item.done) return item;
      
      item = iter.next();
    }
    
    reti.value = this.hash.keymap[item.value[0]];
    return reti;
  }
}

export class hashtable {
  constructor() {
    this.items = {};
    this.keymap = {};
    this.length = 0;
  }
  
  reset() {
    this.items = {};
    this.keymap = {};
    this.length = 0;
  }
  
  add(Object key, Object item) {
    if (!this.items.hasOwnProperty(key[Symbol.keystr]())) 
      this.length++;
    
    this.items[key[Symbol.keystr]()] = item;
    this.keymap[key[Symbol.keystr]()] = key;
  }

  remove(Object key) {
    delete this.items[key[Symbol.keystr]()]
    delete this.keymap[key[Symbol.keystr]()]
    this.length -= 1;
  }

  [Symbol.iterator]() : HashKeyIter {
    return new HashKeyIter(this)
  }

  values() : GArray<Object> {
    var ret = new GArray();
    for (var k in this) {
      ret.push(this.items[k]);
    }
    
    return ret;
  }

  keys() : GArray<Object> {
    return list(this);
  }

  get(Object key) : Object {
    return this.items[key[Symbol.keystr]()];
  }

  set(Object key, Object item) {
    if (!this.has(key)) {
      this.length++;
    }
    
    this.items[key[Symbol.keystr]()] = item;
    this.keymap[key[Symbol.keystr]()] = key;
  }

  union(hashtable b) : hashtable {
    var newhash = new hashtable(this)
    
    for (var item of b) {
      newhash.add(item, b.get[item])
    }
    
    return newhash;
  }

  has(Object item) : Boolean {
    if (item == undefined)
      console.trace();
    return this.items.hasOwnProperty(item[Symbol.keystr]())
  }
}

export class IDGen {
  constructor() {
    this.cur = 1;
  }
  
  next() {
    return this.cur++;
  }
  
  max_cur(id) {
    this.cur = Math.max(this.cur, id+1);
  }
}

export function list(iterable) {
  var ret = [];
  
  for (var item in iterable) {
    ret.push(item);
  }
  
  return ret;
}
