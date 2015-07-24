"use strict";

if (self.Symbol == undefined) {
  export var _syms = {};
  var gen_sym = function(str) {
    var i = 0;
    for (var i=0; i<str.length; i++) {
      i += str[i].charCodeAt(i);
    }
    
    while (i in _syms) {
      i++;
    }
    
    _syms[i] = str;
    return i;
  }
  self.Symbol = {
    iterator : "_sym"+gen_sym("iterator"),
    keystr   : "_sym"+gen_sym("keystr")
  }
} else {
  Symbol.keystr = Symbol("keystr");
}

if (Math.sign == undefined) {
  Math.sign = function(f) {
    return 1.0 - (f < 0.0)*2.0;
  }
}

if (Math.fract == undefined) {
  Math.fract = function(f) {
    f = Math.abs(f);
    
    return f - Math.floor(f);
  }
}

class PolyFillArrayIter {
  constructor(array) {
    this.ret = {value : undefined, done : false};
    this.array = array;
    this.i = 0;
  }
  
  [Symbol.iterator]() {
    return this;
  }
  
  next() {
    var ret = this.ret;
    
    if (this.i >= this.array.length) {
      ret.done = true;
      ret.value = undefined;
      return ret;
    }
    
    ret.value = this.array[this.i++];
    return ret;
  }
}

if (Array.prototype[Symbol.iterator] == undefined) {
  Array.prototype[Symbol.iterator] = function() {
    return new PolyFillArrayIter(this);
  }
}

if (Array.prototype.insert == undefined) {
  Array.prototype.insert = function(before, item) {
    if (before < 0 || before > this.length) {
      throw new Error("Bad index " + before + ", should be between 0-" + this.length + ".");
    }
    
    this.push(0);
    
    for (var i=this.length-1; i > before; i--) {
      this[i] = this[i-1];
    }
    
    this[before] = item;
    return this;
  }
}

if (Array.prototype.pop_i == undefined) {
  Array.prototype.pop_i = function(i) {
    var ret = this[i];
    
    while (i < this.length-1) {
      this[i] = this[i+1];
    }
    
    this[i] = undefined;
    this.length--;
    
    return ret;
  }
}

if (Array.prototype.remove == undefined) { 
  Array.prototype.remove = function(item, ignore_existence=false) {
    var i = this.indexOf(item);
    
    if (i < 0) {
      console.trace("WARNING: item ", item, "not in array", this);
      
      if (!ignore_existence)
        throw new Error("Item not in array");
    }
    
    return this.pop_i(i);
  }
}

if (Math.sign == undefined) {
  Math.sign = function(f) {
    return 1.0 - (f < 0.0)*2.0;
  }
}

if (Math.fract == undefined) {
  Math.fract = function(f) {
    f = Math.abs(f);
    
    return f - Math.floor(f);
  }
}

String.prototype[Symbol.keystr] = function() {
  return this;
}
Number.prototype[Symbol.keystr] = function() {
  return ""+this;
}
Boolean.prototype[Symbol.keystr] = function() {
  return ""+this;
}


