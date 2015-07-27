"use strict";

import * as sdna from 'sdna';
import * as util from 'util';
import {EventHandler} from 'events';

export class wmWindow extends sdna.bases.wmWindow {
    constructor() {
      super();
      EventHandler.call(this);
    }
    
    on_mousemove(e) {
      //console.log("mousemove!", e.x, e.y);
    }
    
    addHandlers(event_manager) {
      event_manager.addEventListener(this);
      event_manager.addEventListener(this.screen);
      
      this.screen.setEventParent(this); 
      this.screen.addHandlers(event_manager);
    }
    
    on_resize(e) {
      var oldsize = [this.sizex, this.sizey];
      
      if (this.sizex == 0 || this.sizey == 0) {
          return;
      }
      if (e.width == 0 || e.height == 0 || isNaN(e.width) || isNaN(e.height)) {
          return;
      }
      
      var fac = [e.width/this.sizex, e.height/this.sizey];
      if (isNaN(fac[0]) || isNaN(fac[1]) || fac[0] == 0.0 || fac[1] == 0.0) {
          console.trace("error resizing!", fac, e.width, e.height, this);
      }

      this.screen.do_resize(fac);
      
      this.sizex = e.width;
      this.sizey = e.height;
      
      redraw_ui();
    }
    
    draw_gl(gl) {
      this.screen.draw_ui(gl);
    }
    
    draw_ui(g) {
      if (!this.screen.is_active) {
        this.screen.create();
      }
      
      this.screen.draw_borders(g);
      this.screen.draw_ui(g);
    }
}

sdna.types.register(wmWindow);

util.mixin(wmWindow, EventHandler);
