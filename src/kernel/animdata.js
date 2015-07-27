"use strict";

import {PropTypes} from 'rna_properties';
import {DataPathNode} from 'eventdag';

export var AnimKeyFlags = {
  SELECT : 1
}

export var AnimInterpModes = {
  STEP    : 1,
  CATMULL : 2,
  LINEAR  : 4
}

import {IntProperty, FloatProperty} from 'rna_properties';
import {DataTypes, DataNames} from 'library';

//generic animation curve system, used for interpolating non-spatial stuff
//where tying to the pathspline vertices (as we do with time) is not appropriate
export class AnimKey extends DataPathNode {
  constructor() {
    this.id = -1;
    this.flag = 0
    this.time = 1.0;
    this.mode = AnimInterpModes.STEP;
    this.data = undefined;
    
    this.channel = undefined; //owning channel
  }
  
  dag_get_datapath(ctx) {
    var owner = this.channel.owner;
    var path;
    
    if (owner.lib_id <= -1) {
      //okay, this datablock isn't actually in the datalib,
      //it's direct data of another datablock.  lets assume it
      //has a .dag_get_datapath method. :) evil!
      path = owner.dag_get_datapath();
    } else {
      var name = DataNames[owner.lib_type].toLowerCase();
      path = "datalib." + name + ".items[" + owner.lib_id + "]";
    }
    
    path += ".animkeys[" + this.id + "]";
    
    return path;
  }
  
  set_time(time) {
    this.time = time;
    this.channel.resort = true;
  }
  
  static fromSTRUCT(reader) {
    var ret = new AnimKey();
    reader(ret);
    return ret;
  }
}

define_static(AnimKey, "dag_inputs", {
});

define_static(AnimKey, "dag_outputs", {
  "depend" : undefined,
  "id"     : 0.0
});

//import {PropTypes} from 'toolprops';

export class AnimChannel {
    constructor(proptype, name, path) {
      this.keys = [];
      this.resort = false;
      this.proptype = proptype;
      this.name = name == undefined ? "unnamed" : name;
      this.path = path;
      
      this.owner = undefined;
      
      //these two members are references to the owning datablock's 
      //lib_anim_idgen and lib_anim_idmap members
      this.idgen = undefined; //is set by client code
      this.idmap = undefined; //is set by client code
    }
    
    remove(key) {
      delete this.idmap[key.id];
      this.keys.remove(key);
      this.resort = true;
    }
    
    _do_resort() {
      this.keys.sort(function(a, b) {
        return a.time - b.time;
      });
      
      this.resort = false;
    }
    
    get_propcls() {
      if (this.propcls == undefined) {
        switch(this.proptype) {
          case PropTypes.INT:
            this.propcls = IntProperty;
            break;
          case PropTypes.FLOAT:
            this.propcls = FloatProperty;
            break;
        }
      }
      
      return this.propcls;
    }
    
    update(time, val) {
      if (this.resort) {
        this._do_resort();
      }
      
      for (var i=0; i<this.keys.length; i++) {
        if (this.keys[i].time == time) {
          this.keys[i].data.set_data(val);
          return;
        }
      }
      
      var propcls = this.get_propcls();
      
      var key = new AnimKey();

      key.id = this.idgen.gen_id();
      this.idmap[key.id] = key;
      
      key.channel = this;
      key.data = new propcls();
      key.data.set_data(val);
      key.time = time;
      
      this.keys.push(key);
      
      this._do_resort();
    }
    
    eval(time) {
      if (this.resort) {
        this._do_resort();
      }
      
      for (var i=0; i<this.keys.length; i++) {
        var k = this.keys[i];
        if (k.time > time) {
          break;
        }
      }
      
      var prev = i == 0 ? this.keys[i] : this.keys[i-1];
      var key = i == this.keys.length ? this.keys[this.keys.length-1] : this.keys[i];
      
      var t;
      if (prev.time != key.time) {
        t = (time - prev.time) / (key.time - prev.time);
      } else {
        t = 1.0;
      }
      
      //for now, just assume we're interpolating numbers
      var a = prev.data.data, b = key.data.data;
      
      var ret;
      if (key.mode == AnimInterpModes.STEP)
        ret = a;
      else
        ret = a + (b - a)*t;
      
      if (this.proptype == PropTypes.INT)
        ret = Math.floor(ret+0.5);
      
      return ret;
    }
    
    static fromSTRUCT(reader) {
      var ret = new AnimChannel();
      reader(ret);
      
      for (var i=0; i<ret.keys.length; i++) {
        ret.keys[i].channel = ret;
      }
      
      return ret;
    }
}
