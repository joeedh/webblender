"use strict";

/*
  third version.  rewrite of second (canvas2d) one.
*/

import {Vector3, Matrix4} from 'vectormath';
import {cachering} from 'util';

var canvas_cache_vs = cachering.fromConstructor(Vector3, 128);
var _quad_blank = [0, 0, 0, 0];
var get_2d_ret = {};
var _canvas_grad_cache = {};

export function get_2d_canvas() {
  var ret = get_2d_ret;
  
  if (ret.canvas == undefined) {
    ret.canvas = document.getElementById("canvas2d");
    ret.ctx = _canvas2d_ctx;
  }
  
  return ret;
}
window.get_2d_canvas = get_2d_canvas;

window._ui_canvas_2d_idgen = 1;

export class UICanvas {
    constructor() {
        this.transmat = new Matrix4();
        this.trans_stack = [];
        
        this.g = get_2d_canvas().ctx;
    }
    
      _css_color(c) {
    if (isNaN(c[0]))
      return "black";
    
    var s = "rgba("
    
    for (var i=0; i<3; i++) {
      if (i > 0) s += ","
      s += Math.floor(c[i]*255);
    }
    
    s += ","+ (c[3] == undefined ? "1.0" : c[3]) + ")";
    
    return s;
  }
  
  
  reset_canvases() {
    for (var k in this.canvases) {
      document.body.removeChild(this.canvases[k]);
    }
    
    this.canvases = {};
  }
  
  destroy() {
  }
  
  kill_canvas(obj_or_id) {
    var id = obj_or_id;
    
    if (typeof id == "object")
      id = id.__hash__();
      
    var canvas = this.canvases[id];
    delete this.canvases[id];
    
    global active_canvases;
    delete active_canvases[id];
    
    if (canvas != undefined) {
      document.body.removeChild(canvas);
    }
  }
  
  get_canvas(obj_or_id, pos, size, zindex=4) {
    var id = obj_or_id;
    
    if (typeof id == "object")
      id = id.__hash__();
    
    var canvas;
    if (id in this.canvases) {
      canvas = this.canvases[id];
      canvas.is_blank = false;
    } else {
      var canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      
      canvas.style["position"] = "absolute";
      canvas.style["left"] = "0px";
      canvas.style["top"] = "0px";
      canvas.style["z-index"] = ""+zindex;
      canvas.style["pointer-events"] = "none";
      
      canvas.width = this.canvas.width;
      canvas.height = this.canvas.height;
      
      canvas.ctx = canvas.getContext("2d");
      canvas.is_blank = true;
      
      this.canvases[id] = canvas;
      
      global active_canvases;
      active_canvases[id] = [canvas, this];
    }
    
    if (canvas.width != size[0]) {
      canvas.width = size[0];
    }
    if (canvas.height != size[1]) {
      canvas.height = size[1];
    }
    
    if (canvas.style["left"] != ""+Math.floor(pos[0])+"px") {
      canvas.style["left"] = Math.floor(pos[0])+"px";
      canvas.is_blank = true;
    }
    
    var y = Math.floor(window.innerHeight - pos[1] - size[1]);
    if (canvas.style["top"] != ""+y+"px") {
      canvas.style["top"] = ""+y+"px";
      canvas.is_blank = true;
    }
    
    canvas.ctx.is_blank = canvas.is_blank;
    return canvas.ctx;
  }
  
  //push a new html5 2d canvas onto the layer stack
  //e.g. for temporary overlays, etc
  push_layer() {
    this.layerstack.push([this.canvas, this.ctx]);
    
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    
    canvas.style["position"] = "absolute";
    canvas.style["left"] = "0px";
    canvas.style["top"] = "0px";
    canvas.style["z-index"] = ""+(4+this.layerstack.length);
    canvas.style["pointer-events"] = "none";
    
    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;
    
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  
  pop_layer() {
    if (this.layerstack.length == 0) {
      console.trace("%cTHE SHEER EVIL OF IT!", "color:red");
      return;
    }
    
    var item = this.layerstack.pop();
    
    document.body.removeChild(this.canvas);
    
    this.canvas = item[0];
    this.ctx = item[1];
  }
  
  set_layer() {
    console.log("Deprecated!");
  }
  
  reset() {
    console.log("Deprecated!");
  }
  
  clear(p, size) { //Array<float>, Array<float>
    var v1 = canvas_cache_vs.next().zero(), v2 = canvas_cache_vs.next().zero();
    v1[0] = p[0], v1[1] = p[1];
    v2[0] = p[0]+size[0], v2[1] = p[1]+size[1];
    
    v1.multVecMatrix(this.matrix).floor();
    v2.multVecMatrix(this.matrix).floor();
    v2.sub(v1);
    
    this.g.clearRect(v1[0], v1[1], v2[0], v2[1]);
  }
  invbox(pos, size, clr, r) {
    var cs = uicolors["InvBox"]
    
    cs = _box_process_clr(cs, clr);
      
    this.box(pos, size, cs, r);
  }

  simple_box(pos, size, clr=undefined, r=2.0) { //clr is optional
    
    var cs = uicolors["SimpleBox"]
    
    cs = _box_process_clr(cs, clr);
       
    this.box(pos, size, cs, r);
  }

  hlightbox(pos, size, clr_mul, r) { //clr_mul is optional
    var cs = uicolors["HLightBox"]
    
    /*if (clr != undefined) {
      cs = [clr, clr, clr, clr]
    }*/
      
    if (clr_mul != undefined) {
      cs = [new Vector4(cs[0]), new Vector4(cs[1]), new Vector4(cs[2]), new Vector4(cs[3])]
      for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
          cs[i][j] *= clr_mul;
        }
      }
    }
    this.box(pos, size, cs, r);
  }

  box_outline(pos, size, clr, rfac) {
    this.box(pos, size, clr, rfac, true);
  }
  
  _transform(p) {//float, float
    var p = canvas_cache_vs.next().load(p);
    p[2] = 0.0; //prevent undefined/NaN'd z
    
    p.multVecMatrix(this.transmat);
    
    return p;
  }
  
  quad(v1, v2, v3, v4, c1=_quad_blank, c2=c1, c3=c2, c4=c3, horiz_gradient=false) {
    var black = _quad_blank;
    
    v1 = this._transform(v1);
    v2 = this._transform(v2);
    v3 = this._transform(v3);
    v4 = this._transform(v4);
    
    //ctx.fillStyle = this._css_color(c1);
    var grads = _canvas_grad_cache;
    
    var hash = "";
    for (var i=0; i<4; i++) {
      hash += c1[i] + "," + c2[i] + "," + c3[i] + "," + c4[i];
    }
    
    //XXX eek!
    var grad;
    
    if (1 || !(hash in grads)) {
      //XXX console.log("implement me better! [gradient code]");
      var min=[v1[0], v1[1]], max = [v1[0], v1[1]];
      for (var i=0; i<2; i++) {
        min[i] = Math.min(min[i], v1[i]); max[i] = Math.max(max[i], v1[i]);
        min[i] = Math.min(min[i], v2[i]); max[i] = Math.max(max[i], v2[i]);
        min[i] = Math.min(min[i], v3[i]); max[i] = Math.max(max[i], v3[i]);
        min[i] = Math.min(min[i], v4[i]); max[i] = Math.max(max[i], v4[i]);
      }
      
      var grad;
      if (isNaN(min[0]) || isNaN(max[0]) || isNaN(min[1]) || isNaN(max[1]) || isNaN(c1[0]) || isNaN(c3[0])) {
        grad = "black";
      } else {
        try {
          if (horiz_gradient)
            grad = ctx.createLinearGradient(min[0], min[1]*0.5+max[1]*0.5, max[0], min[1]*0.5+max[1]*0.5);
          else
            grad = ctx.createLinearGradient(min[0]*0.5+max[0]*0.5, min[1], min[0]*0.5+max[0]*0.5, max[1]);
            
          grads[hash] = grad;
          
          grad.addColorStop(0.0, this._css_color(c1));
          grad.addColorStop(1.0, this._css_color(c3));
        } catch (error) {
          print_stack(error);
          console.log("GRADIENT ERROR", min[0], min[1], max[0], max[1]);
        }
      }
    } else {
      grad = grads[hash];
    }
    
    if (grad != undefined)
      ctx.fillStyle = grad;
    //ctx.setFillColor(c1[0], c1[1], c1[2], c1[3]);
    
    ctx.beginPath();
    ctx.moveTo(v1[0], v1[1]);
    ctx.lineTo(v2[0], v2[1]);
    ctx.lineTo(v3[0], v3[1]);
    ctx.lineTo(v4[0], v4[1]);
    ctx.fill();
  }

  root_start() {
    this.g.save();
  }
  
  root_end() {
    this.g.restore();
  }
  
  clip(rect, vis_only=false) {
    console.log("implement me: clip!!");
    return;
    
    var canvas = this.canvas;
    var ctx = this.ctx;
    
    rect[0] = new Vector2(rect[0]);
    rect[1] = new Vector2(rect[1]);
    
    var v = this.viewport;
    this._clip_to_viewport(rect[0], rect[1], v);
    
    ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,0,0,0.7)" : "rgba(0,255,0,0.7)";
    ctx.beginPath();
    //ctx.rect(v[0][0]+rect[0], canvas.height-(v[0][1]+rect[1]+rect[3]), rect[2], rect[3]);
    ctx.rect(v[0][0]+rect[0][0], canvas.height-(v[0][1]+rect[0][1]+rect[1][1]), rect[1][0], rect[1][1]);
    ctx.closePath();
    
    //console.log(rect[0][0], rect[0][1], rect[1][0], rect[1][1]);
    if (vis_only)
      ctx.fill();
    else
      ctx.clip();
  }
  
}
