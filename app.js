"not_a_module";
var _defined_modules={};
var allow_cycles=false;
var _is_cyclic=false;
var _post_primary_load=false;
var _es6_module_resort=false;
var _es6_module_verbose=false;
var _debug_modules=0;
function debug() {
  if (!_debug_modules)
    return ;
  var s="console.log";
  console.log.apply(console, arguments);
}
function ES6Module(name) {
  this.name = name;
  this.depends = [];
  this.flag = 0;
  this.loaded = false;
  this.callback = undefined;
  this.exports = {}
  this.global_exports = {}
  this.already_processed = {}
  this.classes = [];
}
ES6Module.prototype = {add_class: function(cls) {
  this.classes.push(cls);
}, add_export: function(name, object, allow_override) {
  if (allow_override==undefined) {
      allow_override = false;
  }
  if (object!=undefined)
    this.already_processed[name] = object;
  if (!allow_override&&name in this.exports&&this.exports[name]!=undefined) {
      return this.exports[name];
  }
  this.exports[name] = object;
  return object;
}, add_global: function(name, object) {
  if (object!=undefined)
    this.already_processed[name] = object;
  if (name in this.exports) {
      return ;
  }
  this.global_exports[name] = object;
  return object;
}, add_depend: function(module) {
  if (typeof module!="string"&&!(__instance_of(module, String))) {
      throw new Error("ES6Module.add_depend: Expected a string");
  }
  this.depends.push(es6_get_module_meta(module));
}, set_default_export: function(name, object) {
  if (this.default_export!=undefined) {
      throw new Error("Can only have one default export");
  }
  this.exports["default"] = object;
  this.default_export = object;
  if (name!=undefined&&name!='') {
      return this.add_export(name, object);
  }
  return object;
}};
function es6_get_module_meta(name) {
  if (!(name in _defined_modules)) {
      var mod=new ES6Module(name);
      _defined_modules[name] = mod;
  }
  return _defined_modules[name];
}
function es6_module_define(name, depends, callback) {
  debug("defining module ", name, "with dependencies", JSON.stringify(depends));
  if (name in _defined_modules) {
      throw new Error("Duplicate module name '"+name+"'");
  }
  var mod=es6_get_module_meta(name);
  mod.callback = callback;
  depends.forEach(function(d) {
    mod.depends.push(d);
  });
  return mod;
}
function sort_modules() {
  var sortlist=[];
  var __iter_k=__get_iter(_defined_modules);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    var mod=_defined_modules[k];
    mod.flag = 0;
  }
  var localvisit={}
  function sort(mod, path) {
    var p2=[];
    for (var i=0; i<path.length; i++) {
        p2.push(path[i]);
    }
    path = p2;
    path.push(mod.name);
    if (path.length>1) {
    }
    if (mod.name in localvisit) {
        _is_cyclic = true;
        debug("Cycle!", path);
        if (!allow_cycles) {
            throw new Error("module cycle! "+JSON.stringify(path));
        }
        return ;
    }
    localvisit[mod.name] = 1;
    for (var i=0; i<mod.depends.length; i++) {
        var p=mod.depends[i];
        if (!p.flag) {
            sort(p, path);
        }
    }
    mod.flag++;
    sortlist.push(mod);
  }
  var __iter_k=__get_iter(_defined_modules);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    var mod=_defined_modules[k];
    localvisit = {};
    if (!mod.flag)
      sort(mod, []);
  }
  var namelist=[];
  for (var i=0; i<sortlist.length; i++) {
      namelist.push(sortlist[i].name);
  }
  window.module_order = namelist;
  return sortlist;
}
function _load_module(mod) {
  var args=[mod];
  var start=time_ms();
  if (mod.loaded)
    return ;
  debug("loading module", mod.name);
  var dependnames=[];
  for (var i=0; i<mod.depends.length; i++) {
      args.push(mod.depends[i].exports);
      dependnames.push(mod.depends[i].name);
  }
  if (dependnames.length!=0) {
  }
  if (mod.callback==undefined) {
      console.log("WARNING: module", mod.name, "does not exist!");
      return ;
  }
  mod.callback.apply(this, args);
  var __iter_k=__get_iter(mod.global_exports);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    this[k] = mod.global_exports[k];
  }
  mod.loaded = true;
  var end=time_ms();
  if (end-start>4) {
      debug("  ", Math.floor(end-start).toFixed(1)+"ms");
  }
}
function ModuleLoadError() {
  Error.apply(this, arguments);
}
ModuleLoadError.prototype = Object.create(Error.prototype);
function _es6_get_module(name) {
  var mod=es6_get_module_meta(name);
  if (_post_primary_load) {
      if (mod.callback!=undefined&&!mod.loaded) {
          _load_module(mod);
      }
      else 
        if (mod.callback==undefined) {
          if (_debug_modules)
            console.log("Module Load Error", mod, Object.keys(mod), mod.__proto__);
          throw new ModuleLoadError("Unknown module "+name);
      }
  }
  return mod;
}
function es6_import(_es6_module, name) {
  var mod=_es6_get_module(name);
  if (mod!=undefined&&_es6_module.depends.indexOf(mod)<0) {
      debug("updating dependencies");
      _es6_module_resort = true;
      _es6_module.depends.push(mod);
  }
  if (mod==undefined||!mod.loaded) {
      if (_debug_modules)
        console.log("cannot import module", name, mod);
      throw new ModuleLoadError();
  }
  return mod.exports;
}
function es6_import_item(_es6_module, modname, name) {
  var mod=_es6_get_module(modname);
  if (mod!=undefined&&_es6_module.depends.indexOf(mod)<0) {
      debug("updating dependencies");
      _es6_module_resort = true;
      _es6_module.depends.push(mod);
  }
  if (!(name in mod.exports)) {
      if (!allow_cycles) {
          throw new Error("'"+name+"' not found in module "+mod.name);
      }
      if (1||_debug_modules)
        console.log("name not in exports", name, mod);
      throw new ModuleLoadError("");
  }
  return mod.exports[name];
}
function load_cyclic_modules(sortlist) {
  var trylimit=35;
  var last_totfail=undefined;
  debug("start load", sortlist.length);
  _es6_module_verbose = false;
  for (var si=0; si<trylimit; si++) {
      var totfail=0;
      if (si>0) {
          _es6_module_verbose = true;
          console.log("\n\n\n---------CYCLE STAGE", si+1, "!------------\n");
          if (!allow_cycles&&si>0) {
              throw new Error("module cycle!");
          }
          if (_es6_module_resort) {
              sortlist = sort_modules();
              _es6_module_resort = false;
          }
      }
      for (var i=0; i<sortlist.length; i++) {
          var mod=sortlist[i];
          if (mod.loaded)
            continue;
          try {
            _load_module(mod);
          }
          catch (err) {
              if (!(__instance_of(err, ModuleLoadError))) {
                  print_stack(err);
                  throw err;
              }
              totfail++;
          }
          last_totfail = totfail;
      }
      if (totfail==0)
        break;
  }
  if (si==trylimit) {
      throw new Error("Failed to load all modules");
  }
  return si;
}
function reload_modules() {
  var __iter_k=__get_iter(_defined_modules);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    var mod=_defined_modules[k];
    mod.loaded = false;
    mod.exports = {};
    mod.global_exports = {};
    mod.default_export = undefined;
  }
  load_modules();
}
function load_modules() {
  startup_report("Loading modules. . .");
  var start_time=time_ms();
  var __iter_k=__get_iter(_defined_modules);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    var mod=_defined_modules[k];
    for (var i=0; i<mod.depends.length; i++) {
        var d=mod.depends[i];
        if (typeof d=="string"||__instance_of(d, String)) {
            mod.depends[i] = es6_get_module_meta(d);
        }
    }
  }
  var sortlist=sort_modules();
  var totcycle=load_cyclic_modules(sortlist);
  _post_primary_load = true;
  startup_report("...Finished.  "+(time_ms()-start_time).toFixed(1)+"ms", totcycle, "cycle iterations");
}
function test_modules() {
  es6_module_define("util", [], function(_es6_module) {
    debug("in util");
    var mod=_es6_module;
    mod.add_export("list", Array);
  });
  es6_module_define("math", ["util"], function(_es6_module, util) {
    debug("in math");
    var mod=_es6_module;
    mod.add_export("FancyInt", Number);
    mod.add_global("MathGlobal", Boolean);
    debug("util", util);
  });
  load_modules();
  debug(MathGlobal);
}
function es6_import_all(_es6_module, name) {
  var ret="var ";
  var mod=_defined_modules[name];
  var i=0;
  var __iter_k=__get_iter(mod.exports);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    empty = false;
    if (i>0)
      ret+=", ";
    ret+=k+" = es6_import_item(_es6_module, '"+name+"', '"+k+"')";
    i++;
  }
  if (i==0)
    ret = "";
  ret+=";\n";
  ret+="es6_import(_es6_module, '"+name+"');\n";
  return ret;
}

"not_a_module";
var defined_classes=new Array();
var defined_tests=new Array();
function create_test(obj) {
  defined_tests.push(obj);
}
function get_non_props(obj) {
  var names=Object.getOwnPropertyNames(obj);
  var ret=[];
  for (var i=0; i<names.length; i++) {
      var k=names[i];
      var des=Object.getOwnPropertyDescriptor(obj, k);
      var add=des.get==undefined&&des.set==undefined;
      if (add) {
          ret.push(k);
      }
  }
  return ret;
}
function __typesystem_copy_prop(dest, src, name) {
  var des=Object.getOwnPropertyDescriptor(src, name);
  if (des!=undefined&&(des.get!=undefined||des.set!=undefined)) {
      Object.defineProperty(dest, name, des);
  }
  else {
    dest[name] = src[name];
  }
}
var _prototype_id_gen=1;
function test_inherit_multiple() {
  function z() {
  }
  /*test for IE bug*/;
  if (z.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        z.name = 'z';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  create_prototype(z);
  a = Array;
  a.prototype.test = function() {
    console.log("a", this.constructor.name);
  }
  function b() {
  }
  inherit_multiple(b, [a]);
  b.prototype.test = function() {
    console.log("b", this.constructor.name);
  }
  function c() {
  }
  inherit_multiple(c, [a]);
  c.prototype.test = function() {
    console.log("c", this.constructor.name);
  }
  function d() {
  }
  inherit_multiple(d, [b, c]);
  d.prototype.test1 = function() {
    console.log("d", this.constructor.name);
  }
  console.log("------------");
  var iof=__instance_of;
  var A=new a(), B=new b(), C=new c(), D=new d();
  console.log(iof(D, a), iof(D, b), iof(D, c), iof(D, z));
  new d().test();
  return [d, b, c, a];
}
var native_types={};
function init_native_type(obj) {
  obj.__subclass_map__ = {}
  obj.__prototypeid__ = _prototype_id_gen++;
  obj.__subclass_map__[obj.__prototypeid__] = obj;
  obj.__clsorder__ = [];
  obj.__parents__ = [];
  obj.__statics__ = {}
  obj.prototype.__class__ = obj.name;
  obj.prototype.__prototypeid__ = obj.__prototypeid__;
  native_types[obj.prototype.__prototypeid__] = obj;
}
init_native_type(Function);
init_native_type(Array);
init_native_type(Number);
init_native_type(String);
init_native_type(Boolean);
init_native_type(Error);
function _time_ms() {
  if (window.performance)
    return window.performance.now();
  else 
    return new Date().getMilliseconds();
}
var _im_total=0;
var _im_max={time: 0, cls: undefined};
function _get_obj_keys(ob) {
  var ks=Object.getOwnPropertyNames(ob);
  var syms=Object.getOwnPropertySymbols!=undefined ? Object.getOwnPropertySymbols(ob) : [];
  ks = ks.concat(syms);
  if (ob.toString!=undefined&&ks.indexOf("toString")<0)
    ks.push("toString");
  return ks;
}
var _ts_exclude=["__prototypeid__", "__class__", "priors", "prototype", "constructor"];
var eset={};
for (var i=0; i<_ts_exclude.length; i++) {
    eset[_ts_exclude[i]] = _ts_exclude[i];
}
_ts_exclude = eset;
delete _ts_exclude["toString"];
function simple_inherit_multiple(obj, parents) {
  var exclude=_ts_exclude;
  var parent=parents[0];
  defined_classes.push(obj);
  obj.__clsorder__ = [];
  var p=parents[0].prototype;
  while (p!=undefined&&p.constructor!=undefined&&p!=undefined&&p.prototype!=p&&p.prototype!==Object.prototype) {
    obj.__clsorder__.push(p.constructor);
    p = p.prototype;
  }
  var proto=Object.create(parent.prototype);
  proto.priors = obj.__clsorder__;
  proto.constructor = obj;
  proto.__prototypeid__ = _prototype_id_gen++;
  proto.__class__ = obj.name;
  obj.prototype = proto;
  obj.__prototypeid__ = proto.__prototypeid__;
  obj.__parents__ = parents;
  obj.__subclass_map__ = {}
  obj.__subclass_map__[obj.__prototypeid__] = obj;
  var name=obj.name;
  obj.__hash__ = function() {
    return name;
  }
  if (!("__subclass_map__" in parent)) {
      if (!("__prototypeid__" in parent)) {
          parent.__prototypeid__ = _prototype_id_gen++;
          parent.prototype.__prototypeid__ = parent.__prototypeid__;
      }
      parent.__subclass_map__ = {};
      parent.__subclass_map__[parent.__prototypeid__] = parent;
  }
  parent.__subclass_map__[obj.__prototypeid__] = obj;
  obj.__statics__ = {}
  obj.__flatstatics__ = {}
  if (("__statics__" in parent)) {
      var keys=_get_obj_keys(parent.__statics__);
      for (var j=0; j<keys.length; j++) {
          var k=keys[j];
          if (k=="__proto__"||(exclude.hasOwnProperty(k)&&k!="toString"))
            continue;
          obj.__flatstatics__[k] = k;
          obj[k] = parent[k];
      }
  }
  var __iter_k=__get_iter(obj.__statics__);
  var k;
  while (1) {
    var __ival_k=__iter_k.next();
    if (__ival_k.done) {
        break;
    }
    k = __ival_k.value;
    obj.__flatstatics__[k] = obj.__statics__[k];
  }
  return obj;
}
function inherit_multiple(obj, parents, mod, name) {
  var s=_time_ms();
  if (name!=undefined) {
  }
  if (name!=undefined&&mod.already_processed[name]!=undefined) {
      var newcls=mod.already_processed[name];
      obj.__prototypeid__ = newcls.__prototypeid__;
      obj.__clsorder__ = newcls.__clsorder__;
      obj.__class__ = newcls.__class__;
      obj.__parents__ = newcls.__parents__;
      obj.__subclass_map__ = newcls.__subclass_map__;
      obj.__hash__ = newcls.__hash__;
      obj.__statics__ = newcls.__statics__;
      obj.__flatstatics__ = newcls.__flatstatics__;
      if (newcls.__flatstatics__!=undefined) {
          var __iter_k=__get_iter(newcls.__flatstatics__);
          var k;
          while (1) {
            var __ival_k=__iter_k.next();
            if (__ival_k.done) {
                break;
            }
            k = __ival_k.value;
            obj[k] = newcls[k];
          }
      }
      obj.prototype = newcls.prototype;
      obj.prototype.constructor = obj;
      return obj;
  }
  var ret=inherit_multiple_intern(obj, parents);
  var time=_time_ms()-s;
  if (time>_im_max.time) {
      _im_max.time = time;
      _im_max.cls = obj;
  }
  _im_total+=time;
  return ret;
}
function inherit_multiple_intern(obj, parents) {
  if (handle_duplicate_calls(obj))
    return ;
  var is_single=parents.length==1;
  var exclude=_ts_exclude;
  var bad=false;
  if (parents==undefined) {
      bad = true;
  }
  else {
    for (var i=0; i<parents.length; i++) {
        if (parents[i]==undefined||typeof (parents[i])!="function")
          bad = true;
    }
  }
  if (bad) {
      console.trace(parents);
      throw new Error("Bad call to inherit_multiple");
  }
  defined_classes.push(obj);
  var mergesteps=0;
  parents.reverse();
  function merge(ps, lsts) {
    var lst=[];
    lsts.push(ps);
    var totlst=10000;
    var trylimit=2000;
    for (var u=0; u<trylimit; u++) {
        if (lsts.length==0||totlst==0)
          break;
        totlst = 0;
        for (var i=0; i<lsts.length; i++) {
            if (lsts[i].length==0) {
                continue;
            }
            totlst++;
            var p=lsts[i][0];
            var bad=false;
            for (var j=0; !bad&&j<lsts.length; j++) {
                if (i==j)
                  continue;
                var l=lsts[j];
                for (var k=1; k<l.length; k++) {
                    if (l[k].__prototypeid__==p.__prototypeid__) {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad) {
                lst.push(p);
                lsts[i].splice(lsts[i].indexOf(p), 1);
                for (var j=0; j<lsts.length; j++) {
                    var l=lsts[j];
                    for (var k=0; k<l.length; k++) {
                        if (l[k].__prototypeid__==p.__prototypeid__) {
                            l.splice(l[k], 1);
                            break;
                        }
                    }
                }
                if (lsts[i].length>0) {
                    i-=1;
                }
                else {
                  lsts[i].splice(i, 1);
                  i-=1;
                }
            }
        }
    }
    if (u==trylimit) {
        throw new Error("Could not resolve inheritance order for ", obj.name);
    }
    mergesteps = u;
    var tot=0;
    for (var i=0; i<lsts.length; i++) {
        tot+=lsts[i].length;
    }
    if (tot>0) {
        throw new Error("Could not resolve multiple inheritance");
    }
    return lst;
  }
  if (parents.length==1) {
      var cs=[];
      var p=parents[0];
      if ("__clsorder__" in p) {
          var pcs=p.__clsorder__;
          for (var i=0; i<pcs.length; i++) {
              cs.push(pcs[i]);
          }
      }
      cs.push(p);
      obj.__clsorder__ = cs;
  }
  else 
    if (parents.length>0) {
      var lsts=[];
      for (var i=0; i<parents.length; i++) {
          var cpy=[];
          var corder=parents[i].__clsorder__;
          for (var j=0; j<corder.length; j++) {
              cpy.push(corder[j]);
          }
          lsts.push(cpy);
      }
      obj.__clsorder__ = merge(parents, lsts);
  }
  proto = Object.create(Object.prototype);
  delete proto.toString;
  var cs=obj.__clsorder__;
  if (is_single) {
      var cs2=[];
      for (var i=0; i<cs.length; i++) {
          var p=cs[i];
          cs2.push(p.prototype);
      }
  }
  else {
    var thekeys=[];
    for (var k=0; k<cs.length; k++) {
        var p2=cs[k];
        thekeys.push(_get_obj_keys(p2.prototype));
    }
    var st=_time_ms();
    var cs2=[];
    for (var i=0; i<cs.length; i++) {
        cs2.push(Object.create(Object.prototype));
        var p=cs[i];
        var keys=_get_obj_keys(p.prototype);
        for (var j=0; j<keys.length; j++) {
            var des=Object.getOwnPropertyDescriptor(p.prototype, keys[j]);
            if (des!=undefined&&(des.get!=undefined||des.set!=undefined)) {
                __typesystem_copy_prop(cs2[i], p.prototype, keys[j]);
                continue;
            }
            var val=p.prototype[keys[j]];
            var bad=false;
            for (var k=0; !bad&&k<i; k++) {
                if (k==i)
                  continue;
                var p2=cs[k];
                if (p2.__prototypeid__==p.__prototypeid__)
                  continue;
                var keys2=thekeys[k];
                for (var l=0; !bad&&l<keys2.length; l++) {
                    var des2=Object.getOwnPropertyDescriptor(p2.prototype, keys2[l]);
                    if (des2!=undefined&&(des2.get!=undefined||des2.set!=undefined)) {
                        continue;
                    }
                    if (p2.prototype[keys2[l]]===val) {
                        bad = true;
                        break;
                    }
                }
            }
            if (!bad)
              __typesystem_copy_prop(cs2[i], p.prototype, keys[j]);
        }
    }
    var time=_time_ms()-st;
    if (time>10) {
    }
  }
  function excluded(k) {
    return exclude.hasOwnProperty(k)&&k!="toString";
  }
  for (var i=0; i<cs2.length; i++) {
      if (is_single) {
          cs2[i].__prototypeid__ = cs[i].__prototypeid__;
          cs2[i].constructor = cs[i];
          cs2[i].__class__ = cs[i].name;
      }
      var p=cs2[i];
      var keys=_get_obj_keys(p);
      for (var j=0; j<keys.length; j++) {
          if (excluded(keys[j]))
            continue;
          if (keys[j]=="toString"&&p[keys[j]]==Object.prototype.toString)
            continue;
          __typesystem_copy_prop(proto, p, keys[j]);
      }
      if (is_single&&i>0) {
          var keys2=_get_obj_keys(cs2[i-1]);
          for (var j=0; j<keys2.length; j++) {
              if (excluded(keys2[j]))
                continue;
              if (keys2[j] in cs2[i])
                continue;
              __typesystem_copy_prop(cs2[i], cs2[i-1], keys2[j]);
          }
          cs2[i].prototype==cs2[i-1];
      }
  }
  if (cs2.length>0)
    proto.prototype = cs2[cs2.length-1];
  proto.priors = obj.__clsorder__;
  proto.constructor = obj;
  proto.__prototypeid__ = _prototype_id_gen++;
  proto.__class__ = obj.name;
  obj.__mergesteps = mergesteps;
  obj.prototype = proto;
  obj.__prototypeid__ = proto.__prototypeid__;
  obj.__parents__ = parents;
  obj.__subclass_map__ = {}
  obj.__subclass_map__[obj.__prototypeid__] = obj;
  var name=obj.name;
  obj.__hash__ = function() {
    return name;
  }
  for (var i=0; i<cs2.length; i++) {
      if (!("__subclass_map__" in cs[i])) {
          if (!("__prototypeid__" in cs[i])) {
              cs[i].__prototypeid__ = _prototype_id_gen++;
              cs[i].prototype.__prototypeid__ = cs[i].__prototypeid__;
          }
          cs[i].__subclass_map__ = {};
          cs[i].__subclass_map__[cs[i].__prototypeid__] = cs[i];
      }
      cs[i].__subclass_map__[obj.__prototypeid__] = obj;
  }
  obj.__statics__ = {}
  obj.__flatstatics__ = {}
  for (var i=0; i<cs.length; i++) {
      if (!("__statics__" in cs[i]))
        continue;
      var keys=_get_obj_keys(cs[i].__statics__);
      for (var j=0; j<keys.length; j++) {
          var k=keys[j];
          if (k=="__proto__"||excluded(k))
            continue;
          obj.__flatstatics__[k] = k;
          obj[k] = cs[i][k];
      }
  }
  var keys=_get_obj_keys(obj.__statics__);
  for (var i=0; i<keys.length; i++) {
      var k=keys[i];
      obj.__flatstatics__[k] = obj.__statics__[k];
  }
  return obj;
}
function subclass_of(child, parent) {
  var clsorder=child.__clsorder__;
  for (var i=0; i<clsorder.length; i++) {
      var p=clsorder[i];
      if (p==parent||p.name==parent.name)
        return true;
  }
  return false;
}
function __instance_of(child, parent) {
  if (parent==undefined)
    return child==undefined;
  if (typeof child!="object"&&typeof child!="function")
    return typeof child==typeof (parent);
  if ("__subclass_map__" in parent&&"__prototypeid__" in child) {
      return child.__prototypeid__ in parent.__subclass_map__;
  }
  else {
    return child instanceof parent;
  }
}
var instance_of=__instance_of;
function inherit(obj, parent) {
  if (handle_duplicate_calls(obj))
    return ;
  inherit_multiple(obj, [parent]);
}
function inherit_old(obj, parent) {
  if (handle_duplicate_calls(obj))
    return ;
  defined_classes.push(obj);
  obj.prototype = Object.create(parent.prototype);
  obj.prototype.prior = parent.prototype;
  obj.prototype.constructor = obj;
  obj.prototype.__prototypeid__ = _prototype_id_gen++;
  obj.prototype.__class__ = obj.name;
  obj.prototype.prototype = obj.prototype;
  var slist;
  if (parent.__statics__!=undefined) {
      slist = new Array(parent.__statics__.length);
      for (var i=0; i<slist.length; i++) {
          slist[i] = parent.__statics__[i];
      }
  }
  else {
    slist = [];
  }
  obj.__statics__ = slist;
  for (var i=0; i<slist.length; i++) {
      var st=slist[i];
      obj[st] = parent[st];
  }
}
function handle_duplicate_calls(cls) {
  if (cls.__prototypeid__!=undefined&&!(cls.__prototypeid__ in native_types)) {
      console.trace("Warning: duplicate call to type system init; possible module cycle?", cls.name);
      return 1;
  }
  return 0;
}
function create_prototype(obj) {
  if (handle_duplicate_calls(obj))
    return ;
  defined_classes.push(obj);
  obj.prototype.constructor = obj;
  obj.prototype.__prototypeid__ = _prototype_id_gen++;
  obj.prototype.__class__ = obj.name;
  obj.__prototypeid__ = obj.prototype.__prototypeid__;
  obj.__statics__ = [];
  obj.__clsorder__ = [];
  obj.__parents__ = [];
  obj.__subclass_map__ = {}
  obj.__subclass_map__[obj.__prototypeid__] = obj;
  var name=obj.name;
  obj.__hash__ = function() {
    return name;
  }
  return obj;
}
function define_static(obj, name, val) {
  obj[name] = val;
  obj.__statics__[name] = name;
}
function prior(thisproto, obj) {
  var proto=obj.constructor.prototype;
  while (proto.__prototypeid__!=thisproto.__prototypeid__) {
    proto = proto.prototype;
  }
  return proto.prototype;
}
function arr_iter(keys) {
  this.keys = keys;
  this.cur = 0;
  this[Symbol.iterator] = function() {
    return this;
  }
  this.next = function() {
    if (this.cur>=this.keys.length) {
        return {value: undefined, done: true}
    }
    return {value: this.keys[this.cur++], done: false}
  }
}
var _forin_data={};
function save_forin_conv() {
  s = "";
  lst = Object.keys(_forin_data);
  lst.sort();
  var buf=lst.join("\n");
  var blob=new Blob([buf], {type: "text/plain"});
  var obj_url=window.URL.createObjectURL(blob);
  window.open(obj_url);
}
var __sp_ws={"\n": 0, "\r": 0, "\t": 0, "\v": 0, " ": 0, "\0": 0};
if (String.prototype.trimRight==undefined) {
    String.prototype.trimRight = function() {
      var i=this.length-1;
      while (i>=0&&this[i] in __sp_ws) {
        i--;
      }
      return this.slice(0, i+1);
    };
}
if (String.prototype.trimLeft==undefined) {
    String.prototype.trimLeft = function() {
      var i=0;
      while (i<this.length&&this[i] in __sp_ws) {
        i++;
      }
      return this.slice(i, this.length);
    };
}
if (window.Symbol==undefined) {
    window.Symbol = {iterator: "__iterator__"};
}
function __get_iter(obj) {
  if (obj==undefined) {
      console.trace();
      print_stack();
      throw new Error("Invalid iteration over undefined value");
  }
  if (Symbol.iterator in obj) {
      return obj[Symbol.iterator]();
  }
  else {
    var keys=[];
    for (var k in obj) {
        keys.push(k);
    }
    return new arr_iter(keys);
  }
}
var arr_iter=function(keys) {
  this.ret = {done: false, value: undefined}
  this.keys = keys;
  this.cur = 0;
  this[Symbol.iterator] = function() {
    return this;
  }
  this.next = function() {
    if (this.cur>=this.keys.length) {
        this.ret.done = true;
        return this.ret;
    }
    this.ret.value = this.keys[this.cur++];
    return this.ret;
  }
};
function _KeyValIterator(obj) {
  this.ret = {done: false, value: [undefined, undefined]}
  this.i = 0;
  this.obj = obj;
  this.keys = Object.keys(obj);
}
/*test for IE bug*/;
if (_KeyValIterator.name==undefined) {
    /*
        not sure if we can set .name
        in all recent versions of IE
      */
;
    try {
      _KeyValIterator.name = '_KeyValIterator';
    }
    catch (_cerror1) {
        print_stack(_cerror1);
        console.trace("WARNING: failed to fix class constructor name! Evil!");
    }
}
create_prototype(_KeyValIterator);
_KeyValIterator.prototype[Symbol.iterator] = function() {
  return this;
};
_KeyValIterator.prototype.next = function() {
  if (this.i>=this.keys.length) {
      this.ret.done = true;
      this.ret.value = undefined;
      return this.ret;
  }
  var k=this.keys[this.i];
  var v=this.obj[k];
  this.ret.value[0] = k;
  this.ret.value[1] = v;
  this.i++;
  return this.ret;
};
var Iterator=function(obj) {
  if (Symbol.iterator in obj) {
      return obj[Symbol.iterator]();
  }
  else {
    return new _KeyValIterator(obj);
  }
};
function define_docstring(func, docstr) {
  func.__doc__ = docstr;
  return func;
}
function __bind_super_prop(obj, cls, parent, prop) {
  var descr=Object.getOwnPropertyDescriptor(parent.prototype, prop);
  if (descr==undefined)
    return parent.prototype[prop];
  if (descr.get!=undefined) {
      return descr.get.call(obj);
  }
  else 
    if (descr.value!=undefined) {
      return descr.value;
  }
  else {
    var p=parent.prototype[prop];
    if (typeof p=="function") {
        return p.bind(obj);
    }
    else {
      return p;
    }
  }
}

es6_module_define('config_local', [], function _config_local_module(_es6_module) {
  'use strict';
});

es6_module_define('util', [], function _util_module(_es6_module) {
  function cachering(func, size) {
    Array.call(this);
    for (var i=0; i<size; i++) {
        this.push(func());
    }
    this.cur = 0;
  }
  /*test for IE bug*/;
  if (cachering.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        cachering.name = 'cachering';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  cachering = inherit_multiple(cachering, [Array], _es6_module, "cachering");
  define_static(cachering, "fromConstructor", function(cls, size) {
    return new cachering(function() {
      return new cls();
    }, size);
  });
  cachering.prototype.next = function() {
    var ret=this[this.cur];
    this.cur = (this.cur+1)%this.length;
    return ret;
  }
  _es6_module.add_class(cachering);
  cachering = _es6_module.add_export('cachering', cachering);
  function SetIter(set) {
    this.set = set;
    this.i = 0;
    this.ret = {done: false, value: undefined}
    this.list = set.list;
  }
  /*test for IE bug*/;
  if (SetIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        SetIter.name = 'SetIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  SetIter = create_prototype(SetIter, _es6_module, "SetIter");
  SetIter.prototype[Symbol.iterator] = function() {
    return this;
  }
  SetIter.prototype.cache_init = function() {
    this.i = 0;
    this.ret.done = false;
    this.ret.value = undefined;
    this.list = this.set.list;
    return this;
  }
  SetIter.prototype.next = function() {
    var list=this.list;
    var len=list.length;
    while (this.i<len&&list[this.i]===_set_null) {
      this.i++;
    }
    if (this.i>=len) {
        this.ret.done = true;
        this.ret.value = undefined;
        return this.ret;
    }
    this.ret.value = list[this.i];
    this.i++;
    return this.ret;
  }
  SetIter.prototype.reset = function() {
    this.cache_init();
  }
  _es6_module.add_class(SetIter);
  function set(input) {
    this.items = {}
    this.list = [];
    this.freelist = [];
    this.length = 0;
    var this2=this;
    this._itercache = new cachering(function() {
      return new SetIter(this2);
    }, 64);
    if (input!=undefined) {
        if (__instance_of(input, Array)||__instance_of(input, String)) {
            for (var i=0; i<input.length; i++) {
                this.add(input[i]);
            }
        }
        else {
          var __iter_item=__get_iter(input);
          var item;
          while (1) {
            var __ival_item=__iter_item.next();
            if (__ival_item.done) {
                break;
            }
            item = __ival_item.value;
            this.add(item);
          }
        }
    }
  }
  /*test for IE bug*/;
  if (set.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        set.name = 'set';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  set = create_prototype(set, _es6_module, "set");
  set.prototype.forEach = function(cb, thisvar) {
    if (thisvar==undefined)
      thisvar = self;
    var __iter_item=__get_iter(this);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      cb.call(thisvar, item);
    }
  }
  set.prototype.add = function(item) {
    var hash=item[Symbol.keystr]();
    if (hash in this.items)
      return ;
    var i;
    if (this.freelist.length>0) {
        i = this.freelist.pop();
        this.list[i] = item;
    }
    else {
      i = this.list.length;
      this.list.push(item);
    }
    this.items[hash] = i;
    this.length++;
  }
  set.prototype.remove = function(item) {
    var hash=item[Symbol.keystr]();
    if (!(hash in this.items))
      return ;
    var i=this.items[hash];
    this.list[i] = _set_null;
    this.freelist.push(i);
    delete this.items[hash];
    this.length--;
    return item;
  }
  set.prototype.has = function(item) {
    var hash=item[Symbol.keystr]();
    return hash in this.items;
  }
  set.prototype.union = function(set2) {
    var ret=new set();
    var __iter_item=__get_iter(this);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      ret.add(item);
    }
    var __iter_item=__get_iter(set2);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      ret.add(item);
    }
    return ret;
  }
  set.prototype[Symbol.iterator] = function() {
    return this._itercache.next().cache_init(this);
  }
  set.prototype.asArray = function() {
    var arr=new Array(this.length);
    var __iter_item=__get_iter(this);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      arr[i++] = item;
    }
    return arr;
  }
  set.prototype.toJSON = function() {
    return this.asArray();
  }
  set.prototype.toSource = function() {
    return "new set("+list(this).toSource()+")";
  }
  _es6_module.add_class(set);
  set = _es6_module.add_export('set', set);
  function HashKeyIter(hash) {
    this.ret = {done: false, value: undefined}
    this.hash = hash;
    this.iter = Iterator(hash.items);
  }
  /*test for IE bug*/;
  if (HashKeyIter.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        HashKeyIter.name = 'HashKeyIter';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  HashKeyIter = create_prototype(HashKeyIter, _es6_module, "HashKeyIter");
  HashKeyIter.prototype.next = function() {
    var reti=this.ret;
    var iter=this.iter;
    var items=this.hash.items;
    var item=iter.next();
    if (item.done)
      return item;
    while (!items.hasOwnProperty(item.value[0])) {
      if (item.done)
        return item;
      item = iter.next();
    }
    reti.value = this.hash.keymap[item.value[0]];
    return reti;
  }
  _es6_module.add_class(HashKeyIter);
  function hashtable() {
    this.items = {}
    this.keymap = {}
    this.length = 0;
  }
  /*test for IE bug*/;
  if (hashtable.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        hashtable.name = 'hashtable';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  hashtable = create_prototype(hashtable, _es6_module, "hashtable");
  hashtable.prototype.reset = function() {
    this.items = {}
    this.keymap = {}
    this.length = 0;
  }
  hashtable.prototype.add = function(key, item) {
    if (!this.items.hasOwnProperty(key[Symbol.keystr]()))
      this.length++;
    this.items[key[Symbol.keystr]()] = item;
    this.keymap[key[Symbol.keystr]()] = key;
  }
  hashtable.prototype.remove = function(key) {
    delete this.items[key[Symbol.keystr]()];
    delete this.keymap[key[Symbol.keystr]()];
    this.length-=1;
  }
  hashtable.prototype[Symbol.iterator] = function() {
    return new HashKeyIter(this);
  }
  hashtable.prototype.values = function() {
    var ret=new Array();
    var __iter_k=__get_iter(this);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      ret.push(this.items[k]);
    }
    return ret;
  }
  hashtable.prototype.keys = function() {
    return list(this);
  }
  hashtable.prototype.get = function(key) {
    return this.items[key[Symbol.keystr]()];
  }
  hashtable.prototype.set = function(key, item) {
    if (!this.has(key)) {
        this.length++;
    }
    this.items[key[Symbol.keystr]()] = item;
    this.keymap[key[Symbol.keystr]()] = key;
  }
  hashtable.prototype.union = function(b) {
    var newhash=new hashtable(this);
    var __iter_item=__get_iter(b);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      newhash.add(item, b.get[item]);
    }
    return newhash;
  }
  hashtable.prototype.has = function(item) {
    if (item==undefined)
      console.trace();
    return this.items.hasOwnProperty(item[Symbol.keystr]());
  }
  _es6_module.add_class(hashtable);
  hashtable = _es6_module.add_export('hashtable', hashtable);
  function IDGen() {
    this.cur = 1;
  }
  /*test for IE bug*/;
  if (IDGen.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        IDGen.name = 'IDGen';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  IDGen = create_prototype(IDGen, _es6_module, "IDGen");
  IDGen.prototype.next = function() {
    return this.cur++;
  }
  IDGen.prototype.max_cur = function(id) {
    this.cur = Math.max(this.cur, id+1);
  }
  _es6_module.add_class(IDGen);
  IDGen = _es6_module.add_export('IDGen', IDGen);
  function list(iterable) {
    var ret=[];
    var __iter_item=__get_iter(iterable);
    var item;
    while (1) {
      var __ival_item=__iter_item.next();
      if (__ival_item.done) {
          break;
      }
      item = __ival_item.value;
      ret.push(item);
    }
    return ret;
  }
  list = _es6_module.add_export('list', list);
  function mixin(child, parent) {
    var __iter_k=__get_iter(parent.prototype);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var v=parent.prototype[k];
      if (!(k in child.prototype)) {
          child.prototype[k] = v;
      }
    }
  }
  mixin = _es6_module.add_export('mixin', mixin);
  var time_ms=window.time_ms;
  time_ms = _es6_module.add_export('time_ms', time_ms);
  function Timer(interval_ms) {
    this.ival = interval_ms;
    this.normval = 0.0;
    this.last_ms = time_ms();
  }
  /*test for IE bug*/;
  if (Timer.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Timer.name = 'Timer';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Timer = create_prototype(Timer, _es6_module, "Timer");
  Timer.prototype.ready = function() {
    this.normval = (time_ms()-this.last_ms)/this.ival;
    if (time_ms()-this.last_ms>this.ival) {
        this.last_ms = time_ms();
        return true;
    }
    return false;
  }
  _es6_module.add_class(Timer);
  Timer = _es6_module.add_export('Timer', Timer);
});


    var totfile=3, fname="app";
    for (var i=0; i<totfile; i++) {
      var path = fname+i+".js";
      var node = document.createElement("script")
      node.src = path
      node.async = false
      
      document.head.appendChild(node);
    }
  