import {
        Vector3, Matrix4, Vector4, Vector2
       } from 'vectormath';
import * as math from 'math';
import {cachering} from 'util';

export class EditorBase {
  constructor() {
    this.mesh = undefined;
    this.idx = -1;
  }
  
  bind(idx, mesh) {
    this.mesh = mesh;
    this.idx = idx;
  }
}

export class PointEditor extends EditorBase {
}

export class LineEditor extends EditorBase {
}

export class TriEditor extends EditorBase {
  colors(c1, c2, c3) {
    var i = this.i*4*3;
    var layer = this.mesh.tris.colors;
    var data = layer.datalayers[layer.actlayer];
    
    data[i++] = c1[0];
    data[i++] = c1[1];
    data[i++] = c1[2];
    data[i++] = c1.length > 3 ? c1[3] : 1.0;
    
    data[i++] = c2[0];
    data[i++] = c2[1];
    data[i++] = c2[2];
    data[i++] = c2.length > 3 ? c2[3] : 1.0;
    
    data[i++] = c2[0];
    data[i++] = c2[1];
    data[i++] = c2[2];
    data[i++] = c2.length > 3 ? c2[3] : 1.0;
    
    return this;
  }
}

export class IndexedTriEditor extends EditorBase {
}

export class QuadEditor extends EditorBase {
}

export class DrawBuffer {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.datalayers = [[]]
  }
}

export class DrawBuffers {
  constructor(tot_element, default_layers) {
    this.layers = [];
    this.tot = 0;
    this.esize = tot_element;
    
    for (var k in default_layers) {
      this.layers.push(new DrawBuffer(k, default_layers[k]));
      this[k] = this.layers[this.layers.length-1];
    }
  }
  
  add_layer(name, size) {
    this.layers.push(new DrawBuffer(name, size));
    this[name] = this.layers[this.layers.length-1];
  }
  
  new_element() {
    var idx = this.tot;
    
    for (var i=0; i<this.layers.length; i++) {
      var layer = this.layers[i];
      
      for (var i=0; i<layer.datalayers.length; i++) {
        var sublayer = layer.datalayers[i];
        
        var len = layer.size*this.esize;
        for (var j=0; j<len; j++) {
          sublayer.push(0.0);
        }
      }
    }
    
    return idx;
  }
}

export class InstanceBuffers extends DrawBuffers {
  
}

export class SimpleMeshIsland {
  constructor(do_index) {
    if (do_index) {
      this.tris = new DrawBuffers(3, {
        index   : 1, 
      });
    } else {
      this.tris = new DrawBuffers(3, {
        cos     : 3, 
        normals : 3, 
        colors  : 4
      });
    }
    
    this.lines = new DrawBuffers(2, {
      cos     : 3, 
      colors  : 4
    });
    
    this.verts = new DrawBuffers(1, {
      cos     : 3, 
      normals : 3, 
      colors  : 4
    });
    
    if (do_index) {
      this.indexed_tri_mode = true;
      this.tris.add_layer("index", 1);
    } else {
      this.indexed_tri_mode = false;
    }
    
    this.indexed_tri_editors = cachering.fromConstructor(IndexedTriEditor, 64);
    this.tri_editors = cachering.fromConstructor(TriEditor, 64);
  }
  
  tri(v1, v2, v3) {
    if (this.indexed_tri_mode) {
      var idx = this.tris.tot;
      
      this.tris.new_element();
      
      var data = this.tris.index.datalayers[0];
      data[tot*3] = v1;
      data[tot*3+1] = v2;
      data[tot*3+2] = v3;
      
      return this.indexed_tri_editors.next().bind(idx, this);
    } else {
      var idx = this.tris.new_element();
      var normals = this.tris.normals.datalayers[0];
      var colors = this.tris.colors.datalayers[0];
      
      for (var i=0; i<3; i++) {
        //normal defaults to pointing along global z axis
        normals[idx*(3*3)+3*i + 2] = 1.0;
        
        //alpha defaults to 1
        colors[idx*(3*4) + 4*i + 3] = 1.0;
      }
      
      return this.tri_editors.next().bind(idx, this);
    }
  }
}

export class SimpleMesh {
}