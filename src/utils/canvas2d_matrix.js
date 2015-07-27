"use strict";

import 'polyfill';

import {
  Vector2, Vector3, Vector4, Matrix4, Quat
} from 'vectormath';

export function patch_canvas2d_tranform(g) {
  g._lineTo = g.lineTo;
  g._moveTo = g.moveTo;
  g._rect = g.rect;
  g._clearRect = g.clearRect;
  g._arcTo = g.arcTo;
  g._bezierCurveTo = g.bezierCurveTo;
  g._fillText = g.fillText;
  
  g._matrix = new Matrix4();
  g._matrix_stack = [];
  
  g._save = g.save;
  g._restore = g.restore;
  
  g.save = function() {
    var mat = new Matrix4(this._matrix);
    mat.load(this._matrix);
    
    this._matrix_stack.push(mat);
    this._save();
  }
  
  g.restore = function() {
    this._matrix.load(this._matrix_stack.pop());
    this._restore();
  }
  
  //do cachering manually, for speed
  var rets = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3()
  ];
  
  var retcur = 0;
  
  function tn(x, y) {
    var ret = rets[retcur];
    retcur = (retcur+1)%rets.length;
    
    ret[0] = x, ret[1] = y, ret[2] = 0.0;
    ret.multVecMatrix(this._matrix);
    
    return ret;
  }
  
  var max = Math.max, min = Math.min;
  g.rect = function(x, y, w, h) {
    var p1 = tn.call(this, x, y), p2 = tn.call(this, x+w, y+h);
    
    var minx = min(p1[0], p2[0]), maxx = max(p1[0], p2[0]);
    var miny = min(p1[1], p2[1]), maxy = max(p1[1], p2[1]);
    
    g._rect(p1[0], p1[1]-(maxy-miny), maxx-minx, maxy-miny);
  }
  
  var max = Math.max, min = Math.min;
  g.clearRect = function(x, y, w, h) {
    var p1 = tn.call(this, x, y), p2 = tn.call(this, x+w, y+h);
    
    var minx = min(p1[0], p2[0]), maxx = max(p1[0], p2[0]);
    var miny = min(p1[1], p2[1]), maxy = max(p1[1], p2[1]);
    
    g._clearRect(p1[0], p1[1]-(maxy-miny), maxx-minx, maxy-miny);
  }
  
  g.moveTo = function(x, y) {
    var p = tn.call(this, x, y);
    g._lineTo(p[0], p[1]);
  }
  
  g.lineTo = function(x, y) {
    var p = tn.call(this, x, y);
    g._lineTo(p[0], p[1]);
  }
  
  g.bezierCurveTo = function(x1, y1, x2, y2, x3, y3) {
    var p1 = tn.call(this, x1, y1);
    var p2 = tn.call(this, x2, y2);
    var p3 = tn.call(this, x3, y3);
    
    g._bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  }
  
  g.fillText = function(text, x, y) {
      var p = tn.call(this, x, y);
      g._fillText(text, p[0], p[1]);
  }
  
  g._measureText = g.measureText;
  g.measureText = function(text) {
    var p1 = tn.call(this, 0, 0);
    var p2 = tn.call(this, 0, 1);
    var scale = p2.vectorDistance(p1);
    
    return {
      width : g._measureText(text).width*scale
    };
  }
  
  var mat = new Matrix4();
  
  g.setTransform = function() {
    console.log("bleh!!");
    this._matrix.makeIdentity();
  }
  
  g.translate = function(x, y) {
    mat.makeIdentity();
    mat.translate(x, y, 0);
    
    this._matrix.preMultiply(mat);
    //this._matrix.multiply(mat);
    //this._matrix.translate(x, y, 0.0);
  }
  
  g.scale = function(x, y) {
    mat.makeIdentity();
    mat.scale(x, y, 1.0);
    
    this._matrix.preMultiply(mat);
    //this._matrix.multiply(mat);
    //this._matrix.scale(x, y, 1.0);
  }
  
  g._rotate = g.rotate;
  g.rotate = function(th) {
    g._rotate(th);
    //this._matrix.euler_rotate(0.0, 0.0, th);
    
  }
}