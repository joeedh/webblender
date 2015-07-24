"use strict";

import {sdna} from 'sdna_code';
import {IDGen} from 'util';

export var ENDIAN_BIG    = 0;
export var ENDIAN_LITTLE = 1;

export var sdna_instance_idgen = new IDGen();

var _debug = 0;

export class SDNASubClass {
  constructor() {
  }
}

export var SDNATypes = {
  INT     : 1,
  SHORT   : 2,
  CHAR    : 3, //always unsigned
  FLOAT   : 4,
  DOUBLE  : 5,
  LONG    : 6,
  INT64_T : 7,
  POINTER : 7,
  STRUCT  : 8,
  ARRAY   : 9, //arrays are store nested, with first dimensions being leaf nodes
               //e.g. array[3][2] would be stored as type(array[2], type(array[3]));
  VOID    : 10,
  UNSIGNED : 64,
  TYPEMASK : 15
};

var SDNATypeNames = {}
function build_SDNATypeNames() { //supposedly, doing it this way helps with optimization
  for (var k in SDNATypes) {
    SDNATypeNames[SDNATypes[k]] = k
  }
}
build_SDNATypeNames();

export var BasicTypes = {
  "char"    : SDNATypes.CHAR, //sign chars are not actually allowed
  "uchar"   : SDNATypes.CHAR,
  "short"   : SDNATypes.SHORT,
  "ushort"  : SDNATypes.SHORT|SDNATypes.UNSIGNED,
  "int"     : SDNATypes.INT,
  "uint"    : SDNATypes.INT|SDNATypes.UNSIGNED,
  "long"    : SDNATypes.LONG,
  "ulong"   : SDNATypes.LONG|SDNATypes.UNSIGNED,
  "float"   : SDNATypes.FLOAT,
  "double"  : SDNATypes.DOUBLE,
  "int64_t" : SDNATypes.INT64_T,
  "uint64_t": SDNATypes.INT64_T|SDNATypes.UNSIGNED,
  "void"    : SDNATypes.VOID
}

function tab(size) {
  var s = "";
  
  for (var i=0; i<size; i++) {
    s += " "
  }
  
  return s;
}

export class SizingVisitor {
  constructor(sdna) {
    this.sdna = sdna;
  }
  
  STRUCT(type) {
    var size = 0;
    var stt = type.subtype;

    for (var i=0; i<stt.fields.length; i++) {
      size += this.visit(stt.fields[i].type);
    }
    
    return size;
  }
  
  visit(type) {
    return this[SDNATypeNames[type.type]](type);
  }
  
  INT() {
    return 4;
  }
  FLOAT() {
    return 4;
  }
  DOUBLE() {
    return 4;
  }
  INT64_T() {
    return 8;
  }
  VOID() {
    return 0;
  }
  CHAR() {
    return 1;
  }
  SHORT() {
    return 2;
  }
  POINTER() {
    return this.sdna.pointer_size;
  }
}

var _sizing_visitor = new SizingVisitor();

var SDNAType_read_stack = new Array(4096);

export class SDNAType {
  constructor(type, subtype=-1, params=undefined) {
    this.type = type;
    this.subtype = subtype;
    this.params = params; //e.g. array dimensions
  }
  
  read_stack(fd) {
    var stack = SDNAType_read_stack;
    var _stack_cur = 0;
    
    function push(item) {
        if (stack.length == _stack_cur)
            stack.push(0);
          
        if (_stack_cur < 0) {
          console.log(_stack_cur, stack, item);
          throw new Error("eek!");
        }
        
        stack[_stack_cur++] = item;
    }
    function pop() {
      if (_stack_cur < 0) return undefined;
      return stack[_stack_cur--];
    }
    
    function top(i=0) {
        if (_stack_cur-i < 0) return undefined;
        
        return stack[_stack_cur-i];
    }
    
    var STATE_RETURN = 0;
    var STATE_ENTER = 1;

    push(this); //this
    push(fd);   //fd 
    push(STATE_ENTER);
    
    var _ci = 0;
    
    while (stack.length > 0) {
      var state = stack.pop(0);
      var val = undefined;
      
      if (state == STATE_RETURN) {
          val = stack.pop();
      }
      
      var fd = top(0);
      var typethis = top(1);
      
      if (_ci++ > 10000) {
          console.log("infinite loop");
          break;
      }
      
      console.log(_ci, stack, typethis, fd);
      
      var type = typethis.type & SDNATypes.TYPEMASK;
      
      if (type != SDNATypes.Array && type != SDNATypes.STRUCT) {
          //get rid of fd/typethis from primitive types
          pop();
          pop();
      }
      
      if (state == STATE_RETURN) {
        var val = pop();
        
        //find owner 
        if (stack.length == 0) {
          return val; //yay!
        }
        
        fd = top(0);
        typethis = top(1);
        
        type = typethis.type & SDNATypes.TYPEMASK;
        
        if (type == SDNATypes.ARRAY) {
          //find our array value
          var array = top(2);
          array.push(val);
          
          if (array.length < typethis.params) {
            pop();
            pop();
            
            //array should be in the right place. . .hopefully
            push(STATE_RETURN);
          }
        } else if (type == SDNATypes.STRUCT) {
          pop();
          pop();
          
          push(STATE_RETURN);
        }
      }
      
      var unsign = typethis.type & SDNATypes.UNSIGNED;
      
      switch (typethis.type & SDNATypes.TYPEMASK) {
        case SDNATypes.INT:
          push(unsign ? fd.read_uint() : fd.read_int());
          push(STATE_RETURN);
          break;
        case SDNATypes.SHORT:
          push(unsign ? fd.read_ushort() : fd.read_short());
          push(STATE_RETURN);
          break;
        case SDNATypes.CHAR: //always unsigned
          push(fd.read_byte());
          push(STATE_RETURN);
          break;
        case SDNATypes.FLOAT:
          push(fd.read_float());
          push(STATE_RETURN);
          break;
        case SDNATypes.DOUBLE:
          push(fd.read_double());
          push(STATE_RETURN);
          break;
        case SDNATypes.LONG:
          push(unsign ? fd.read_ulong : fd.read_long());
          push(STATE_RETURN);
          break;
        case SDNATypes.INT64_T:
          push(unsign ? fd.read_uint64_t() : fd.read_int64_t());
          push(STATE_RETURN);
          break;
        case SDNATypes.POINTER:
          push(fd.read_pointer());
          push(STATE_RETURN);
          break;
        case SDNATypes.STRUCT:
          push(typethis.subtype.read(fd));
          push(STATE_RETURN);
          break;
        
        //arrays are store nested, with first dimensions being leaf nodes
        //e.g. array[3][2] would be stored as type(array[2], type(array[3]));
        case SDNATypes.ARRAY: 
          var ret = [];
          
          if (typethis.subtype.type == SDNATypes.CHAR) {
              ret = fd.read_string(typethis.params);
              console.log(tab(depth)+ "string", ret);
              
              push(ret);
              push(STATE_RETURN);
              break;
          }
          
          stack.push([]);
          stack.push(typethis.subtype);
          stack.push(fd);
          stack.push(STATE_ENTER);
          
          break;
        case SDNATypes.VOID:
          push(undefined);
          push(STATE_RETURN);
          break;
      }
    }
  }
  
  read(fd, depth=0) {
    var unsign = this.type & SDNATypes.UNSIGNED;
    
    if (_debug) {
      console.log(tab(depth) + "reading", this.name)
    }
    
    switch (this.type & SDNATypes.TYPEMASK) {
      case SDNATypes.INT:
        return unsign ? fd.read_uint() : fd.read_int();
      case SDNATypes.SHORT:
        return unsign ? fd.read_ushort() : fd.read_short();
      case SDNATypes.CHAR: //always unsigned
        return fd.read_byte();
      case SDNATypes.FLOAT:
        return fd.read_float();
      case SDNATypes.DOUBLE:
        return fd.read_double();
      case SDNATypes.LONG:
        return unsign ? fd.read_ulong : fd.read_long();
      case SDNATypes.INT64_T:
        return unsign ? fd.read_uint64_t() : fd.read_int64_t();
      case SDNATypes.POINTER:
        return fd.read_pointer();
      case SDNATypes.STRUCT:
        return this.subtype.read(fd, depth+1);
      
      //arrays are store nested, with first dimensions being leaf nodes
      //e.g. array[3][2] would be stored as type(array[2], type(array[3]));
      case SDNATypes.ARRAY: 
        var ret = [];
        
        if (this.subtype.type == SDNATypes.CHAR) {
            ret = fd.read_string(this.params);
            
            if (_debug) {
              console.log(tab(depth)+"string", ret);
            }
            
            return ret;
        }
        
        for (var i=0; i<this.params; i++) {
          ret.push(this.subtype.read(fd, depth+1));
        }
        
        return ret;
        break;
      case SDNATypes.VOID:
        return undefined;
    }
  }
  
  calcsize(sdna) {
    _sizing_visitor.sdna = sdna;
    
    return _sizing_visitor.visit(this);
  }
  
  static array(type, dimensions) {
    return new SDNAType(SDNATypes.ARRAY, type, dimensions);
  }
  
  static pointer(type) {
    return new SDNAType(SDNATypes.POINTER, type, undefined);
  }
  
  static struct(type) {
    return new SDNAType(SDNATypes.STRUCT, type, undefined);
  }
  
  static from_string(type, name, sdna) {
    name = name.trim();
    
    var do_print=false;
    if (name.search("uv") >= 0 && name.search("\\[") >= 0) { //name.search("\\*") >= 0 || name.search("\\[") >= 0 || name.search("\\(") >= 0) {
      //console.log(type, name);
      //do_print = true;
    }
    
    if (type in sdna.structs) {
      type = SDNAType.struct(sdna.structs[type]);
    } else if (type in BasicTypes) {
      type = new SDNAType(BasicTypes[type]);
    } else {
      //console.log("Unknown type", type);
      type = new SDNAType(SDNATypes.VOID);
    }
    
    var i = 0;
    var name2 = ""
    while (i < name.length) {
      var c = name[i];
      if (i == 0 && c == "*") {
        type = SDNAType.pointer(type);
      } else if (c == "[") {
        var dim = "";
        i++;
        while (name[i] != "]") {
          dim += name[i];
          i++;
        }
        dim = parseInt(dim);
        
        type = SDNAType.array(type, dim);
      } else if (c != "[" && c != "]" && c != "(" && c != ")" && 
                 c != "*" && c != " " && c != "\t") 
      {
        name2 += c;
      }
      i++;
    }
    
    if (do_print) {
      console.log(name, type);
    }
    
    type.name = name2;
    
    return type;
  }
}

export class SDNAParseError extends Error {
  constructor(message) {
    super(message)
  }
}

export class SDNAField {
  constructor(name, type) {
    this.name = name;
    this.type = type; //an SDNAType
    this.off = -1; //XXX make sure to calculate me!
  }
  
  read(fd, depth=0) {
    var ret = this.type.read(fd, depth);
    return ret;
  }
  
  copy() {
    var ret = new SDNAField();
    ret.name = this.name;
    ret.type = this.type.copy();
    ret.off = this.off;
    
    return ret;
  }
}

export class SDNAStruct {
  constructor(name, typeid, fields) {
    this.name = name;
    this.typeid = typeid;
    this.fields = fields;
    this._fields = undefined;
  }
  
  read_field(fd, field, depth=0) {
      return field.read(fd, depth);
  }
  
  read_into(fd, obj, depth=0) {
    for (var i=0; i<this._fields.length; i++) {
        var field = this._fields[i];
        obj[field.name] = this.read_field(fd, field, depth);
    }
    
    return obj;
  }
  
  read(fd, depth=0) {
      var typemanager = fd.host_typemanager;
      if (this.name in typemanager) {
        var ret = new typemanager[this.name]();
        
        if (ret._bl_instance_id == undefined) {
          console.trace("WARNING: you forgot to call super() in an SDNA-derived type constructor!", this.name);
          ret._bl_instance_id = sdna_instance_idgen.next();
        }
      } else {
        var ret = {};
        
        ret._bl_sdna = this;
        ret._bl_instance_id = sdna_instance_idgen.next();

        ret.constructor = {};
        ret.constructor.name = this.name;
        ret.constructor.prototype = Object.create(SDNASubClass.prototype);
        ret.prototype = ret.constructor.prototype;
      }
      
      this.read_into(fd, ret, depth);
      
      return ret;
  }
  
  link(block, fd) {
    //console.log(block._bl_instance_id, block);
    
    if (fd.link_doneset.has(block._bl_instance_id)) {
      return;
    }
    
    function field_recurse(data, type) {
      if (type.type == SDNATypes.POINTER) {
        if (fd.oldmap.has(data)) {
          data = fd.oldmap.get(data);
        }
      } else if (type.type == SDNATypes.ARRAY) {
        for (var i=0; i<type.type.params; i++) {
          data[i] = field_recurse(data[i], type.subtype);
        }
      }
        
      return data;
    }
    
    for (var i=0; i<this._fields.length; i++) {
      var f = this._fields[i];
      //console.log(f.type.type);
      
      if (f.type.type == SDNATypes.STRUCT) {
        var ob = block[f.name];
        ob._bl_sdna.link(ob, fd);
        
        continue;
      }
      if (f.type.type != SDNATypes.POINTER && f.type.type != SDNATypes.ARRAY)
        continue;
      
      if (f.type.type == SDNATypes.POINTER) {
        //console.log("link!");
      }
      
      var member = block[f.name];
      member = field_recurse(member, f.type);
      
      block[f.name] = member;
    }
    
    fd.link_doneset.add(block._bl_instance_id);
  }
  
  copy() {
    var ret = new SDNAStruct()
    ret.name = this.name;
    ret.typeid = this.typeid;
    ret.fields = {};
    ret._fields = [];
    
    for (var k in this.fields) {
      var field = this.fields[k].copy();
      ret._fields.push(field);
      ret.fields[k] = field;
    }
    
    return ret;
  }
}

export class SDNA {
  constructor(structs, types, typelens, structlist, ptrsize, endian) {
    this.pointer_size = ptrsize;
    this.endian = endian;
    this.structs = structs; //a map
    this.structlist = structlist;
    this.types = types;     //an array
    this.typelens = typelens;
  }
  
  //bhead should be a fileapi.BHead object
  //fd should be a fileapi.FileData object
  read(bhead, fd) {
    var stt = this.structlist[bhead.sdna];
    
    if (bhead.nr > 1) {
      var ret = [];
      
      for (var i=0; i<bhead.nr; i++) {
          ret.push(stt.read(fd));
      }
      
      return ret;
    } else {
      return stt.read(fd);
    }
  }
}

export class SDNAParser {
  constructor() {
  }
  
  parse(code, endian, ptrsize) {
    var view = new DataView(code.buffer);
    var ci = 8; //file cursor
    
    function streq(off, str) {
      var str2 = ""
      for (var i=off; i<off+str.length; i++) {
          str2 += String.fromCharCode(code[i]);
      }
      
      return str2==str
    }
    
    function read_strn(len) { 
      var str2 = ""
      var off = ci;
      
      for (var i=off; i<off+len; i++) {
        str2 += String.fromCharCode(code[i]);
      }
      
      ci = i;
      return str2;
    }
    
    if (!streq(0, "SDNA")) {
      throw new SDNAParseError("expected SDNA");
    }
    if (!streq(4, "NAME")) {
      throw new SDNAParseError("expected NAME");
    }
    
    function read_int(off=ci) {
      ci += 4;
      return view.getInt32(off, endian==ENDIAN_LITTLE);
    }
    
    function read_short(off=ci) {
      ci += 2;
      
      return view.getInt16(off, endian==ENDIAN_LITTLE);
    }
    
    function read_str(off=ci) {
      var i = off;
      var ret = ""
      
      while (code[i]) {
        ret += String.fromCharCode(code[i]);
        i++;
      }
      
      ci = i+1;
      return ret;
    }
    
    //read name fields
    var totname = read_int();
    
    var names = [], types=[], typelens=[], structs=[];
    console.log("totname", totname, "str", read_str(4, 4));
    
    while (!code[ci]) {
      ci++;
    }
    
    for (var i=0; i<totname; i++) {
      var name = read_str();
      names.push(name);
    }
    
    //console.log(names);
    
    ci = (ci + 3) & ~3;
    if (read_strn(4) != "TYPE") {
      throw new Error("missing type column!");
    }
    
    var tottype = read_int();
    
    for (var i=0; i<tottype; i++) {
      var type = read_str();

      //from dna_genfile.c
			/* this is a patch, to change struct names without a conflict with SDNA */
			/* be careful to use it, in this case for a system-struct (opengl/X) */      
      /* struct Screen was already used by X, 'bScreen' replaces the old IrisGL 'Screen' struct */
      if (type == "bScreen") {
        type = "Screen";
      }
      
      types.push(type);
    }
    
    //console.log(types);
    
    ci = (ci + 3) & ~3;
    if (read_strn(4) != "TLEN") {
      throw new Error("missing type len column!");
    }
    
    for (var i=0; i<tottype; i++) {
      typelens.push(read_short());
    }
    
    //console.log(typelens);
    
    ci = (ci + 3) & ~3;
    if (read_strn(4) != "STRC") {
      throw new Error("missing struct column!");
    }
    
    var last_totfield = 0;
    var totstruct = read_int()
    for (var i=0; i<totstruct; i++){
      if (ci+4 >= code.length) {
        console.log("Bounds error!!", last_totfield, structs)
        break;
      }
      
      //var start_ci = ci;
      var type = read_short();
      var totfield = read_short();
      //ci = start_ci;
      
      //console.log(type, totfield, types[type]);
      var fields = [];
      
      last_totfield = totfield;
      for (var j=0; j<totfield; j++) {
        fields.push([types[read_short()], names[read_short()]]);
      }
      
      structs.push([type, totfield, fields]);
      //ci += (2*totfield+2)*2;
    }
    
    var smap = {}
    var structlist = [];
    
    for (var i=0; i<structs.length; i++) {
      var stt = structs[i];
      var name = types[stt[0]];
      
      stt = new SDNAStruct(name, stt[0], stt[2]);
      smap[name] = stt
      structlist.push(stt);
    }
    
    for (var k in smap) {
      var stt = smap[k];
      var fields = {}
      
      for (var i=0; i<stt.fields.length; i++) {
        var type = stt.fields[i][0];
          
        fields[stt.fields[i][1]] = stt.fields[i] = new SDNAField(stt.fields[i][1], type);
      }
      
      stt._fields = stt.fields;
      stt.fields = fields;
    }
    
    this.sdna = new SDNA(smap, types, typelens, structlist, ptrsize, endian);
    sdna.typelens = typelens;
    
    for (var k in this.sdna.structs) {
      var stt = this.sdna.structs[k];
      stt.fields = {};
      
      for (var i=0; i<stt._fields.length; i++) {
        var f = stt._fields[i];
        
        f.type = SDNAType.from_string(f.type, f.name, this.sdna);
        f.name = f.type.name;
        stt.fields[f.name] = f;
      }
    }
    
    return this.sdna;
  }
}
