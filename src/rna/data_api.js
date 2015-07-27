"use strict";

import 'object_cache';
import * as util from 'util';
import * as context from 'context';

import {
  DataPath, DataStruct, DataStructArray,
  DataPathTypes, DataFlags
} from 'data_api_types';

import {
  rna_define_context
} from 'rna_context';
var Context = context.UIContext;

/*
This is the first RNA-type library I wrote; it needs refactoring.
*/
export var TinyParserError = {"TinyParserError" : 0};

import {PropTypes, PropFlags, RNAProperty, IntProperty, FloatProperty, 
        Vec3Property, StringProperty} from 'rna_properties';
import {ToolFlags, UndoFlags} from 'toolsystem';
import {ID} from 'library';
import {apiparser} from 'data_api_parser';

export class DataAPIError extends Error {
  constructor(msg) {
    super(msg);
  }
}

var ContextStruct; //root rna struct

export function init_data_api() {
  startup_report("initializing data api. . .");
  ContextStruct = rna_define_context();
  
  G.api = new DataAPI();
}

/*TinyParser is optimization to only be used with the data api.
  DO NOT USE IT ELSEWHERE.  It can only process a limited number
  of tokens (due to its reliance on the obj cache system), 
  and once the limit is reached it won't warn you.

  always use parseutils.js for general-purpose parsing tasks.*/
  
var _TOKEN = 0
var _WORD = 1
var _LP = "("
var _RP = ")"
var _LS = "["
var _RS = "]"
var _CM = ","
var _EQ = "="
var _DT = "."

class TinyParser {
  constructor(data) {
    var tpl = TinyParser.ctemplates;
    
    this.toks = objcache.fetch(tpl.toks);
    this.toks.length = 0;
    
    this.split_chars = TinyParser.split_chars; 
    this.ws = TinyParser.ws; 
    this.data = data
    
    this.cur = 0;
  }
  
  reset(data) {
    this.cur = 0;
    this.toks.length = 0;
    this.data = data;
    
    if (data != undefined && data != "")
      this.lex();
  }
  
  gen_tok(a, b) {
    var ret = objcache.fetch(TinyParser.ctemplates.token);
    
    ret[0] = a;
    ret[1] = b;
    ret.length = 2;
    
    return ret;
  }
  
  lex(data) {
    var gt = this.gen_tok;
    
    if (data == undefined)
      data = this.data;
    
    var toks = this.toks
    var tok = undefined
    
    var i = 0;
    while (i < data.length) {
      var c = data[i];
      
      if (this.ws.has(c)) {
        if (tok != undefined && tok[1] == _WORD) {
          tok = undefined;
        }
      } else if (this.split_chars.has(c)) {
        toks.push(gt(c, _TOKEN));
        tok = undefined
      } else {
        if (tok == undefined) {
          tok = gt("", _WORD)
          toks.push(tok)
        }
        tok[0] += c
      }
      
      i += 1;
    }
  }
  
  next() {
    this.cur++;
    if (this.cur-1 < this.toks.length) {
      return this.toks[this.cur-1]
    }
    
    return undefined;
  }
  
  peek() {
    if (this.cur < this.toks.length) {
      return this.toks[this.cur]
    }
    
    return undefined;
  }
  
  expect(type, val) {
    if (this.peek()[1] != type) {
      console.log("Unexpected token " + this.peek[0] + ", expected " + (type==_WORD?"WORD":val));
      console.trace();
      throw new TinyParserError();
    }
    
    if (type == _TOKEN && this.peek()[0] != val) {
      console.log("Unexpected token " + this.peek[0]);
      console.trace();
      throw new TinyParserError();
    }
    
    return this.next()[0];
  }  
};

import {
  AnimKey, AnimChannel, AnimKeyFlags, AnimInterpModes
} from 'animdata';

TinyParser.ctemplates = {
  toks : {obj : Array(64), init : function(val) { val.length = 0; }},
  token : {obj : ["", ""], cachesize : 512}
};

TinyParser.split_chars = new util.set([",", "=", "(", ")", ".", "$", "[", "]"]);
TinyParser.ws = new util.set([" ", "\n", "\t", "\r"]);

export class DataAPI { 
  constructor(appstate) {
    this.appstate = appstate;
    
    this.ops = [];
    this.parser = new TinyParser();
    this.parser2 = apiparser();
    
    this.root_struct = ContextStruct;
    this.cache = {};
    this.evalcache = {};
  }
  
  parse_call_line_intern(ctx, line) {
    var p = this.parser;
    
    function parse_argval(p) {
      var val = p.expect(_WORD)
      var args;
      
      if (p.peek()[0] == _LP) {
        args = parse_call(p);
      }
      
      return [val, args];
    }
    
    function parse_arg(p) {
      var arg = p.expect(_WORD);
      var val = undefined;
      
      if (p.peek()[0] == _EQ) {
        p.next(); 
        val = parse_argval(p);  
      }
      
      return [arg, val];
    }
    
    function parse_call(p) {
      p.expect(_TOKEN, _LP);
      var args=[];
      var t = undefined
      
      while (p.peek() != undefined) {
        if (p.peek()[1] == _WORD) {
          args.push(parse_arg(p));
        } else if (p.peek()[0] == _CM) {
          p.next();
        } else {
          p.expect(_TOKEN, _RP);
          break;
        }
      }
      
      return args;
    }
    
    if (line.contains(_LP)==0)
      throw TinyParserError;
    
    var li = line.find(_LP);
    
    var path = line.slice(0, li);
    line = line.slice(li, line.length);
    
    p.reset(line);
    var call = parse_call(p)
    
    path = path.trimRight().trimLeft();
    
    var ret = objcache.array(2);
    ret[0] = path; ret[1] = call;
    
    return ret;
  }
  
  parse_call_line(ctx, line) {
    try {
      var ret = this.parse_call_line_intern(ctx, line);
      return ret;
    } catch (error) {
      if (error != TinyParserError) {
        throw error;
      } else {
        console.log("Could not parse tool call line " + line + "!");
      }
    }
  }
  
  do_selectmode(ctx, args) {
    return ctx.view2d.selectmode;
  }
  
  do_mesh_selected(ctx, args) {
    if (args == undefined || args.length == 0 || args[0].length != 2) 
    {
      console.log("Invalid arguments to do_mesh_selected()")
      throw TinyParserError();
    }
    
    var val = args[0][0]
    var typemask = 0
    for (var i=0; i<val.length; i++) {
      c = val[i].toLowerCase()
      if (c == "v") {
        typemask |= MeshTypes.VERT;
      } else if (c == "e") {
        typemask |= MeshTypes.EDGE;
      } else if (c == "f") {
        typemask |= MeshTypes.FACE;
      } else {
        console.log("Invalid arguments to do_mesh_select(): " + c);
        throw TinyParserError();
      }
    }
    
    var mesh = ctx.mesh;
    if (mesh == undefined) {
      console.trace();
      console.log("Mesh operation called with bad context");
      console.log("Creating dummy mesh. . .");
      console.log(ctx);
      
      mesh = new Mesh();
    }
    
    return new MSelectIter(typemask, mesh);
  }
  
  prepare_args(ctx, call) { //args is private/optional
    var args = {};
    for (var i=0; i<call.length; i++) {
      var a = call[i];
      
      if (a[1] != undefined) {
        if ("do_" + a[1][0] in this) {
          args[a[0]] = this["do_" + a[1][0]](ctx, a[1][1], a[1], a);
        } else if (typeof a[1][0] == "number" || parseFloat(a[1][0]) != NaN) {
          args[a[0]] = parseFloat(a[1][0]);
        } else {
          console.log("Invalid initializer" + a[1][1], a[1]);
        }
      } else {
        console.log("Error: No parameter for undefined argument " + a[0]);
        throw TinyParserError;
      }
    }

    return args;
  }
  
  get_op_intern(ctx, str) {
    var ret = this.parse_call_line(ctx, str);
    
    if (ret == undefined)
      return;
    
    var call = ret[1];
    var path = ret[0];
    
    if (!(path in this.ops)) {
      console.log("Invalid api call " + str + "!");
      return;
    }
    
    var args = this.prepare_args(ctx, call);
    var op = this.ops[path](ctx, args)

    return op;
  }
  
  get_op_keyhandler(ctx, str) {
    function find_hotkey_recurse(element) {
      if (element == undefined)
        return undefined;
      
      var maps = element.get_keymaps();
      for (var i=0; i<maps.length; i++) {
        var km = maps[i];
        
        var handler = km.get_tool_handler(str);
        if (handler != undefined)
          return handler;
      }
      
      if (element.constructor.name == "UIFrame" && element.active != undefined) 
      {
        return find_hotkey_recurse(element.active);
      }
    }
    
    return find_hotkey_recurse(ctx.screen);
  }
  
  call_op(ctx, str) {
    if (RELEASE)
      return this.call_op_release(ctx, str);
    else
      return this.call_op_debug(ctx, str);
  }
  
  call_op_debug(ctx, str) {
    console.log("calling op", str);
    
    var op = this.get_op_intern(ctx, str);
    
    if (op == undefined) {
      throw new Error("Unknown tool '" + str + "'!");
    }
    
    if (op.flag & ToolFlags.USE_DEFAULT_INPUT) {
      this.appstate.toolstack.default_inputs(ctx, op);
    }
    
    this.appstate.toolstack.exec_tool(op);
  }
  
  call_op_release(ctx, str) {
    try {
      var op = this.get_op_intern(ctx, str);
      
      if (op.flag & ToolFlags.USE_DEFAULT_INPUT) {
        this.appstate.toolstack.default_inputs(ctx, op);
      }
      
      this.appstate.toolstack.exec_tool(op);
    } catch (error) {
      console.log("Error calling " + str);
      console.trace();
    }
  }
  
  get_op_uiname(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    try {
      var op = this.get_op_intern(ctx, str);
      return op.uiname;
    } catch (error) {
      if (error != TinyParserError) {
        throw error;
      } else {
        console.log("Error calling " + str);
        console.trace();
      }
    }
  }
  
  get_op(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    try {
      var op = this.get_op_intern(ctx, str);
      return op;
    } catch (error) {
      if (error != TinyParserError) {
        throw error;
      } else {
        console.log("Error calling " + str);
        console.trace();
      }
    }
  }
  
  copy_path(path) {
    var ret = [];
    
    ret.push(path[0]);
    for (var i=1; i<path.length; i++) {
      ret.push(copy_object_deep(path[i]));
    }
    
    return ret;
  }

  _build_path(dp) {
    var s = "";
    while (dp != undefined) {
      if (dp instanceof DataPath)
        s = dp.path + "." + s;
      
      dp = dp.parent;
    }
    
    s = s.slice(0, s.length-1); //get rid of trailing '.' 
    return s;
  }
  
  on_frame_change(ctx, time) {
    //console.log("api time update!", time);
    
    for (var id in ctx.datalib.idmap) {
      var block = ctx.datalib.idmap[id];
      
      for (var ch in block.lib_anim_channels) {
        //console.log("setting path", ch.path, ch.eval(time));
        this.set_prop(ctx, ch.path, ch.eval(time));
      }
    }
  }
  
  key_animpath(ctx, owner, path, time) {
    if (ctx == undefined) {
      time = path;
      path = ctx;
      ctx = new Context();
    }
    
    path = path.trim();
    var ret = this.resolve_path_intern(ctx, path);
    
    if (ret == undefined || ret[0] == undefined) {
      console.log("Error, cannot set keyframe for path", path, "!");
      return;
    }
    
    var prop = ret[0];
    if (!(path in owner.lib_anim_pathmap)) {
      //create a new path
      //eek, this should be a generic function somewhere, but where?
      //within DataBlock?
      
      var name = path.split(".");
      name = name[name.length-1];
      
      var ch = new AnimChannel(prop.type, name, path);
      ch.idgen = owner.lib_anim_idgen;
      ch.idmap = owner.lib_anim_idmap;
      
      /*stupid, but possibly useful code to extract an owning
        DataBlock from an arbitrary datapath.
        
      //find owning datablock
      var si = path.find("[");
      var path2 = path;
      if (si >= 0) {//cut out array references
        path2 = path2.slice(0, si);
      }
      
      var ob;
      do {
        var ob = this.get_object(path2);
        if (ob != undefined && ob instanceof DataBlock)
          break;
        
        ob = undefined;
        
        var si = path.length-1;
        while (si >= 0 && path[si] != ".") si--;
        
        if (si <= 0) break;
        
        path = path.slice(0, si);
      } while (path.length > 0);
      
      if (ob == undefined) {
        console.log("Could not find owning datablock for ", path, "! Using scene!");
        ob = ctx.scene;
      }*/
      
      ch.owner = owner;
      owner.lib_anim_pathmap[path] = ch;
      owner.lib_anim_channels.push(ch);
    }
    
    var ch = owner.lib_anim_pathmap[path];
    var val = this.get_prop(ctx, path);
    
    ch.update(time, val);
  }
  
  resolve_path_intern(ctx, str) {  
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    static cache = {};
    
    if (str == undefined) {
      warntrace("Warning, undefined path in resolve_path_intern (forgot to pass ctx?)");
      return undefined;
    }
    
    try {
      if (!(str in cache)) {
        var ret = this.resolve_path_intern2(ctx, str);
        
        //copy
        var ret2 = []
        for (var i=0; i<ret.length; i++) {
          ret2.push(ret[i]);
        }
        
        cache[str] = ret2;
      } else {
        var ret = cache[str];
        
        if (ret[0] != undefined && !ret[0].cache_good()) {
          delete cache[str];
          return this.resolve_path_intern(ctx, str);
        }
      }
      
      return ret;
    } catch (_err) {
      print_stack(_err);
      console.log("error: ", str);
    }
    
    return undefined;
  }
  
  resolve_path_intern2(ctx, str) {  
    var parser = this.parser2;
    
    var arr_index = undefined;
    var build_path = this._build_path;
    var pathout = [""];
    var spathout = ["ContextStruct"];
    var mass_set = undefined;
    
    function do_eval(node, scope, pathout, spathout) {
      if (node.type == "ID") {
        if (scope == undefined) {
          console.log("data api error: ", str + ", " + pathout[0] + ", " + spathout[0]);
        }
        
        if (scope.pathmap == undefined || !(node.val in scope.pathmap))
          return undefined;
          
        var ret = scope.pathmap[node.val];
        
        if (ret == undefined)
          return undefined;
         
        if (ret.use_path) {
          if (ret.path[0] != "[" && ret.path[0] != "(")
            pathout[0] = pathout[0] + "." + ret.path;
          else
            pathout[0] += ret.path
        }
        
        spathout[0] = spathout[0] + ".pathmap." + node.val;
        
        return ret;
      } else if (node.type == "CODE") {
        mass_set = {
          filter  : node.children[1].value,
          path    : str.slice(0, node.children[1].lexstart),
          subpath : str.slice(node.children[1].lexend, str.length).trim(),
          do_mass_set : true
        }
        
        if (mass_set.subpath[0] == ".")
          mass_set.subpath = mass_set.subpath.slice(1, mass_set.subpath.length);
        
        return mass_set; //do_eval(node.children[0], scope, pathout, spathout);
      } else if (node.type == ".") {
        var n2 = do_eval(node.children[0], scope, pathout, spathout);
        
        if (n2 != undefined) {
          if (n2 instanceof DataPath)
            n2 = n2.data;
          
          return do_eval(node.children[1], n2, pathout, spathout);
        }
      } else if (node.type == "ARRAY") {
        var array = do_eval(node.children[0], scope, pathout, spathout);
        var index = do_eval(node.children[1], scope, pathout, spathout);
        
        if (array == undefined) return undefined;
        
        //var transform_key = (array.type == DataPathTypes.PROP && array.data.type == PropTypes.FLAG);
        //transform_key = transform_key && isNaN(parseInt(index));
        if (index == undefined)
          index = node.children[1].val;
        
        arr_index = index;
        
        if (array.type == DataPathTypes.PROP && array.data.type == PropTypes.FLAG) {
          index = array.data.keys[index];
          spathout[0] += ".data.data & "+index;
        } else if (array.type == DataPathTypes.PROP) {
          spathout[0] += ".data.data["+index+"]";
        }
        
        if (!array.use_path) {
          return array;
        } else {
          var path = pathout[0];
          
          path = path.slice(1, path.length);
          
          if (array.type == DataPathTypes.PROP && array.data.type == PropTypes.FLAG) {
            pathout[0] += "&"+index;
          } else if (array.type == DataPathTypes.STRUCT_ARRAY) {
            pathout[0] += array.data.getitempath(index);
          } else {
            pathout[0] += "["+index+"]";
          }
          
          if (array.type == DataPathTypes.STRUCT_ARRAY) {
            var stt = array.data.getter(eval(path)[index]);
            stt.parent = array;
            
            spathout[0] += ".getter(" + path + "[" + index + "]" + ")";
            return stt;
          } else {
            return array;
          }
        }
      } else if (node.type == "NUM") {
        return node.val;
      }
    }
    
    var ast = parser.parse(str);
    static sret = [0, 0, 0, 0];
    
    sret[0] = do_eval(ast, ContextStruct, pathout, spathout);
    pathout[0] = pathout[0].slice(1, pathout[0].length);
    
    sret[1] = pathout[0];
    sret[2] = spathout[0];
    sret[3] = mass_set;
    
    return sret;
  }
  
  eval(ctx, str, scope) {
    try {
      if (str in this.evalcache) {
        return this.evalcache[str](ctx, scope);
      }
      var func;
      
      var script = """
        func = function(ctx, scope) {
          return $s
        }
      """.replace("$s", str);
      
      func = eval(script);
          
      this.evalcache[str] = func;
      return func(ctx, scope);
    } catch (error) {
      //if (window.DEBUG != undefined && window.DEBUG.ui_datapaths)
        print_stack(error);
      
      throw new DataAPIError(error.message);
    }
  }
  
  get_object(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    var ret = this.resolve_path_intern(ctx, str);
    
    if (ret == undefined || ret[0] == undefined || ret[0].type == DataPathTypes.PROP) {
      console.trace("Not a direct object reference", str);
      return undefined;
    } else { //return actual object
        var path = ret[1];
        var val = this.eval(ctx, path);
        
        return val;
    }
  }
  
  get_prop(ctx, str) {
    try {
      return this.get_prop_intern(ctx, str);
    } catch (error) {
      if (!(error instanceof DataAPIError)) {
        print_stack(error);
        console.log("Data API error! path:", str);
      }
      
      throw error;
    }
  }
  
  get_prop_intern(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    var ret = this.resolve_path_intern(ctx, str);
    if (ret == undefined) return ret;
    
    var val = ret[0];
    
    if (ret[0].type == DataPathTypes.PROP) {
      if (ret[0].use_path) {
        var path = ret[1];
        val = this.eval(ctx, path);
      } else {
        val = this.eval(ctx, ret[2]);
        
        if (val instanceof DataPath)
          val = val.data;
        if (val instanceof RNAProperty)
          val = val.data;
      }
      
      var prop = ret[0].data;
      if (prop.type == PropTypes.ENUM && (val in prop.keys))
        val = prop.keys[val];
    } else { //return actual object
        var path = ret[1];
        val = this.eval(ctx, path);
        
        return val;
    }
    
    return val;
  }
  
  build_mass_set_paths(ctx, listpath, subpath, value, filterstr) {
    if (ctx == undefined) {
      var filterfunc = value;
      value = subpath;
      subpath = listpath;
      listpath = ctx;
      ctx = new Context();
    }

    //"(item.fag & 1) && !item.hidden"
    var filtercode = """
      function filter($) {\n
        return """+filterstr+"""\n;
      }""";
    
    eval(filtercode);
    
    var list = this.get_object(listpath);
    var ret = this.resolve_path_intern(ctx, listpath);
    
    var sta = ret[0].data;
    
    var ret = [];
    for (var key of sta.getkeyiter.call(list)) {
      var item = sta.getitem.call(list, key);
      console.log("  key:", key, filter(item), item, item.level, ctx.spline.actlevel);
      
      if (!filter(item)) continue;
      
      var path = (listpath + "[" + key + "]" + "." + subpath).trim();
      
      ret.push(path);
    }
    
    return ret;
  }
  
  //set properties on an entire collection, filter is filter function
  mass_set_prop(ctx, listpath, subpath, value, filterstr) {
    if (ctx == undefined) {
      filterfunc = value;
      value = subpath;
      subpath = listpath;
      listpath = ctx;
      ctx = new Context();
    }
    
    var paths = this.build_mass_set_paths(ctx, listpath, subpath, value, filterstr);
    for (var i=0; i<paths.length; i++) {
      this.set_prop(ctx, paths[i], value);
    }
    
    /*
    var list = this.get_object(listpath);
    var ret = this.resolve_path_intern(ctx, listpath);
    
    var sta = ret[0].data;
    
    for (var key in sta.getkeyiter.call(list)) {
      var item = sta.getitem.call(list, key);
      if (!filterfunc(item)) continue;
      
      var path = listpath + "[" + key + "]" + "." + subpath;
      console.log(path);
      
      this.set_prop(ctx, path, value);
    }
    //*/
  }
  
  set_prop(ctx, str, value) {
    var ret = this.resolve_path_intern(ctx, str);
    static scope = [0, 0];
    
    if (ret == undefined) return ret;
    
    if (ret[0] == undefined && ret[3] != undefined && ret[3].do_mass_set) {
      this.mass_set_prop(ctx, ret[3].path, ret[3].subpath, value, ret[3].filter)
      return;
    } else if (ret[0] == undefined) {
      console.trace("Error! Unknown path", str, "!");
      return;
    }
    
    if (ret[0].type != DataPathTypes.PROP) {
      console.trace();
      console.log("Error: non-property in set_prop()", ret[0], ret[1], ret[2]);
      return;
    }
    
    if (ret[0].type == DataPathTypes.PROP) {
      var path;
      
      if (ret[0].use_path) {
        path = ret[1];
      } else {
        path = ret[2];
      }
      
      var prop = ret[0].data;
      prop.ctx = ctx;
      if (prop.type == PropTypes.FLAG) {
        console.log("FLAG prop set!");
        console.log(path, "value", value);
        
        if (path.contains("&")) {
          //handle "struct.flag[bit] = boolean" form.
          var mask = Number.parseInt(path.slice(path.find("&")+1, path.length).trim());
          var path2 = path.slice(0, path.find("&"));
          
          console.log(path2, "");
          
          var val = this.eval(ctx, path2);
          
          if (value)
            val |= mask;
          else
            val &= ~mask;
          
          prop.set_data(val);
          
          path2 += " = scope[0];";
          
          scope[0] = val;
          this.eval(ctx, path2, scope);
        } else {
          //handle "struct.flag = integer bitmask" form
          path += " = " + value;
          this.eval(ctx, path);
          
          prop.set_data(value);
        }
      } else {
        if (prop.type == PropTypes.ENUM) {
          value = prop.values[value];
          if (value instanceof String || typeof value == "string") {
            value = '"'+value+'"';
          }
        } else if (prop.type == PropTypes.STRING) {
          value = '"' + value + '"';
        }
        
        var valpath = path;
        if (path.endsWith("]")) {
          var i = path.length-1;
          while (i >= 0 && path[i] != "[") i--;
          valpath = path.slice(0, i);
          
        } else if (!ret[0].use_path) {
          //erg, stupid hackyness
          valpath += ".data.data";
          path += ".data.data";
        }
        
        var oval = this.eval(ctx, path);
        
        /*don't override array references
          e.g. struct.some_array = [0, 1, 2, 3]
          shouldn't assign the array expression's reference
          to some_array, it should load the contents.*/
        
        //need a better way to detect array assignments 
        //  (some.array = [0, 0, 0] instead of some.array[0] = 0).
        if (typeof value != "number" &&
           (prop.type == PropTypes.VEC3 || prop.type == PropTypes.VEC4))
        {
          var arr = this.eval(ctx, path);
          
          for (var i=0; i<arr.length; i++) {
            arr[i] = value[i];
          }
        } else {
          path += " = " + value;
          this.eval(ctx, path);
        }
        
        prop.set_data(this.eval(ctx, valpath));
      }
      
      ret[0].ctx = ctx;
      if (ret[0].update != undefined)
        ret[0].update.call(ret[0]);
    }
  }
  
  get_struct(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    var ret = this.resolve_path_intern(ctx, str);
    
    if (ret == undefined || ret[0] == undefined) return undefined;
    if (ret[0] instanceof DataPath) {
      return ret[0].data;
    }
    
    return ret[0];
  }
  
  get_prop_meta(ctx, str) {
    if (str == undefined) {
      str = ctx;
      ctx = new Context();
    }
    
    var ret = this.resolve_path_intern(ctx, str);
    if (ret == undefined || ret[0] == undefined) return undefined;
    
    return ret[0].data;
  }
  
  /*
  get_prop_time(ctx, str) {
    var ts = []
    var c = time_ms()
    
    var ret = this.resolve_path(ctx, str);
    
    ts.push(time_ms()-c);
    
    if (ret == undefined) {
      console.log("error getting property")
      return;
    }
    
    var p = ret[0];
    
    if (p.use_path) {
      c = time_ms()
      
      var obj = eval(ret[2]);
      var ret;
      
      ts.push(time_ms()-c);
      c = time_ms();
      
      if (p.data.type == PropTypes.FLAG && ret[3]) {
        var ret2 = eval("(obj & "+ret[1]+")");
        ret = ret2 > 0 && ret2 == Number(ret[1]);
      } else {
        ret = eval("obj." + p.path);
      }
      
      if (p.data.type == PropTypes.ENUM) {
        ret = p.data.keys[ret];
      }
      
      ts.push(time_ms()-c);
      
      return ts;
    } else {
      return ts;
      
      if ((p.data.type == PropTypes.VEC3 || p.data.type == PropTypes.VEC4) && ret[3]) {
        return p.data.data[ret[1]];
      } else if (p.data.type == PropTypes.FLAG && ret[3]) {
        return (p.data.data & Number(ret[1])) == Number(ret[1]);
      } else {
        if (p.data.type == PropTypes.ENUM)
          return p.data.keys[p.data.data];
        else 
          return p.data.data;
      }
    }
  }*/
}
