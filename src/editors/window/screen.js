"use strict";

import * as sdna from 'sdna';
import * as util from 'util';
import {EventHandler} from 'events';
import {UICanvas} from 'UICanvas2D';
import {UIFrame} from 'UIFrame';

var ceil = Math.ceil;
var pxround = function(f) {
  return ~~(f+0.5);
}

export class Screen extends sdna.bases.Screen {
    constructor() {
      super();
      EventHandler.call(this);
      
      this.is_active = false;
    }
    
    create() {
      console.log("activating!");
      this.is_active = true;
      
      for (var area of this.areabase) {
        area.create();
      }
      
      //this.canvas = new UICanvas([
      //  [0, 0], [window.innerWidth, window.innerHeight] //XXX fix me, bad use of globals
      //]);
    }
    
    destroy() {
      console.log("inactivating");
      this.is_active = false;
      
      for (var area of this.areabase) {
        area.destroy();
      }
      //this.canvas.destroy();
    }
    
    on_mousedown(e) {
      if (this.active_area == undefined)
        return;
      
      var r = this.active_area.totrct;
      e.x -= r.xmin;
      e.y -= r.ymin;
      var ret = this.active_area.on_mousedown(e);
      e.x += r.xmin;
      e.y += r.ymin;
      return ret;
    }
    
    on_tick(e) {
      for (var area of this.areabase) {
        area.on_tick();
      }
    }
    
    on_mouseup(e) {
      if (this.active_area == undefined)
        return;
      
      var r = this.active_area.totrct;
      e.x -= r.xmin;
      e.y -= r.ymin;
      var ret = this.active_area.on_mouseup(e);
      e.x += r.xmin;
      e.y += r.ymin;
      return ret;
    }
    
    on_mousemove(e) {
      //console.log("mousemove!", e.x, e.y);
      var x = e.x, y = e.y;
      var ret;
      
      for (var area of this.areabase) {
        var r = area.totrct;
        
        if (x >= r.xmin && x <= r.xmax && y >= r.ymin && y <= r.ymax) {
          if (this.active_area != area) {
            if (this.active_area != undefined) {
              this.active_area.on_inactive()
            }
            
            this.active_area = area;
            area.on_active();
          }
          
          e.x -= r.xmin;
          e.y -= r.ymin;
          var ret = area.on_mousemove(e);
          e.x += r.xmin;
          e.y += r.ymin;
          
          break;
        }
      }
      
      return ret;
    }
    
    draw_borders(g) {
      g.lineWidth = 2;

      g.strokeStyle = "green";
      g.beginPath();
      
      for (var area of this.areabase) {
        g.beginPath();
        g.moveTo(area.v1.vec.x, area.v1.vec.y);
        g.lineTo(area.v2.vec.x, area.v2.vec.y);
        g.lineTo(area.v3.vec.x, area.v3.vec.y);
        g.lineTo(area.v4.vec.x, area.v4.vec.y);
        g.lineTo(area.v1.vec.x, area.v1.vec.y);
        g.stroke();
      }
      
      g.strokeStyle = "red";
      for (var area of this.areabase) {
        var r = area.totrct;
        
        g.beginPath();
        g.rect(r.xmin, r.ymin, r.xmax-r.xmin, r.ymax-r.ymin);
        g.stroke();
      }
      
      g.strokeStyle = "yellow";
      for (var area of this.areabase) {
        for (var region of area.regionbase) {
          if (!region.do_draw) {
            continue;
          }
          
          var r = region.winrct;

          g.beginPath();
          g.rect(r.xmin, r.ymin, r.xmax-r.xmin, r.ymax-r.ymin);
          
          g.stroke();
          
        }
      }
      
      g.strokeStyle = "black";
      for (var e of this.edgebase) {
        var v1 = e.v1, v2 = e.v2;
        
        g.beginPath();
        g.moveTo(v1.vec.x, v1.vec.y);
        g.lineTo(v2.vec.x, v2.vec.y);
        g.stroke();
      }
    }
    
    do_resize(fac) {
        for (var area of this.areabase) {
          var winx = pxround(area.winx*fac[0]);
          var winy = pxround(area.winy*fac[1]);
          
          area.on_resize({
            width  : winx,
            height : winy
          });
          
          area.winx = winx;
          area.winy = winy;
          
          area.totrct.xmin = pxround(area.totrct.xmin*fac[0]);
          area.totrct.xmax = pxround(area.totrct.xmax*fac[0]);
          area.totrct.ymin = pxround(area.totrct.ymin*fac[1]);
          area.totrct.ymax = pxround(area.totrct.ymax*fac[1]);
          
          for (var region of area.regionbase) {
            region.winx = pxround(region.winx*fac[0]);
            region.winy = pxround(region.winy*fac[1]);
            region.sizex = pxround(region.sizex*fac[0]);
            region.sizey = pxround(region.sizey*fac[1]);
            
            region.winrct.xmin = pxround(region.winrct.xmin*fac[0]);
            region.winrct.xmax = pxround(region.winrct.xmax*fac[0]);
            region.winrct.ymin = pxround(region.winrct.ymin*fac[1]);
            region.winrct.ymax = pxround(region.winrct.ymax*fac[1]);
            
            region.drawrct.xmin = pxround(region.drawrct.xmin*fac[0]);
            region.drawrct.xmax = pxround(region.drawrct.xmax*fac[0]);
            region.drawrct.ymin = pxround(region.drawrct.ymin*fac[1]);
            region.drawrct.ymax = pxround(region.drawrct.ymax*fac[1]);
            
            region.v2d.winx = region.winx;
            region.v2d.winy = region.winy;
          }
        }
        
        for (var vert of this.vertbase) {
          vert.vec.x = pxround(vert.vec.x*fac[0]);
          vert.vec.y = pxround(vert.vec.y*fac[1]);
        }
    }
    
    draw_gl(gl) {
    }
    
    draw_ui(g) {
      for (var area of this.areabase) {
        g.save();
        g.translate(area.totrct.xmin, area.totrct.ymin);
        
        area.draw_ui(g);
        g.restore()
      }
    }
}

sdna.types.register(Screen);

util.mixin(Screen, EventHandler);
