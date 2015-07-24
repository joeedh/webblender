/*
  believe it or not, it's much easier to use a proper shader dag
  than code material shaders by hand, as many of us who worked with
  THREE.js came to know well.
*/

import * as util from 'util';

export class ShaderSocket {

}

export class Vec3 extends ShaderSocket {
}

export class ShaderNode {
  static inputs() { return {
  }}
  
  static outputs() { return {
  }}
  
  static name() { return "(unnamed node)" }
  
  static library_code() {
    return "";
  }
  
  pre_code() {
  }
  
  main_code() {
  }
  
  constructor() {
    var inputs = this.constructor.inputs();
    var outputs = this.constructor.outputs();
    
    this.inputs = {};
    this.outputs = {};
    
    for (var k in inputs) {
      this.inputs[k] = inputs[k].copy();
      this.inputs[k].name = k;
    }
    
    for (var k in outputs) {
      this.outputs[k] = outputs[k].copy();
      this.outputs[k].name = k;
    }
  }
}

export class ShaderDag {
  constructor() {
    this.nodes = [];
    
    this.sortlist = [];
    this.varyings = [];
    this.uniforms = [];
    this.textures = [];
  }
}
