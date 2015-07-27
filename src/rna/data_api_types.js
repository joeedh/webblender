"use strict";


export var DataPathTypes = {
  PROP         : 0, 
  STRUCT       : 1, 
  STRUCT_ARRAY : 2
};

export var DataFlags = {
  NO_CACHE     : 1, 
  RECALC_CACHE : 2
};

import {PropTypes, PropFlags, RNAProperty, IntProperty, FloatProperty, 
        Vec3Property, StringProperty} from 'rna_properties';

export class DataPath {
  constructor(prop, name, path, dest_is_prop=false, use_path=true, flag=0) { 
    this.flag = flag;
    
    this.dest_is_prop = dest_is_prop
    
    //need to get rid of dest_is_prop paramter;
    //for now, use as sanity variable.
    if (prop == undefined)
      this.type = dest_is_prop ? DataPathTypes.PROP : DataPathTypes.STRUCT;
    
    if (prop != undefined && prop instanceof RNAProperty) {
      this.type = DataPathTypes.PROP;
    } else if (prop != undefined && prop instanceof DataStruct) {
      this.type = DataPathTypes.STRUCT;
      prop.parent = this;
      
      //XXX need to fold DataPath/Struct/StructArray
      //instead of linking member variables in struct/structarray
      //with containing datapath
      this.pathmap = prop.pathmap;
    } else if (prop != undefined && prop instanceof DataStructArray) {
      this.type = DataPathTypes.STRUCT_ARRAY;
      prop.parent = this;
      
      //XXX need to fold DataPath/Struct/StructArray
      //instead of linking member variables in struct/structarray
      //with containing datapath
      this.getter = prop.getter;
    }
    
    this.name = name
    this.data = prop;
    this.path = path;
    this.update = undefined : Function;
    
    this.use_path = use_path;
    this.parent = undefined;
  }
  
  cache_good() {
    var p = this;
    
    while (p != undefined) {
      if (p.flag & DataFlags.RECALC_CACHE)
        return false;
      p = p.parent;
    }
    
    return true;
  }
}

export class DataStructIter {
  constructor(s) {
    this.ret = {done : false, value : undefined}; //cached_iret();
    this.cur = 0;
    
    this.strct = s;
    this.value = undefined;
  }
  
  [Symbol.iterator]() { return this; }
  
  reset() {
    this.cur = 0;
    this.ret.done = false;
    this.ret.value = undefined;
  }
  
  next() {
    if (this.cur >= this.strct.paths.length) {
      var ret = this.ret;
      
      this.cur = 0;
      
      ret.done = true;
      this.ret = {done : false, value : undefined}; //cached_iret();
      
      return ret;
    }
    
    var p = this.strct.paths[this.cur++];
    p.data.path = p.path;
    
    this.ret.value = p;
    return this.ret;
  }
}

/*array_item_struct_getter is a function that takes
  one of the array items in path, and returns 
  a struct definition
 */
export class DataStructArray {
  constructor(array_item_struct_getter, getitempath, getitem, getiter, getkeyiter, getlength) {
    this.getter = array_item_struct_getter;
    this.getiter = getiter;
    this.getlength = getlength;
    this.getkeyiter = getkeyiter;
    this.getitem = getitem;
    this.getitempath = getitempath;
    
    this.type = DataPathTypes.STRUCT_ARRAY;
  }
}

export class DataStruct {
  constructor(paths) {
    this.paths = new Array();
    
    if (paths != undefined) {
      for (var i=0; i<paths.length; i++) {
        this.paths.push(paths[i]);
      }
    }
    
    this.pathmap = {}
    this.parent = undefined;
    
    this._flag = 0;
    
    for (var p of this.paths) {
      p.parent = this;
      this.pathmap[p.name] = p
      if (p.type == DataPathTypes.PROP) {
        p.data.path = p.path;
      }
    }
    
    this.type = DataPathTypes.STRUCT;
  }
  
  Float(apiname, path, uiname, description) {
    var ret = new FloatProperty(0, apiname, uiname, description);
    
    ret = new DataPath(ret, apiname, path, path!=undefined);
    this.add(ret);
    
    return ret;
  }
  
  Struct(apiname, path, uiname, description) {
    var ret = new DataStruct([]);
    
    var path = new DataPath(ret, apiname, path, path!=undefined);
    this.add(path);
    
    return ret;
  }  
  
  Int(apiname, path, uiname, description) {
    var ret = new IntProperty(0, apiname, uiname, description);
    
    ret = new DataPath(ret, apiname, path, path!=undefined);
    this.add(ret);
    
    return ret;
  }

  [Symbol.iterator]() {
    return new DataStructIter(this);
  }
  
  get flag() {
    return this._flag;
  }
  
  cache_good() {
    var p = this;
    
    while (p != undefined) {
      if (p.flag & DataFlags.RECALC_CACHE)
        return false;
      p = p.parent;
    }
    
    return true;
  }
  
  set flag(val) {
    this._flag = val;
    
    function recurse(p, flag) {
      p.flag |= flag;
      
      if (p instanceof DataStruct) {
        for (var p2 in p.paths) {
          if (p2 instanceof DataStruct) {
            //hand off to substruct;
            //we don't want to double recurse
            p2.flag |= flag;
          } else {
            recurse(p2, flag);
          }
        }
      }
    }
    
    if (val &  DataFlags.NO_CACHE) {
      for (var p in this.paths) {
        recurse(p, DataFlags.NO_CACHE);
      }
    }
    if (val &  DataFlags.RECALC_CACHE) {
      for (var p of this.paths) {
        recurse(p, DataFlags.RECALC_CACHE);
      }
    }
  }
  
  add(p) {
    if (this._flag & DataFlags.NO_CACHE)
      p._flag |= DataFlags.NO_CACHE;
    
    this.pathmap[p.name] = p;
    this.paths.push(p);
    p.parent = this;
  }

  replace(p, p2) {
    for (var p2 of this.paths) {
      if (p2.name == p.name) {
        this.flag |= DataFlags.RECALC_CACHE;
        this.paths.remove(p2);
        delete this.pathmap[p2.name];
        break;
      }
    }
    
    this.add(p);
  }
}
