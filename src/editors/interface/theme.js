"use strict";

import * as util from 'util';

export function darken(c, m) {
  for (var i=0; i<3; i++) {
    c[i] *= m;
  }
  
  return c;
}

export class BoxColor {
  constructor() {
    this.colors = undefined; //[clr1, clr2, clr3, clr4, can be a getter
  }
  
  static fromSTRUCT(reader) {
    return {};
  }
}

export class BoxColor4 extends BoxColor {
  constructor(Array<Array<float>> colors) {
    var clrs = this.colors = [[], [], [], []];
    
    if (colors == undefined) return;
    
    for (var i=0; i<4; i++) {
      for (var j=0; j<4; j++) {
        clrs[i].push(colors[i][j]);
      }
    }
  }
  
  static fromSTRUCT(reader) {
    var ret = new BoxColor4();
    reader(ret);
    return ret;
  }
}

//box colors are colors applied to boxes, i.e. four colors
//weighted box color
export class BoxWColor extends BoxColor {
  constructor(Array<float> color, Array<float> weights) {
    if (color == undefined || weights == undefined)
      return;
      
    this.color = [color[0], color[1], color[2], color[3]];
    this.weights = [weights[0], weights[1], weights[2], weights[3]];
  }
  
  get colors() {
    var ret = [[], [], [], []];
    var clr = this.color;
    var w = this.weights;
    
    if (clr == undefined)
      clr = [1, 1, 1, 1];
      
    for (var i=0; i<4; i++) {
      for (var j=0; j<3; j++) {
        ret[i].push(clr[j]*w[i]);
      }
      ret[i].push(clr[3]);
    }
    
    return ret;
  }
  
  static fromSTRUCT(reader) {
    var ret = new BoxWColor();
    reader(ret);
    return ret;
  }
}

export class ThemePair {
  constructor(String key, Array value) {
    this.key = key;
    this.val = value;
  }
}

export class ColorTheme {
  constructor(defobj) {
    this.colors = new util.hashtable();
    this.boxcolors = new util.hashtable();
    
    for (var k in defobj) {
      if (this.colors.has(k) || this.boxcolors.has(k))
        continue;
      
      var c = defobj[k];
      if (c instanceof BoxColor) {
        this.boxcolors.set(k, c);
      } else {
        this.colors.set(k, c);
      }
    }
    
    this.flat_colors = new Array();
  }
  
  patch(ColorTheme newtheme) {
    if (newtheme == undefined) 
      return;
    
    var ks = new util.set(newtheme.colors.keys()).union(newtheme.boxcolors.keys());
    
    for (var k of this.colors) {
      if (!ks.has(k)) {
        newtheme.colors.set(k, this.colors.get(k));
      }
    }
    
    for (var k of this.boxcolors) {
      if (!ks.has(k)) {
        newtheme.boxcolors.set(k, this.boxcolors.get(k));
      }
    }
  }
  
  gen_code() : String {
    var s = "new ColorTheme({\n";
    var arr = this.flat_colors;
    
    for (var i=0; i<arr.length; i++) {
      var item = arr[i];
      
      if (i > 0)
        s += ",";
      s += "\n";
      
      if (item[1] instanceof BoxWColor) {
        s += '  "'+item[0]+'" : ui_weight_clr('
        s += JSON.stringify(item[1].color);
        s += ","
        s += JSON.stringify(item[1].weights);
        s += ")"
      } else if (item[1] instanceof BoxColor4) {
        s += '  "'+item[0]+'" : new BoxColor4('
        s += JSON.stringify(item[1].colors);
        s += ")"
      } else {
        s += '  "'+item[0]+'" : ' + JSON.stringify(item[1]);
      }
    }
    
    s += "});"
    
    return s;
  }
  
  gen_colors() : ObjectMap {
    var ret = {};
    
    //used to communicate with the data api
    this.flat_colors = new Array();
    
    for (var k of this.colors) {
      var c1 = this.colors.get(k), c2 = [0, 0, 0, 0];
      
      for (var i=0; i<4; i++) {
        c2[i] = c1[i];
      }
      ret[k] = c2;
      this.flat_colors.push([k, c1]);
    }
    
    for (var k of this.boxcolors) {
      ret[k] = this.boxcolors.get(k).colors;
      this.flat_colors.push([k, this.boxcolors.get(k)]);
    }
    
    return ret;
  }
  
  static fromSTRUCT(reader) {
    var c = new ColorTheme({});
    reader(c);
    
    var ks = c.colorkeys;
    for (var i=0; i<ks.length; i++) {
      c.colors.set(ks[i], c.colorvals[i]);
    }
    
    var ks = c.boxkeys;
    for (var i=0; i<ks.length; i++) {
      c.boxcolors.set(ks[i], c.boxvals[i]);
    }
    
    delete c.colorkeys;
    delete c.boxkeys;
    delete c.colorvals;
    delete c.boxvals;
    
    return c;
  }
}

//XXX
if (window.IsMobile == undefined) 
  window.IsMobile = false;

window.menu_text_size = window.IsMobile ? 14 : 10;
window.default_ui_font_size = 16;
window.ui_hover_time = 800;
//var view2d_bg = [0.6, 0.6, 0.9, 1.0];

export var View2DTheme = new ColorTheme({
  Background   : [1, 1, 1, 1],
  ActiveObject : [0.8, 0.6, 0.3, 1.0],
  "Selection"    : [0.699999988079071,0.4000000059604645,0.10000000149011612,1],
  "GridLineBold" : [0.38, 0.38, 0.38, 1.0],
  "GridLine"     : [0.5, 0.5, 0.5, 1.0],
  "AxisX" : [0.9, 0.0, 0.0, 1.0],
  "AxisY" : [0.0, 0.9, 0.0, 1.0],
  "AxisZ" : [0.0, 0.0, 0.9, 1.0]
});

export function ui_weight_clr(clr, weights) {
  return new BoxWColor(clr, weights);
}

var lighten = darken
window.UITheme = new ColorTheme({
  "Box"         : ui_weight_clr([1.0, 0.765, 0.6, 0.9], [0.85, 0.9, 1.0, 1.0]),
  "DisabledBox" : [0.2, 0.2, 0.2, 1.0],
  "HoverHint"   : ui_weight_clr([0.85, 0.85, 0.85, 0.9], [0.9, 0.9, 1.0, 1.0]),
  "ErrorBox"    : ui_weight_clr([1.0, 0.3, 0.2, 0.9], [0.7, 0.8, 1.05, 1.05]),
  "ErrorText"   : [1.0, 0.2, 0.2, 1.0],
  "ErrorTextBG" : ui_weight_clr([1.0, 1.0, 1.0, 1.0], [0.9, 0.9, 1.0, 1.0]),
  "ShadowBox"   : ui_weight_clr([0.0, 0.0, 0.0, 0.1], [1.0, 1.0, 1.0, 1.0]),
  "ProgressBar" : ui_weight_clr([0.4, 0.73, 0.9, 0.9], [0.75, 0.75, 1.0, 1.0]),
  "ProgressBarBG" : ui_weight_clr([0.7, 0.7, 0.7, 0.7], [1.0, 1.0, 1.0, 1.0]),
  "WarningBox": ui_weight_clr([1.0, 0.8, 0.1, 0.9], [0.7, 0.8, 1.05, 1.05]),
  "ListBoxBG": ui_weight_clr([0.9, 0.9, 0.9, 0.9], [1.0, 1.0, 1.0, 1.0]),
  "ListBoxText": [0.2, 0.2, 0.2, 1.0], //[1.0, 0.75, 0.21, 0.875]
  "InvBox": ui_weight_clr([1.0, 0.6, 0.4, 0.9], [0.7, 0.7, 0.7, 0.7]),
  "HLightBox": ui_weight_clr([1.0, 0.865, 0.67, 0.9], [0.85, 0.85, 1.0, 1.0]),
  "Highlight": [1.0, 0.75, 0.21, 1],
  "MenuBorder" : [0.65,0.65,0.65,1],
  "MenuHighlight": [1.0, 1, 1, 1],
  "ActivePanel" : ui_weight_clr([0.8, 0.4, 0.3, 0.9], [1.0, 1.0, 1.0, 1.0]),
  "CollapsingPanel" : ui_weight_clr([0.7, 0.7, 0.7, 0.5], [1.0, 1.0, 1.0, 1.0]),
  "SimpleBox": ui_weight_clr([0.5, 0.5, 0.5, 0.4], [1.0, 1.0, 1.0, 1.0]),
  "DialogBox": ui_weight_clr([0.9, 0.9, 0.9, 0.9], [1.0, 1.0, 1.0, 1.0]),
  "DialogTitle": ui_weight_clr([0.7, 0.7, 0.7, 0.9], [1.0, 1.0, 1.0, 1.0]),
  "MenuBox": ui_weight_clr([1, 1, 1, 1], [1, 1, 1, 1]),
  "RadialMenu": [0.85, 0.65, 0.35, 0.8],
  "RadialMenuHighlight" : [0.85, 0.85, 0.85, 0.5],
  "DefaultLine" : [0.2, 0.2, 0.2, 1.0],
  "SelectLine" : [0.7, 0.7, 0.7, 1.0],
  "Check" : [0.9, 0.7, 0.4, 1],
  "Arrow" : [0.4, 0.4, 0.4, 1],
  "DefaultText" : [0.2, 0.2, 0.2, 1.0],
  "BoxText" : [0.2, 0.2, 0.2, 1.0],
  "DialogText" : [0.2, 0.2, 0.2, 1.0],
  "PanelText" : [0.2, 0.2, 0.2, 1.0],
  "HotkeyText" : [0.4, 0.4, 0.4, 0.9],
  "HighlightCursor" : [0.9, 0.9, 0.9, 0.875],
  "TextSelect" : [0.4, 0.4, 0.4, 0.75],
  "TextEditCursor" : [0.1, 0.1, 0.1, 1.0],
  "TextBox": ui_weight_clr([0.8, 0.8, 0.8, 0.9], [1, 1, 1, 1]),
  "TextBoxHighlight": [0.9, 0.9, 0.9, 1.0],
  "TextBoxInv": ui_weight_clr([0.7, 0.7, 0.7, 1.0], [0.7, 0.7, 0.7, 1.0]),
  "MenuSep" : [0.1, 0.2, 0.2, 1.0],
  "RadialMenuSep" : [0.1, 0.2, 0.2, 1.0],
  "MenuLabel" : ui_weight_clr([0.6, 0.6, 0.6, 0.9], [0.6, 0.6, 0.6, 0.9]),
  "MenuLabelInv" : ui_weight_clr([0.75, 0.75, 0.75, 0.9], [1, 1, 0.9, 0.9]),
  "TabPanelOutline" : [0.225, 0.225, 0.225, 0.8],
  "ScrollBG" : ui_weight_clr([0.8, 0.8, 0.8, 1.0], [1, 1, 1, 1]),
  "ScrollBar" : ui_weight_clr([0.6, 0.6, 0.6, 1.0], [1, 1, 1, 1]),
  "ScrollBarHigh" : ui_weight_clr([0.4, 0.4, 0.4, 1.0], [1, 1, 1, 1]),
  "ScrollButton" : ui_weight_clr([0.8, 0.8, 0.8, 1.0], [1, 1, 1, 1]),
  "ScrollButtonHigh" : ui_weight_clr([0.75, 0.75, 0.75, 1.0], [1, 1, 1, 1]),
  "ScrollInv" : ui_weight_clr([0.4, 0.4, 0.4, 1.0], [1, 1, 1, 1]),
  "TabText" : [0.77, 0.77, 0.77, 1.0],
  "MenuText" : [0.1, 0.1, 0.1, 1.0],
  "MenuTextHigh" : [0.9, 0.9, 0.9, 1.0],
  "IconBox" : [0.8, 0.8, 0.8, 0.0],
  "HighlightTab" : [1.0, 0.865, 0.67, 0.9],
  "HighlightIcon" : [1.0, 0.85, 0.3, 0.5],
  "IconInv" : ui_weight_clr([0.4, 0.4, 0.4, 0.4], [1, 1, 1, 1])
});

//globals
window.uicolors = {};
window.colors3d = {};

export class Theme {
  constructor(ui, view2d) {
    this.ui = ui;
    this.view2d = view2d;
  }

  patch(theme) {
    this.ui.patch(theme.ui);
    //this.view2d.patch(theme.view2d);
  }
  
  gen_code() {
    var s = '"use strict";\n/*auto-generated file*/\nvar UITheme = ' + this.ui.gen_code() + "\n" 
    //s += "var View2DTheme = " + this.view2d.gen_code() + "\n";
    
    return s;
  }
  
  static fromSTRUCT(reader) {
    var ret = new Theme();
    reader(ret);
    
    return ret;
  }
  
  //gen_globals_from_flat() {
    //uicolors = this.ui.gen_colors();
    //colors3d = this.view2d.gen_colors();
  //}
  
  gen_globals() {
    global uicolors, colors3d;
    
    uicolors = this.ui.gen_colors();
    //colors3d = this.view2d.gen_colors();
  }
}

//globals
global g_theme;
window.init_theme = function() {
  window.g_theme = new Theme(window.UITheme, View2DTheme);
  window.g_theme.gen_globals();
}
