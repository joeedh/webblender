import * as sdna from 'sdna';
import * as util from 'util';
import {EventHandler} from 'events';
import {RowFrame, ColumnFrame} from 'UIPack';
import {UICanvas} from 'UICanvas2D';
import {UIFrame} from 'UIFrame';
import {UIButton} from 'UIWidgets';
import {UIContext} from 'context';

export class SpaceDataMixin {
}

export class ScrArea extends sdna.bases.ScrArea {
    constructor() {
      super();
      EventHandler.call(this);
      
      this.frame = undefined; //UIFrame
    }
    
    on_tick() {
      if (this.frame != undefined) {
        this.frame.on_tick();
      }
    }
    
    on_mousedown(e) {
      console.log("area mousedown!", e.x, e.y);
      
      if (this.frame != undefined)
        this.frame.on_mousedown(e);
    }
    
    on_mousemove(e) {
      //console.log("area mousemove!", e.x, e.y);
      if (this.frame != undefined)
        this.frame.on_mousemove(e);
    }
    
    on_mouseup(e) {
      console.log("area mouseup!", e.x, e.y);
      if (this.frame != undefined)
        this.frame.on_mouseup(e);
    }
    
    on_resize(e) {
      if (this.frame == undefined)
        return;
      
      var oldsize = [this.winx, this.winy];
      var newsize = [e.width, e.height];
      
      this.frame.on_resize(newsize, oldsize);
    }
    
    create() {
      this.frame = new UIFrame(new UIContext());
      this.frame.pos[0] = 0;
      this.frame.pos[1] = 0;
      
      this.frame.size[0] = this.winx;
      this.frame.size[1] = this.winy;

      this.frame.canvas = new UICanvas([
        [0, 0], [window.innerWidth, window.innerHeight] //XXX fix me, bad use of globals
      ]);
      
      var row = new ColumnFrame();
      
      row.add(new UIButton(new UIContext(), "test!"));
      row.add(new UIButton(new UIContext(), "test2!"));
      row.add(new UIButton(new UIContext(), "test3!"));
      row.add(new UIButton(new UIContext(), "test4!"));
      
      row.do_full_recalc();
      
      row.size[0] = this.winx;
      row.size[1] = 50;

      row.draw_background = true;
      this.frame.add(row);
      
      row.pack(this.frame.canvas);
    }
    
    destroy() {
      //this.canvas.destroy();
    }
    
    on_active() {
    }
    
    on_inactive() {
    }
    
    draw_ui(g) {
      //this.frame.do_full_recalc();
      
      this.frame.canvas.root_start();
      this.frame.canvas.push_transform();
      
      this.frame.canvas.translate(this.totrct.xmin, this.totrct.ymin);
      this.frame.build_draw(this.canvas, false);
      
      this.frame.canvas.pop_transform();
      this.frame.canvas.root_end();
      
      g.beginPath();
      g.rect(0, 0, 20, 20);
      g.fill();
    }
}

sdna.types.register(ScrArea);

util.mixin(ScrArea, EventHandler);
