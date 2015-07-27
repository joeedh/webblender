es6_module_define('startup', ["appstate", "util", "theme", "polyfill", "sdna", "data_api"], function _startup_module(_es6_module) {
  "use strict";
  es6_import(_es6_module, 'polyfill');
  var util=es6_import(_es6_module, 'util');
  var init_data_api=es6_import_item(_es6_module, 'data_api', 'init_data_api');
  window.IsMobile = false;
  window.DEBUG = {}
  es6_import(_es6_module, 'theme');
  es6_import(_es6_module, 'appstate');
  var init_sdna=es6_import_item(_es6_module, 'sdna', 'init_sdna');
  function start() {
    init_theme();
    init_sdna();
    init_data_api();
    G.startup();
    G.load_default_file();
    var last_tick=util.time_ms();
    var tick_event={type: "tick"}
    window.setInterval(function() {
      if (util.time_ms()-last_tick<200) {
          return ;
      }
      last_tick = util.time_ms();
      if (G.event_manager!=undefined) {
          G.event_manager.fireEvent(tick_event);
      }
    }, 10);
  }
  start = _es6_module.add_export('start', start);
});
es6_module_define('config_defines', [], function _config_defines_module(_es6_module) {
});
es6_module_define('icon_enum', [], function _icon_enum_module(_es6_module) {
  "use strict";
  window.Icons = {SCALE: 0, TRANSLATE: 1, ROTATE: 2, HELP_PICKER: 3, UNDO: 4, REDO: 5, CIRCLE_SEL: 6, BACKSPACE: 7, LEFT_ARROW: 8, RIGHT_ARROW: 9, UI_EXPAND: 10, UI_COLLAPSE: 11, FILTER_SEL_OPS: 12, SCROLL_DOWN: 13, SCROLL_UP: 14, NOTE_EXCL: 15, TINY_X: 16, FOLDER: 17, FILE: 18, SMALL_PLUS: 19, SMALL_MINUS: 20, MAKE_SEGMENT: 21, MAKE_POLYGON: 22}
});
es6_module_define('courier', [], function _courier_module(_es6_module) {
  "use strict";
  var font_info={size: [256, 256], cellsize: [16, 16], glyphs: {32: {size: [0.0, 0.0], bearing: [0.0, 0.0], advance: 10.0, cellpos: [0, 0], bitmap_size: [0, 0]}, 33: {size: [3.0, 11.0], bearing: [4.0, 11.0], advance: 10.0, cellpos: [16, 0], bitmap_size: [3, 11]}, 34: {size: [5.0, 5.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [32, 0], bitmap_size: [5, 5]}, 35: {size: [8.0, 12.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [48, 0], bitmap_size: [8, 12]}, 36: {size: [6.0, 13.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [64, 0], bitmap_size: [6, 13]}, 37: {size: [7.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [80, 0], bitmap_size: [7, 11]}, 38: {size: [7.0, 9.0], bearing: [2.0, 9.0], advance: 10.0, cellpos: [96, 0], bitmap_size: [7, 9]}, 39: {size: [3.0, 5.0], bearing: [4.0, 11.0], advance: 10.0, cellpos: [112, 0], bitmap_size: [3, 5]}, 40: {size: [3.0, 13.0], bearing: [5.0, 11.0], advance: 10.0, cellpos: [128, 0], bitmap_size: [3, 13]}, 41: {size: [3.0, 13.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [144, 0], bitmap_size: [3, 13]}, 42: {size: [7.0, 7.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [160, 0], bitmap_size: [7, 7]}, 43: {size: [9.0, 9.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [176, 0], bitmap_size: [9, 9]}, 44: {size: [3.0, 5.0], bearing: [3.0, 3.0], advance: 10.0, cellpos: [192, 0], bitmap_size: [3, 5]}, 45: {size: [7.0, 1.0], bearing: [1.0, 5.0], advance: 10.0, cellpos: [208, 0], bitmap_size: [7, 1]}, 46: {size: [3.0, 2.0], bearing: [4.0, 2.0], advance: 10.0, cellpos: [224, 0], bitmap_size: [3, 2]}, 47: {size: [9.0, 13.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [240, 0], bitmap_size: [9, 13]}, 48: {size: [7.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [0, 16], bitmap_size: [7, 11]}, 49: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [16, 16], bitmap_size: [8, 12]}, 50: {size: [7.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [32, 16], bitmap_size: [7, 11]}, 51: {size: [7.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [48, 16], bitmap_size: [7, 11]}, 52: {size: [9.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [64, 16], bitmap_size: [9, 11]}, 53: {size: [7.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [80, 16], bitmap_size: [7, 11]}, 54: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [96, 16], bitmap_size: [8, 11]}, 55: {size: [6.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [112, 16], bitmap_size: [6, 11]}, 56: {size: [6.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [128, 16], bitmap_size: [6, 11]}, 57: {size: [6.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [144, 16], bitmap_size: [6, 11]}, 58: {size: [2.0, 8.0], bearing: [4.0, 8.0], advance: 10.0, cellpos: [160, 16], bitmap_size: [2, 8]}, 59: {size: [3.0, 9.0], bearing: [3.0, 8.0], advance: 10.0, cellpos: [176, 16], bitmap_size: [3, 9]}, 60: {size: [8.0, 11.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [192, 16], bitmap_size: [8, 11]}, 61: {size: [8.0, 4.0], bearing: [1.0, 7.0], advance: 10.0, cellpos: [208, 16], bitmap_size: [8, 4]}, 62: {size: [8.0, 11.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [224, 16], bitmap_size: [8, 11]}, 63: {size: [6.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [240, 16], bitmap_size: [6, 10]}, 64: {size: [7.0, 13.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [0, 32], bitmap_size: [7, 13]}, 65: {size: [10.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [16, 32], bitmap_size: [10, 10]}, 66: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [32, 32], bitmap_size: [8, 10]}, 67: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [48, 32], bitmap_size: [8, 10]}, 68: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [64, 32], bitmap_size: [9, 10]}, 69: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [80, 32], bitmap_size: [8, 10]}, 70: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [96, 32], bitmap_size: [8, 10]}, 71: {size: [9.0, 11.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [112, 32], bitmap_size: [9, 11]}, 72: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [128, 32], bitmap_size: [9, 10]}, 73: {size: [7.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [144, 32], bitmap_size: [7, 10]}, 74: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [160, 32], bitmap_size: [8, 10]}, 75: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [176, 32], bitmap_size: [9, 10]}, 76: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [192, 32], bitmap_size: [8, 10]}, 77: {size: [10.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [208, 32], bitmap_size: [10, 10]}, 78: {size: [8.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [224, 32], bitmap_size: [8, 10]}, 79: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [240, 32], bitmap_size: [9, 10]}, 80: {size: [7.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [0, 48], bitmap_size: [7, 10]}, 81: {size: [9.0, 13.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [16, 48], bitmap_size: [9, 13]}, 82: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [32, 48], bitmap_size: [9, 10]}, 83: {size: [6.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [48, 48], bitmap_size: [6, 10]}, 84: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [64, 48], bitmap_size: [9, 10]}, 85: {size: [8.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [80, 48], bitmap_size: [8, 10]}, 86: {size: [10.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [96, 48], bitmap_size: [10, 10]}, 87: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [112, 48], bitmap_size: [9, 10]}, 88: {size: [9.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [128, 48], bitmap_size: [9, 10]}, 89: {size: [9.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [144, 48], bitmap_size: [9, 10]}, 90: {size: [6.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [160, 48], bitmap_size: [6, 10]}, 91: {size: [3.0, 13.0], bearing: [5.0, 11.0], advance: 10.0, cellpos: [176, 48], bitmap_size: [3, 13]}, 92: {size: [9.0, 13.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [192, 48], bitmap_size: [9, 13]}, 93: {size: [3.0, 13.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [208, 48], bitmap_size: [3, 13]}, 94: {size: [7.0, 5.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [224, 48], bitmap_size: [7, 5]}, 95: {size: [10.0, 1.0], bearing: [0.0, -4.0], advance: 10.0, cellpos: [240, 48], bitmap_size: [10, 1]}, 96: {size: [3.0, 3.0], bearing: [4.0, 11.0], advance: 10.0, cellpos: [0, 64], bitmap_size: [3, 3]}, 97: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [16, 64], bitmap_size: [8, 8]}, 98: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [32, 64], bitmap_size: [8, 11]}, 99: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [48, 64], bitmap_size: [8, 8]}, 100: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [64, 64], bitmap_size: [8, 11]}, 101: {size: [9.0, 9.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [80, 64], bitmap_size: [9, 9]}, 102: {size: [7.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [96, 64], bitmap_size: [7, 11]}, 103: {size: [8.0, 11.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [112, 64], bitmap_size: [8, 11]}, 104: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [128, 64], bitmap_size: [8, 11]}, 105: {size: [7.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [144, 64], bitmap_size: [7, 12]}, 106: {size: [6.0, 15.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [160, 64], bitmap_size: [6, 15]}, 107: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [176, 64], bitmap_size: [8, 11]}, 108: {size: [7.0, 11.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [192, 64], bitmap_size: [7, 11]}, 109: {size: [9.0, 8.0], bearing: [0.0, 8.0], advance: 10.0, cellpos: [208, 64], bitmap_size: [9, 8]}, 110: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [224, 64], bitmap_size: [8, 8]}, 111: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [240, 64], bitmap_size: [8, 8]}, 112: {size: [8.0, 11.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [0, 80], bitmap_size: [8, 11]}, 113: {size: [8.0, 11.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [16, 80], bitmap_size: [8, 11]}, 114: {size: [7.0, 8.0], bearing: [2.0, 8.0], advance: 10.0, cellpos: [32, 80], bitmap_size: [7, 8]}, 115: {size: [7.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [48, 80], bitmap_size: [7, 8]}, 116: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [64, 80], bitmap_size: [8, 10]}, 117: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [80, 80], bitmap_size: [8, 8]}, 118: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [96, 80], bitmap_size: [8, 8]}, 119: {size: [11.0, 8.0], bearing: [0.0, 8.0], advance: 10.0, cellpos: [112, 80], bitmap_size: [11, 8]}, 120: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [128, 80], bitmap_size: [8, 8]}, 121: {size: [10.0, 11.0], bearing: [0.0, 8.0], advance: 10.0, cellpos: [144, 80], bitmap_size: [10, 11]}, 122: {size: [8.0, 8.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [160, 80], bitmap_size: [8, 8]}, 123: {size: [3.0, 13.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [176, 80], bitmap_size: [3, 13]}, 124: {size: [1.0, 13.0], bearing: [5.0, 11.0], advance: 10.0, cellpos: [192, 80], bitmap_size: [1, 13]}, 125: {size: [3.0, 13.0], bearing: [4.0, 11.0], advance: 10.0, cellpos: [208, 80], bitmap_size: [3, 13]}, 126: {size: [7.0, 3.0], bearing: [1.0, 6.0], advance: 10.0, cellpos: [224, 80], bitmap_size: [7, 3]}, 160: {size: [0.0, 0.0], bearing: [0.0, 0.0], advance: 10.0, cellpos: [240, 80], bitmap_size: [0, 0]}, 161: {size: [3.0, 11.0], bearing: [4.0, 8.0], advance: 10.0, cellpos: [0, 96], bitmap_size: [3, 11]}, 162: {size: [6.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [16, 96], bitmap_size: [6, 10]}, 163: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [32, 96], bitmap_size: [8, 10]}, 164: {size: [8.0, 8.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [48, 96], bitmap_size: [8, 8]}, 165: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [64, 96], bitmap_size: [9, 10]}, 166: {size: [1.0, 13.0], bearing: [5.0, 11.0], advance: 10.0, cellpos: [80, 96], bitmap_size: [1, 13]}, 167: {size: [8.0, 11.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [96, 96], bitmap_size: [8, 11]}, 168: {size: [5.0, 1.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [112, 96], bitmap_size: [5, 1]}, 169: {size: [10.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [128, 96], bitmap_size: [10, 10]}, 170: {size: [5.0, 5.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [144, 96], bitmap_size: [5, 5]}, 171: {size: [10.0, 9.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [160, 96], bitmap_size: [10, 9]}, 172: {size: [9.0, 5.0], bearing: [0.0, 6.0], advance: 10.0, cellpos: [176, 96], bitmap_size: [9, 5]}, 173: {size: [7.0, 1.0], bearing: [1.0, 5.0], advance: 10.0, cellpos: [192, 96], bitmap_size: [7, 1]}, 174: {size: [10.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [208, 96], bitmap_size: [10, 10]}, 175: {size: [10.0, 1.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [224, 96], bitmap_size: [10, 1]}, 176: {size: [5.0, 5.0], bearing: [3.0, 12.0], advance: 10.0, cellpos: [240, 96], bitmap_size: [5, 5]}, 177: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [0, 112], bitmap_size: [9, 10]}, 178: {size: [4.0, 6.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [16, 112], bitmap_size: [4, 6]}, 179: {size: [4.0, 6.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [32, 112], bitmap_size: [4, 6]}, 180: {size: [3.0, 3.0], bearing: [4.0, 11.0], advance: 10.0, cellpos: [48, 112], bitmap_size: [3, 3]}, 181: {size: [8.0, 11.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [64, 112], bitmap_size: [8, 11]}, 182: {size: [8.0, 12.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [80, 112], bitmap_size: [8, 12]}, 183: {size: [2.0, 2.0], bearing: [6.0, 7.0], advance: 10.0, cellpos: [96, 112], bitmap_size: [2, 2]}, 184: {size: [3.0, 4.0], bearing: [4.0, 0.0], advance: 10.0, cellpos: [112, 112], bitmap_size: [3, 4]}, 185: {size: [5.0, 6.0], bearing: [3.0, 11.0], advance: 10.0, cellpos: [128, 112], bitmap_size: [5, 6]}, 186: {size: [5.0, 5.0], bearing: [2.0, 11.0], advance: 10.0, cellpos: [144, 112], bitmap_size: [5, 5]}, 187: {size: [9.0, 9.0], bearing: [0.0, 8.0], advance: 10.0, cellpos: [160, 112], bitmap_size: [9, 9]}, 188: {size: [11.0, 11.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [176, 112], bitmap_size: [11, 11]}, 189: {size: [10.0, 11.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [192, 112], bitmap_size: [10, 11]}, 190: {size: [10.0, 11.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [208, 112], bitmap_size: [10, 11]}, 191: {size: [6.0, 11.0], bearing: [2.0, 8.0], advance: 10.0, cellpos: [224, 112], bitmap_size: [6, 11]}, 192: {size: [10.0, 14.0], bearing: [0.0, 14.0], advance: 10.0, cellpos: [240, 112], bitmap_size: [10, 14]}, 193: {size: [10.0, 14.0], bearing: [0.0, 14.0], advance: 10.0, cellpos: [0, 128], bitmap_size: [10, 14]}, 194: {size: [10.0, 14.0], bearing: [0.0, 14.0], advance: 10.0, cellpos: [16, 128], bitmap_size: [10, 14]}, 195: {size: [10.0, 13.0], bearing: [0.0, 13.0], advance: 10.0, cellpos: [32, 128], bitmap_size: [10, 13]}, 196: {size: [10.0, 12.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [48, 128], bitmap_size: [10, 12]}, 197: {size: [10.0, 15.0], bearing: [0.0, 15.0], advance: 10.0, cellpos: [64, 128], bitmap_size: [10, 15]}, 198: {size: [9.0, 10.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [80, 128], bitmap_size: [9, 10]}, 199: {size: [8.0, 14.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [96, 128], bitmap_size: [8, 14]}, 200: {size: [8.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [112, 128], bitmap_size: [8, 14]}, 201: {size: [8.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [128, 128], bitmap_size: [8, 14]}, 202: {size: [8.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [144, 128], bitmap_size: [8, 14]}, 203: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [160, 128], bitmap_size: [8, 12]}, 204: {size: [7.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [176, 128], bitmap_size: [7, 14]}, 205: {size: [7.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [192, 128], bitmap_size: [7, 14]}, 206: {size: [7.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [208, 128], bitmap_size: [7, 14]}, 207: {size: [7.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [224, 128], bitmap_size: [7, 12]}, 208: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [240, 128], bitmap_size: [8, 10]}, 209: {size: [8.0, 13.0], bearing: [2.0, 13.0], advance: 10.0, cellpos: [0, 144], bitmap_size: [8, 13]}, 210: {size: [9.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [16, 144], bitmap_size: [9, 14]}, 211: {size: [9.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [32, 144], bitmap_size: [9, 14]}, 212: {size: [9.0, 14.0], bearing: [1.0, 14.0], advance: 10.0, cellpos: [48, 144], bitmap_size: [9, 14]}, 213: {size: [9.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [64, 144], bitmap_size: [9, 13]}, 214: {size: [9.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [80, 144], bitmap_size: [9, 12]}, 215: {size: [8.0, 8.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [96, 144], bitmap_size: [8, 8]}, 216: {size: [10.0, 12.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [112, 144], bitmap_size: [10, 12]}, 217: {size: [8.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [128, 144], bitmap_size: [8, 14]}, 218: {size: [8.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [144, 144], bitmap_size: [8, 14]}, 219: {size: [8.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [160, 144], bitmap_size: [8, 14]}, 220: {size: [8.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [176, 144], bitmap_size: [8, 12]}, 221: {size: [9.0, 14.0], bearing: [2.0, 14.0], advance: 10.0, cellpos: [192, 144], bitmap_size: [9, 14]}, 222: {size: [7.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [208, 144], bitmap_size: [7, 10]}, 223: {size: [7.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [224, 144], bitmap_size: [7, 11]}, 224: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [240, 144], bitmap_size: [8, 12]}, 225: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [0, 160], bitmap_size: [8, 12]}, 226: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [16, 160], bitmap_size: [8, 12]}, 227: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [32, 160], bitmap_size: [8, 11]}, 228: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [48, 160], bitmap_size: [8, 10]}, 229: {size: [8.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [64, 160], bitmap_size: [8, 13]}, 230: {size: [9.0, 8.0], bearing: [0.0, 8.0], advance: 10.0, cellpos: [80, 160], bitmap_size: [9, 8]}, 231: {size: [8.0, 12.0], bearing: [1.0, 8.0], advance: 10.0, cellpos: [96, 160], bitmap_size: [8, 12]}, 232: {size: [9.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [112, 160], bitmap_size: [9, 12]}, 233: {size: [9.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [128, 160], bitmap_size: [9, 12]}, 234: {size: [9.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [144, 160], bitmap_size: [9, 12]}, 235: {size: [9.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [160, 160], bitmap_size: [9, 10]}, 236: {size: [7.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [176, 160], bitmap_size: [7, 12]}, 237: {size: [7.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [192, 160], bitmap_size: [7, 12]}, 238: {size: [7.0, 12.0], bearing: [2.0, 12.0], advance: 10.0, cellpos: [208, 160], bitmap_size: [7, 12]}, 239: {size: [7.0, 10.0], bearing: [2.0, 10.0], advance: 10.0, cellpos: [224, 160], bitmap_size: [7, 10]}, 240: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [240, 160], bitmap_size: [8, 11]}, 241: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [0, 176], bitmap_size: [8, 11]}, 242: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [16, 176], bitmap_size: [8, 12]}, 243: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [32, 176], bitmap_size: [8, 12]}, 244: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [48, 176], bitmap_size: [8, 12]}, 245: {size: [8.0, 11.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [64, 176], bitmap_size: [8, 11]}, 246: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [80, 176], bitmap_size: [8, 10]}, 247: {size: [8.0, 7.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [96, 176], bitmap_size: [8, 7]}, 248: {size: [9.0, 10.0], bearing: [0.0, 9.0], advance: 10.0, cellpos: [112, 176], bitmap_size: [9, 10]}, 249: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [128, 176], bitmap_size: [8, 12]}, 250: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [144, 176], bitmap_size: [8, 12]}, 251: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [160, 176], bitmap_size: [8, 12]}, 252: {size: [8.0, 10.0], bearing: [1.0, 10.0], advance: 10.0, cellpos: [176, 176], bitmap_size: [8, 10]}, 253: {size: [10.0, 15.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [192, 176], bitmap_size: [10, 15]}, 254: {size: [8.0, 14.0], bearing: [1.0, 11.0], advance: 10.0, cellpos: [208, 176], bitmap_size: [8, 14]}, 255: {size: [10.0, 13.0], bearing: [0.0, 10.0], advance: 10.0, cellpos: [224, 176], bitmap_size: [10, 13]}}}
});
es6_module_define('dialog', ["UICanvas2D", "UIElement", "toolsystem", "UITextBox", "UIWidgets", "UIPack", "UIFrame", "UIWidgets_special"], function _dialog_module(_es6_module) {
  var DialogFlags={MODAL: 1, END_ON_ESCAPE: 2, DEFAULT: 2}
  DialogFlags = _es6_module.add_export('DialogFlags', DialogFlags);
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var UITextBox=es6_import_item(_es6_module, 'UITextBox', 'UITextBox');
  var ToolOp=es6_import_item(_es6_module, 'toolsystem', 'ToolOp');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var UICollapseIcon=es6_import_item(_es6_module, 'UIWidgets_special', 'UICollapseIcon');
  var UIPanel=es6_import_item(_es6_module, 'UIWidgets_special', 'UIPanel');
  var UIColorField=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorField');
  var UIColorBox=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorBox');
  var UIColorPicker=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorPicker');
  var UIProgressBar=es6_import_item(_es6_module, 'UIWidgets_special', 'UIProgressBar');
  var UIListBox=es6_import_item(_es6_module, 'UIWidgets_special', 'UIListBox');
  var UIListEntry=es6_import_item(_es6_module, 'UIWidgets_special', 'UIListEntry');
  var UICanvas=es6_import_item(_es6_module, 'UICanvas2D', 'UICanvas');
  function _TitleBar(ctx) {
    UIElement.call(this, ctx);
    this.text = "";
    this.moving = false;
    this.start_mpos = [0, 0];
  }
  /*test for IE bug*/;
  if (_TitleBar.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        _TitleBar.name = '_TitleBar';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  _TitleBar = inherit_multiple(_TitleBar, [UIElement], _es6_module, "_TitleBar");
  _TitleBar.prototype.build_draw = function(canvas, isVertical) {
    canvas.simple_box([0, 0], this.size, uicolors["DialogTitle"]);
    var tsize=canvas.textsize(this.text);
    canvas.text([12, (this.size[1]-tsize[1])*0.5], this.text, uicolors["DialogText"], 12.0);
  }
  _TitleBar.prototype.on_mousedown = function(event) {
    this.push_modal(this);
    this.moving = true;
    this.start_mpos = [event.x, event.y];
  }
  _TitleBar.prototype.on_mousemove = function(event) {
    if (this.moving) {
        this.parent.pos[0]+=event.x-this.start_mpos[0];
        this.parent.pos[1]+=event.y-this.start_mpos[1];
        this.parent.do_full_recalc();
    }
  }
  _TitleBar.prototype.on_mouseup = function(event) {
    this.pop_modal();
    this.moving = false;
  }
  _es6_module.add_class(_TitleBar);
  function Dialog(title, ctx, screen, flag) {
    UIFrame.call(this, ctx, screen.canvas);
    this.title = title;
    this.screen = screen;
    this.headersize = 33;
    this.callback = undefined;
    if (flag==undefined)
      this.flag = DialogFlags.DEFAULT;
    else 
      this.flag = flag;
    this.subframe = new UIFrame(ctx, screen.canvas);
    this.titlebar = new _TitleBar(ctx);
    this.titlebar.canvas = this.canvas;
    this.add(this.titlebar);
    this.add(this.subframe);
  }
  /*test for IE bug*/;
  if (Dialog.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Dialog.name = 'Dialog';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Dialog = inherit_multiple(Dialog, [UIFrame], _es6_module, "Dialog");
  define_static(Dialog, "cancel_button", function(ctx) {
    var e=new UIButton(ctx, "Cancel");
    e.callback = function(element) {
      var p=element.parent;
      while (p!=undefined&&!(__instance_of(p, Dialog))) {
        p = p.parent;
      }
      if (p==undefined) {
          console.log("Yeek, couldn't find parent dialog in Dialog.cancel_button");
          console.trace();
          return ;
      }
      p.end(true);
    }
    return e;
  });
  define_static(Dialog, "okay_button", function(ctx) {
    var e=new UIButton(ctx, "Okay");
    e.callback = function(element) {
      var p=element.parent;
      while (p!=undefined&&!(__instance_of(p, Dialog))) {
        p = p.parent;
      }
      if (p==undefined) {
          console.log("Yeek, couldn't find parent dialog in Dialog.cancel_button");
          console.trace();
          return ;
      }
      p.end(false);
    }
    return e;
  });
  Dialog.prototype.on_draw = function(gl) {
  }
  Dialog.prototype.build_draw = function(canvas, isVertical) {
    canvas = this.canvas;
    if (this.state&UIFlags.IS_CANVAS_ROOT) {
        canvas.clear();
        this.do_full_recalc();
        canvas.push_transform();
        canvas.translate(this.pos);
    }
    canvas.push_scissor([0, 0], this.size);
    this.titlebar.pos = [0, this.size[1]-this.headersize];
    this.titlebar.size = [this.size[0], this.headersize];
    this.titlebar.text = this.title;
    canvas.shadow_box([5, -1], this.size);
    canvas.simple_box([0, 0], this.size, uicolors["DialogBox"]);
    UIFrame.prototype.build_draw.call(this, canvas, isVertical);
    canvas.box_outline([0, 0], this.size, uicolors["DialogBorder"]);
    canvas.pop_scissor();
    if (this.state&UIFlags.IS_CANVAS_ROOT) {
        canvas.pop_transform();
    }
  }
  Dialog.prototype.on_keydown = function(event) {
    UIFrame.prototype.on_keydown.call(this, event);
    if (this.flag&DialogFlags.END_ON_ESCAPE) {
        if (event.keyCode==charmap["Escape"])
          this.end(true);
    }
  }
  Dialog.prototype.call = function(pos, center) {
    if (pos==undefined) {
        pos = undefined;
    }
    if (center==undefined) {
        center = false;
    }
    this.canvas = g_app_state.screen.canvas;
    function visit(c, canvas) {
      c.canvas = canvas;
      if (__instance_of(c, UIFrame)) {
          var __iter_c2=__get_iter(c.children);
          var c2;
          while (1) {
            var __ival_c2=__iter_c2.next();
            if (__ival_c2.done) {
                break;
            }
            c2 = __ival_c2.value;
            visit(c2, canvas);
          }
      }
    }
    visit(this, this.canvas);
    this.pack(this.screen.canvas, false);
    if (pos==undefined) {
        var screen=g_app_state.screen;
        if (center) {
            pos = [screen.size[0]*0.5, screen.size[1]*0.5];
        }
        else {
          pos = [screen.mpos[0], screen.mpos[1]];
          pos[1]-=this.size[1]+20;
        }
    }
    pos[0] = Math.min(pos[0]+this.size[0], this.screen.size[0])-this.size[0];
    pos[1] = Math.min(pos[1]+this.size[1], this.screen.size[1])-this.size[1];
    pos[0] = Math.max(pos[0], 0);
    pos[1] = Math.max(pos[1], 0);
    this.pos[0] = pos[0];
    this.pos[1] = pos[1];
    this.screen.add(this);
    if ((this.flag&DialogFlags.MODAL)||this.screen.modalhandler) {
        this.screen.push_modal(this);
    }
    this.titlebar.pos = [0, this.size[1]-this.headersize];
    this.titlebar.size = [this.size[0], this.headersize];
    this.subframe.pos = [0, 0];
    this.subframe.size = [this.size[0], this.size[1]-this.headersize];
    this.titlebar.do_recalc();
    this.subframe.do_recalc();
    this.do_recalc();
  }
  Dialog.prototype.end = function(do_cancel) {
    if (this.flag&DialogFlags.MODAL) {
        this.screen.pop_modal();
    }
    if (this.screen.children.has(this)) {
        this.screen.remove(this);
    }
  }
  _es6_module.add_class(Dialog);
  Dialog = _es6_module.add_export('Dialog', Dialog);
  window.Dialog = Dialog;
  function PackedDialog(title, ctx, screen, flag) {
    Dialog.call(this, title, ctx, screen, flag);
    this.remove(this.subframe);
    this.subframe = new RowFrame(ctx, undefined, PackFlags.ALIGN_BOTTOM|PackFlags.ALIGN_CENTER);
    this.add(this.subframe, PackFlags.INHERIT_WIDTH);
  }
  /*test for IE bug*/;
  if (PackedDialog.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        PackedDialog.name = 'PackedDialog';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  PackedDialog = inherit_multiple(PackedDialog, [Dialog], _es6_module, "PackedDialog");
  PackedDialog.prototype.call = function(pos) {
    this.size = this.subframe.get_min_size(this.canvas);
    this.size[1]+=this.headersize;
    this.size[0]+=15;
    Dialog.prototype.call.call(this, pos);
    this.subframe.pack(this.canvas);
  }
  _es6_module.add_class(PackedDialog);
  PackedDialog = _es6_module.add_export('PackedDialog', PackedDialog);
  function OkayDialog(text, callback) {
    var ctx=new Context();
    var screen=g_app_state.screen;
    var flag=0;
    PackedDialog.call(this, "Okay?", ctx, screen, flag);
    this.callback = callback;
    var col=this.subframe.col();
    col.add(Dialog.okay_button(ctx));
    col.add(Dialog.cancel_button(ctx));
    var l=this.subframe.label(text);
    l.color = uicolors["DialogText"];
  }
  /*test for IE bug*/;
  if (OkayDialog.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        OkayDialog.name = 'OkayDialog';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  OkayDialog = inherit_multiple(OkayDialog, [PackedDialog], _es6_module, "OkayDialog");
  OkayDialog.prototype.end = function(do_cancel) {
    PackedDialog.prototype.end.call(this, do_cancel);
    this.callback(this, do_cancel);
  }
  _es6_module.add_class(OkayDialog);
  OkayDialog = _es6_module.add_export('OkayDialog', OkayDialog);
  function ErrorDialog(text, callback) {
    var ctx=new Context();
    var screen=g_app_state.screen;
    var flag=0;
    PackedDialog.call(this, "Error: ", ctx, screen, flag);
    this.callback = callback;
    var col=this.subframe;
    col.add(Dialog.okay_button(ctx), PackFlags.ALIGN_RIGHT);
    var c=col.label("  "+text+"    ");
    c.color = uicolors["DialogText"];
    c.set_color(uicolors["ErrorText"]);
    c.set_background(uicolors["ErrorTextBG"]);
  }
  /*test for IE bug*/;
  if (ErrorDialog.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ErrorDialog.name = 'ErrorDialog';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ErrorDialog = inherit_multiple(ErrorDialog, [PackedDialog], _es6_module, "ErrorDialog");
  ErrorDialog.prototype.end = function(do_cancel) {
    PackedDialog.prototype.end.call(this, do_cancel);
    if (this.callback!=undefined)
      this.callback(this, do_cancel);
  }
  _es6_module.add_class(ErrorDialog);
  ErrorDialog = _es6_module.add_export('ErrorDialog', ErrorDialog);
  window.Dialog = Dialog;
});
es6_module_define('dialogs', [], function _dialogs_module(_es6_module) {
  "use strict";
});
es6_module_define('DOMUI', [], function _DOMUI_module(_es6_module) {
  "use strict";
});
es6_module_define('font_out', [], function _font_out_module(_es6_module) {
  font_info = {size: [512, 512], cellsize: [32, 32], glyphs: {32: {size: [0.0, 0.0], bearing: [0.0, 0.0], advance: 5.0, cellpos: [0, 0], bitmap_size: [0, 0]}, 33: {size: [2.0, 12.0], bearing: [2.0, 12.0], advance: 6.0, cellpos: [32, 0], bitmap_size: [2, 12]}, 34: {size: [6.0, 5.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [64, 0], bitmap_size: [6, 5]}, 35: {size: [10.0, 13.0], bearing: [0.0, 13.0], advance: 10.0, cellpos: [96, 0], bitmap_size: [10, 13]}, 36: {size: [7.0, 14.0], bearing: [1.0, 13.0], advance: 9.0, cellpos: [128, 0], bitmap_size: [7, 14]}, 37: {size: [16.0, 12.0], bearing: [0.0, 12.0], advance: 16.0, cellpos: [160, 0], bitmap_size: [16, 12]}, 38: {size: [13.0, 12.0], bearing: [1.0, 12.0], advance: 15.0, cellpos: [192, 0], bitmap_size: [13, 12]}, 39: {size: [2.0, 5.0], bearing: [1.0, 12.0], advance: 4.0, cellpos: [224, 0], bitmap_size: [2, 5]}, 40: {size: [5.0, 17.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [256, 0], bitmap_size: [5, 17]}, 41: {size: [5.0, 17.0], bearing: [0.0, 13.0], advance: 6.0, cellpos: [288, 0], bitmap_size: [5, 17]}, 42: {size: [7.0, 8.0], bearing: [1.0, 13.0], advance: 9.0, cellpos: [320, 0], bitmap_size: [7, 8]}, 43: {size: [11.0, 11.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [352, 0], bitmap_size: [11, 11]}, 44: {size: [3.0, 5.0], bearing: [1.0, 2.0], advance: 5.0, cellpos: [384, 0], bitmap_size: [3, 5]}, 45: {size: [4.0, 2.0], bearing: [1.0, 6.0], advance: 6.0, cellpos: [416, 0], bitmap_size: [4, 2]}, 46: {size: [2.0, 2.0], bearing: [1.0, 2.0], advance: 5.0, cellpos: [448, 0], bitmap_size: [2, 2]}, 47: {size: [5.0, 13.0], bearing: [0.0, 13.0], advance: 5.0, cellpos: [480, 0], bitmap_size: [5, 13]}, 48: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [0, 32], bitmap_size: [8, 12]}, 49: {size: [6.0, 12.0], bearing: [1.0, 12.0], advance: 9.0, cellpos: [32, 32], bitmap_size: [6, 12]}, 50: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [64, 32], bitmap_size: [8, 12]}, 51: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [96, 32], bitmap_size: [8, 12]}, 52: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [128, 32], bitmap_size: [8, 12]}, 53: {size: [7.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [160, 32], bitmap_size: [7, 12]}, 54: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [192, 32], bitmap_size: [8, 12]}, 55: {size: [8.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [224, 32], bitmap_size: [8, 13]}, 56: {size: [7.0, 12.0], bearing: [1.0, 12.0], advance: 9.0, cellpos: [256, 32], bitmap_size: [7, 12]}, 57: {size: [8.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [288, 32], bitmap_size: [8, 12]}, 58: {size: [2.0, 9.0], bearing: [1.0, 9.0], advance: 4.0, cellpos: [320, 32], bitmap_size: [2, 9]}, 59: {size: [3.0, 12.0], bearing: [1.0, 9.0], advance: 5.0, cellpos: [352, 32], bitmap_size: [3, 12]}, 60: {size: [10.0, 9.0], bearing: [0.0, 11.0], advance: 11.0, cellpos: [384, 32], bitmap_size: [10, 9]}, 61: {size: [10.0, 4.0], bearing: [0.0, 8.0], advance: 11.0, cellpos: [416, 32], bitmap_size: [10, 4]}, 62: {size: [10.0, 9.0], bearing: [0.0, 11.0], advance: 11.0, cellpos: [448, 32], bitmap_size: [10, 9]}, 63: {size: [7.0, 12.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [480, 32], bitmap_size: [7, 12]}, 64: {size: [16.0, 18.0], bearing: [1.0, 13.0], advance: 17.0, cellpos: [0, 64], bitmap_size: [16, 18]}, 65: {size: [14.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [32, 64], bitmap_size: [14, 12]}, 66: {size: [11.0, 13.0], bearing: [0.0, 13.0], advance: 12.0, cellpos: [64, 64], bitmap_size: [11, 13]}, 67: {size: [11.0, 12.0], bearing: [1.0, 12.0], advance: 13.0, cellpos: [96, 64], bitmap_size: [11, 12]}, 68: {size: [12.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [128, 64], bitmap_size: [12, 12]}, 69: {size: [11.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [160, 64], bitmap_size: [11, 12]}, 70: {size: [10.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [192, 64], bitmap_size: [10, 12]}, 71: {size: [13.0, 12.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [224, 64], bitmap_size: [13, 12]}, 72: {size: [13.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [256, 64], bitmap_size: [13, 12]}, 73: {size: [6.0, 12.0], bearing: [0.0, 12.0], advance: 6.0, cellpos: [288, 64], bitmap_size: [6, 12]}, 74: {size: [7.0, 12.0], bearing: [0.0, 12.0], advance: 7.0, cellpos: [320, 64], bitmap_size: [7, 12]}, 75: {size: [13.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [352, 64], bitmap_size: [13, 12]}, 76: {size: [11.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [384, 64], bitmap_size: [11, 12]}, 77: {size: [16.0, 12.0], bearing: [0.0, 12.0], advance: 16.0, cellpos: [416, 64], bitmap_size: [16, 12]}, 78: {size: [14.0, 13.0], bearing: [-1.0, 12.0], advance: 13.0, cellpos: [448, 64], bitmap_size: [14, 13]}, 79: {size: [12.0, 12.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [480, 64], bitmap_size: [12, 12]}, 80: {size: [10.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [0, 96], bitmap_size: [10, 12]}, 81: {size: [12.0, 16.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [32, 96], bitmap_size: [12, 16]}, 82: {size: [13.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [64, 96], bitmap_size: [13, 12]}, 83: {size: [9.0, 12.0], bearing: [1.0, 12.0], advance: 11.0, cellpos: [96, 96], bitmap_size: [9, 12]}, 84: {size: [12.0, 12.0], bearing: [0.0, 12.0], advance: 12.0, cellpos: [128, 96], bitmap_size: [12, 12]}, 85: {size: [13.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [160, 96], bitmap_size: [13, 12]}, 86: {size: [15.0, 12.0], bearing: [-1.0, 12.0], advance: 13.0, cellpos: [192, 96], bitmap_size: [15, 12]}, 87: {size: [18.0, 12.0], bearing: [0.0, 12.0], advance: 18.0, cellpos: [224, 96], bitmap_size: [18, 12]}, 88: {size: [15.0, 12.0], bearing: [-1.0, 12.0], advance: 13.0, cellpos: [256, 96], bitmap_size: [15, 12]}, 89: {size: [14.0, 12.0], bearing: [0.0, 12.0], advance: 13.0, cellpos: [288, 96], bitmap_size: [14, 12]}, 90: {size: [12.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [320, 96], bitmap_size: [12, 12]}, 91: {size: [4.0, 17.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [352, 96], bitmap_size: [4, 17]}, 92: {size: [5.0, 13.0], bearing: [0.0, 13.0], advance: 5.0, cellpos: [384, 96], bitmap_size: [5, 13]}, 93: {size: [4.0, 17.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [416, 96], bitmap_size: [4, 17]}, 94: {size: [8.0, 8.0], bearing: [0.0, 13.0], advance: 8.0, cellpos: [448, 96], bitmap_size: [8, 8]}, 95: {size: [10.0, 1.0], bearing: [0.0, -3.0], advance: 10.0, cellpos: [480, 96], bitmap_size: [10, 1]}, 96: {size: [3.0, 3.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [0, 128], bitmap_size: [3, 3]}, 97: {size: [7.0, 9.0], bearing: [1.0, 9.0], advance: 8.0, cellpos: [32, 128], bitmap_size: [7, 9]}, 98: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 10.0, cellpos: [64, 128], bitmap_size: [9, 13]}, 99: {size: [7.0, 9.0], bearing: [1.0, 9.0], advance: 9.0, cellpos: [96, 128], bitmap_size: [7, 9]}, 100: {size: [9.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [128, 128], bitmap_size: [9, 13]}, 101: {size: [7.0, 9.0], bearing: [1.0, 9.0], advance: 8.0, cellpos: [160, 128], bitmap_size: [7, 9]}, 102: {size: [8.0, 13.0], bearing: [0.0, 13.0], advance: 6.0, cellpos: [192, 128], bitmap_size: [8, 13]}, 103: {size: [9.0, 13.0], bearing: [0.0, 9.0], advance: 9.0, cellpos: [224, 128], bitmap_size: [9, 13]}, 104: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [256, 128], bitmap_size: [9, 13]}, 105: {size: [4.0, 13.0], bearing: [0.0, 13.0], advance: 4.0, cellpos: [288, 128], bitmap_size: [4, 13]}, 106: {size: [6.0, 17.0], bearing: [-2.0, 13.0], advance: 4.0, cellpos: [320, 128], bitmap_size: [6, 17]}, 107: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [352, 128], bitmap_size: [9, 13]}, 108: {size: [4.0, 13.0], bearing: [0.0, 13.0], advance: 4.0, cellpos: [384, 128], bitmap_size: [4, 13]}, 109: {size: [14.0, 9.0], bearing: [0.0, 9.0], advance: 14.0, cellpos: [416, 128], bitmap_size: [14, 9]}, 110: {size: [9.0, 9.0], bearing: [0.0, 9.0], advance: 9.0, cellpos: [448, 128], bitmap_size: [9, 9]}, 111: {size: [8.0, 9.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [480, 128], bitmap_size: [8, 9]}, 112: {size: [9.0, 13.0], bearing: [0.0, 9.0], advance: 10.0, cellpos: [0, 160], bitmap_size: [9, 13]}, 113: {size: [9.0, 13.0], bearing: [1.0, 9.0], advance: 10.0, cellpos: [32, 160], bitmap_size: [9, 13]}, 114: {size: [6.0, 9.0], bearing: [0.0, 9.0], advance: 6.0, cellpos: [64, 160], bitmap_size: [6, 9]}, 115: {size: [6.0, 9.0], bearing: [1.0, 9.0], advance: 8.0, cellpos: [96, 160], bitmap_size: [6, 9]}, 116: {size: [5.0, 12.0], bearing: [0.0, 12.0], advance: 5.0, cellpos: [128, 160], bitmap_size: [5, 12]}, 117: {size: [9.0, 9.0], bearing: [0.0, 9.0], advance: 9.0, cellpos: [160, 160], bitmap_size: [9, 9]}, 118: {size: [11.0, 9.0], bearing: [-1.0, 9.0], advance: 9.0, cellpos: [192, 160], bitmap_size: [11, 9]}, 119: {size: [15.0, 9.0], bearing: [-1.0, 9.0], advance: 13.0, cellpos: [224, 160], bitmap_size: [15, 9]}, 120: {size: [9.0, 9.0], bearing: [0.0, 9.0], advance: 9.0, cellpos: [256, 160], bitmap_size: [9, 9]}, 121: {size: [11.0, 13.0], bearing: [-1.0, 9.0], advance: 9.0, cellpos: [288, 160], bitmap_size: [11, 13]}, 122: {size: [8.0, 9.0], bearing: [0.0, 9.0], advance: 8.0, cellpos: [320, 160], bitmap_size: [8, 9]}, 123: {size: [6.0, 17.0], bearing: [1.0, 13.0], advance: 9.0, cellpos: [352, 160], bitmap_size: [6, 17]}, 124: {size: [1.0, 17.0], bearing: [1.0, 13.0], advance: 3.0, cellpos: [384, 160], bitmap_size: [1, 17]}, 125: {size: [6.0, 17.0], bearing: [2.0, 13.0], advance: 9.0, cellpos: [416, 160], bitmap_size: [6, 17]}, 126: {size: [9.0, 3.0], bearing: [0.0, 6.0], advance: 10.0, cellpos: [448, 160], bitmap_size: [9, 3]}, 160: {size: [0.0, 0.0], bearing: [0.0, 0.0], advance: 5.0, cellpos: [480, 160], bitmap_size: [0, 0]}, 161: {size: [2.0, 13.0], bearing: [2.0, 9.0], advance: 6.0, cellpos: [0, 192], bitmap_size: [2, 13]}, 162: {size: [7.0, 15.0], bearing: [1.0, 12.0], advance: 9.0, cellpos: [32, 192], bitmap_size: [7, 15]}, 163: {size: [10.0, 12.0], bearing: [0.0, 12.0], advance: 10.0, cellpos: [64, 192], bitmap_size: [10, 12]}, 164: {size: [10.0, 10.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [96, 192], bitmap_size: [10, 10]}, 165: {size: [12.0, 12.0], bearing: [-1.0, 12.0], advance: 10.0, cellpos: [128, 192], bitmap_size: [12, 12]}, 166: {size: [1.0, 17.0], bearing: [1.0, 13.0], advance: 3.0, cellpos: [160, 192], bitmap_size: [1, 17]}, 167: {size: [7.0, 16.0], bearing: [1.0, 12.0], advance: 9.0, cellpos: [192, 192], bitmap_size: [7, 16]}, 168: {size: [5.0, 2.0], bearing: [1.0, 12.0], advance: 7.0, cellpos: [224, 192], bitmap_size: [5, 2]}, 169: {size: [12.0, 12.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [256, 192], bitmap_size: [12, 12]}, 170: {size: [5.0, 6.0], bearing: [0.0, 12.0], advance: 5.0, cellpos: [288, 192], bitmap_size: [5, 6]}, 171: {size: [9.0, 9.0], bearing: [0.0, 9.0], advance: 10.0, cellpos: [320, 192], bitmap_size: [9, 9]}, 172: {size: [10.0, 4.0], bearing: [0.0, 8.0], advance: 11.0, cellpos: [352, 192], bitmap_size: [10, 4]}, 173: {size: [4.0, 2.0], bearing: [1.0, 6.0], advance: 6.0, cellpos: [384, 192], bitmap_size: [4, 2]}, 174: {size: [13.0, 12.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [416, 192], bitmap_size: [13, 12]}, 175: {size: [10.0, 1.0], bearing: [0.0, 15.0], advance: 10.0, cellpos: [448, 192], bitmap_size: [10, 1]}, 176: {size: [6.0, 6.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [480, 192], bitmap_size: [6, 6]}, 177: {size: [9.0, 10.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [0, 224], bitmap_size: [9, 10]}, 178: {size: [5.0, 7.0], bearing: [0.0, 12.0], advance: 6.0, cellpos: [32, 224], bitmap_size: [5, 7]}, 179: {size: [4.0, 7.0], bearing: [0.0, 12.0], advance: 5.0, cellpos: [64, 224], bitmap_size: [4, 7]}, 180: {size: [3.0, 3.0], bearing: [2.0, 13.0], advance: 6.0, cellpos: [96, 224], bitmap_size: [3, 3]}, 181: {size: [10.0, 13.0], bearing: [1.0, 9.0], advance: 11.0, cellpos: [128, 224], bitmap_size: [10, 13]}, 182: {size: [9.0, 16.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [160, 224], bitmap_size: [9, 16]}, 183: {size: [2.0, 2.0], bearing: [2.0, 8.0], advance: 6.0, cellpos: [192, 224], bitmap_size: [2, 2]}, 184: {size: [3.0, 4.0], bearing: [2.0, 0.0], advance: 6.0, cellpos: [224, 224], bitmap_size: [3, 4]}, 185: {size: [3.0, 7.0], bearing: [1.0, 12.0], advance: 6.0, cellpos: [256, 224], bitmap_size: [3, 7]}, 186: {size: [5.0, 6.0], bearing: [0.0, 12.0], advance: 6.0, cellpos: [288, 224], bitmap_size: [5, 6]}, 187: {size: [9.0, 9.0], bearing: [0.0, 9.0], advance: 10.0, cellpos: [320, 224], bitmap_size: [9, 9]}, 188: {size: [14.0, 12.0], bearing: [1.0, 12.0], advance: 15.0, cellpos: [352, 224], bitmap_size: [14, 12]}, 189: {size: [12.0, 12.0], bearing: [1.0, 12.0], advance: 14.0, cellpos: [384, 224], bitmap_size: [12, 12]}, 190: {size: [14.0, 12.0], bearing: [0.0, 12.0], advance: 14.0, cellpos: [416, 224], bitmap_size: [14, 12]}, 191: {size: [7.0, 13.0], bearing: [0.0, 9.0], advance: 8.0, cellpos: [448, 224], bitmap_size: [7, 13]}, 192: {size: [14.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [480, 224], bitmap_size: [14, 16]}, 193: {size: [14.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [0, 256], bitmap_size: [14, 16]}, 194: {size: [14.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [32, 256], bitmap_size: [14, 16]}, 195: {size: [14.0, 15.0], bearing: [0.0, 15.0], advance: 13.0, cellpos: [64, 256], bitmap_size: [14, 15]}, 196: {size: [14.0, 15.0], bearing: [0.0, 15.0], advance: 13.0, cellpos: [96, 256], bitmap_size: [14, 15]}, 197: {size: [14.0, 15.0], bearing: [0.0, 15.0], advance: 13.0, cellpos: [128, 256], bitmap_size: [14, 15]}, 198: {size: [19.0, 12.0], bearing: [-1.0, 12.0], advance: 18.0, cellpos: [160, 256], bitmap_size: [19, 12]}, 199: {size: [11.0, 16.0], bearing: [1.0, 12.0], advance: 13.0, cellpos: [192, 256], bitmap_size: [11, 16]}, 200: {size: [11.0, 16.0], bearing: [0.0, 16.0], advance: 11.0, cellpos: [224, 256], bitmap_size: [11, 16]}, 201: {size: [11.0, 16.0], bearing: [0.0, 16.0], advance: 11.0, cellpos: [256, 256], bitmap_size: [11, 16]}, 202: {size: [11.0, 16.0], bearing: [0.0, 16.0], advance: 11.0, cellpos: [288, 256], bitmap_size: [11, 16]}, 203: {size: [11.0, 15.0], bearing: [0.0, 15.0], advance: 11.0, cellpos: [320, 256], bitmap_size: [11, 15]}, 204: {size: [6.0, 16.0], bearing: [0.0, 16.0], advance: 6.0, cellpos: [352, 256], bitmap_size: [6, 16]}, 205: {size: [6.0, 16.0], bearing: [0.0, 16.0], advance: 6.0, cellpos: [384, 256], bitmap_size: [6, 16]}, 206: {size: [6.0, 16.0], bearing: [0.0, 16.0], advance: 6.0, cellpos: [416, 256], bitmap_size: [6, 16]}, 207: {size: [6.0, 15.0], bearing: [0.0, 15.0], advance: 6.0, cellpos: [448, 256], bitmap_size: [6, 15]}, 208: {size: [13.0, 12.0], bearing: [0.0, 12.0], advance: 14.0, cellpos: [480, 256], bitmap_size: [13, 12]}, 209: {size: [14.0, 16.0], bearing: [-1.0, 15.0], advance: 13.0, cellpos: [0, 288], bitmap_size: [14, 16]}, 210: {size: [12.0, 16.0], bearing: [1.0, 16.0], advance: 14.0, cellpos: [32, 288], bitmap_size: [12, 16]}, 211: {size: [12.0, 16.0], bearing: [1.0, 16.0], advance: 14.0, cellpos: [64, 288], bitmap_size: [12, 16]}, 212: {size: [12.0, 16.0], bearing: [1.0, 16.0], advance: 14.0, cellpos: [96, 288], bitmap_size: [12, 16]}, 213: {size: [12.0, 15.0], bearing: [1.0, 15.0], advance: 14.0, cellpos: [128, 288], bitmap_size: [12, 15]}, 214: {size: [12.0, 15.0], bearing: [1.0, 15.0], advance: 14.0, cellpos: [160, 288], bitmap_size: [12, 15]}, 215: {size: [8.0, 8.0], bearing: [1.0, 10.0], advance: 11.0, cellpos: [192, 288], bitmap_size: [8, 8]}, 216: {size: [12.0, 13.0], bearing: [1.0, 13.0], advance: 14.0, cellpos: [224, 288], bitmap_size: [12, 13]}, 217: {size: [13.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [256, 288], bitmap_size: [13, 16]}, 218: {size: [13.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [288, 288], bitmap_size: [13, 16]}, 219: {size: [13.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [320, 288], bitmap_size: [13, 16]}, 220: {size: [13.0, 15.0], bearing: [0.0, 15.0], advance: 13.0, cellpos: [352, 288], bitmap_size: [13, 15]}, 221: {size: [14.0, 16.0], bearing: [0.0, 16.0], advance: 13.0, cellpos: [384, 288], bitmap_size: [14, 16]}, 222: {size: [10.0, 12.0], bearing: [0.0, 12.0], advance: 11.0, cellpos: [416, 288], bitmap_size: [10, 12]}, 223: {size: [8.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [448, 288], bitmap_size: [8, 13]}, 224: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [480, 288], bitmap_size: [7, 13]}, 225: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [0, 320], bitmap_size: [7, 13]}, 226: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [32, 320], bitmap_size: [7, 13]}, 227: {size: [7.0, 12.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [64, 320], bitmap_size: [7, 12]}, 228: {size: [7.0, 12.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [96, 320], bitmap_size: [7, 12]}, 229: {size: [7.0, 14.0], bearing: [1.0, 14.0], advance: 8.0, cellpos: [128, 320], bitmap_size: [7, 14]}, 230: {size: [11.0, 9.0], bearing: [1.0, 9.0], advance: 13.0, cellpos: [160, 320], bitmap_size: [11, 9]}, 231: {size: [7.0, 13.0], bearing: [1.0, 9.0], advance: 9.0, cellpos: [192, 320], bitmap_size: [7, 13]}, 232: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [224, 320], bitmap_size: [7, 13]}, 233: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [256, 320], bitmap_size: [7, 13]}, 234: {size: [7.0, 13.0], bearing: [1.0, 13.0], advance: 8.0, cellpos: [288, 320], bitmap_size: [7, 13]}, 235: {size: [7.0, 12.0], bearing: [1.0, 12.0], advance: 8.0, cellpos: [320, 320], bitmap_size: [7, 12]}, 236: {size: [4.0, 13.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [352, 320], bitmap_size: [4, 13]}, 237: {size: [4.0, 13.0], bearing: [1.0, 13.0], advance: 6.0, cellpos: [384, 320], bitmap_size: [4, 13]}, 238: {size: [5.0, 13.0], bearing: [0.0, 13.0], advance: 6.0, cellpos: [416, 320], bitmap_size: [5, 13]}, 239: {size: [5.0, 12.0], bearing: [0.0, 12.0], advance: 6.0, cellpos: [448, 320], bitmap_size: [5, 12]}, 240: {size: [8.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [480, 320], bitmap_size: [8, 13]}, 241: {size: [9.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [0, 352], bitmap_size: [9, 12]}, 242: {size: [8.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [32, 352], bitmap_size: [8, 13]}, 243: {size: [8.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [64, 352], bitmap_size: [8, 13]}, 244: {size: [8.0, 13.0], bearing: [1.0, 13.0], advance: 10.0, cellpos: [96, 352], bitmap_size: [8, 13]}, 245: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [128, 352], bitmap_size: [8, 12]}, 246: {size: [8.0, 12.0], bearing: [1.0, 12.0], advance: 10.0, cellpos: [160, 352], bitmap_size: [8, 12]}, 247: {size: [9.0, 9.0], bearing: [0.0, 11.0], advance: 10.0, cellpos: [192, 352], bitmap_size: [9, 9]}, 248: {size: [10.0, 10.0], bearing: [0.0, 9.0], advance: 10.0, cellpos: [224, 352], bitmap_size: [10, 10]}, 249: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [256, 352], bitmap_size: [9, 13]}, 250: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [288, 352], bitmap_size: [9, 13]}, 251: {size: [9.0, 13.0], bearing: [0.0, 13.0], advance: 9.0, cellpos: [320, 352], bitmap_size: [9, 13]}, 252: {size: [9.0, 12.0], bearing: [0.0, 12.0], advance: 9.0, cellpos: [352, 352], bitmap_size: [9, 12]}, 253: {size: [11.0, 17.0], bearing: [-1.0, 13.0], advance: 9.0, cellpos: [384, 352], bitmap_size: [11, 17]}, 254: {size: [9.0, 17.0], bearing: [0.0, 13.0], advance: 10.0, cellpos: [416, 352], bitmap_size: [9, 17]}, 255: {size: [11.0, 16.0], bearing: [-1.0, 12.0], advance: 9.0, cellpos: [448, 352], bitmap_size: [11, 16]}}}
});
es6_module_define('icon', [], function _icon_module(_es6_module) {
  "use strict";
  function IconManager(gl, sheet_path, imgsize, iconsize) {
    this.path = sheet_path;
    this.size = new Vector2(imgsize);
    this.cellsize = new Vector2(iconsize);
    this.load(gl);
    this.texture = undefined;
    this.ready = false;
  }
  /*test for IE bug*/;
  if (IconManager.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        IconManager.name = 'IconManager';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  IconManager = create_prototype(IconManager, _es6_module, "IconManager");
  IconManager.prototype.load = function(gl) {
    this.tex = {}
    this.tex.image = new Image();
    this.tex.image.src = this.path;
    this.te = {}
    var thetex=this.tex;
    var this2=this;
    this.tex.image.onload = function() {
      var tex=thetex;
      this2.ready = true;
    }
  }
  IconManager.prototype.get_tile = function(tile) {
    var ret=[];
    this.gen_tile(tile, ret);
    return ret;
  }
  var $ret_IconManager_enum_to_xy=[0, 0];
  IconManager.prototype.enum_to_xy = function(tile) {
    var size=this.size;
    var cellsize=this.cellsize;
    var fx=Math.floor(size[0]/cellsize[0]);
    var y=Math.floor(tile/fx);
    var x=tile%fx;
    x*=cellsize[0];
    y*=cellsize[1];
    $ret_IconManager_enum_to_xy[0] = x;
    $ret_IconManager_enum_to_xy[1] = y;
    return $ret_IconManager_enum_to_xy;
  }
  IconManager.prototype.gen_tile = function(tile, texcos) {
    var size=this.size;
    var cellsize=this.cellsize;
    var fx=Math.floor(size[0]/cellsize[0]);
    var y=Math.floor(tile/fx);
    var x=tile%fx;
    x = (x*cellsize[0])/size[0];
    y = (y*cellsize[1])/size[1];
    var u=1.0/size[0], v=1.0/size[1];
    u*=cellsize[0];
    v*=cellsize[1];
    y+=v;
    texcos.push(x);
    texcos.push(y);
    texcos.push(x);
    texcos.push(y-v);
    texcos.push(x+u);
    texcos.push(y-v);
    texcos.push(x);
    texcos.push(y);
    texcos.push(x+u);
    texcos.push(y-v);
    texcos.push(x+u);
    texcos.push(y);
  }
  _es6_module.add_class(IconManager);
  IconManager = _es6_module.add_export('IconManager', IconManager);
  var icon_vshader="\n\n";
  var icon_fshader="\n";
});
es6_module_define('notifications', ["UIFrame", "toolsystem", "UIWidgets", "UIElement", "UIWidgets_special", "UITextBox", "UITabPanel", "UIPack"], function _notifications_module(_es6_module) {
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var UITextBox=es6_import_item(_es6_module, 'UITextBox', 'UITextBox');
  var ToolOp=es6_import_item(_es6_module, 'toolsystem', 'ToolOp');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var UITabBar=es6_import_item(_es6_module, 'UITabPanel', 'UITabBar');
  var UICollapseIcon=es6_import_item(_es6_module, 'UIWidgets_special', 'UICollapseIcon');
  var UIPanel=es6_import_item(_es6_module, 'UIWidgets_special', 'UIPanel');
  var UIColorField=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorField');
  var UIColorBox=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorBox');
  var UIColorPicker=es6_import_item(_es6_module, 'UIWidgets_special', 'UIColorPicker');
  var UIProgressBar=es6_import_item(_es6_module, 'UIWidgets_special', 'UIProgressBar');
  var UIListBox=es6_import_item(_es6_module, 'UIWidgets_special', 'UIListBox');
  var UIListEntry=es6_import_item(_es6_module, 'UIWidgets_special', 'UIListEntry');
  var _id_note_gen=1;
  function Notification(apiname, uiname, description) {
    this._id = _id_note_gen++;
    this.name = apiname;
    this.uiname = uiname;
    this.description = description;
  }
  /*test for IE bug*/;
  if (Notification.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Notification.name = 'Notification';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Notification = create_prototype(Notification, _es6_module, "Notification");
  Notification.prototype.__hash__ = function() {
    return ""+this._id;
  }
  Notification.prototype.gen_uielement = function(ctx) {
  }
  Notification.prototype.on_remove = function() {
  }
  _es6_module.add_class(Notification);
  Notification = _es6_module.add_export('Notification', Notification);
  function LabelNote(label, description, life_ms) {
    if (description==undefined) {
        description = "";
    }
    if (life_ms==undefined) {
        life_ms = 3000;
    }
    Notification.call(this, "label", "Label", description);
    this.life_ms = life_ms;
    this.last_ms = time_ms();
    this.label = label;
  }
  /*test for IE bug*/;
  if (LabelNote.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        LabelNote.name = 'LabelNote';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  LabelNote = inherit_multiple(LabelNote, [Notification], _es6_module, "LabelNote");
  Object.defineProperty(LabelNote.prototype, "defunct", {get: function() {
    return time_ms()-this.last_ms>=this.life_ms;
  }, configurable: true});
  LabelNote.prototype.gen_uielement = function(ctx) {
    return new UILabel(ctx, this.label);
  }
  _es6_module.add_class(LabelNote);
  LabelNote = _es6_module.add_export('LabelNote', LabelNote);
  function ProgressNote(label, id, description, callback, progress) {
    if (description==undefined) {
        description = "";
    }
    if (callback==undefined) {
        callback = undefined;
    }
    if (progress==undefined) {
        progress = 0.0;
    }
    Notification.call(this, "progress", "Progress Bar", description);
    if (callback==undefined)
      callback = function() {
    }
    this.do_end = false;
    this.id = id;
    this.label = label;
    this.progress = progress;
    this.callback = callback;
  }
  /*test for IE bug*/;
  if (ProgressNote.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ProgressNote.name = 'ProgressNote';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ProgressNote = inherit_multiple(ProgressNote, [Notification], _es6_module, "ProgressNote");
  Object.defineProperty(ProgressNote.prototype, "value", {get: function() {
    return this.progress;
  }, set: function(value) {
    if (value!=this.progress)
      this.set_value(value);
  }, configurable: true});
  Object.defineProperty(ProgressNote.prototype, "defunct", {get: function() {
    return this.progress>=1.0||this.do_end;
  }, configurable: true});
  ProgressNote.prototype.end = function() {
    this.do_end = true;
  }
  ProgressNote.prototype.update_uielement = function(element) {
    var bar=element.children[1];
    bar.set_value(this.progress);
  }
  ProgressNote.prototype.gen_uielement = function(ctx) {
    var c=new UIProgressBar(ctx);
    c.min_wid = 100;
    c.min_hgt = 15;
    c.set_value(this.progress);
    var r=new ColumnFrame(ctx);
    r.pad[1] = 0;
    r.packflag|=PackFlags.NO_AUTO_SPACING;
    r.label(this.label);
    r.add(c);
    return r;
  }
  ProgressNote.prototype.set_value = function(value) {
    this.progress = value;
    this.callback(this);
  }
  _es6_module.add_class(ProgressNote);
  ProgressNote = _es6_module.add_export('ProgressNote', ProgressNote);
  function NotificationManager() {
    this.notes = new Array();
    this.progbars = {}
    this.emap = {}
    this.cached_dellist = new Array();
  }
  /*test for IE bug*/;
  if (NotificationManager.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        NotificationManager.name = 'NotificationManager';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  NotificationManager = create_prototype(NotificationManager, _es6_module, "NotificationManager");
  NotificationManager.prototype.add = function(note) {
    this.notes.push(note);
    if (__instance_of(note, ProgressNote)) {
        this.progbars[note.id] = note;
    }
    this.emap[note._id] = new Array;
  }
  NotificationManager.prototype.remove = function(note) {
    this.notes.remove(note);
    if (__instance_of(note, ProgressNote)) {
        delete this.progbars[note.id];
    }
    var __iter_e=__get_iter(this.emap[note._id]);
    var e;
    while (1) {
      var __ival_e=__iter_e.next();
      if (__ival_e.done) {
          break;
      }
      e = __ival_e.value;
      if (__instance_of(e.parent, NoteContainer)) {
          e.parent.parent.do_full_recalc();
          e.parent.parent.remove(e);
      }
      else {
        e.parent.do_full_recalc();
        e.parent.remove(e);
      }
    }
    delete this.emap[note._id];
    note.on_remove();
  }
  NotificationManager.prototype.ensure_uielement = function(note) {
    var __iter_e=__get_iter(list(this.emap[note._id]));
    var e;
    while (1) {
      var __ival_e=__iter_e.next();
      if (__ival_e.done) {
          break;
      }
      e = __ival_e.value;
      if (e.defunct)
        this.emap[note._id].remove(e);
    }
    if (this.emap[note._id].length==0) {
        var __iter_c=__get_iter(g_app_state.screen.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          if (c.area.note_area==undefined)
            continue;
          var area=c.area.note_area;
          var c2=note.gen_uielement(c.ctx);
          area.add(c2, undefined, note);
          this.emap[note._id].push(c2);
        }
    }
  }
  NotificationManager.prototype.label = function(label, description) {
    var n=new LabelNote(label, description);
    this.add(n);
    this.ensure_uielement(n);
    return n;
  }
  NotificationManager.prototype.progbar = function(label, progress, id, description) {
    if (id==undefined) {
        id = label;
    }
    if (description==undefined) {
        description = "";
    }
    var this2=this;
    function callback(note) {
      if (!(note._id in this2.emap))
        return ;
      var __iter_e=__get_iter(this2.emap[note._id]);
      var e;
      while (1) {
        var __ival_e=__iter_e.next();
        if (__ival_e.done) {
            break;
        }
        e = __ival_e.value;
        note.update_uielement(e);
      }
    }
    var progbar=new ProgressNote(label, id, description, callback, progress);
    this.add(progbar);
    this.ensure_uielement(progbar);
    return progbar;
  }
  NotificationManager.prototype.on_tick = function() {
    var dellist=this.cached_dellist;
    dellist.length = 0;
    var __iter_n=__get_iter(this.notes);
    var n;
    while (1) {
      var __ival_n=__iter_n.next();
      if (__ival_n.done) {
          break;
      }
      n = __ival_n.value;
      if (n.defunct)
        dellist.push(n);
    }
    for (var i=0; i<dellist.length; i++) {
        this.remove(dellist[i]);
    }
  }
  _es6_module.add_class(NotificationManager);
  NotificationManager = _es6_module.add_export('NotificationManager', NotificationManager);
  function NoteContainer(ctx, child, note) {
    UIFrame.call(this, ctx);
    this.note = note;
    this.xbut = new UIButtonIcon(this.ctx, "", Icons.TINY_X);
    this.xbut.bgmode = "flat";
    var this2=this;
    this.xbut.callback = function() {
      g_app_state.notes.remove(this2.note);
    }
    this.add(child);
    this.add(this.xbut);
    this.margin = 2;
    this.child = child;
    this.iconwid = 10;
    this.xwid = 13;
  }
  /*test for IE bug*/;
  if (NoteContainer.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        NoteContainer.name = 'NoteContainer';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  NoteContainer = inherit_multiple(NoteContainer, [UIFrame], _es6_module, "NoteContainer");
  NoteContainer.prototype.pack = function(canvas, isVertical) {
    var size=this.child.get_min_size(canvas, isVertical);
    var margin=this.margin;
    this.child.pos[0] = this.margin+this.iconwid;
    this.child.pos[1] = Math.abs(this.size[1]-size[1])*0.5+this.margin;
    this.child.size[0] = size[0];
    this.child.size[1] = size[1];
    this.xbut.pos[0] = this.child.pos[0]+this.child.size[0];
    this.xbut.pos[1] = this.margin;
    this.xbut.size[0] = this.xbut.size[1] = this.xwid;
    this.state|=UIFlags.NO_FRAME_CACHE;
  }
  NoteContainer.prototype.get_min_size = function(canvas, isVertical) {
    var s=this.child.get_min_size(canvas, isVertical);
    return [s[0]+this.margin*2+this.iconwid+this.xwid, s[1]+this.margin*2];
  }
  NoteContainer.prototype.build_draw = function(canvas, isVertical) {
    var y=Math.abs(this.child.size[1]-this.size[1])*0.5;
    canvas.box([0, 0], this.size, uicolors["NoteBox"], 0.5);
    canvas.icon(Icons.NOTE_EXCL, [this.margin+2, this.margin+y], undefined, true);
    prior(NoteContainer, this).build_draw.call(this, canvas, isVertical);
  }
  _es6_module.add_class(NoteContainer);
  NoteContainer = _es6_module.add_export('NoteContainer', NoteContainer);
  function NoteFrame(ctx, notes) {
    ColumnFrame.call(this, ctx);
    this.notes = notes;
    this.packflag|=PackFlags.NO_AUTO_SPACING|PackFlags.INHERIT_HEIGHT;
    this.packflag|=PackFlags.IGNORE_LIMIT|PackFlags.ALIGN_LEFT;
  }
  /*test for IE bug*/;
  if (NoteFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        NoteFrame.name = 'NoteFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  NoteFrame = inherit_multiple(NoteFrame, [ColumnFrame], _es6_module, "NoteFrame");
  NoteFrame.prototype.add = function(e, packflag, note) {
    var c=new NoteContainer(this.ctx, e, note);
    prior(NoteFrame, this).add.call(this, c, packflag);
  }
  NoteFrame.prototype.prepend = function(e, packflag, note) {
    var c=new NoteContainer(this.ctx, e, note);
    prior(NoteFrame, this).prepend.call(this, c, packflag);
  }
  NoteFrame.prototype.remove = function(e) {
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.child==e) {
          prior(NoteFrame, this).remove.call(this, c);
          return ;
      }
    }
  }
  _es6_module.add_class(NoteFrame);
  NoteFrame = _es6_module.add_export('NoteFrame', NoteFrame);
  function test_notes() {
    g_app_state.notes.label("yay", "description!");
    g_app_state.notes.progbar("tst", 0.3, "pbar");
    console.log("Notification test");
  }
});
es6_module_define('RadialMenu', ["UIPack", "math", "UIElement", "UIFrame", "UITextBox", "toolsystem", "UIWidgets", "events"], function _RadialMenu_module(_es6_module) {
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var UITextBox=es6_import_item(_es6_module, 'UITextBox', 'UITextBox');
  var ToolOp=es6_import_item(_es6_module, 'toolsystem', 'ToolOp');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var ignore_next_mouseup_event=es6_import_item(_es6_module, 'events', 'ignore_next_mouseup_event');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  function UIRadialMenuEntry(label, hotkey, pos, size) {
    UIElement.call(this);
    this.clicked = false;
    this.label = label;
    this.text = "";
    this.pos = pos;
    this.hotkey = hotkey;
    this.size = size;
    this.i = 0;
    this.callback = undefined;
    this.add_sep = false;
    this.packed = false;
    this.start_angle = 0;
    this.end_angle = 0;
  }
  /*test for IE bug*/;
  if (UIRadialMenuEntry.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIRadialMenuEntry.name = 'UIRadialMenuEntry';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIRadialMenuEntry = inherit_multiple(UIRadialMenuEntry, [UIElement], _es6_module, "UIRadialMenuEntry");
  UIRadialMenuEntry.prototype.on_mousedown = function(event) {
    if ((event.button==0||(event.button==2&&this.parent.close_on_right))&&!this.clicked) {
        this.clicked = true;
        this.do_recalc();
        if (inrect_2d([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UIRadialMenuEntry.prototype.on_mouseup = function(event) {
    console.log(this.parent.call_time);
    if (event.button==0||(event.button==2&&this.parent.close_on_right)) {
        this.clicked = false;
        this.do_recalc();
        if (inrect_2d([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UIRadialMenuEntry.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    var tsize=canvas.textsize(this.text);
    canvas.text([(this.size[0]-tsize[0])*0.5+2, (this.size[1]-tsize[1])*0.25], this.text, uicolors["BoxText"]);
    if (this.hotkey!=undefined) {
        var twid=canvas.textsize(this.hotkey)[0];
        canvas.text([this.size[0]-twid-8, 2], this.hotkey, uicolors["BoxText"]);
    }
    canvas.end(this);
  }
  UIRadialMenuEntry.prototype.get_min_size = function(canvas, isvertical) {
    var tsize1=canvas.textsize(this.text);
    var tsize2=canvas.textsize(this.hotkey);
    return [tsize1[0]+tsize2[0]+4, tsize1[1]+tsize2[1]];
  }
  _es6_module.add_class(UIRadialMenuEntry);
  function UIRadialMenu(name, callback) {
    UIFrame.call(this);
    this.name = name;
    this.callback = callback;
    this.idmap = {}
    this.closed = false;
    this.chosen_id = undefined;
    this.minwidth = undefined;
    this.hkey_line_pos = 0;
    this.close_on_right = false;
    this.call_time = 0;
    this.last_active = undefined;
    this.mpos = new Vector2([0, 0]);
    this._do_callback = false;
    this._do_end = false;
    this._have_rebuilt = false;
    this.radius = 0.0;
    this.radius_min = this.radius_max = 0.0;
    this.swap_mouse_button = undefined;
    this.had_up_event = undefined;
    this.min_radius = 50;
  }
  /*test for IE bug*/;
  if (UIRadialMenu.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIRadialMenu.name = 'UIRadialMenu';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIRadialMenu = inherit_multiple(UIRadialMenu, [UIFrame], _es6_module, "UIRadialMenu");
  UIRadialMenu.prototype.add_item = function(text, hotkey, id) {
    var en=new UIRadialMenuEntry(text, hotkey, [0, 0], [0, 0]);
    en.close_on_right = this.close_on_right;
    en.i = this.children.length;
    if (id==undefined)
      id = en.id;
    this.idmap[en.i] = id;
    this.add(en);
    return ;
  }
  UIRadialMenu.prototype.on_keydown = function(event) {
    if (event.keyCode==charmap["Enter"]) {
        if (this.active!=undefined&&this.active.constructor.name==UIRadialMenuEntry.name) {
            this.active.callback(this.active);
        }
    }
    else 
      if (event.keyCode==charmap["Escape"]) {
        this.end_menu(false);
    }
  }
  UIRadialMenu.prototype.calc_radius = function(canvas) {
    var min_radius=this.min_radius;
    var clen=0;
    var children=new Array();
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name==UIRadialMenuEntry.name) {
          clen++;
          c.size = c.get_min_size(canvas, false);
          children.push(c);
      }
    }
    function pack(rad) {
      var f=-Math.PI/2;
      var df=(Math.PI*2)/(clen);
      var __iter_c=__get_iter(children);
      var c;
      while (1) {
        var __ival_c=__iter_c.next();
        if (__ival_c.done) {
            break;
        }
        c = __ival_c.value;
        c.pos[0] = rad+Math.cos(f)*rad-c.size[0]*0.5;
        c.pos[1] = rad+Math.sin(f)*rad-c.size[1]*0.5;
        f+=df;
      }
    }
    var r1=1.0;
    var f=-Math.PI/2;
    var df=(Math.PI*2)/(clen);
    var minx, miny;
    var maxx, maxy;
    var r2;
    var c_mm=new MinMax(2);
    pack(r1);
    var __iter_c=__get_iter(children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c_mm.minmax_rect(c.pos, c.size);
      f+=df;
    }
    r2 = Math.sqrt(this.size[1]*this.size[1])*2.0;
    var last_valid_r=r2*2;
    var n=64;
    for (var i=0; i<n; i++) {
        var rmid=(r1+r2)*0.5;
        var found=false;
        pack(rmid);
        var __iter_c1=__get_iter(children);
        var c1;
        while (1) {
          var __ival_c1=__iter_c1.next();
          if (__ival_c1.done) {
              break;
          }
          c1 = __ival_c1.value;
          var __iter_c2=__get_iter(children);
          var c2;
          while (1) {
            var __ival_c2=__iter_c2.next();
            if (__ival_c2.done) {
                break;
            }
            c2 = __ival_c2.value;
            if (c1==c2)
              continue;
            if (aabb_isect_2d(c1.pos, c1.size, c2.pos, c2.size)) {
                found = true;
                break;
            }
          }
          if (found)
            break;
        }
        if (found) {
            r1 = rmid;
        }
        else {
          r2 = rmid;
          last_valid_r = rmid;
        }
    }
    var r_mm=new MinMax(1);
    var c_mm=new MinMax(2);
    for (var j=0; j<6; j++) {
        pack(last_valid_r);
        c_mm.reset();
        r_mm.reset();
        r_mm = new MinMax(1);
        c_mm = new MinMax(2);
        var __iter_c=__get_iter(children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          c_mm.minmax_rect(c.pos, c.size);
        }
        var cent=new Vector2(c_mm.max).add(c_mm.min).mulScalar(0.5);
        var __iter_c=__get_iter(children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          var pos=[c.pos[0], c.pos[1]];
          var p1=[(pos[0]), (pos[1])];
          var p2=[(pos[0]+c.size[0]), (pos[1]+c.size[1])];
          var minx=Math.min(p1[0], p2[0]);
          var miny=Math.min(p1[1], p2[1]);
          var maxx=Math.max(p1[0], p2[0]);
          var maxy=Math.max(p1[1], p2[1]);
          minx = pos[0];
          miny = pos[1];
          maxx = pos[0]+c.size[0];
          maxy = pos[1]+c.size[1];
          var size=new Vector2(c.size);
          size.mulScalar(0.5);
          var cs=get_rect_points(pos, size);
          for (var i=0; i<4; i++) {
              var x=cs[i][0]-cent[0], y=cs[i][1]-cent[1];
              var r2=Math.sqrt(x*x+y*y);
              r_mm.minmax(r2);
          }
          f+=df;
        }
        if (r_mm.min<20&&j<5) {
            if (r_mm.min>1.0) {
                last_valid_r+=(20.0-r_mm.min)*0.5;
            }
            else {
              last_valid_r = (last_valid_r+1.0)*1.1;
            }
        }
    }
    this.radius_min = Math.floor(r_mm.min);
    this.radius_max = Math.ceil(r_mm.max);
    this.radius = last_valid_r;
    var r=this.radius_max;
    this.cent = new Vector2([r, r]);
    var __iter_c=__get_iter(children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.pos[0]+=this.radius_max-this.radius;
      c.pos[1]+=this.radius_max-this.radius;
    }
    console.log(this.radius_min, this.radius_max, this.radius);
  }
  UIRadialMenu.prototype.packmenu = function(canvas) {
    var maxwid=-1;
    var y=0;
    var ehgt=25;
    var padx=2;
    this.ehgt = ehgt;
    var this2=this;
    function menu_callback(e) {
      if (this2.closed)
        return ;
      this2.end_menu();
      if (this2.callback!=undefined) {
          this2.chosen_id = this2.idmap[e.i];
          this2.callback(e, this2.idmap[e.i]);
      }
    }
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!="UIRadialMenuEntry")
        continue;
      c.callback = menu_callback;
    }
    y = 5;
    var maxcol=0;
    var hkey_line_pos=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.name)
        continue;
      var st=c.label+" "+c.hotkey;
      maxwid = Math.max(canvas.textsize(st)[0]+30, maxwid);
      hkey_line_pos = Math.max(canvas.textsize(c.label+"    ")[0]+18, hkey_line_pos);
      maxcol = Math.max(st.length, maxcol);
      y+=ehgt;
    }
    this.hkey_line_pos = hkey_line_pos;
    if (this.minwidth!=undefined)
      maxwid = Math.max(this.minwidth, maxwid);
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.name)
        continue;
      c.text = c.label;
      c.text = c.text.replace(" ", "\n");
    }
    this.size = [maxwid, y];
    this.calc_radius(canvas);
    var mm=new MinMax(2);
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.name)
        continue;
      mm.minmax_rect(c.pos, c.size);
    }
    var sz=Math.max(mm.max[0]-mm.min[0], mm.max[1]-mm.min[1]);
    this.size = [sz, sz];
    this.size = [this.radius_max*2, this.radius_max*2];
    var a_mm=new MinMax(1);
    var ax=new Vector2([0, 1]);
    var n1=new Vector2([0, 0]);
    var starts=[];
    var ends=[];
    console.log("start");
    var off=new Vector2(this.size);
    off.sub(new Vector2(mm.max).sub(mm.min));
    off.mulScalar(0.5);
    off.sub(mm.min);
    off.zero();
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.constructor.name)
        continue;
      var pos=[c.pos[0]-this.cent[0], c.pos[1]-this.cent[1]];
      a_mm.reset();
      var cs2=get_rect_points(pos, c.size);
      for (var i=0; i<4; i++) {
          n1.load(cs2[i]).normalize();
          var ang=Math.acos(ax.dot(n1));
          var sign=ang>0.0 ? 1.0 : -1.0;
          if (!winding([0.0, 0.0], n1, ax)) {
              ang = -ang;
          }
          if (c==this.children[0]) {
              while (ang<-0.0) {
                ang+=Math.PI*2.0*sign;
              }
              while (ang>Math.PI*2) {
                ang-=Math.PI*2.0;
              }
          }
          a_mm.minmax(ang);
      }
      if (starts.length>0) {
          var s=starts[starts.length-1];
          var e=ends[starts.length-1];
          sign = a_mm.min<e ? 1.0 : -1.0;
          while (Math.abs(a_mm.min-e)>Math.PI) {
            a_mm.min+=Math.PI*2.0*sign;
          }
          sign = a_mm.max<a_mm.min ? 1.0 : -1.0;
          while (Math.abs(a_mm.max-a_mm.min)>Math.PI) {
            a_mm.max+=Math.PI*2.0*sign;
          }
          s = a_mm.min;
          e = a_mm.max;
          a_mm.min = Math.min(s, e);
          a_mm.max = Math.max(s, e);
      }
      console.log(a_mm.min, a_mm.max);
      c.start_angle = a_mm.min;
      c.end_angle = a_mm.max;
    }
    var children=[];
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name==UIRadialMenuEntry.constructor.name)
        children.push(c);
    }
    for (var i=0; i<children.length; i++) {
        var c=children[i];
        var s=c.start_angle, e=c.end_angle;
        c.start_angle = Math.min(s, e);
        c.end_angle = Math.max(s, e);
        starts.push(c.start_angle);
        ends.push(c.end_angle);
    }
    for (var i2=0; i2<children.length; i2++) {
        var i1=(i2+children.length-1)%children.length;
        var i3=(i2+1)%children.length;
        var e1=ends[i1];
        var s2=starts[i2];
        var e2=ends[i2];
        var s3=starts[i3];
        if (0) {
            var sign=s2<e1 ? 1.0 : -1.0;
            while (Math.abs(e1-s2)>Math.PI) {
              s2+=Math.PI*2.0*sign;
            }
            if (s2<e1) {
                var t=s2;
                s2 = e1;
                e1 = t;
            }
            var sign=e2<s2 ? 1.0 : -1.0;
            while (Math.abs(e2-s2)>Math.PI) {
              e2+=Math.PI*2.0*sign;
            }
            if (e2<s2) {
                t = s2;
                s2 = e2;
                e2 = t;
            }
            var sign=s3<e2 ? 1.0 : -1.0;
            while (Math.abs(e2-s3)>Math.PI) {
              s3+=Math.PI*2.0*sign;
            }
            if (s3<e2) {
                t = s3;
                s3 = e2;
                e2 = t;
            }
        }
        var c1=children[i1];
        var c2=children[i2];
        var c3=children[i3];
        var s=(s2+e1)*0.5;
        var e=(e2+s3)*0.5;
        if (i2==children.length-1) {
            c2.start_angle = (c3.end_angle+c2.start_angle-Math.PI*2)*0.5;
            c3.end_angle = c2.start_angle+Math.PI*2;
        }
        if (i2!=children.length-1) {
            c2.start_angle = (e2+s3)*0.5;
        }
        if (i2!=0) {
            c2.end_angle = (s2+e1)*0.5;
        }
        else 
          if (i2==1) {
            c1.start_angle = c2.end_angle;
        }
        if (i2!=1&&i2!=children.length-1) {
        }
    }
    this.do_recalc();
  }
  UIRadialMenu.prototype.end_menu = function(do_callback) {
    if (do_callback==undefined)
      do_callback = false;
    this._do_end = true;
    this._have_rebuilt = false;
    if (!this.closed) {
        this.do_recalc();
        this.closed = true;
        if (this.parent.active==this) {
            this.parent.active = this.last_active;
            this.last_active.on_active();
        }
        if (do_callback) {
            this._do_callback = true;
            this._do_callback_active = this.active;
        }
    }
  }
  UIRadialMenu.prototype.on_tick = function(event) {
    if (!this._have_rebuilt)
      return ;
    if (this._do_end) {
        this.parent.remove(this);
        this.parent.do_recalc();
        this.pop_modal();
        this._do_end = false;
        this._have_rebuilt = false;
    }
    if (this._do_callback) {
        this._do_callback = false;
        if (this.callback!=undefined&&this._do_callback_active!=undefined) {
            var en=this._do_callback_active;
            this.chosen_id = this.idmap[en.i];
            this.callback(this.active, this.idmap[en.i]);
        }
    }
  }
  UIRadialMenu.prototype.on_mousedown = function(event) {
    var mpos=this.off_mpos([event.x, event.y]);
    if (Math.sqrt(mpos[0]*mpos[0]+mpos[1]*mpos[1])<this.radius_min) {
        this.end_menu(false);
    }
    else {
    }
  }
  UIRadialMenu.prototype.on_mouseup = function(event) {
    var mpos=this.off_mpos([event.x, event.y]);
    this.had_up_event = event.button;
    var dis=Math.sqrt(mpos[0]*mpos[0]+mpos[1]*mpos[1]);
    if (dis>this.radius_min) {
        this.end_menu(true);
    }
    else {
    }
  }
  UIRadialMenu.prototype.off_mpos = function(mpos) {
    return new Vector2([mpos[0]-this.size[0]*0.5, mpos[1]-this.size[1]*0.5]);
  }
  UIRadialMenu.prototype.on_mousemove = function(event) {
    this.mpos.load([event.x, event.y]);
    var mpos=this.off_mpos([event.x, event.y]);
    if (Math.sqrt(mpos[0]*mpos[0]+mpos[1]*mpos[1])<this.radius_min-3) {
        if (this.active!=undefined) {
            this.active.state&=~UIFlags.HIGHLIGHT;
            this.active.on_inactive();
            this.active.do_recalc();
            this.active = undefined;
            this.active = undefined;
        }
    }
    var n1=new Vector2(this.off_mpos([event.x, event.y]));
    var ax=new Vector2([0, 1]);
    n1.normalize();
    var ang=Math.acos(ax.dot(n1));
    if (!winding([0, 0], n1, ax))
      ang = -ang;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.name)
        continue;
      var a1=Math.min(c.start_angle, c.end_angle);
      var a2=Math.max(c.start_angle, c.end_angle);
      if (ang>=a1&&ang<=a2) {
          if (this.active&&this.active!=c) {
              this.active.state&=~UIFlags.HIGHLIGHT;
              this.active.on_inactive();
          }
          this.active = c;
          c.state|=UIFlags.HIGHLIGHT;
          c.on_active();
          this.do_recalc();
          break;
      }
    }
    var radius=this.radius_max+5;
    if (this.had_up_event!=undefined) {
        radius+=50;
    }
    console.log("---", this.had_up_event);
    if (Math.sqrt(mpos[0]*mpos[0]+mpos[1]*mpos[1])>radius) {
        this.end_menu(this.had_up_event==undefined);
        if (this.had_up_event==undefined) {
            if (this.swap_mouse_button!=undefined) {
                ignore_next_mouseup_event(this.swap_mouse_button);
            }
        }
    }
  }
  UIRadialMenu.prototype.build_arc = function(canvas, start, arc, color) {
    var cent=this.cent;
    var steps=40;
    var points1=canvas.arc_points(cent, start, arc, this.radius_min, steps);
    var points2=canvas.arc_points(cent, start, arc, this.radius_max, steps);
    points1.reverse();
    var lines1=[];
    var lines2=[];
    for (var i=0; i<points1.length-1; i+=1) {
        var v1, v2, v3, v4;
        var i2=points1.length-i-1;
        v1 = points1[i];
        v2 = points2[i2];
        v3 = points2[i2-1];
        v4 = points1[i+1];
        canvas.quad(v1, v2, v3, v4, color);
    }
    canvas.line_loop(points1.concat(points2), color, undefined, 2, true);
  }
  UIRadialMenu.prototype.build_circle = function(canvas) {
    var cent=this.cent;
    var steps=40;
    var points1=canvas.arc_points(cent, 0, -Math.PI*2, this.radius_min, steps);
    var points2=canvas.arc_points(cent, 0, Math.PI*2, this.radius_max, steps);
    var clr=uicolors["RadialMenu"];
    var menu=this;
    function color(v) {
      var c=new Vector3(clr);
      var fac=v[1]/menu.size[1];
      fac = fac*0.5+0.5;
      c.mulScalar(fac);
      return [c[0], c[1], c[2], clr[3]];
    }
    var colors1=[];
    var colors2=[];
    for (var i=0; i<points1.length; i++) {
        colors1.push(color(points1[i]));
        colors2.push(color(points2[i]));
    }
    canvas.line_loop(points1, colors1, undefined, 2, true);
    canvas.line_loop(points2, colors2, undefined, 2, true);
    for (var i=0; i<points1.length-1; i+=1) {
        var v1, v2, v3, v4;
        var i2=points1.length-i-1;
        v1 = points1[i];
        v2 = points2[i2];
        v3 = points2[i2-1];
        v4 = points1[i+1];
        canvas.quad(v1, v2, v3, v4, color(v1), color(v2), color(v3), color(v4));
    }
  }
  UIRadialMenu.prototype.angle_line = function(angle, cent) {
    var px1=cent[0]+Math.sin(angle)*this.radius_min;
    var py1=cent[1]+Math.cos(angle)*this.radius_min;
    var px2=cent[0]+Math.sin(angle)*this.radius_max;
    var py2=cent[1]+Math.cos(angle)*this.radius_max;
    return [[px1, py1], [px2, py2]];
  }
  UIRadialMenu.prototype.build_draw = function(canvas, isVertical) {
    if (!this.packed) {
        this.packmenu(canvas);
        this.packed = true;
    }
    UIFrame.prototype.build_draw.call(this, canvas, true);
    canvas.begin(this);
    if (this.closed) {
        this._have_rebuilt = true;
        canvas.end(this);
        return ;
    }
    this.build_circle(canvas);
    var cent=this.cent;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!=UIRadialMenuEntry.name)
        continue;
      var lin1=this.angle_line(c.start_angle, cent);
      var lin2=this.angle_line(c.end_angle, cent);
      canvas.line(lin2[0], lin2[1], uicolors["DefaultText"], undefined, 2.0);
      var hcolor=uicolors["RadialMenuHighlight"];
      if (c.state&UIFlags.HIGHLIGHT) {
          this.build_arc(canvas, c.start_angle, c.end_angle-c.start_angle, hcolor);
      }
    }
    var v1=this.off_mpos(this.mpos);
    v1.normalize();
    v1.mulScalar(100.0);
    var sz2=cent;
    v1.add(sz2);
    var v2=sz2;
    canvas.end(this);
    this._have_rebuilt = true;
  }
  _es6_module.add_class(UIRadialMenu);
  UIRadialMenu = _es6_module.add_export('UIRadialMenu', UIRadialMenu);
  function is_menu_open(frame) {
    while (frame.parent!=undefined) {
      frame = frame.parent;
    }
    var __iter_c=__get_iter(frame.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name==UIRadialMenu.constructor.name&&!c.closed)
        return true;
      if (c.constructor.name==UIMenu.constructor.name&&!c.closed)
        return true;
    }
    return false;
  }
  function ui_call_radial_menu(menu, frame, pos) {
    var off=[pos[0], pos[1]];
    while (frame.parent!=undefined) {
      off[0]+=frame.pos[0];
      off[1]+=frame.pos[1];
      frame = frame.parent;
    }
    menu.closed = false;
    menu.canvas = frame.canvas;
    menu.packmenu(frame.canvas);
    menu.do_recalc();
    menu.had_up_event = undefined;
    menu.pos[0] = off[0]-menu.size[0]/2;
    menu.pos[1] = off[1]-menu.size[1]/2;
    menu.call_time = time_ms();
    menu.last_active = frame.active;
    frame.do_recalc();
    frame.add(menu);
    frame.push_modal(menu);
    frame._on_mousemove({"x": off[0]-frame.pos[0], "y": off[1]-frame.pos[1]});
  }
  function toolop_radial_menu(ctx, name, oplist) {
    var oplist_instance=[];
    function op_callback(entry, id) {
      ctx.toolstack.exec_tool(oplist_instance[id]);
    }
    var menu=new UIRadialMenu(name, op_callback);
    for (var i=0; i<oplist.length; i++) {
        var opstr=oplist[i];
        var op=opstr;
        if (typeof opstr=="string") {
            op = ctx.api.get_op(ctx, opstr);
        }
        if (op==undefined)
          continue;
        var hotkey;
        if (op.hotkey!=undefined)
          hotkey = op.build_str(true);
        else 
          hotkey = "";
        oplist_instance.push(op);
        menu.add_item(op.uiname, hotkey, oplist_instance.length-1);
    }
    return menu;
  }
  window.UIRadialMenu = UIRadialMenu;
});
es6_module_define('raster', ["icon"], function _raster_module(_es6_module) {
  "use strict";
  var IconManager=es6_import_item(_es6_module, 'icon', 'IconManager');
  function CacheStack(itemlen) {
    Array.call(this);
    this.dellist = [];
    this.ilen = itemlen;
  }
  /*test for IE bug*/;
  if (CacheStack.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        CacheStack.name = 'CacheStack';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  CacheStack = inherit_multiple(CacheStack, [Array], _es6_module, "CacheStack");
  CacheStack.prototype.pop = function() {
    var ret=Array.prototype.pop.apply(this, arguments);
    if (this.dellist.length<64) {
        this.dellist.push(ret);
    }
    return ret;
  }
  CacheStack.prototype.clear = function() {
    var len=this.length;
    for (var i=0; i<len; i++) {
        this.pop(len);
    }
  }
  CacheStack.prototype.gen = function() {
    if (this.dellist.length!=0) {
        return this.dellist.pop();
    }
    else {
      return new Array(this.ilen);
    }
  }
  _es6_module.add_class(CacheStack);
  function RasterState(gl, size) {
    this.size = size;
    this.pos = [0, 0];
    this.iconsheet = new IconManager(gl, "fcontent/iconsheet.png", [512, 512], [32, 32]);
    this.iconsheet16 = new IconManager(gl, "fcontent/iconsheet16.png", [256, 256], [16, 16]);
    this.viewport_stack = new CacheStack(2);
    this.scissor_stack = new CacheStack(4);
  }
  /*test for IE bug*/;
  if (RasterState.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        RasterState.name = 'RasterState';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  RasterState = create_prototype(RasterState, _es6_module, "RasterState");
  var $ret_get=[[0, 0], [0, 0]];
  Object.defineProperty(RasterState.prototype, "viewport", {get: function() {
    if (this.viewport_stack.length>0) {
        return this.viewport_stack[this.viewport_stack.length-1];
    }
    else {
      $ret_get[0][0] = $ret_get[0][1] = 0.0;
      $ret_get[1][0] = g_app_state.screen.size[0];
      $ret_get[1][1] = g_app_state.screen.size[1];
      return $ret_get;
    }
  }, configurable: true});
  RasterState.prototype.on_gl_lost = function(gl) {
    this.pos = [0, 0];
    this.iconsheet = new IconManager(gl, "fcontent/iconsheet.png", [512, 512], [32, 32]);
    this.iconsheet16 = new IconManager(gl, "fcontent/iconsheet16.png", [256, 256], [16, 16]);
  }
  RasterState.prototype.begin_draw = function(gl, pos, size) {
    this.gl = gl;
    this.pos = pos;
    this.size = size;
    this.viewport_stack.clear();
    this.scissor_stack.clear();
    this.cur_scissor = undefined;
  }
  RasterState.prototype.push_viewport = function(pos, size) {
    var arr=this.viewport_stack.gen();
    arr[0] = pos;
    arr[1] = size;
    this.viewport_stack.push(arr);
    this.pos = pos;
    this.size = size;
  }
  RasterState.prototype.pop_viewport = function() {
    var ret=this.viewport_stack.pop(this.viewport_stack.length-1);
    this.pos = ret[0];
    this.size = ret[1];
    return ret;
  }
  RasterState.prototype.push_scissor = function(pos, size) {
    var rect;
    var gl=this.gl;
    if (this.cur_scissor==undefined) {
        var rect=this.scissor_stack.gen();
        var size2=g_app_state.screen.size;
        rect[0] = 0;
        rect[1] = 0;
        rect[2] = size2[0];
        rect[3] = size2[1];
    }
    else {
      rect = this.scissor_stack.gen();
      for (var i=0; i<4; i++) {
          rect[i] = this.cur_scissor[i];
      }
    }
    this.scissor_stack.push(rect);
    if (this.cur_scissor==undefined) {
        this.cur_scissor = [pos[0], pos[1], size[0], size[1]];
    }
    else {
      var cur=this.cur_scissor;
      cur[0] = pos[0];
      cur[1] = pos[1];
      cur[2] = size[0];
      cur[3] = size[1];
    }
  }
  RasterState.prototype.pop_scissor = function() {
    var rect=this.scissor_stack.pop();
    var cur=this.cur_scissor;
    if (cur==undefined) {
        cur = [rect[0], rect[1], rect[2], rect[3]];
    }
    else {
      cur[0] = rect[0];
      cur[1] = rect[1];
      cur[2] = rect[2];
      cur[3] = rect[3];
    }
    this.cur_scissor = cur;
  }
  RasterState.prototype.reset_scissor_stack = function() {
    this.scissor_stack.clear();
    this.cur_scissor = undefined;
  }
  _es6_module.add_class(RasterState);
  RasterState = _es6_module.add_export('RasterState', RasterState);
});
es6_module_define('ScreenKeyboard', ["UIElement", "events"], function _ScreenKeyboard_module(_es6_module) {
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  eval(es6_import_all(_es6_module, 'UIElement'));
  eval(es6_import_all(_es6_module, 'UIFrame'));
  eval(es6_import_all(_es6_module, 'UIPack'));
  eval(es6_import_all(_es6_module, 'UIWidgets'));
  function ScreenKeyboard(ctx, client, on_close) {
    RowFrame.call(this, ctx);
    this.size = [0, 0];
    this.pos = [0, 0];
    this.abspos = [0, 0];
    this.on_close = on_close;
    this.client = client;
    this.was_shift = false;
    this.caps = false;
    var this2;
    function callback(but) {
      this2.callback(but);
    }
    function key(c) {
      var ret=undefined;
      if (c=="Backspace") {
          ret = new UIButtonIcon(ctx, "Backspace", Icons.BACKSPACE);
      }
      else 
        if (c=="Left") {
          ret = new UIButtonIcon(ctx, "Left", Icons.LEFT_ARROW);
      }
      else 
        if (c=="Right") {
          ret = new UIButtonIcon(ctx, "Right", Icons.RIGHT_ARROW);
      }
      else {
        ret = new UIButton(ctx, c);
      }
      ret.can_pan = false;
      ret.text_size = 16;
      if (c.length==1) {
          ret.get_min_size = function(canvas, isvertical) {
            return [32, 32];
          };
      }
      ret.callback = callback;
      return ret;
    }
    var this2=this;
    function addstr(frame, s) {
      var col=frame.col();
      for (var i=0; i<s.length; i++) {
          col.add(key(s[i]), PackFlags.INHERIT_WIDTH);
      }
    }
    this.addstr = addstr;
    this.key = key;
    this.do_page(addstr, key, this.page_lower);
  }
  /*test for IE bug*/;
  if (ScreenKeyboard.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ScreenKeyboard.name = 'ScreenKeyboard';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ScreenKeyboard = inherit_multiple(ScreenKeyboard, [RowFrame], _es6_module, "ScreenKeyboard");
  ScreenKeyboard.prototype.firecode = function(c) {
    console.log("firing key code, not char");
    var screen=g_app_state.screen;
    var event=new MyKeyboardEvent(c);
    event.keyCode = event.key = c;
    event.shiftKey = screen.shiftKey;
    event.altKey = screen.altKey;
    event.ctrlKey = screen.ctrlKey;
    this.client._on_keydown(event);
    this.client._on_keyup(event);
  }
  ScreenKeyboard.prototype.firechar = function(c) {
    var screen=g_app_state.screen;
    var event=new MyKeyboardEvent(c.charCodeAt(0));
    event["char"] = c;
    event.shiftKey = screen.shiftKey;
    event.altKey = screen.altKey;
    event.ctrlKey = screen.ctrlKey;
    this.client.on_charcode(event);
  }
  ScreenKeyboard.prototype.callback = function(but) {
    if (but.text.length==1) {
        this.firechar(but.text);
        if (this.was_shift&&!this.caps) {
            this.do_Shift(but);
        }
    }
    else {
      var s="do_"+but.text.trim();
      if (s in this)
        this[s](but);
    }
  }
  ScreenKeyboard.prototype.handle_client_mevt = function(event) {
    if (__instance_of(this.client, UIElement)) {
        event.x-=this.client.abspos[0];
        event.y-=this.client.abspos[1];
    }
  }
  ScreenKeyboard.prototype.do_Backspace = function(but) {
    console.log("backspace");
    this.firecode(charmap["Backspace"]);
  }
  ScreenKeyboard.prototype.do_Left = function(but) {
    console.log("left");
    this.firecode(charmap["Left"]);
  }
  ScreenKeyboard.prototype.do_Right = function(but) {
    console.log("right");
    this.firecode(charmap["Right"]);
  }
  ScreenKeyboard.prototype.do_Caps = function(but) {
    if (this.was_shift) {
        this.was_shift = false;
        this.caps = false;
        this.do_page(this.addstr, this.key, this.page_lower);
    }
    else {
      this.was_shift = true;
      this.caps = true;
      this.do_page(this.addstr, this.key, this.page_upper);
    }
  }
  ScreenKeyboard.prototype.do_Shift = function(but) {
    if (this.was_shift) {
        this.was_shift = false;
        this.do_page(this.addstr, this.key, this.page_lower);
    }
    else {
      this.was_shift = true;
      this.do_page(this.addstr, this.key, this.page_upper);
    }
  }
  ScreenKeyboard.prototype.do_Enter = function(but) {
    this.firecode(charmap["Enter"]);
  }
  ScreenKeyboard.prototype.do_Space = function(but) {
    console.log("space!");
    this.firechar(" ");
  }
  ScreenKeyboard.prototype.do_Close = function(but) {
    this.end();
  }
  ScreenKeyboard.prototype.do_page = function(addstr, key, pagefunc) {
    this.default_packflag|=PackFlags.INHERIT_WIDTH|PackFlags.INHERIT_HEIGHT;
    this.children = new Array();
    pagefunc.call(this, addstr, key);
    this.children[0].add(key("Backspace"));
    var last=this.children[this.children.length-1];
    last.prepend(key("Shift"));
    last.add(key("Caps"));
    var last2=this.children[this.children.length-2];
    last2.prepend(new UILabel(this.ctx, "     "));
    last2.add(key("Enter"));
    var col=this.col();
    col.add(key("                Space               "));
    col.add(key("Close"));
    col.add(key("Left"));
    col.add(key("Right"));
    this.do_full_recalc();
  }
  ScreenKeyboard.prototype.page_lower = function(addstr, key) {
    addstr(this, "`1234567890-=");
    addstr(this, "qwertyuiop[]\\");
    addstr(this, "asdfghjkl;'");
    addstr(this, "zxcvbnm,./");
  }
  ScreenKeyboard.prototype.page_upper = function(addstr, key) {
    addstr(this, "~!@#$%^&*()_+");
    addstr(this, "QWERTYUIOP{}|");
    addstr(this, 'ASDFGHJKL:"');
    addstr(this, "ZXCVBNM<>?");
  }
  ScreenKeyboard.prototype.build_draw = function(canvas, isVertical) {
    var clr=[0.4, 0.4, 0.5, 0.6];
    canvas.simple_box([0, 0], this.size, clr);
    prior(ScreenKeyboard, this).build_draw.call(this, canvas, isVertical);
  }
  ScreenKeyboard.prototype.end = function() {
    console.log("screen keyboard end");
    this.pop_modal();
    if (this.parent.children.has(this)) {
        this.parent.remove(this);
        this.parent.do_recalc();
    }
    if (this.on_close) {
        this.on_close();
    }
  }
  _es6_module.add_class(ScreenKeyboard);
  var _ui_keyboard=undefined;
  window.call_keyboard = function call_keyboard(e, on_close) {
    var ctx=new Context();
    var screen=ctx.screen;
    var board=new ScreenKeyboard(ctx, e, on_close);
    board.size[0] = screen.size[0];
    board.size[1] = screen.size[0]<=screen.size[1] ? screen.size[1]/3.0 : screen.size[1]/2.0;
    board.pos[1]+=e.abspos[1]+e.size[1];
    screen.add(board);
    screen.push_modal(board);
    board.do_recalc();
    _ui_keyboard = board;
  }
  window.end_keyboard = function end_keyboard(e) {
    if (_ui_keyboard!=undefined) {
        _ui_keyboard.end();
        _ui_keyboard = undefined;
    }
  }
});
var g_theme;
es6_module_define('theme', ["util"], function _theme_module(_es6_module) {
  "use strict";
  var util=es6_import(_es6_module, 'util');
  function darken(c, m) {
    for (var i=0; i<3; i++) {
        c[i]*=m;
    }
    return c;
  }
  darken = _es6_module.add_export('darken', darken);
  function BoxColor() {
    this.colors = undefined;
  }
  /*test for IE bug*/;
  if (BoxColor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BoxColor.name = 'BoxColor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BoxColor = create_prototype(BoxColor, _es6_module, "BoxColor");
  define_static(BoxColor, "fromSTRUCT", function(reader) {
    return {}
  });
  _es6_module.add_class(BoxColor);
  BoxColor = _es6_module.add_export('BoxColor', BoxColor);
  function BoxColor4(colors) {
    var clrs=this.colors = [[], [], [], []];
    if (colors==undefined)
      return ;
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            clrs[i].push(colors[i][j]);
        }
    }
  }
  /*test for IE bug*/;
  if (BoxColor4.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BoxColor4.name = 'BoxColor4';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BoxColor4 = inherit_multiple(BoxColor4, [BoxColor], _es6_module, "BoxColor4");
  define_static(BoxColor4, "fromSTRUCT", function(reader) {
    var ret=new BoxColor4();
    reader(ret);
    return ret;
  });
  _es6_module.add_class(BoxColor4);
  BoxColor4 = _es6_module.add_export('BoxColor4', BoxColor4);
  function BoxWColor(color, weights) {
    if (color==undefined||weights==undefined)
      return ;
    this.color = [color[0], color[1], color[2], color[3]];
    this.weights = [weights[0], weights[1], weights[2], weights[3]];
  }
  /*test for IE bug*/;
  if (BoxWColor.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        BoxWColor.name = 'BoxWColor';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  BoxWColor = inherit_multiple(BoxWColor, [BoxColor], _es6_module, "BoxWColor");
  Object.defineProperty(BoxWColor.prototype, "colors", {get: function() {
    var ret=[[], [], [], []];
    var clr=this.color;
    var w=this.weights;
    if (clr==undefined)
      clr = [1, 1, 1, 1];
    for (var i=0; i<4; i++) {
        for (var j=0; j<3; j++) {
            ret[i].push(clr[j]*w[i]);
        }
        ret[i].push(clr[3]);
    }
    return ret;
  }, configurable: true});
  define_static(BoxWColor, "fromSTRUCT", function(reader) {
    var ret=new BoxWColor();
    reader(ret);
    return ret;
  });
  _es6_module.add_class(BoxWColor);
  BoxWColor = _es6_module.add_export('BoxWColor', BoxWColor);
  function ThemePair(key, value) {
    this.key = key;
    this.val = value;
  }
  /*test for IE bug*/;
  if (ThemePair.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ThemePair.name = 'ThemePair';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ThemePair = create_prototype(ThemePair, _es6_module, "ThemePair");
  _es6_module.add_class(ThemePair);
  ThemePair = _es6_module.add_export('ThemePair', ThemePair);
  function ColorTheme(defobj) {
    this.colors = new util.hashtable();
    this.boxcolors = new util.hashtable();
    var __iter_k=__get_iter(defobj);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      if (this.colors.has(k)||this.boxcolors.has(k))
        continue;
      var c=defobj[k];
      if (__instance_of(c, BoxColor)) {
          this.boxcolors.set(k, c);
      }
      else {
        this.colors.set(k, c);
      }
    }
    this.flat_colors = new Array();
  }
  /*test for IE bug*/;
  if (ColorTheme.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ColorTheme.name = 'ColorTheme';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ColorTheme = create_prototype(ColorTheme, _es6_module, "ColorTheme");
  ColorTheme.prototype.patch = function(newtheme) {
    if (newtheme==undefined)
      return ;
    var ks=new util.set(newtheme.colors.keys()).union(newtheme.boxcolors.keys());
    var __iter_k=__get_iter(this.colors);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      if (!ks.has(k)) {
          newtheme.colors.set(k, this.colors.get(k));
      }
    }
    var __iter_k=__get_iter(this.boxcolors);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      if (!ks.has(k)) {
          newtheme.boxcolors.set(k, this.boxcolors.get(k));
      }
    }
  }
  ColorTheme.prototype.gen_code = function() {
    var s="new ColorTheme({\n";
    var arr=this.flat_colors;
    for (var i=0; i<arr.length; i++) {
        var item=arr[i];
        if (i>0)
          s+=",";
        s+="\n";
        if (__instance_of(item[1], BoxWColor)) {
            s+='  "'+item[0]+'" : ui_weight_clr(';
            s+=JSON.stringify(item[1].color);
            s+=",";
            s+=JSON.stringify(item[1].weights);
            s+=")";
        }
        else 
          if (__instance_of(item[1], BoxColor4)) {
            s+='  "'+item[0]+'" : new BoxColor4(';
            s+=JSON.stringify(item[1].colors);
            s+=")";
        }
        else {
          s+='  "'+item[0]+'" : '+JSON.stringify(item[1]);
        }
    }
    s+="});";
    return s;
  }
  ColorTheme.prototype.gen_colors = function() {
    var ret={}
    this.flat_colors = new Array();
    var __iter_k=__get_iter(this.colors);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var c1=this.colors.get(k), c2=[0, 0, 0, 0];
      for (var i=0; i<4; i++) {
          c2[i] = c1[i];
      }
      ret[k] = c2;
      this.flat_colors.push([k, c1]);
    }
    var __iter_k=__get_iter(this.boxcolors);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      ret[k] = this.boxcolors.get(k).colors;
      this.flat_colors.push([k, this.boxcolors.get(k)]);
    }
    return ret;
  }
  define_static(ColorTheme, "fromSTRUCT", function(reader) {
    var c=new ColorTheme({});
    reader(c);
    var ks=c.colorkeys;
    for (var i=0; i<ks.length; i++) {
        c.colors.set(ks[i], c.colorvals[i]);
    }
    var ks=c.boxkeys;
    for (var i=0; i<ks.length; i++) {
        c.boxcolors.set(ks[i], c.boxvals[i]);
    }
    delete c.colorkeys;
    delete c.boxkeys;
    delete c.colorvals;
    delete c.boxvals;
    return c;
  });
  _es6_module.add_class(ColorTheme);
  ColorTheme = _es6_module.add_export('ColorTheme', ColorTheme);
  if (window.IsMobile==undefined)
    window.IsMobile = false;
  window.menu_text_size = window.IsMobile ? 14 : 10;
  window.default_ui_font_size = 16;
  window.ui_hover_time = 800;
  var View2DTheme=new ColorTheme({Background: [1, 1, 1, 1], ActiveObject: [0.8, 0.6, 0.3, 1.0], "Selection": [0.699999988079071, 0.4000000059604645, 0.10000000149011612, 1], "GridLineBold": [0.38, 0.38, 0.38, 1.0], "GridLine": [0.5, 0.5, 0.5, 1.0], "AxisX": [0.9, 0.0, 0.0, 1.0], "AxisY": [0.0, 0.9, 0.0, 1.0], "AxisZ": [0.0, 0.0, 0.9, 1.0]});
  View2DTheme = _es6_module.add_export('View2DTheme', View2DTheme);
  function ui_weight_clr(clr, weights) {
    return new BoxWColor(clr, weights);
  }
  ui_weight_clr = _es6_module.add_export('ui_weight_clr', ui_weight_clr);
  var lighten=darken;
  window.UITheme = new ColorTheme({"Box": ui_weight_clr([1.0, 0.765, 0.6, 0.9], [0.85, 0.9, 1.0, 1.0]), "DisabledBox": [0.2, 0.2, 0.2, 1.0], "HoverHint": ui_weight_clr([0.85, 0.85, 0.85, 0.9], [0.9, 0.9, 1.0, 1.0]), "ErrorBox": ui_weight_clr([1.0, 0.3, 0.2, 0.9], [0.7, 0.8, 1.05, 1.05]), "ErrorText": [1.0, 0.2, 0.2, 1.0], "ErrorTextBG": ui_weight_clr([1.0, 1.0, 1.0, 1.0], [0.9, 0.9, 1.0, 1.0]), "ShadowBox": ui_weight_clr([0.0, 0.0, 0.0, 0.1], [1.0, 1.0, 1.0, 1.0]), "ProgressBar": ui_weight_clr([0.4, 0.73, 0.9, 0.9], [0.75, 0.75, 1.0, 1.0]), "ProgressBarBG": ui_weight_clr([0.7, 0.7, 0.7, 0.7], [1.0, 1.0, 1.0, 1.0]), "WarningBox": ui_weight_clr([1.0, 0.8, 0.1, 0.9], [0.7, 0.8, 1.05, 1.05]), "ListBoxBG": ui_weight_clr([0.9, 0.9, 0.9, 0.9], [1.0, 1.0, 1.0, 1.0]), "ListBoxText": [0.2, 0.2, 0.2, 1.0], "InvBox": ui_weight_clr([1.0, 0.6, 0.4, 0.9], [0.7, 0.7, 0.7, 0.7]), "HLightBox": ui_weight_clr([1.0, 0.865, 0.67, 0.9], [0.85, 0.85, 1.0, 1.0]), "Highlight": [1.0, 0.75, 0.21, 1], "MenuBorder": [0.65, 0.65, 0.65, 1], "MenuHighlight": [1.0, 1, 1, 1], "ActivePanel": ui_weight_clr([0.8, 0.4, 0.3, 0.9], [1.0, 1.0, 1.0, 1.0]), "CollapsingPanel": ui_weight_clr([0.7, 0.7, 0.7, 0.5], [1.0, 1.0, 1.0, 1.0]), "SimpleBox": ui_weight_clr([0.5, 0.5, 0.5, 0.4], [1.0, 1.0, 1.0, 1.0]), "DialogBox": ui_weight_clr([0.9, 0.9, 0.9, 0.9], [1.0, 1.0, 1.0, 1.0]), "DialogTitle": ui_weight_clr([0.7, 0.7, 0.7, 0.9], [1.0, 1.0, 1.0, 1.0]), "MenuBox": ui_weight_clr([1, 1, 1, 1], [1, 1, 1, 1]), "RadialMenu": [0.85, 0.65, 0.35, 0.8], "RadialMenuHighlight": [0.85, 0.85, 0.85, 0.5], "DefaultLine": [0.2, 0.2, 0.2, 1.0], "SelectLine": [0.7, 0.7, 0.7, 1.0], "Check": [0.9, 0.7, 0.4, 1], "Arrow": [0.4, 0.4, 0.4, 1], "DefaultText": [0.2, 0.2, 0.2, 1.0], "BoxText": [0.2, 0.2, 0.2, 1.0], "DialogText": [0.2, 0.2, 0.2, 1.0], "PanelText": [0.2, 0.2, 0.2, 1.0], "HotkeyText": [0.4, 0.4, 0.4, 0.9], "HighlightCursor": [0.9, 0.9, 0.9, 0.875], "TextSelect": [0.4, 0.4, 0.4, 0.75], "TextEditCursor": [0.1, 0.1, 0.1, 1.0], "TextBox": ui_weight_clr([0.8, 0.8, 0.8, 0.9], [1, 1, 1, 1]), "TextBoxHighlight": [0.9, 0.9, 0.9, 1.0], "TextBoxInv": ui_weight_clr([0.7, 0.7, 0.7, 1.0], [0.7, 0.7, 0.7, 1.0]), "MenuSep": [0.1, 0.2, 0.2, 1.0], "RadialMenuSep": [0.1, 0.2, 0.2, 1.0], "MenuLabel": ui_weight_clr([0.6, 0.6, 0.6, 0.9], [0.6, 0.6, 0.6, 0.9]), "MenuLabelInv": ui_weight_clr([0.75, 0.75, 0.75, 0.9], [1, 1, 0.9, 0.9]), "TabPanelOutline": [0.225, 0.225, 0.225, 0.8], "ScrollBG": ui_weight_clr([0.8, 0.8, 0.8, 1.0], [1, 1, 1, 1]), "ScrollBar": ui_weight_clr([0.6, 0.6, 0.6, 1.0], [1, 1, 1, 1]), "ScrollBarHigh": ui_weight_clr([0.4, 0.4, 0.4, 1.0], [1, 1, 1, 1]), "ScrollButton": ui_weight_clr([0.8, 0.8, 0.8, 1.0], [1, 1, 1, 1]), "ScrollButtonHigh": ui_weight_clr([0.75, 0.75, 0.75, 1.0], [1, 1, 1, 1]), "ScrollInv": ui_weight_clr([0.4, 0.4, 0.4, 1.0], [1, 1, 1, 1]), "TabText": [0.77, 0.77, 0.77, 1.0], "MenuText": [0.1, 0.1, 0.1, 1.0], "MenuTextHigh": [0.9, 0.9, 0.9, 1.0], "IconBox": [0.8, 0.8, 0.8, 0.0], "HighlightTab": [1.0, 0.865, 0.67, 0.9], "HighlightIcon": [1.0, 0.85, 0.3, 0.5], "IconInv": ui_weight_clr([0.4, 0.4, 0.4, 0.4], [1, 1, 1, 1])});
  window.uicolors = {}
  window.colors3d = {}
  function Theme(ui, view2d) {
    this.ui = ui;
    this.view2d = view2d;
  }
  /*test for IE bug*/;
  if (Theme.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        Theme.name = 'Theme';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  Theme = create_prototype(Theme, _es6_module, "Theme");
  Theme.prototype.patch = function(theme) {
    this.ui.patch(theme.ui);
  }
  Theme.prototype.gen_code = function() {
    var s='"use strict";\n/*auto-generated file*/\nvar UITheme = '+this.ui.gen_code()+"\n";
    return s;
  }
  define_static(Theme, "fromSTRUCT", function(reader) {
    var ret=new Theme();
    reader(ret);
    return ret;
  });
  Theme.prototype.gen_globals = function() {
    
    uicolors = this.ui.gen_colors();
  }
  _es6_module.add_class(Theme);
  Theme = _es6_module.add_export('Theme', Theme);
  
  window.init_theme = function() {
    window.g_theme = new Theme(window.UITheme, View2DTheme);
    window.g_theme.gen_globals();
  }
});
es6_module_define('theme_def', ["theme"], function _theme_def_module(_es6_module) {
  "use strict";
  var ColorTheme=es6_import_item(_es6_module, 'theme', 'ColorTheme');
  var ui_weight_clr=es6_import_item(_es6_module, 'theme', 'ui_weight_clr');
  window.UITheme = new ColorTheme({"ErrorText": [1, 0.20000000298023224, 0.20000000298023224, 1], "ListBoxText": [0.20000000298023224, 0.20000000298023224, 0.20000000298023224, 1], "Highlight": [1, 0.75, 0.20999999344348907, 1], "MenuHighlight": [0.6476190686225891, 0.7124781012535095, 0.9066666960716248, 1], "RadialMenu": [0.8500000238418579, 0.6499999761581421, 0.3499999940395355, 0.800000011920929], "RadialMenuHighlight": [0.8500000238418579, 0.8500000238418579, 0.8500000238418579, 0.5], "DefaultLine": [0.20000000298023224, 0.20000000298023224, 0.20000000298023224, 1], "SelectLine": [0.699999988079071, 0.699999988079071, 0.699999988079071, 1], "Check": [0.8999999761581421, 0.699999988079071, 0.4000000059604645, 1], "Arrow": [0.4000000059604645, 0.4000000059604645, 0.4000000059604645, 1], "DefaultText": [0.9252262115478516, 0.9252262115478516, 0.9252262115478516, 1], "BoxText": [0.3400000035762787, 0.3400000035762787, 0.3400000035762787, 1], "HotkeyText": [0.43986162543296814, 0.43986162543296814, 0.43986162543296814, 1], "HighlightCursor": [0.8999999761581421, 0.8999999761581421, 0.8999999761581421, 0.875], "TextSelect": [0.4000000059604645, 0.4000000059604645, 0.4000000059604645, 0.75], "TextEditCursor": [0.10000000149011612, 0.10000000149011612, 0.10000000149011612, 1], "TextBoxHighlight": [0.527, 0.527, 0.527, 1.0], "MenuSep": [0.6901277303695679, 0.6901277303695679, 0.6901277303695679, 1], "MenuBorder": [0.65, 0.65, 0.65, 1], "RadialMenuSep": [0.10000000149011612, 0.20000000298023224, 0.20000000298023224, 1], "TabPanelOutline": [0.07333333045244217, 0.07333333045244217, 0.07333333045244217, 0.800000011920929], "TabText": [0.77, 0.77, 0.77, 1], "IconBox": [1, 1, 1, 0.17968888580799103], "HighlightTab": [1, 1, 1, 0.8999999761581421], "HighlightIcon": [0.30000001192092896, 0.8149344325065613, 1, 0.21444444358348846], "MenuText": [0.10000000149011612, 0.10000000149011612, 0.10000000149011612, 1], "MenuTextHigh": [0.9330000281333923, 0.9330000281333923, 0.9330000281333923, 1], "PanelText": [0, 0, 0, 1], "DialogText": [0.0500000298023224, 0.05000000298023224, 0.05000000298023224, 1], "DialogBorder": [0.2, 0.2, 0.2, 1.0], "NoteBox": ui_weight_clr([0.6, 0.6, 0.6, 1.0], [1, 1, 1, 1]), "Box": ui_weight_clr([0.8763743042945862, 0.8763743042945862, 0.8763743042945862, 0.8999999761581421], [0.8530666828155518, 0.9299111366271973, 1, 1]), "DisabledBox": [0.2, 0.2, 0.2, 1.0], "HoverHint": ui_weight_clr([1, 0.977, 0.893, 0.9], [0.9, 0.9, 1, 1]), "ErrorBox": ui_weight_clr([1, 0.30000001192092896, 0.20000000298023224, 1], [1, 1, 1, 1]), "ErrorTextBG": ui_weight_clr([1, 1, 1, 1], [0.8999999761581421, 0.8999999761581421, 1, 1]), "ShadowBox": ui_weight_clr([0, 0, 0, 0.10000000149011612], [1, 1, 1, 1]), "ProgressBar": ui_weight_clr([0.4000000059604645, 0.7300000190734863, 0.8999999761581421, 0.8999999761581421], [0.75, 0.75, 1, 1]), "ProgressBarBG": ui_weight_clr([0.699999988079071, 0.699999988079071, 0.699999988079071, 0.699999988079071], [1, 1, 1, 1]), "WarningBox": ui_weight_clr([1, 0.800000011920929, 0.10000000149011612, 0.8999999761581421], [0.699999988079071, 0.800000011920929, 1.0499999523162842, 1]), "ListBoxBG": ui_weight_clr([0.8999999761581421, 0.8999999761581421, 0.8999999761581421, 0.8999999761581421], [1, 1, 1, 1]), "InvBox": ui_weight_clr([0.6690419912338257, 0.7471543550491333, 0.8144859075546265, 1], [0.8232888579368591, 0.699999988079071, 0.699999988079071, 0.699999988079071]), "HLightBox": ui_weight_clr([0.79569011926651, 0.8727325201034546, 0.8771386742591858, 0.8999999761581421], [0.8500000238418579, 0.8500000238418579, 1, 1]), "ActivePanel": ui_weight_clr([0.800000011920929, 0.4000000059604645, 0.30000001192092896, 0.8999999761581421], [1, 1, 1, 1]), "CollapsingPanel": ui_weight_clr([0.487468421459198, 0.487468421459198, 0.487468421459198, 1], [1, 1, 1, 1]), "SimpleBox": ui_weight_clr([0.5477339625358582, 0.5477339625358582, 0.5477339625358582, 1], [1, 1, 1, 1]), "DialogBox": ui_weight_clr([0.727, 0.727, 0.727, 1.0], [1, 1, 1, 1]), "DialogTitle": ui_weight_clr([0.63, 0.63, 0.63, 1.0], [1, 1, 1, 1]), "MenuBox": ui_weight_clr([0.92, 0.92, 0.92, 1], [1, 1, 1, 1]), "TextBox": ui_weight_clr([0.800000011920929, 0.800000011920929, 0.800000011920929, 0.8999999761581421], [1, 1, 1, 1]), "TextBoxInv": ui_weight_clr([0.699999988079071, 0.699999988079071, 0.699999988079071, 1], [0.699999988079071, 0.699999988079071, 0.699999988079071, 1]), "MenuLabel": ui_weight_clr([0.9044828414916992, 0.8657192587852478, 0.8657192587852478, 0.24075555801391602], [0.6000000238418579, 0.6000000238418579, 0.6000000238418579, 0.8999999761581421]), "MenuLabelInv": ui_weight_clr([0.75, 0.75, 0.75, 0.47111111879348755], [1, 1, 0.9410666823387146, 1]), "ScrollBG": ui_weight_clr([0.800000011920929, 0.800000011920929, 0.800000011920929, 1], [1, 1, 1, 1]), "ScrollBar": ui_weight_clr([0.5919697284698486, 0.5919697284698486, 0.5919697284698486, 1], [1, 1, 1, 1]), "ScrollBarHigh": ui_weight_clr([0.6548083424568176, 0.6548083424568176, 0.6548083424568176, 1], [1, 1, 1, 1]), "ScrollButton": ui_weight_clr([0.800000011920929, 0.800000011920929, 0.800000011920929, 1], [1, 1, 1, 1]), "ScrollButtonHigh": ui_weight_clr([0.75, 0.75, 0.75, 1], [1, 1, 1, 1]), "ScrollInv": ui_weight_clr([0.4000000059604645, 0.4000000059604645, 0.4000000059604645, 1], [1, 1, 1, 1]), "IconInv": ui_weight_clr([0.48299384117126465, 0.5367956161499023, 0.8049896955490112, 0.4000000059604645], [1, 1, 1, 1])});
  var View2DTheme=new ColorTheme({"Background": [1, 1, 1, 1], "ActiveObject": [0.800000011920929, 0.6000000238418579, 0.30000001192092896, 1], "Selection": [0.699999988079071, 0.4000000059604645, 0.10000000149011612, 1], "GridLineBold": [0.38, 0.38, 0.38, 1.0], "GridLine": [0.5, 0.5, 0.5, 1.0], "AxisX": [0.9, 0.0, 0.0, 1.0], "AxisY": [0.0, 0.9, 0.0, 1.0], "AxisZ": [0.0, 0.0, 0.9, 1.0]});
});
es6_module_define('touchevents', [], function _touchevents_module(_es6_module) {
  "use strict";
  function TouchManager(event) {
    this.pattern = new set(Object.keys(event.touches));
    this.idxmap = {}
    this.tot = event.touches.length;
    this.event = event;
    this.deltas = {}
    var i=0;
    var __iter_k=__get_iter(event.touches);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      this.idxmap[i++] = k;
      this.deltas[k] = 0.0;
    }
  }
  /*test for IE bug*/;
  if (TouchManager.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TouchManager.name = 'TouchManager';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TouchManager = create_prototype(TouchManager, _es6_module, "TouchManager");
  TouchManager.prototype.update = function(event) {
    if (this.valid(event)) {
        var __iter_k=__get_iter(event.touches);
        var k;
        while (1) {
          var __ival_k=__iter_k.next();
          if (__ival_k.done) {
              break;
          }
          k = __ival_k.value;
          var t2=event.touches[k];
          var t1=this.event.touches[k];
          var d=[t2[0]-t1[0], t2[1]-t1[1]];
          this.deltas[k] = d;
        }
    }
    this.event = event;
  }
  TouchManager.prototype.delta = function(i) {
    return this.deltas[this.idxmap[i]];
  }
  TouchManager.prototype.get = function(i) {
    return this.event.touches[this.idxmap[i]];
  }
  TouchManager.prototype.valid = function(event) {
    if (event==undefined) {
        event = this.event;
    }
    var keys=Object.keys(event.touches);
    if (keys.length!=this.pattern.length)
      return false;
    for (var i=0; i<keys.length; i++) {
        if (!pattern.has(keys[i]))
          return false;
    }
    return true;
  }
  _es6_module.add_class(TouchManager);
});
es6_module_define('UICanvas', ["vectormath"], function _UICanvas_module(_es6_module) {
  "use strict";
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var $_mh;
  var $_swapt;
  window.active_canvases = {}
  window._canvas_draw_id = 1;
  var _trilist_n0=new Vector3();
  var _trilist_n1=new Vector3();
  var _trilist_n2=new Vector3();
  var _trilist_n3=new Vector3();
  var _trilist_v1=new Vector3();
  var _trilist_v2=new Vector3();
  var _trilist_v3=new Vector3();
  var _trilist_v4=new Vector3();
  var _trilist_c1=new Vector4();
  var _trilist_c2=new Vector4();
  var _trilist_c3=new Vector4();
  var _trilist_c4=new Vector4();
  var _trilist_v5=new Vector3();
  var _trilist_v6=new Vector3();
  var _trilist_v7=new Vector3();
  var _trilist_v8=new Vector3();
  var _trilist_v9=new Vector3();
  function TriListAlloc() {
    this.freelist = [];
    this.freecount = 0;
    this.usedcount = 0;
    this.peakcount = 0;
  }
  /*test for IE bug*/;
  if (TriListAlloc.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TriListAlloc.name = 'TriListAlloc';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TriListAlloc = create_prototype(TriListAlloc, _es6_module, "TriListAlloc");
  TriListAlloc.prototype.alloc = function(canvas, transmat, use_small_icons) {
    if (use_small_icons==undefined) {
        use_small_icons = false;
    }
    this.peakcount = Math.max(this.peakcount, this.usedcount+1);
    return new TriList(canvas, transmat, use_small_icons);
    if (this.freecount==0) {
        if (this.usedcount==0) {
            for (var i=0; i<8192; i++) {
                var tl=new TriList(canvas, transmat, use_small_icons);
                tl.cache_destroy();
                this.freelist.push(tl);
                this.freecount++;
            }
        }
        this.usedcount++;
        return new TriList(canvas, transmat, use_small_icons);
    }
    else {
      var ret=this.freelist.pop();
      ret.cache_init(canvas, transmat, use_small_icons);
      this.freecount--;
      this.usedcount++;
      return ret;
    }
  }
  TriListAlloc.prototype.free = function(trilist) {
    this.usedcount--;
    trilist.cache_destroy();
    return ;
    if (this.freecount>=8192)
      return ;
    trilist.cache_destroy();
    this.freelist.push(trilist);
    this.freecount++;
  }
  _es6_module.add_class(TriListAlloc);
  TriListAlloc = _es6_module.add_export('TriListAlloc', TriListAlloc);
  var _talloc=new TriListAlloc();
  function TriListRef(gl, trilist, mat, canvas) {
    this.trilist = trilist;
    this.mat = mat;
    this.workmat = new Matrix4();
    this.gl = gl;
    this.canvas = canvas;
  }
  /*test for IE bug*/;
  if (TriListRef.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TriListRef.name = 'TriListRef';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TriListRef = create_prototype(TriListRef, _es6_module, "TriListRef");
  TriListRef.prototype.destroy = function() {
  }
  TriListRef.prototype.on_draw = function(gl) {
    this.workmat.load(this.mat);
    this.workmat.multiply(this.canvas.global_matrix);
    this.trilist.global_matrix = this.workmat;
    this.trilist.on_draw(gl);
  }
  _es6_module.add_class(TriListRef);
  TriListRef = _es6_module.add_export('TriListRef', TriListRef);
  function TriListCache(limit) {
    if (limit==undefined) {
        limit = 100;
    }
    this.cache = {}
    this.length = 0;
    this.limit = limit;
  }
  /*test for IE bug*/;
  if (TriListCache.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TriListCache.name = 'TriListCache';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TriListCache = create_prototype(TriListCache, _es6_module, "TriListCache");
  TriListCache.prototype.get = function(key) {
    return this.cache[key];
  }
  TriListCache.prototype.has = function(key) {
    return key in this.cache;
  }
  TriListCache.prototype.set = function(key, trilist) {
    if (!(key in this.cache)) {
        this.length++;
    }
    this.cache[key] = trilist;
  }
  TriListCache.prototype.remove = function(key) {
    if (key in this.cache) {
        this.cache[key].destroy();
        this.length--;
        delete this.cache[key];
    }
  }
  TriListCache.prototype.destroy = function() {
    var __iter_k=__get_iter(this.cache);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var tl=this.cache[k];
      tl.destroy();
    }
    this.cache = {}
    this.length = 0;
  }
  TriListCache.prototype.on_gl_lost = function() {
    this.length = 0;
    this.cache = {}
  }
  _es6_module.add_class(TriListCache);
  TriListCache = _es6_module.add_export('TriListCache', TriListCache);
  function TriList(canvas, transmat, use_small_icons) {
    if (use_small_icons==undefined) {
        use_small_icons = false;
    }
    this._id = _canvas_draw_id++;
    this.transmat = transmat;
    this.global_matrix = canvas.global_matrix;
    this.verts = [];
    this.colors = [];
    this.texcos = [];
    this._dead = false;
    this.vertbuf = undefined;
    this.colorbuf = undefined;
    this.texbuf = undefined;
    this.use_tex = 1;
    this.tex = 0;
    this.iconsheet = use_small_icons ? g_app_state.raster.iconsheet16 : g_app_state.raster.iconsheet;
    this.small_icons = use_small_icons;
    this.recalc = 1;
    this.tottri = 0;
    this.canvas = canvas;
    this.spos = undefined;
    this.ssize = undefined;
    this.gl_spos = undefined;
    this.gl_ssize = undefined;
    this.viewport = canvas!=undefined ? canvas.viewport : undefined;
  }
  /*test for IE bug*/;
  if (TriList.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TriList.name = 'TriList';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TriList = create_prototype(TriList, _es6_module, "TriList");
  TriList.prototype.cache_destroy = function() {
    this._free_typed();
    this.verts.length = 0;
    this.texcos.length = 0;
    this.colors.length = 0;
    this.tottri = 0;
    this._dead = true;
  }
  TriList.prototype._free_typed = function() {
    this.vertbuf = undefined;
    
    this.colorbuf = undefined;
    
    this.texbuf = undefined;
    
  }
  TriList.prototype.cache_init = function(canvas, transmat, use_small_icons) {
    if (use_small_icons==undefined) {
        use_small_icons = false;
    }
    this._dead = false;
    this.transmat = transmat;
    this.global_matrix = canvas.global_matrix;
    this.use_tex = 1;
    this.tex = 0;
    this.iconsheet = use_small_icons ? g_app_state.raster.iconsheet16 : g_app_state.raster.iconsheet;
    this.small_icons = use_small_icons;
    this.verts.length = 0;
    this.colors.length = 0;
    this.texcos.length = 0;
    this.recalc = 1;
    this.tottri = 0;
    this.canvas = canvas;
    this.spos = undefined;
    this.ssize = undefined;
    this.gl_spos = undefined;
    this.gl_ssize = undefined;
    this.viewport = canvas!=undefined ? canvas.viewport : undefined;
  }
  var $v12_TriList_add_tri=new Vector3();
  var $v32_TriList_add_tri=new Vector3();
  var $negone_TriList_add_tri=[-1, -1];
  var $v22_TriList_add_tri=new Vector3();
  TriList.prototype.add_tri = function(v1, v2, v3, c1, c2, c3, t1, t2, t3) {
    var vs=this.verts;
    this.tottri++;
    $v12_TriList_add_tri.loadxy(v1);
    $v22_TriList_add_tri.loadxy(v2);
    $v32_TriList_add_tri.loadxy(v3);
    v1 = $v12_TriList_add_tri;
    v2 = $v22_TriList_add_tri;
    v3 = $v32_TriList_add_tri;
    this.transform(v1);
    this.transform(v2);
    this.transform(v3);
    vs.push(v1[0]);
    vs.push(v1[1]);
    vs.push(v1[2]);
    vs.push(v2[0]);
    vs.push(v2[1]);
    vs.push(v2[2]);
    vs.push(v3[0]);
    vs.push(v3[1]);
    vs.push(v3[2]);
    var cs=this.colors;
    if (c2==undefined) {
        c2 = c1;
        c3 = c1;
    }
    cs.push(c1[0]);
    cs.push(c1[1]);
    cs.push(c1[2]);
    cs.push(c1[3]);
    cs.push(c2[0]);
    cs.push(c2[1]);
    cs.push(c2[2]);
    cs.push(c2[3]);
    cs.push(c3[0]);
    cs.push(c3[1]);
    cs.push(c3[2]);
    cs.push(c3[3]);
    if (this.use_tex) {
        if (t1==undefined) {
            t1 = t2 = t3 = $negone_TriList_add_tri;
        }
        var ts=this.texcos;
        ts.push(t1[0]);
        ts.push(t1[1]);
        ts.push(t2[0]);
        ts.push(t2[1]);
        ts.push(t3[0]);
        ts.push(t3[1]);
    }
  }
  TriList.prototype.add_quad = function(v1, v2, v3, v4, c1, c2, c3, c4, t1, t2, t3, t4) {
    this.add_tri(v1, v2, v3, c1, c2, c3, t1, t2, t3);
    this.add_tri(v1, v3, v4, c1, c3, c4, t1, t3, t4);
  }
  var $tcos_TriList_icon_quad=new Array(0);
  TriList.prototype.icon_quad = function(icon, pos, cs) {
    var cw=this.iconsheet.cellsize[0], ch=this.iconsheet.cellsize[1];
    var v1=new Vector3([pos[0], pos[1], 0.0]);
    var v2=new Vector3([pos[0], pos[1]+ch, 0.0]);
    var v3=new Vector3([pos[0]+cw, pos[1]+ch, 0.0]);
    var v4=new Vector3([pos[0]+cw, pos[1], 0.0]);
    $tcos_TriList_icon_quad.length = 0;
    this.iconsheet.gen_tile(icon, $tcos_TriList_icon_quad);
    var t1=new Vector3([$tcos_TriList_icon_quad[0], $tcos_TriList_icon_quad[1], 0]);
    var t2=new Vector3([$tcos_TriList_icon_quad[2], $tcos_TriList_icon_quad[3], 0]);
    var t3=new Vector3([$tcos_TriList_icon_quad[4], $tcos_TriList_icon_quad[5], 0]);
    var t4=new Vector3([$tcos_TriList_icon_quad[6], $tcos_TriList_icon_quad[7], 0]);
    var t5=new Vector3([$tcos_TriList_icon_quad[8], $tcos_TriList_icon_quad[9], 0]);
    var t6=new Vector3([$tcos_TriList_icon_quad[10], $tcos_TriList_icon_quad[11], 0]);
    this.add_tri(v1, v2, v3, cs[0], cs[1], cs[2], t1, t2, t3);
    this.add_tri(v1, v3, v4, cs[0], cs[2], cs[3], t4, t5, t6);
  }
  var $transvec_TriList_transform=new Vector3();
  TriList.prototype.transform = function(v) {
    $transvec_TriList_transform[0] = v[0];
    $transvec_TriList_transform[1] = v[1];
    $transvec_TriList_transform[2] = 0.0;
    $transvec_TriList_transform.multVecMatrix(this.transmat);
    v[0] = ($transvec_TriList_transform[0]/this.viewport[1][0])*2.0-1.0;
    v[1] = ($transvec_TriList_transform[1]/this.viewport[1][1])*2.0-1.0;
  }
  TriList.prototype.line = function(v1, v2, c1, c2, width) {
    if (c2==undefined) {
        c2 = undefined;
    }
    if (width==undefined) {
        width = undefined;
    }
    if (c2==undefined) {
        c2 = c1;
    }
    if (v1.length==2)
      v1.push(0);
    if (v2.length==2)
      v2.push(0);
    this.line_strip([[v1, v2], [c1, c2]], undefined, width);
  }
  var $black_TriList_line_strip=new Vector4([0.0, 0.0, 0.0, 1.0]);
  var $v3_TriList_line_strip=new Vector3();
  var $n0_TriList_line_strip=new Vector3();
  var $c4_TriList_line_strip=new Vector3();
  var $v0_TriList_line_strip=new Vector3();
  var $v2_TriList_line_strip=new Vector3();
  var $n1_TriList_line_strip=new Vector3();
  var $c3_TriList_line_strip=new Vector3();
  var $v1_TriList_line_strip=new Vector3();
  var $n2_TriList_line_strip=new Vector3();
  var $v4_TriList_line_strip=new Vector3();
  TriList.prototype.line_strip = function(lines, colors, texcos, width, half) {
    if (texcos==undefined) {
        texcos = undefined;
    }
    if (width==undefined) {
        width = 2.0;
    }
    if (half==undefined) {
        half = false;
    }
    for (var i=0; i<lines.length; i++) {
        var lc1=colors[i][0], lc2=colors[i][1];
        if (lc1==undefined)
          lc1 = $black_TriList_line_strip;
        if (lc2==undefined)
          lc2 = $black_TriList_line_strip;
        var z=0.0;
        $v1_TriList_line_strip.loadxy(lines[i][0]);
        $v2_TriList_line_strip.loadxy(lines[i][1]);
        $n0_TriList_line_strip.zero();
        $n1_TriList_line_strip.zero();
        $n2_TriList_line_strip.zero();
        $v1_TriList_line_strip.loadxy(lines[i][1]);
        $v1_TriList_line_strip.sub(lines[i][0]);
        $v1_TriList_line_strip.normalize();
        $n1_TriList_line_strip[0] = $v1_TriList_line_strip[1];
        $n1_TriList_line_strip[1] = -$v1_TriList_line_strip[0];
        $n1_TriList_line_strip[2] = z;
        $n1_TriList_line_strip.normalize();
        if (i>0) {
            $v0_TriList_line_strip.loadxy(lines[i-1][1]);
            $v0_TriList_line_strip.sub(lines[i-1][0]);
            $v0_TriList_line_strip.normalize();
            $n0_TriList_line_strip[0] = $v0_TriList_line_strip[1];
            $n0_TriList_line_strip[1] = -$v0_TriList_line_strip[0];
            $n0_TriList_line_strip[2] = z;
            $n0_TriList_line_strip.normalize();
        }
        else {
          $n0_TriList_line_strip.load($n1_TriList_line_strip);
        }
        $v1_TriList_line_strip.loadxy(lines[i][1]);
        $v1_TriList_line_strip.sub(lines[i][0]);
        if (i<lines.length-1) {
            $v3_TriList_line_strip.loadxy(lines[i+1][1]);
            $v3_TriList_line_strip.sub(lines[i+1][0]);
            $v3_TriList_line_strip.normalize();
            $n2_TriList_line_strip[0] = $v3_TriList_line_strip[1];
            $n2_TriList_line_strip[1] = -$v3_TriList_line_strip[0];
            $n2_TriList_line_strip[2] = z;
            $n2_TriList_line_strip.normalize();
        }
        else {
          $n2_TriList_line_strip.load($n1_TriList_line_strip);
        }
        $n2_TriList_line_strip.add($n1_TriList_line_strip).normalize();
        $n1_TriList_line_strip.add($n0_TriList_line_strip).normalize();
        $n1_TriList_line_strip.mulScalar(width*0.5);
        $n2_TriList_line_strip.mulScalar(width*0.5);
        $v0_TriList_line_strip.loadxy(lines[i][0]);
        $v1_TriList_line_strip.loadxy(lines[i][1]);
        $v2_TriList_line_strip.loadxy(lines[i][1]);
        $v2_TriList_line_strip.add($n1_TriList_line_strip);
        $v3_TriList_line_strip.loadxy(lines[i][0]);
        $v3_TriList_line_strip.add($n2_TriList_line_strip);
        var c1=_trilist_c1.load(lc1);
        var c2=_trilist_c2.load(lc2);
        var $c3_TriList_line_strip=_trilist_c3.load(lc2);
        var $c4_TriList_line_strip=_trilist_c4.load(lc1);
        if (width>=1.5) {
            $c3_TriList_line_strip[3] = 0.0;
            $c4_TriList_line_strip[3] = 0.0;
        }
        $n1_TriList_line_strip.mulScalar(2.0);
        $n2_TriList_line_strip.mulScalar(2.0);
        if (this.use_tex&&texcos) {
            if (!half)
              this.add_quad($v0_TriList_line_strip, $v1_TriList_line_strip, $v2_TriList_line_strip, $v3_TriList_line_strip, c1, c2, $c3_TriList_line_strip, $c4_TriList_line_strip, texcos[i][0], texcos[i][1], texcos[i][0], texcos[i][1]);
            this.add_quad($v1_TriList_line_strip, $v0_TriList_line_strip, $v3_TriList_line_strip.sub($n1_TriList_line_strip), $v2_TriList_line_strip.sub($n2_TriList_line_strip), c2, c1, $c3_TriList_line_strip, $c4_TriList_line_strip, texcos[i][0], texcos[i][1], texcos[i][0], texcos[i][1]);
        }
        else {
          if (!half)
            this.add_quad($v0_TriList_line_strip, $v1_TriList_line_strip, $v2_TriList_line_strip, $v3_TriList_line_strip, c1, c2, $c3_TriList_line_strip, $c4_TriList_line_strip);
          this.add_quad($v1_TriList_line_strip, $v0_TriList_line_strip, $v3_TriList_line_strip.sub($n2_TriList_line_strip), $v2_TriList_line_strip.sub($n1_TriList_line_strip), c2, c1, $c3_TriList_line_strip, $c4_TriList_line_strip);
        }
    }
  }
  TriList.prototype.destroy = function(only_gl) {
    if (only_gl==undefined) {
        only_gl = false;
    }
    var gl=g_app_state.gl;
    if (this.vbuf) {
        gl.deleteBuffer(this.vbuf);
        gl.deleteBuffer(this.cbuf);
    }
    if (this.tbuf) {
        gl.deleteBuffer(this.tbuf);
    }
    this.vbuf = this.cbuf = this.tbuf = undefined;
    this.recalc = 1;
    this._free_typed();
    if (!only_gl) {
        this._dead = true;
        _talloc.free(this);
    }
  }
  TriList.prototype.gen_buffers = function(gl) {
    if (this.verts.length==0)
      return ;
    this.destroy(true);
    this._free_typed();
    this._dead = false;
    this.vertbuf = new Float32Array(this.verts);
    
    this.colorbuf = new Float32Array(this.colors);
    
    if (this.use_tex)
      this.texbuf = new Float32Array(this.texcos);
    
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    if (this.use_tex)
      gl.enableVertexAttribArray(2);
    else 
      gl.disableVertexAttribArray(2);
    var vbuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertbuf, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
    var cbuf=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.colorbuf, gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cbuf);
    if (this.use_tex) {
        var tbuf=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tbuf);
        gl.bufferData(gl.ARRAY_BUFFER, this.texbuf, gl.STATIC_DRAW);
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, tbuf);
        this.tbuf = tbuf;
    }
    this.vbuf = vbuf;
    this.cbuf = cbuf;
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    this.recalc = 0;
  }
  TriList.prototype.on_draw = function(gl) {
    if (!this.iconsheet.ready)
      return ;
    if (this.verts.length==0)
      return ;
    if (this.recalc||(this.tdrawbuf!=undefined&&this.tdrawbuf.is_dead)) {
        this.gen_buffers(gl);
    }
    if (this.ssize!=undefined) {
        gl.enable(gl.SCISSOR_TEST);
    }
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl_blend_func(gl);
    gl.enableVertexAttribArray(0);
    gl.enableVertexAttribArray(1);
    gl.disableVertexAttribArray(3);
    gl.disableVertexAttribArray(4);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuf);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbuf);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbuf);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.cbuf);
    if (this.use_tex) {
        gl.enableVertexAttribArray(2);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuf);
        gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tbuf);
    }
    else {
      gl.disableVertexAttribArray(2);
    }
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, this.iconsheet.tex);
    gl.useProgram(gl.basic2d.program);
    this.global_matrix.setUniform(gl, gl.basic2d.uniformloc(gl, "mat"));
    gl.uniform1i(gl.basic2d.uniformloc(gl, "iconsampler"), 4);
    gl.drawArrays(gl.TRIANGLES, 0, this.tottri*3);
    gl.disableVertexAttribArray(1);
    gl.disableVertexAttribArray(2);
    gl.enable(gl.DEPTH_TEST);
    if (this.ssize!=undefined) {
    }
  }
  _es6_module.add_class(TriList);
  TriList = _es6_module.add_export('TriList', TriList);
  function TextDraw(pos, text, color, spos, ssize, viewport, size, scale, global_matrix, rot) {
    if (rot==undefined) {
        rot = 0;
    }
    this._id = _canvas_draw_id++;
    this.rot = rot;
    this.global_matrix = global_matrix;
    this.text = text;
    this.pos = [pos[0], pos[1], pos[2]];
    this.color = color;
    this.tdrawbuf = undefined;
    this.spos = spos;
    this.ssize = ssize;
    this.asp = viewport[1][1]/viewport[1][0];
    this.viewport = viewport;
    this.scale = [scale[0], scale[1], 0];
    this.size = size;
    this.raster = g_app_state.raster;
    var mat=new Matrix4();
    mat.translate(this.pos[0], this.pos[1], 0.0);
    mat.scale(1, 1.0/this.asp, 1);
    mat.rotate(0, 0, rot);
    mat.scale(this.scale);
    mat.scale(1, this.asp, 1);
    this.mat = mat;
  }
  /*test for IE bug*/;
  if (TextDraw.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        TextDraw.name = 'TextDraw';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  TextDraw = create_prototype(TextDraw, _es6_module, "TextDraw");
  TextDraw.prototype.destroy = function() {
  }
  TextDraw.prototype.toString = function() {
    return "TD"+this._id;
  }
  TextDraw.prototype.gen_buffers = function(gl) {
    this.tdrawbuf = this.raster.get_font(this.size).gen_text_buffers(gl, this.text, this.color, this.viewport);
    return this.tdrawbuf;
  }
  var $identitymat_TextDraw_on_draw=new Matrix4();
  var $mat_TextDraw_on_draw=new Matrix4();
  TextDraw.prototype.on_draw = function(gl) {
    gl.disableVertexAttribArray(4);
    if (this.tdrawbuf==undefined)
      this.gen_buffers(gl);
    var spos, ssize;
    if (this.ssize!=undefined) {
        spos = [this.spos[0], this.spos[1], 0];
        ssize = [this.ssize[0], this.ssize[1], 0];
    }
    $mat_TextDraw_on_draw.load(this.global_matrix);
    $mat_TextDraw_on_draw.multiply(this.mat);
    this.tdrawbuf.on_draw(gl, $mat_TextDraw_on_draw);
    if (this.ssize!=undefined) {
    }
  }
  _es6_module.add_class(TextDraw);
  TextDraw = _es6_module.add_export('TextDraw', TextDraw);
  var _ls_static_colors={reallength: 0, length: 0}
  var $arr4_window__box_process_clr=[0, 0, 0, 0];
  window._box_process_clr = function _box_process_clr(default_cs, clr) {
    var cs=default_cs;
    if (clr!=undefined) {
        if (typeof clr=="number") {
            var cs2=$arr4_window__box_process_clr;
            for (var i=0; i<4; i++) {
                cs2[i] = [cs[i][0], cs[i][1], cs[i][2], cs[i][3]];
                for (var j=0; j<4; j++) {
                    cs2[i]*=clr;
                }
            }
            cs = cs2;
        }
        else 
          if (typeof clr[0]=="number") {
            var cs=$arr4_window__box_process_clr;
            cs[0] = clr;
            cs[1] = clr;
            cs[2] = clr;
            cs[3] = clr;
        }
        else {
          cs = clr;
        }
    }
    return cs;
  }
  var $_id_HuSa_UICanvas_=1;
  function UICanvas_(viewport) {
    this._id = $_id_HuSa_UICanvas_++;
    this.global_matrix = new Matrix4();
    this.iconsheet = g_app_state.raster.iconsheet;
    this.iconsheet16 = g_app_state.raster.iconsheet16;
    this.viewport = viewport;
    this.raster = g_app_state.raster;
    this.trilist = _talloc.alloc(this, this.transmat);
    this.textcache = {}
    this.textcachelen = 0;
    this.max_textcache = 64;
    this.boxcache = new TriListCache();
    this.trans_stack = [];
    this.transmat = new Matrix4();
    this.drawlists = [this.trilist];
    this.textlist = [];
    this.stack = [];
    this.cache = new hashtable();
    this.oldcache = new hashtable();
    this.uncached = new Array();
    this.uncached.push(this.trilist);
    this.scissor_stack = new Array();
    this.flag = 0;
  }
  /*test for IE bug*/;
  if (UICanvas_.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UICanvas_.name = 'UICanvas_';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UICanvas_ = create_prototype(UICanvas_, _es6_module, "UICanvas_");
  UICanvas_.prototype.ensure_trilist = function() {
    if (this.drawlists.length==0||!(__instance_of(this.drawlists[this.drawlists.length-1], TriList))) {
        this.new_trilist();
    }
  }
  UICanvas_.prototype.set_viewport = function(viewport) {
    var bad=false;
    for (var i=0; i<3; i++) {
        if (viewport[1][i]!=this.viewport[1][i])
          bad = true;
    }
    this.viewport = viewport;
    if (bad) {
        this.on_resize(viewport[1], viewport[1]);
    }
  }
  UICanvas_.prototype.on_gl_lost = function(new_gl) {
    this.boxcache.on_gl_lost();
    if (this.gl===new_gl) {
        console.trace();
        console.log("Warning: uicanvas.on_gl_lost() called multiple times");
        return ;
    }
    this.gl = new_gl;
    this.drawlists = new Array();
    this.iconsheet = g_app_state.raster.iconsheet;
    this.iconsheet16 = g_app_state.raster.iconsheet16;
    this.textcache = {}
    this.textcachelen = 0;
    this.stack = [];
    this.raster = g_app_state.raster;
    this.cache = new hashtable();
    this.oldcache = new hashtable();
    this.boxcache = UICanvas.boxcache;
    this.new_trilist();
    this.reset();
  }
  UICanvas_.prototype.push_scissor = function(pos, size) {
    var oldpos=pos;
    pos = new Vector3([pos[0], pos[1], 0]);
    size = new Vector3([size[0], size[1], 0]);
    pos.multVecMatrix(this.transmat);
    size.multVecMatrix(this.transmat);
    var vx=this.viewport[0][0], vy=this.viewport[0][1];
    pos[0]+=vx;
    pos[1]+=vy;
    var dx=pos[0]-oldpos[0]-vx, dy=pos[1]-oldpos[1]-vy;
    size[0]-=dx;
    size[1]-=dy;
    for (var i=0; i<3; i++) {
        pos[i] = Math.floor(pos[i]);
        size[i] = Math.ceil(size[i]);
    }
    this.scissor_stack.push([pos, size]);
    this.new_trilist();
  }
  UICanvas_.prototype.pop_scissor = function() {
    this.scissor_stack.pop();
    this.new_trilist();
  }
  UICanvas_.prototype.new_trilist = function(use_small_icons) {
    if (use_small_icons==undefined) {
        use_small_icons = false;
    }
    active_canvases[this._id] = this;
    this.trilist = _talloc.alloc(this, this.transmat, use_small_icons);
    if (this.scissor_stack.length>0) {
        this.trilist.spos = this.scissor_stack[this.scissor_stack.length-1][0];
        this.trilist.ssize = this.scissor_stack[this.scissor_stack.length-1][1];
    }
    this.drawlists.push(this.trilist);
    return this.trilist;
  }
  UICanvas_.prototype.translate = function(off) {
    this.transmat.translate(off[0], off[1], 0.0);
  }
  UICanvas_.prototype.push_transform = function(mat) {
    if (mat==undefined) {
        mat = undefined;
    }
    this.trans_stack.push(new Matrix4(this.transmat));
    if (mat!=undefined)
      this.transmat.multiply(mat);
  }
  UICanvas_.prototype.pop_transform = function() {
    this.transmat.load(this.trans_stack.pop());
  }
  UICanvas_.prototype.frame_begin = function(item) {
    return ;
    if (DEBUG.ui_canvas) {
        console.log("canvas start, stack length: ", this.stack.length);
    }
    this.new_trilist();
    this.stack.push(this.drawlists.length-1);
  }
  UICanvas_.prototype.frame_end = function(item) {
    return ;
    var arr=new Array();
    var start=this.stack[this.stack.length-1];
    this.stack.pop();
    if (DEBUG.ui_canvas)
      console.log(start);
    for (var i=start; i<this.drawlists.length; i++) {
        arr.push(this.drawlists[i]);
    }
    this.cache.set(item, arr);
    this.new_trilist();
    if (DEBUG.ui_canvas) {
        console.log("canvas end, stack length: ", this.stack.length);
    }
    return arr;
  }
  UICanvas_.prototype.begin = function(item) {
    return ;
    if (DEBUG.ui_canvas) {
        console.log("canvas start, stack length: ", this.stack.length);
    }
    this.new_trilist();
    this.stack.push(this.drawlists.length-1);
  }
  UICanvas_.prototype.end = function(item) {
    return ;
    var arr=new Array();
    var start=this.stack.pop(this.stack.length-1);
    if (DEBUG.ui_canvas)
      console.log(start);
    for (var i=start; i<this.drawlists.length; i++) {
        arr.push(this.drawlists[i]);
    }
    this.stack.pop();
    this.cache.set(item, arr);
    this.new_trilist();
    if (DEBUG.ui_canvas) {
        console.log("canvas end, stack length: ", this.stack.length);
    }
    return arr;
  }
  UICanvas_.prototype.use_cache = function(item) {
    if (this.oldcache.has(item)) {
        var arr=this.oldcache.get(item);
        for (var i=0; i<arr.length; i++) {
            this.drawlists.push(arr[i]);
            if (__instance_of(arr[i], TextDraw))
              this.textlist.push(arr[i]);
        }
        this.oldcache.remove(item);
        this.cache.set(item, arr);
        this.new_trilist();
    }
  }
  UICanvas_.prototype.has_cache = function(item) {
    return this.oldcache.has(item);
  }
  UICanvas_.prototype.remove_cache = function(item) {
    if (this.oldcache.has(item))
      this.oldcache.remove(item);
  }
  UICanvas_.prototype.textsize = function(text, size) {
    if (size==undefined) {
        size = default_ui_font_size;
    }
    var box=this.raster.get_font(size).calcsize(text);
    return [box[0], box[1]];
  }
  UICanvas_.prototype.line = function(v1, v2, c1, c2, width) {
    if (c2==undefined) {
        c2 = c1;
    }
    if (width==undefined) {
        width = 2.0;
    }
    this.ensure_trilist();
    this.line_strip([[v1, v2]], [[c1, c2]], undefined, width);
  }
  UICanvas_.prototype.line_strip = function(lines, colors, texcos, width, half) {
    this.ensure_trilist();
    if (colors==undefined) {
        colors = uicolors["DefaultLine"];
    }
    if (typeof (colors[0])=="number") {
        var clr=colors;
        colors = _ls_static_colors;
        for (var i=0; i<lines.length; i++) {
            if (colors[i]==undefined) {
                colors[i] = [clr, clr];
            }
            else {
              colors[i][0] = clr;
              colors[i][1] = clr;
            }
        }
        colors.reallength = Math.max(colors.reallength, i);
        colors.length = i;
    }
    this.trilist.line_strip(lines, colors, texcos, width, half);
  }
  UICanvas_.prototype.line_loop = function(points, colors, texcos, width, half) {
    var lines=[];
    this.ensure_trilist();
    if (colors==undefined) {
        colors = uicolors["DefaultLine"];
    }
    var lcolors;
    if (typeof colors[0]!="number")
      lcolors = [];
    else 
      lcolors = [];
    for (var i=0; i<points.length; i++) {
        var i2=(i+1)%points.length;
        lines.push([points[i], points[i2]]);
        if (typeof (colors[0])!="number") {
            lcolors.push([colors[i], colors[i2]]);
        }
        else {
          lcolors.push([colors, colors]);
        }
    }
    this.line_strip(lines, lcolors, undefined, width, half);
  }
  UICanvas_.prototype.quad = function(v1, v2, v3, v4, c1, c2, c3, c4) {
    this.ensure_trilist();
    if (v1.length==2)
      v1.push(0);
    if (v2.length==2)
      v2.push(0);
    if (v3.length==2)
      v3.push(0);
    if (v4.length==2)
      v4.push(0);
    this.trilist.add_quad(v1, v2, v3, v4, c1, c2, c3, c4);
  }
  UICanvas_.prototype.quad_aa = function(v1, v2, v3, v4, c1, c2, c3, c4) {
    this.ensure_trilist();
    if (v1.length==2)
      v1.push(0);
    if (v2.length==2)
      v2.push(0);
    if (v3.length==2)
      v3.push(0);
    if (v4.length==2)
      v4.push(0);
    if (c2==undefined) {
        c2 = c3 = c4 = c1;
    }
    this.trilist.add_quad(v1, v2, v3, v4, c1, c2, c3, c4);
    var lines=[[v1, v4], [v4, v3], [v3, v2], [v2, v1]];
    var colors=[[c1, c4], [c4, c3], [c3, c2], [c2, c1]];
    this.trilist.line_strip(lines, colors, undefined, undefined, true);
  }
  UICanvas_.prototype.tri = function(v1, v2, v3, c1, c2, c3) {
    this.ensure_trilist();
    if (v1.length==2)
      v1.push(0);
    if (v2.length==2)
      v2.push(0);
    if (v3.length==2)
      v3.push(0);
    this.trilist.add_tri(v1, v2, v3, c1, c2, c3);
  }
  UICanvas_.prototype.on_draw = function(gl) {
    gl.viewport(this.viewport[0][0], this.viewport[0][1], this.viewport[1][0], this.viewport[1][1]);
    var len=this.drawlists.length;
    for (var i=0; i<len; i++) {
        if (DEBUG.canvas_sep_text&&__instance_of(this.drawlists[i], TextDraw))
          continue;
        this.drawlists[i].on_draw(gl);
    }
    if (DEBUG.canvas_sep_text) {
        var len=this.textlist.length;
        for (var i=0; i<len; i++) {
            this.textlist[i].on_draw(gl);
        }
    }
  }
  UICanvas_.prototype.arc_points = function(pos, start, arc, r, steps) {
    if (steps==undefined) {
        steps = Math.floor(6*arc/Math.PI);
    }
    var f, df;
    var f=start;
    var df=arc/steps;
    var points=[];
    for (var i=0; i<steps+1; i++) {
        var x=pos[0]+Math.sin(f)*r;
        var y=pos[1]+Math.cos(f)*r;
        points.push([x, y, 0]);
        f+=df;
    }
    return points;
  }
  UICanvas_.prototype.arc = function(pos, start, arc, r, clr, half) {
    if (clr==undefined) {
        clr = [0.9, 0.8, 0.7, 0.6];
    }
    var steps=18/(2.0-arc/(Math.PI*2));
    var f, df;
    var f=start;
    var df=arc/steps;
    var points=[];
    for (var i=0; i<steps+1; i++) {
        var x=pos[0]+Math.sin(f)*r;
        var y=pos[1]+Math.cos(f)*r;
        points.push([x, y, 0]);
        f+=df;
    }
    var lines=[];
    var colors=[];
    for (var i=0; i<points.length-1; i++) {
        lines.push([points[i], points[i+1]]);
        colors.push([clr, clr]);
    }
    colors[0][0] = [1.0, 1.0, 0.0, 1.0];
    colors[0][1] = [1.0, 1.0, 0.0, 1.0];
    this.trilist.line_strip(lines, colors, undefined, undefined, half);
  }
  UICanvas_.prototype.destroy = function() {
    this.reset();
    var __iter_k=__get_iter(this.cache);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var arr=this.cache.get(k);
      for (var i=0; i<arr.length; i++) {
          arr[i].destroy();
          arr[i] = undefined;
      }
    }
    this.boxcache.destroy();
    this.cache = new hashtable();
    if (this._id in active_canvases) {
        delete active_canvases[this._id];
    }
  }
  UICanvas_.prototype.reset = function() {
    var dmap={}
    var __iter_k=__get_iter(this.cache);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var item=this.cache.get(k);
      for (var i=0; i<item.length; i++) {
          dmap[item[i]._id] = item[i];
      }
    }
    var dl=this.drawlists;
    for (var i=0; i<dl.length; i++) {
        if (!(dl[i]._id in dmap)) {
            dl[i].destroy();
        }
    }
    if (DEBUG.canvas_sep_text) {
        var tl=this.textlist;
        for (var i=0; i<tl.length; i++) {
            tl[i].destroy();
        }
        this.textlist.length = 0;
    }
    this.uncached.length = 0;
    this.scissor_stack.length = 0;
    var __iter_k=__get_iter(this.oldcache);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      var arr=this.oldcache.get(k);
      for (var i=0; i<arr.length; i++) {
          arr[i].destroy();
          arr[i] = undefined;
      }
    }
    this.oldcache = this.cache;
    this.cache = new hashtable();
    this.drawlists.length = 0;
    if (this.trans_stack.length>0) {
        this.trans_stack[0].makeIdentity();
        this.trans_stack.length = 1;
    }
    else {
      this.trans_stack.length = 0;
      this.trans_stack.push(new Matrix4());
    }
    this.transmat = this.trans_stack[0];
    this.stack.length = 0;
    this.new_trilist();
  }
  UICanvas_.prototype.invbox = function(pos, size, clr, r) {
    var cs=uicolors["InvBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas_.prototype.simple_box = function(pos, size, clr, r) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (r==undefined) {
        r = 2.0;
    }
    var cs=uicolors["SimpleBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas_.prototype.hlightbox = function(pos, size, clr_mul, r) {
    var cs=uicolors["HLightBox"];
    if (clr_mul!=undefined) {
        cs = [new Vector4(cs[0]), new Vector4(cs[1]), new Vector4(cs[2]), new Vector4(cs[3])];
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                cs[i][j]*=clr_mul;
            }
        }
    }
    this.box(pos, size, cs, r);
  }
  UICanvas_.prototype.box_outline = function(pos, size, clr, rfac) {
    this.box(pos, size, clr, rfac, true);
  }
  var $neg1_UICanvas__shadow_box=[-2, -2];
  UICanvas_.prototype.shadow_box = function(pos, size, steps, margin, clr) {
    if (steps==undefined) {
        steps = 6;
    }
    if (margin==undefined) {
        margin = [6, 6];
    }
    if (clr==undefined) {
        clr = uicolors["ShadowBox"];
    }
    var fac=(1.0/steps)*0.4;
    var clr=[clr[0], clr[1], clr[2], clr[3]*fac];
    pos = new Vector2(pos);
    size = new Vector2(size);
    expand_rect2d(pos, size, margin);
    for (var i=0; i<steps; i++) {
        this.box(pos, size, clr);
        expand_rect2d(pos, size, $neg1_UICanvas__shadow_box);
    }
  }
  UICanvas_.prototype.box = function(pos, size, clr, rfac, outline_only) {
    if (IsMobile||rfac==0.0)
      return this.box2(pos, size, clr, rfac, outline_only);
    else 
      return this.box1(pos, size, clr, rfac, outline_only);
  }
  UICanvas_.prototype.passpart = function(pos, size, clr) {
    if (clr==undefined) {
        clr = [0, 0, 0, 0.5];
    }
    this.ensure_trilist();
    var p=this.viewport[0];
    var s=this.viewport[1];
    this.box2([p[0], p[1]], [pos[0], s[1]], clr);
    this.box2([p[0]+pos[0]+size[0], p[1]], [s[0]-pos[0]-size[0], s[1]], clr);
    this.box2([pos[0]+p[0], pos[1]+p[1]+size[1]], [size[0], s[1]-size[1]-p[1]], clr);
    this.box2([pos[0]+p[0], p[1]], [size[0], pos[1]], clr);
  }
  var $white_UICanvas__icon=[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]];
  UICanvas_.prototype.icon = function(icon, pos, alpha, small, clr) {
    if (alpha==undefined) {
        alpha = 1.0;
    }
    if (small==undefined) {
        small = false;
    }
    if (clr==undefined) {
        clr = undefined;
    }
    var cs=_box_process_clr($white_UICanvas__icon, clr);
    for (var i=0; i<4; i++) {
        cs[i][3] = alpha;
    }
    this.ensure_trilist();
    if (this.trilist.small_icons!=small) {
        this.new_trilist(small);
    }
    this.trilist.icon_quad(icon, pos, cs);
  }
  UICanvas_.prototype.box2 = function(pos, size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (rfac==undefined) {
        rfac = undefined;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    this.ensure_trilist();
    var cs=uicolors["Box"];
    cs = _box_process_clr(cs, clr);
    var x=pos[0], y=pos[1];
    var w=size[0], h=size[1];
    if (outline_only) {
        this.line([pos[0], pos[1]], [pos[0], pos[1]+size[1]], clr, clr, 1.0);
        this.line([pos[0], pos[1]+size[1]], [pos[0]+size[0], pos[1]+size[1]], clr, clr, 1.0);
        this.line([pos[0]+size[0], pos[1]+size[1]], [pos[0]+size[0], pos[1]], clr, clr, 1.0);
        this.line([pos[0]+size[0], pos[1]], [pos[0], pos[1]], clr, clr, 1.0);
    }
    else {
      this.trilist.add_quad([x, y, 0], [x+w, y, 0], [x+w, y+h, 0], [x, y+h, 0], cs[0], cs[1], cs[2], cs[3]);
    }
  }
  var $v1_UICanvas__gen_box_trilist=new Vector3();
  var $v3_UICanvas__gen_box_trilist=new Vector3();
  var $pairs_UICanvas__gen_box_trilist=[];
  var $v2_UICanvas__gen_box_trilist=new Vector3();
  var $v4_UICanvas__gen_box_trilist=new Vector3();
  UICanvas_.prototype.gen_box_trilist = function(size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (rfac==undefined) {
        rfac = 1;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    var w=size[0], h=size[1];
    var start=0, ang=Math.PI/2, r=4;
    var cs=_box_process_clr(uicolors["Box"], clr);
    var trilist=new TriList(this, new Matrix4(), false);
    r/=rfac;
    var p1=this.arc_points([0+r+2, 0+r+2, 0], Math.PI, ang, r);
    var p2=this.arc_points([0+w-r-2, 0+r+2, 0], Math.PI/2, ang, r);
    var p3=this.arc_points([0+w-r-2, 0+h-r-2, 0], 0, ang, r);
    var p4=this.arc_points([0+r+2, 0+h-r-2, 0], -Math.PI/2, ang, r);
    var plen=p1.length;
    p4.reverse();
    p3.reverse();
    p2.reverse();
    p1.reverse();
    var points=[];
    for (var i=0; i<p1.length; i++) {
        points.push(p1[i]);
    }
    for (var i=0; i<p2.length; i++) {
        points.push(p2[i]);
        p1.push(p2[i]);
    }
    for (var i=0; i<p3.length; i++) {
        points.push(p3[i]);
    }
    p2 = p3;
    for (var i=0; i<p4.length; i++) {
        p2.push(p4[i]);
        points.push(p4[i]);
    }
    p2.reverse();
    var plen=p1.length;
    function color(i) {
      if (i<plen)
        return cs[0];
      else 
        if (i<plen*2)
        return cs[1];
      else 
        if (i<plen*3)
        return cs[2];
      else 
        if (i<=plen*4+1)
        return cs[3];
    }
    if (!outline_only) {
        for (var i=0; i<p1.length-1; i++) {
            var i1=i;
            var i2=i+plen*2;
            var i3=i+1+plen*2;
            var i4=i+1;
            $v1_UICanvas__gen_box_trilist[0] = p1[i][0];
            $v1_UICanvas__gen_box_trilist[1] = p1[i][1];
            $v1_UICanvas__gen_box_trilist[2] = p1[i][2];
            
            $v2_UICanvas__gen_box_trilist[0] = p2[i][0];
            $v2_UICanvas__gen_box_trilist[1] = p2[i][1];
            $v2_UICanvas__gen_box_trilist[2] = p2[i][2];
            
            $v3_UICanvas__gen_box_trilist[0] = p2[i+1][0];
            $v3_UICanvas__gen_box_trilist[1] = p2[i+1][1];
            $v3_UICanvas__gen_box_trilist[2] = p2[i+1][2];
            
            $v4_UICanvas__gen_box_trilist[0] = p1[i+1][0];
            $v4_UICanvas__gen_box_trilist[1] = p1[i+1][1];
            $v4_UICanvas__gen_box_trilist[2] = p1[i+1][2];
            
            trilist.add_quad($v1_UICanvas__gen_box_trilist, $v2_UICanvas__gen_box_trilist, $v3_UICanvas__gen_box_trilist, $v4_UICanvas__gen_box_trilist, color(i1), color(i2), color(i3), color(i4));
        }
    }
    var lines=[];
    var colors=[];
    for (var i=0; i<points.length; i++) {
        $v1_UICanvas__gen_box_trilist[0] = points[(i+1)%points.length][0];
        $v1_UICanvas__gen_box_trilist[1] = points[(i+1)%points.length][1];
        $v1_UICanvas__gen_box_trilist[2] = points[(i+1)%points.length][2];
        
        $v2_UICanvas__gen_box_trilist[0] = points[i][0];
        $v2_UICanvas__gen_box_trilist[1] = points[i][1];
        $v2_UICanvas__gen_box_trilist[2] = points[i][2];
        
        if ($pairs_UICanvas__gen_box_trilist.length<=i) {
            $pairs_UICanvas__gen_box_trilist.push([[0, 0], [0, 0]]);
        }
        $pairs_UICanvas__gen_box_trilist[i][0][0] = [$v1_UICanvas__gen_box_trilist[0], $v1_UICanvas__gen_box_trilist[1], 0];
        $pairs_UICanvas__gen_box_trilist[i][0][1] = [$v2_UICanvas__gen_box_trilist[0], $v2_UICanvas__gen_box_trilist[1], 0];
        lines.push($pairs_UICanvas__gen_box_trilist[i][0]);
        $pairs_UICanvas__gen_box_trilist[i][1][0] = color((i+1)%points.length);
        $pairs_UICanvas__gen_box_trilist[i][1][1] = color(i);
        colors.push($pairs_UICanvas__gen_box_trilist[i][1]);
    }
    trilist.line_strip(lines, colors, undefined, outline_only ? 1.4 : 1.5, !outline_only);
    return trilist;
  }
  var $co_UICanvas__box1=new Vector3();
  UICanvas_.prototype.box1 = function(pos, size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = [0, 0, 0, 1];
    }
    if (rfac==undefined) {
        rfac = 1;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    var sclr=clr==undefined ? "u" : clr.toString();
    var hash=size.toString()+sclr+rfac.toString()+(outline_only ? "|1" : "|0");
    var cache=this.boxcache;
    if (!cache.has(hash)) {
        cache.set(hash, this.gen_box_trilist(size, clr, rfac, outline_only));
    }
    $co_UICanvas__box1.loadxy(pos);
    $co_UICanvas__box1[2] = 0.0;
    $co_UICanvas__box1.multVecMatrix(this.transmat);
    var viewport=g_app_state.raster.viewport;
    var sx=viewport[1][0];
    var sy=viewport[1][1];
    $co_UICanvas__box1[0] = (Math.floor($co_UICanvas__box1[0])/sx)*2.0;
    $co_UICanvas__box1[1] = (Math.floor($co_UICanvas__box1[1])/sy)*2.0;
    var mat=new Matrix4();
    mat.translate($co_UICanvas__box1[0], $co_UICanvas__box1[1], 0.0);
    var ret=new TriListRef(this.gl, cache.get(hash), mat, this);
    this.drawlists.push(ret);
    return ret;
  }
  var $cache_UICanvas__box1_old={}
  var $v1_UICanvas__box1_old=new Vector3();
  var $v3_UICanvas__box1_old=new Vector3();
  var $pairs_UICanvas__box1_old=[];
  var $v2_UICanvas__box1_old=new Vector3();
  var $v4_UICanvas__box1_old=new Vector3();
  UICanvas_.prototype.box1_old = function(pos, size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (rfac==undefined) {
        rfac = undefined;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    var c1, c2, c3, c4;
    var cs=uicolors["Box"];
    if (outline_only==undefined)
      outline_only = false;
    cs = _box_process_clr(cs, clr);
    var x=Math.floor(pos[0]), y=Math.floor(pos[1]);
    var w=size[0], h=size[1];
    var start=0;
    var ang=Math.PI/2;
    var r=4;
    if (rfac==undefined)
      rfac = 1;
    var hash=size[0].toString()+" "+size[1]+" "+rfac;
    if (!(hash in $cache_UICanvas__box1_old)) {
        r/=rfac;
        var p1=this.arc_points([0+r+2, 0+r+2, 0], Math.PI, ang, r);
        var p2=this.arc_points([0+w-r-2, 0+r+2, 0], Math.PI/2, ang, r);
        var p3=this.arc_points([0+w-r-2, 0+h-r-2, 0], 0, ang, r);
        var p4=this.arc_points([0+r+2, 0+h-r-2, 0], -Math.PI/2, ang, r);
        var plen=p1.length;
        p4.reverse();
        p3.reverse();
        p2.reverse();
        p1.reverse();
        var points=[];
        for (var i=0; i<p1.length; i++) {
            points.push(p1[i]);
        }
        for (var i=0; i<p2.length; i++) {
            points.push(p2[i]);
            p1.push(p2[i]);
        }
        for (var i=0; i<p3.length; i++) {
            points.push(p3[i]);
        }
        p2 = p3;
        for (var i=0; i<p4.length; i++) {
            p2.push(p4[i]);
            points.push(p4[i]);
        }
        p2.reverse();
        $cache_UICanvas__box1_old[hash] = [p1, p2, points];
    }
    var cp=$cache_UICanvas__box1_old[hash];
    var p1=cp[0];
    var p2=cp[1];
    var points=cp[2];
    var plen=p1.length;
    function color(i) {
      if (i<plen)
        return cs[0];
      else 
        if (i<plen*2)
        return cs[1];
      else 
        if (i<plen*3)
        return cs[2];
      else 
        if (i<=plen*4+1)
        return cs[3];
    }
    if (!outline_only) {
        for (var i=0; i<p1.length-1; i++) {
            var i1=i;
            var i2=i+plen*2;
            var i3=i+1+plen*2;
            var i4=i+1;
            $v1_UICanvas__box1_old[0] = p1[i][0]+x;
            $v1_UICanvas__box1_old[1] = p1[i][1]+y;
            $v1_UICanvas__box1_old[2] = p1[i][2];
            
            $v2_UICanvas__box1_old[0] = p2[i][0]+x;
            $v2_UICanvas__box1_old[1] = p2[i][1]+y;
            $v2_UICanvas__box1_old[2] = p2[i][2];
            
            $v3_UICanvas__box1_old[0] = p2[i+1][0]+x;
            $v3_UICanvas__box1_old[1] = p2[i+1][1]+y;
            $v3_UICanvas__box1_old[2] = p2[i+1][2];
            
            $v4_UICanvas__box1_old[0] = p1[i+1][0]+x;
            $v4_UICanvas__box1_old[1] = p1[i+1][1]+y;
            $v4_UICanvas__box1_old[2] = p1[i+1][2];
            
            this.trilist.add_quad($v1_UICanvas__box1_old, $v2_UICanvas__box1_old, $v3_UICanvas__box1_old, $v4_UICanvas__box1_old, color(i1), color(i2), color(i3), color(i4));
        }
    }
    var lines=[];
    var colors=[];
    for (var i=0; i<points.length; i++) {
        $v1_UICanvas__box1_old[0] = points[(i+1)%points.length][0]+x;
        $v1_UICanvas__box1_old[1] = points[(i+1)%points.length][1]+y;
        $v1_UICanvas__box1_old[2] = points[(i+1)%points.length][2];
        
        $v2_UICanvas__box1_old[0] = points[i][0]+x;
        $v2_UICanvas__box1_old[1] = points[i][1]+y;
        $v2_UICanvas__box1_old[2] = points[i][2];
        
        if ($pairs_UICanvas__box1_old.length<=i) {
            $pairs_UICanvas__box1_old.push([[0, 0], [0, 0]]);
        }
        $pairs_UICanvas__box1_old[i][0][0] = [$v1_UICanvas__box1_old[0], $v1_UICanvas__box1_old[1], 0];
        $pairs_UICanvas__box1_old[i][0][1] = [$v2_UICanvas__box1_old[0], $v2_UICanvas__box1_old[1], 0];
        lines.push($pairs_UICanvas__box1_old[i][0]);
        $pairs_UICanvas__box1_old[i][1][0] = color((i+1)%points.length);
        $pairs_UICanvas__box1_old[i][1][1] = color(i);
        colors.push($pairs_UICanvas__box1_old[i][1]);
    }
    this.trilist.line_strip(lines, colors, undefined, 4, true);
    return this.trilist;
  }
  UICanvas_.prototype.on_resize = function(newsize, oldsize) {
    this.boxcache.destroy();
    var __iter_k=__get_iter(this.textcache);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      if (!this.textcache.hasOwnProperty(k))
        continue;
      this.textcache[k].destroy();
    }
    this.textcache = {}
    this.textcachelen = 0;
    this.destroy();
    this.reset();
  }
  var $loc_UICanvas__text=new Vector3();
  UICanvas_.prototype.text = function(pos, text, color, size, scale, rot, scissor_pos, scissor_size) {
    if (rot==undefined)
      rot = 0.0;
    if (size==undefined)
      size = default_ui_font_size;
    if (scale==undefined) {
        scale = [1.0, 1.0, 1.0];
    }
    else 
      if (typeof (scale)=="number") {
        scale = [scale, scale, scale];
    }
    if (color==undefined) {
        color = uicolors["DefaultText"];
    }
    if (scissor_pos==undefined) {
        if (this.scissor_stack.length>0) {
            scissor_pos = this.scissor_stack[this.scissor_stack.length-1][0];
            scissor_size = this.scissor_stack[this.scissor_stack.length-1][1];
        }
    }
    else {
      scissor_pos = new Vector3([scissor_pos[0], scissor_pos[1], 0]);
      scissor_size = new Vector3([scissor_size[0], scissor_size[1], 0]);
      scissor_pos.multVecMatrix(this.transmat);
    }
    $loc_UICanvas__text[0] = 0;
    $loc_UICanvas__text[1] = 0;
    $loc_UICanvas__text[2] = 0;
    $loc_UICanvas__text.multVecMatrix(this.transmat);
    $loc_UICanvas__text[0]+=pos[0];
    $loc_UICanvas__text[1]+=pos[1];
    var port=g_app_state.raster.viewport;
    var sx=port[1][0];
    var sy=port[1][1];
    $loc_UICanvas__text[0] = (Math.floor($loc_UICanvas__text[0])/sx)*2.0;
    $loc_UICanvas__text[1] = (Math.floor($loc_UICanvas__text[1])/sy)*2.0;
    var textdraw=new TextDraw($loc_UICanvas__text, text, color, scissor_pos, scissor_size, this.viewport, size, scale, this.global_matrix, rot);
    var hash=text.toString()+">>"+size+"|"+color+"|"+JSON.stringify(this.viewport);
    if (!(hash in this.textcache)) {
        if (this.textcachelen>this.max_textcache) {
            var keys=Object.getOwnPropertyNames(this.textcache);
            for (var i=0; i<keys.length; i++) {
                var k=keys[i];
                this.textcache[k].destroy();
                var users=this.textcache[k].users;
                for (var j=0; j<users.length; j++) {
                    users[j].recalc = true;
                    users[j].tdrawbuf = undefined;
                }
                delete this.textcache[k];
                this.textcachelen--;
                if (this.textcachelen<this.max_textcache/3)
                  break;
            }
        }
        this.textcache[hash] = textdraw.gen_buffers(g_app_state.gl);
        this.textcachelen++;
    }
    else {
      textdraw.tdrawbuf = this.textcache[hash];
    }
    this.textcache[hash].users.push(textdraw);
    if (DEBUG.canvas_sep_text) {
        this.textlist.push(textdraw);
        this.drawlists.push(textdraw);
        if (this.stack.length==0) {
            this.uncached.push(textdraw);
        }
        return $loc_UICanvas__text;
    }
    else {
      if (this.drawlists[this.drawlists.length-1]==this.trilist) {
          this.drawlists.push(textdraw);
          this.new_trilist();
          if (this.stack.length==0) {
              this.uncached.push(textdraw);
              this.uncached.push(this.trilist);
          }
      }
      else {
        this.drawlists.push(textdraw);
        if (this.stack.length==0) {
            this.uncached.push(textdraw);
        }
      }
      return $loc_UICanvas__text;
    }
  }
  _es6_module.add_class(UICanvas_);
  UICanvas_ = _es6_module.add_export('UICanvas_', UICanvas_);
});
es6_module_define('UICanvas2D', ["UICanvas", "UIElement", "math", "vectormath"], function _UICanvas2D_module(_es6_module) {
  "use strict";
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var rot2d=es6_import_item(_es6_module, 'math', 'rot2d');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UICanvas_=es6_import_item(_es6_module, 'UICanvas', 'UICanvas_');
  var $_mh;
  var $_swapt;
  var $ret_BgO__get_2d_canvas={}
  function get_2d_canvas() {
    if ($ret_BgO__get_2d_canvas.canvas==undefined) {
        $ret_BgO__get_2d_canvas.canvas = document.getElementById("canvas2d");
        $ret_BgO__get_2d_canvas.ctx = _canvas2d_ctx;
    }
    return $ret_BgO__get_2d_canvas;
  }
  get_2d_canvas = _es6_module.add_export('get_2d_canvas', get_2d_canvas);
  window.get_2d_canvas = get_2d_canvas;
  window._ui_canvas_2d_idgen = 1;
  function UICanvas2_(viewport) {
    var c=get_2d_canvas();
    this.canvas = c.canvas;
    this.id = _ui_canvas_2d_idgen++;
    this.ctx = c.ctx;
    this.canvases = {}
    var ctx=c.ctx, fl=Math.floor;
    
    if (ctx.setFillColor==undefined) {
        ctx.setFillColor = function(r, g, b, a) {
          if (a==undefined)
            a = 1.0;
          this.fillStyle = "rgba("+fl(r*255)+","+fl(g*255)+","+fl(b*255)+","+a+")";
        };
    }
    if (ctx.setStrokeColor==undefined) {
        ctx.setStrokeColor = function(r, g, b, a) {
          if (a==undefined)
            a = 1.0;
          this.strokeStyle = "rgba("+fl(r*255)+","+fl(g*255)+","+fl(b*255)+","+a+")";
        };
    }
    this.layerstack = [];
    this.scissor_stack = [];
    this._lastclip = [[0, 0], [0, 0]];
    this.transmat = new Matrix4();
    this.trans_stack = [];
    this.raster = this.viewport;
    this.global_matrix = new Matrix4();
    this.iconsheet = G.raster.iconsheet;
    this.iconsheet16 = G.raster.iconsheet16;
    this.viewport = viewport;
    function stub_func() {
    }
    var __iter_k=__get_iter(UICanvas_.prototype);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      if (k=="constructor"||k=="prototype"||k=="toString")
        continue;
      if (this[k]==undefined) {
          this[k] = stub_func;
      }
    }
  }
  /*test for IE bug*/;
  if (UICanvas2_.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UICanvas2_.name = 'UICanvas2_';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UICanvas2_ = create_prototype(UICanvas2_, _es6_module, "UICanvas2_");
  UICanvas2_.prototype._css_color = function(c) {
    if (isNaN(c[0]))
      return "black";
    var s="rgba(";
    for (var i=0; i<3; i++) {
        if (i>0)
          s+=",";
        s+=Math.floor(c[i]*255);
    }
    s+=","+(c[3]==undefined ? "1.0" : c[3])+")";
    return s;
  }
  UICanvas2_.prototype.reset_canvases = function() {
    var __iter_k=__get_iter(this.canvases);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      document.body.removeChild(this.canvases[k]);
    }
    this.canvases = {}
  }
  UICanvas2_.prototype.destroy = function() {
  }
  UICanvas2_.prototype.kill_canvas = function(obj_or_id) {
    var id=obj_or_id;
    if (typeof id=="object")
      id = id.__hash__();
    var canvas=this.canvases[id];
    delete this.canvases[id];
    
    delete active_canvases[id];
    if (canvas!=undefined) {
        document.body.removeChild(canvas);
    }
  }
  UICanvas2_.prototype.get_canvas = function(obj_or_id, pos, size, zindex) {
    if (zindex==undefined) {
        zindex = 4;
    }
    var id=obj_or_id;
    if (typeof id=="object")
      id = id.__hash__();
    var canvas;
    if (id in this.canvases) {
        canvas = this.canvases[id];
        canvas.is_blank = false;
    }
    else {
      var canvas=document.createElement("canvas");
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
      
      active_canvases[id] = [canvas, this];
    }
    if (canvas.width!=size[0]) {
        canvas.width = size[0];
    }
    if (canvas.height!=size[1]) {
        canvas.height = size[1];
    }
    if (canvas.style["left"]!=""+Math.floor(pos[0])+"px") {
        canvas.style["left"] = Math.floor(pos[0])+"px";
        canvas.is_blank = true;
    }
    var y=Math.floor(window.innerHeight-pos[1]-size[1]);
    if (canvas.style["top"]!=""+y+"px") {
        canvas.style["top"] = ""+y+"px";
        canvas.is_blank = true;
    }
    canvas.ctx.is_blank = canvas.is_blank;
    return canvas.ctx;
  }
  UICanvas2_.prototype.push_layer = function() {
    this.layerstack.push([this.canvas, this.ctx]);
    var canvas=document.createElement("canvas");
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
  UICanvas2_.prototype.pop_layer = function() {
    if (this.layerstack.length==0) {
        console.trace("%cTHE SHEER EVIL OF IT!", "color:red");
        return ;
    }
    var item=this.layerstack.pop();
    document.body.removeChild(this.canvas);
    this.canvas = item[0];
    this.ctx = item[1];
  }
  UICanvas2_.prototype.on_draw = function(gl) {
  }
  UICanvas2_.prototype.set_viewport = function(viewport) {
    this.viewport = viewport;
  }
  UICanvas2_.prototype.clear = function(p, size) {
    var v=this.viewport;
    var canvas=this.canvas;
    var ctx=this.ctx;
    if (p==undefined) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
    }
    else {
      ctx.clearRect(p[0]+v[0][0], canvas.height-(v[0][1]+p[1]+size[1]), size[0], size[1]);
      ctx.beginPath();
      ctx.rect(p[0]+v[0][0], canvas.height-(v[0][1]+p[1]+size[1]), size[0], size[1]);
    }
  }
  UICanvas2_.prototype.reset = function() {
    var v=this.viewport;
    var canvas=this.canvas;
    var ctx=this.ctx;
  }
  UICanvas2_.prototype.clip = function(rect, vis_only) {
    if (vis_only==undefined) {
        vis_only = false;
    }
    console.log("implement me: clip!!");
    return ;
    var canvas=this.canvas;
    var ctx=this.ctx;
    rect[0] = new Vector2(rect[0]);
    rect[1] = new Vector2(rect[1]);
    var v=this.viewport;
    this._clip_to_viewport(rect[0], rect[1], v);
    ctx.fillStyle = Math.random()>0.5 ? "rgba(255,0,0,0.7)" : "rgba(0,255,0,0.7)";
    ctx.beginPath();
    ctx.rect(v[0][0]+rect[0][0], canvas.height-(v[0][1]+rect[0][1]+rect[1][1]), rect[1][0], rect[1][1]);
    ctx.closePath();
    if (vis_only)
      ctx.fill();
    else 
      ctx.clip();
  }
  UICanvas2_.prototype.root_start = function() {
    this.ctx.save();
  }
  UICanvas2_.prototype.root_end = function() {
    this.ctx.restore();
  }
  UICanvas2_.prototype.has_cache = function(item) {
    return false;
  }
  UICanvas2_.prototype.invbox = function(pos, size, clr, r) {
    var cs=uicolors["InvBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas2_.prototype.simple_box = function(pos, size, clr, r) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (r==undefined) {
        r = 2.0;
    }
    var cs=uicolors["SimpleBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas2_.prototype.hlightbox = function(pos, size, clr_mul, r) {
    var cs=uicolors["HLightBox"];
    if (clr_mul!=undefined) {
        cs = [new Vector4(cs[0]), new Vector4(cs[1]), new Vector4(cs[2]), new Vector4(cs[3])];
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                cs[i][j]*=clr_mul;
            }
        }
    }
    this.box(pos, size, cs, r);
  }
  UICanvas2_.prototype.box_outline = function(pos, size, clr, rfac) {
    this.box(pos, size, clr, rfac, true);
  }
  var $black_UICanvas2__quad=[0, 0, 0, 1];
  var $grads_UICanvas2__quad={}
  UICanvas2_.prototype.quad = function(v1, v2, v3, v4, c1, c2, c3, c4, horiz_gradient) {
    if (horiz_gradient==undefined) {
        horiz_gradient = false;
    }
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    if (c1==undefined) {
        c1 = $black_UICanvas2__quad;
    }
    if (c2==undefined) {
        c2 = c1;
    }
    if (c3==undefined) {
        c3 = c2;
    }
    if (c4==undefined) {
        c4 = c3;
    }
    var m=this.transmat.$matrix;
    var x=m.m41, y=m.m42;
    var hash="";
    for (var i=0; i<4; i++) {
        hash+=c1[i]+","+c2[i]+","+c3[i]+","+c4[i];
    }
    var grad;
    if (1||!(hash in $grads_UICanvas2__quad)) {
        var min=[v1[0], v1[1]], max=[v1[0], v1[1]];
        for (var i=0; i<2; i++) {
            min[i] = Math.min(min[i], v1[i]);
            max[i] = Math.max(max[i], v1[i]);
            min[i] = Math.min(min[i], v2[i]);
            max[i] = Math.max(max[i], v2[i]);
            min[i] = Math.min(min[i], v3[i]);
            max[i] = Math.max(max[i], v3[i]);
            min[i] = Math.min(min[i], v4[i]);
            max[i] = Math.max(max[i], v4[i]);
        }
        min[0]+=x+v[0][0];
        max[0]+=x+v[0][0];
        min[1] = canvas.height-(min[1]+y+v[0][1]);
        max[1] = canvas.height-(max[1]+y+v[0][1]);
        var grad;
        if (isNaN(min[0])||isNaN(max[0])||isNaN(min[1])||isNaN(max[1])||isNaN(c1[0])||isNaN(c3[0])) {
            grad = "black";
        }
        else {
          try {
            if (horiz_gradient)
              grad = ctx.createLinearGradient(min[0], min[1]*0.5+max[1]*0.5, max[0], min[1]*0.5+max[1]*0.5);
            else 
              grad = ctx.createLinearGradient(min[0]*0.5+max[0]*0.5, min[1], min[0]*0.5+max[0]*0.5, max[1]);
            $grads_UICanvas2__quad[hash] = grad;
            grad.addColorStop(0.0, this._css_color(c1));
            grad.addColorStop(1.0, this._css_color(c3));
          }
          catch (error) {
              print_stack(error);
              console.log("GRADIENT ERROR", min[0], min[1], max[0], max[1]);
          }
        }
    }
    else {
      grad = $grads_UICanvas2__quad[hash];
    }
    if (grad!=undefined)
      ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(v1[0]+x, v1[1]+y);
    ctx.lineTo(v2[0]+x, v2[1]+y);
    ctx.lineTo(v3[0]+x, v3[1]+y);
    ctx.lineTo(v4[0]+x, v4[1]+y);
    ctx.fill();
  }
  var $mid_UICanvas2__colorfield=[0, 0, 0, 0.5];
  UICanvas2_.prototype.colorfield = function(pos, size, color) {
    $mid_UICanvas2__colorfield[3] = 1.0;
    for (var i=0; i<3; i++) {
        if (color[i]==0.0)
          $mid_UICanvas2__colorfield[i] = 0.0;
        else 
          $mid_UICanvas2__colorfield[i] = color[i];
    }
    var color2=this._css_color($mid_UICanvas2__colorfield);
    $mid_UICanvas2__colorfield[3] = 1.0;
    for (var i=0; i<3; i++) {
        $mid_UICanvas2__colorfield[i] = (color[i]*3.0-1.0)/4.0;
    }
    var midclr=this._css_color($mid_UICanvas2__colorfield);
    $mid_UICanvas2__colorfield[3] = 1.0;
    for (var i=0; i<3; i++) {
        $mid_UICanvas2__colorfield[i] = 0.5+color[i]*0.5;
    }
    var smidclr=this._css_color($mid_UICanvas2__colorfield);
    $mid_UICanvas2__colorfield[3] = 0.0;
    for (var i=0; i<3; i++) {
        $mid_UICanvas2__colorfield[i] = color[i];
    }
    var zerocolor=this._css_color($mid_UICanvas2__colorfield);
    color = this._css_color(color);
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    var m=this.transmat.$matrix;
    var x=m.m41, y=m.m42;
    var bx=pos[0]+x, by=pos[1]+y-size[1];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(bx, by, size[0], size[1]);
    ctx.closePath();
    ctx.fill();
    function draw_grad(a, b, c, is_horiz) {
      var grad;
      var dp=0.0, dp2=0.0, dp3=35;
      if (is_horiz==1)
        grad = ctx.createLinearGradient(bx+1, by, bx+size[0]-2, by);
      else 
        if (is_horiz==2)
        grad = ctx.createLinearGradient(bx+dp+size[0]-dp*2, by+dp, bx+dp, by+size[1]-dp*2.0);
      else 
        if (is_horiz==3)
        grad = ctx.createLinearGradient(bx+dp2+dp3, by+dp2+dp3, bx+dp2+size[0]-dp2*2, by+size[1]-dp2*2.0);
      else 
        grad = ctx.createLinearGradient(bx, by+size[1], bx, by);
      grad.addColorStop(0.0, a);
      grad.addColorStop(1.0, c);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.rect(bx, by, size[0], size[1]);
      ctx.closePath();
      ctx.fill();
    }
    try {
      draw_grad("rgba(255,255,255,1.0)", "rgba(255,255,255, 0.5)", "rgba(255,255,255,0.0)", 0);
      draw_grad("rgba(0,0,0,1.0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.0)", 1);
    }
    catch (error) {
    }
  }
  UICanvas2_.prototype.icon = function(icon, pos, alpha, small, clr) {
    if (alpha==undefined) {
        alpha = 1.0;
    }
    if (small==undefined) {
        small = false;
    }
    if (clr==undefined) {
        clr = undefined;
    }
    if (icon<0)
      return ;
    var sheet=small ? G.raster.iconsheet16 : G.raster.iconsheet;
    var img=sheet.tex.image;
    var csize=sheet.cellsize;
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    var m=this.transmat.$matrix;
    var x=m.m41+pos[0], y=m.m42+pos[1]-csize[1];
    var spos=sheet.enum_to_xy(icon);
    ctx.drawImage(img, spos[0], spos[1], csize[0], csize[1], x, y, csize[0], csize[1]);
  }
  UICanvas2_.prototype.quad_aa = function(v1, v2, v3, v4, c1, c2, c3, c4) {
    this.quad(v1, v2, v3, v4, c1, c2, c3, c4);
  }
  UICanvas2_.prototype._clip_to_viewport = function(pos, size, v) {
    console.log("implement me: _clip_to_viewport!");
    return ;
    if (pos[0]<0) {
        size[0]+=pos[0];
        pos[0] = 0;
    }
    if (pos[0]+size[0]>v[1][0]) {
        size[0] = v[1][0]-pos[0];
    }
    if (pos[1]<0) {
        size[1]+=pos[1];
        pos[1] = 0;
    }
    if (pos[1]+size[1]>v[1][1]) {
        size[1] = v[1][1]-pos[1];
    }
  }
  UICanvas2_.prototype.push_scissor = function(pos, size) {
    var t="";
    for (var i=0; i<this.scissor_stack.length; i++) {
        t+="  ";
    }
    var oldpos=pos;
    pos = new Vector3([pos[0], pos[1], 0]);
    size = new Vector3([pos[0]+size[0], pos[1]+size[1], 0]);
    pos.multVecMatrix(this.transmat);
    size.multVecMatrix(this.transmat);
    size[0]-=pos[0];
    size[1]-=pos[1];
    var v=this.viewport;
    this._clip_to_viewport(pos, size, v);
    for (var i=0; i<3; i++) {
        pos[i] = Math.floor(pos[i]);
        size[i] = Math.ceil(size[i]);
    }
    this.scissor_stack.push([pos, size]);
    var canvas=this.canvas;
    var g=this.ctx;
    try {
      g.save();
      if (window._cd==undefined)
        window._cd = 0;
      g.fillStyle = (window._cd++%2) ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 255, 0, 0.5)";
      g.beginPath();
      g.rect(pos[0], pos[1], size[0], size[1]);
      g.closePath();
    }
    catch (err) {
        print_stack(err);
    }
    g.lineWidth = 5.0;
    g.strokeStyle = "blue";
    g.stroke();
    g.lineWidth = 1.0;
  }
  UICanvas2_.prototype.pop_scissor = function() {
    this.scissor_stack.pop();
    var t="";
    for (var i=0; i<this.scissor_stack.length; i++) {
        t+="  ";
    }
    this.ctx.restore();
  }
  UICanvas2_.prototype._clipeq = function(c1, c2) {
    return c1[0][0]==c2[0][0]&&c1[0][1]==c2[0][1]&&c1[1][0]==c2[1][0]&&c1[1][1]==c2[1][1];
  }
  UICanvas2_.prototype.arc_points = function(pos, start, arc, r, steps) {
    if (steps==undefined) {
        steps = Math.floor(6*arc/Math.PI);
    }
    var f, df;
    var f=start;
    var df=arc/steps;
    var points=[];
    for (var i=0; i<steps+1; i++) {
        var x=pos[0]+Math.sin(f)*r;
        var y=pos[1]+Math.cos(f)*r;
        points.push([x, y, 0]);
        f+=df;
    }
    return points;
  }
  UICanvas2_.prototype.arc = function(pos, start, arc, r, clr, half) {
    if (clr==undefined) {
        clr = [0.9, 0.8, 0.7, 0.6];
    }
    var steps=18/(2.0-arc/(Math.PI*2));
    var f, df;
    var f=start;
    var df=arc/steps;
    var points=[];
    for (var i=0; i<steps+1; i++) {
        var x=pos[0]+Math.sin(f)*r;
        var y=pos[1]+Math.cos(f)*r;
        points.push([x, y, 0]);
        f+=df;
    }
    var lines=[];
    var colors=[];
    for (var i=0; i<points.length-1; i++) {
        lines.push([points[i], points[i+1]]);
        colors.push([clr, clr]);
    }
    colors[0][0] = [1.0, 1.0, 0.0, 1.0];
    colors[0][1] = [1.0, 1.0, 0.0, 1.0];
  }
  var $cache_UICanvas2__box1={}
  var $v1_UICanvas2__box1=new Vector3();
  var $v3_UICanvas2__box1=new Vector3();
  var $pairs_UICanvas2__box1=[];
  var $v2_UICanvas2__box1=new Vector3();
  var $v4_UICanvas2__box1=new Vector3();
  UICanvas2_.prototype.box1 = function(pos, size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (rfac==undefined) {
        rfac = undefined;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    var c1, c2, c3, c4;
    var cs=uicolors["Box"];
    if (outline_only==undefined)
      outline_only = false;
    cs = _box_process_clr(cs, clr);
    var x=Math.floor(pos[0]), y=Math.floor(pos[1]);
    var w=size[0], h=size[1];
    var start=0;
    var ang=Math.PI/2;
    var r=4;
    if (rfac==undefined)
      rfac = 1;
    var hash=size[0].toString()+" "+size[1]+" "+rfac;
    if (!(hash in $cache_UICanvas2__box1)) {
        r/=rfac;
        var p1=this.arc_points([0+r+2, 0+r+2, 0], Math.PI, ang, r);
        var p2=this.arc_points([0+w-r-2, 0+r+2, 0], Math.PI/2, ang, r);
        var p3=this.arc_points([0+w-r-2, 0+h-r-2, 0], 0, ang, r);
        var p4=this.arc_points([0+r+2, 0+h-r-2, 0], -Math.PI/2, ang, r);
        var plen=p1.length;
        p4.reverse();
        p3.reverse();
        p2.reverse();
        p1.reverse();
        var points=[];
        for (var i=0; i<p1.length; i++) {
            points.push(p1[i]);
        }
        for (var i=0; i<p2.length; i++) {
            points.push(p2[i]);
            p1.push(p2[i]);
        }
        for (var i=0; i<p3.length; i++) {
            points.push(p3[i]);
        }
        p2 = p3;
        for (var i=0; i<p4.length; i++) {
            p2.push(p4[i]);
            points.push(p4[i]);
        }
        p2.reverse();
        $cache_UICanvas2__box1[hash] = [p1, p2, points];
    }
    var cp=$cache_UICanvas2__box1[hash];
    var p1=cp[0];
    var p2=cp[1];
    var points=cp[2];
    var plen=p1.length;
    function color(i) {
      if (i<plen)
        return cs[0];
      else 
        if (i<plen*2)
        return cs[1];
      else 
        if (i<plen*3)
        return cs[2];
      else 
        if (i<=plen*4+1)
        return cs[3];
    }
    if (!outline_only) {
        for (var i=0; i<p1.length-1; i++) {
            var i1=i;
            var i2=i+plen*2;
            var i3=i+1+plen*2;
            var i4=i+1;
            $v1_UICanvas2__box1[0] = p1[i][0]+x;
            $v1_UICanvas2__box1[1] = p1[i][1]+y;
            $v1_UICanvas2__box1[2] = p1[i][2];
            
            $v2_UICanvas2__box1[0] = p2[i][0]+x;
            $v2_UICanvas2__box1[1] = p2[i][1]+y;
            $v2_UICanvas2__box1[2] = p2[i][2];
            
            $v3_UICanvas2__box1[0] = p2[i+1][0]+x;
            $v3_UICanvas2__box1[1] = p2[i+1][1]+y;
            $v3_UICanvas2__box1[2] = p2[i+1][2];
            
            $v4_UICanvas2__box1[0] = p1[i+1][0]+x;
            $v4_UICanvas2__box1[1] = p1[i+1][1]+y;
            $v4_UICanvas2__box1[2] = p1[i+1][2];
            
            this.quad($v1_UICanvas2__box1, $v2_UICanvas2__box1, $v3_UICanvas2__box1, $v4_UICanvas2__box1, color(i1), color(i2), color(i3), color(i4));
        }
    }
    var lines=[];
    var colors=[];
    for (var i=0; i<points.length; i++) {
        $v1_UICanvas2__box1[0] = points[(i+1)%points.length][0]+x;
        $v1_UICanvas2__box1[1] = points[(i+1)%points.length][1]+y;
        $v1_UICanvas2__box1[2] = points[(i+1)%points.length][2];
        
        $v2_UICanvas2__box1[0] = points[i][0]+x;
        $v2_UICanvas2__box1[1] = points[i][1]+y;
        $v2_UICanvas2__box1[2] = points[i][2];
        
        if ($pairs_UICanvas2__box1.length<=i) {
            $pairs_UICanvas2__box1.push([[0, 0], [0, 0]]);
        }
        $pairs_UICanvas2__box1[i][0][0] = [$v1_UICanvas2__box1[0], $v1_UICanvas2__box1[1], 0];
        $pairs_UICanvas2__box1[i][0][1] = [$v2_UICanvas2__box1[0], $v2_UICanvas2__box1[1], 0];
        lines.push($pairs_UICanvas2__box1[i][0]);
        $pairs_UICanvas2__box1[i][1][0] = color((i+1)%points.length);
        $pairs_UICanvas2__box1[i][1][1] = color(i);
        colors.push($pairs_UICanvas2__box1[i][1]);
    }
  }
  UICanvas2_.prototype._transform = function(p) {
    var p=canvas_cache_vs.next().load(p);
    p[2] = 0.0;
    p.multVecMatrix(this.transmat);
    return p;
  }
  UICanvas2_.prototype.tri_aa = function(v1, v2, v3, c1, c2, c3) {
    this.tri(v1, v2, v3, c1, c2, c3);
  }
  UICanvas2_.prototype._split_text = function(line) {
    var i=0;
    var segments=[{line: "", format: "", color: undefined}];
    while (i<line.length) {
      var c=line[i];
      if (c=="%") {
          var n=line[i+1];
          var color=undefined;
          var format="";
          color = undefined;
          switch (n) {
            case "b":
              format = "bold";
              break;
            case "i":
              format = "italic";
              break;
            case "/":
              format = "";
              color = undefined;
              i++;
              break;
            case "c":
              i++;
              var end=line.slice(i, line.length).search("}");
              color = line.slice(i+2, i+end).trim();
              console.log("COLOR!!!", end, color, "|", line.slice(i, line.length));
              i+=end;
              break;
          }
          segments.push({line: "", format: format, color: color});
          i+=2;
          continue;
      }
      segments[segments.length-1].line+=c;
      i++;
    }
    return segments;
  }
  UICanvas2_.prototype._measure_line = function(line, fontsize) {
    var segs=this._split_text(line);
    var x=0.0;
    var g=this.ctx;
    for (var i=0; i<segs.length; i++) {
        x+=g.measureText(segs[i].line).width;
    }
    return {width: x}
  }
  UICanvas2_.prototype._text_line = function(line, x, y, fontsize) {
    var segs=this._split_text(line);
    var g=this.ctx;
    var startclr=g.fillStyle;
    for (var i=0; i<segs.length; i++) {
        this._set_font(g, fontsize, segs[i].format);
        if (segs[i].color!=undefined) {
            g.fillStyle = segs[i].color;
        }
        else {
          g.fillStyle = startclr;
        }
        g.fillText(segs[i].line, x, y);
        x+=g.measureText(segs[i].line).width;
    }
    g.fillStyle = startclr;
  }
  var $pos_UICanvas2__text=[0, 0, 0];
  UICanvas2_.prototype.text = function(pos1, text, color, fontsize, scale, rot, scissor_pos, scissor_size) {
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    var lines=text.split("\n");
    if (text[0]!="\n"&&text[1]!="\r"&&lines[0].trim()=="") {
        lines = lines.splice(1, lines.length);
    }
    lines.reverse();
    if (rot==undefined)
      rot = 0;
    var ly=0;
    for (var i=0; i<lines.length; i++, ly+=12) {
        var w=this._measure_line(lines[i]).width;
        var m=this.transmat.$matrix;
        $pos_UICanvas2__text[0] = m.m41+pos1[0];
        $pos_UICanvas2__text[1] = m.m42+pos1[1]+ly;
        $pos_UICanvas2__text[2] = 0;
        ctx.rotate(rot);
        if (rot!=0) {
            $pos_UICanvas2__text[1]-=w;
        }
        rot2d($pos_UICanvas2__text, -rot);
        if (color==undefined)
          color = [0, 0, 0, 1];
        ctx.fillStyle = this._css_color(color);
        if (fontsize==undefined)
          fontsize = default_ui_font_size;
        ctx.font = fontsize+"px "+"Arial";
        var x=$pos_UICanvas2__text[0], y=$pos_UICanvas2__text[1];
        this._text_line(lines[i], x, y, fontsize);
    }
  }
  UICanvas2_.prototype._set_font = function(ctx, fontsize, addition_options) {
    if (addition_options==undefined) {
        addition_options = "";
    }
    addition_options = addition_options.trim()+" ";
    if (fontsize==undefined)
      fontsize = default_ui_font_size;
    ctx.font = addition_options+fontsize+"px "+"Arial";
  }
  UICanvas2_.prototype.line = function(v1, v2, c1, c2) {
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    var m=this.transmat.$matrix;
    var x=m.m41, y=m.m42;
    ctx.strokeStyle = this._css_color(c1);
    ctx.beginPath();
    ctx.moveTo(v1[0]+x, canvas.height-(v1[1]+y));
    ctx.lineTo(v2[0]+x, canvas.height-(v2[1]+y));
    ctx.stroke();
  }
  UICanvas2_.prototype.tri = function(v1, v2, v3, c1, c2, c3) {
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    var m=this.transmat.$matrix;
    var x=m.m41, y=m.m42;
    ctx.fillStyle = this._css_color(c1);
    ctx.beginPath();
    ctx.moveTo(v1[0]+x, v1[1]+y);
    ctx.lineTo(v2[0]+x, v2[1]+y);
    ctx.lineTo(v3[0]+x, v3[1]+y);
    ctx.fill();
  }
  UICanvas2_.prototype.box = function(pos, size, clr, rfac, outline_only) {
    if (IsMobile||rfac==0.0)
      return this.box2(pos, size, clr, rfac, outline_only);
    else 
      return this.box1(pos, size, clr, rfac, outline_only);
  }
  UICanvas2_.prototype.passpart = function(pos, size, clr) {
    if (clr==undefined) {
        clr = [0, 0, 0, 0.5];
    }
    var p=this.viewport[0];
    var s=this.viewport[1];
    this.box2([p[0], p[1]], [pos[0], s[1]], clr);
    this.box2([p[0]+pos[0]+size[0], p[1]], [s[0]-pos[0]-size[0], s[1]], clr);
    this.box2([pos[0]+p[0], pos[1]+p[1]+size[1]], [size[0], s[1]-size[1]-p[1]], clr);
    this.box2([pos[0]+p[0], p[1]], [size[0], pos[1]], clr);
  }
  UICanvas2_.prototype.box2 = function(pos, size, clr, rfac, outline_only) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (rfac==undefined) {
        rfac = undefined;
    }
    if (outline_only==undefined) {
        outline_only = false;
    }
    var cs=uicolors["Box"];
    cs = _box_process_clr(cs, clr);
    var x=pos[0], y=pos[1];
    var w=size[0], h=size[1];
    if (outline_only) {
        this.line([pos[0], pos[1]], [pos[0], pos[1]+size[1]], clr, clr, 1.0);
        this.line([pos[0], pos[1]+size[1]], [pos[0]+size[0], pos[1]+size[1]], clr, clr, 1.0);
        this.line([pos[0]+size[0], pos[1]+size[1]], [pos[0]+size[0], pos[1]], clr, clr, 1.0);
        this.line([pos[0]+size[0], pos[1]], [pos[0], pos[1]], clr, clr, 1.0);
    }
    else {
      this.quad([x, y, 0], [x+w, y, 0], [x+w, y+h, 0], [x, y+h, 0], cs[0], cs[1], cs[2], cs[3]);
    }
  }
  UICanvas2_.prototype.textsize = function(text, size) {
    if (size==undefined) {
        size = default_ui_font_size;
    }
    var lines=text.split("\n");
    if (text[0]!="\n"&&text[1]!="\r"&&lines[0].trim()=="") {
        lines = lines.splice(1, lines.length);
    }
    lines.reverse();
    var canvas=this.canvas;
    var ctx=this.ctx;
    var v=this.viewport;
    this._set_font(ctx, size);
    var wid=0, hgt=0;
    for (var i=0; i<lines.length; i++) {
        wid = Math.max(wid, this._measure_line(lines[i]).width);
        hgt+=size+2;
    }
    return [wid, hgt];
  }
  UICanvas2_.prototype.translate = function(off) {
    this.transmat.translate(off[0], off[1], 0.0);
  }
  UICanvas2_.prototype.push_transform = function(mat) {
    if (mat==undefined) {
        mat = undefined;
    }
    this.trans_stack.push(new Matrix4(this.transmat));
    if (mat!=undefined)
      this.transmat.multiply(mat);
  }
  UICanvas2_.prototype.pop_transform = function() {
    this.transmat.load(this.trans_stack.pop());
  }
  _es6_module.add_class(UICanvas2_);
  UICanvas2_ = _es6_module.add_export('UICanvas2_', UICanvas2_);
  var UICanvas=UICanvas2_;
  UICanvas = _es6_module.add_export('UICanvas', UICanvas);
  window.active_canvases = {}
});
es6_module_define('UICanvasNew', ["vectormath", "util"], function _UICanvasNew_module(_es6_module) {
  "use strict";
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var cachering=es6_import_item(_es6_module, 'util', 'cachering');
  var canvas_cache_vs=cachering.fromConstructor(Vector3, 128);
  var _quad_blank=[0, 0, 0, 0];
  var get_2d_ret={}
  var _canvas_grad_cache={}
  function get_2d_canvas() {
    var ret=get_2d_ret;
    if (ret.canvas==undefined) {
        ret.canvas = document.getElementById("canvas2d");
        ret.ctx = _canvas2d_ctx;
    }
    return ret;
  }
  get_2d_canvas = _es6_module.add_export('get_2d_canvas', get_2d_canvas);
  window.get_2d_canvas = get_2d_canvas;
  window._ui_canvas_2d_idgen = 1;
  function UICanvas() {
    this.transmat = new Matrix4();
    this.trans_stack = [];
    this.g = get_2d_canvas().ctx;
  }
  /*test for IE bug*/;
  if (UICanvas.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UICanvas.name = 'UICanvas';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UICanvas = create_prototype(UICanvas, _es6_module, "UICanvas");
  UICanvas.prototype._css_color = function(c) {
    if (isNaN(c[0]))
      return "black";
    var s="rgba(";
    for (var i=0; i<3; i++) {
        if (i>0)
          s+=",";
        s+=Math.floor(c[i]*255);
    }
    s+=","+(c[3]==undefined ? "1.0" : c[3])+")";
    return s;
  }
  UICanvas.prototype.reset_canvases = function() {
    var __iter_k=__get_iter(this.canvases);
    var k;
    while (1) {
      var __ival_k=__iter_k.next();
      if (__ival_k.done) {
          break;
      }
      k = __ival_k.value;
      document.body.removeChild(this.canvases[k]);
    }
    this.canvases = {}
  }
  UICanvas.prototype.destroy = function() {
  }
  UICanvas.prototype.kill_canvas = function(obj_or_id) {
    var id=obj_or_id;
    if (typeof id=="object")
      id = id.__hash__();
    var canvas=this.canvases[id];
    delete this.canvases[id];
    
    delete active_canvases[id];
    if (canvas!=undefined) {
        document.body.removeChild(canvas);
    }
  }
  UICanvas.prototype.get_canvas = function(obj_or_id, pos, size, zindex) {
    if (zindex==undefined) {
        zindex = 4;
    }
    var id=obj_or_id;
    if (typeof id=="object")
      id = id.__hash__();
    var canvas;
    if (id in this.canvases) {
        canvas = this.canvases[id];
        canvas.is_blank = false;
    }
    else {
      var canvas=document.createElement("canvas");
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
      
      active_canvases[id] = [canvas, this];
    }
    if (canvas.width!=size[0]) {
        canvas.width = size[0];
    }
    if (canvas.height!=size[1]) {
        canvas.height = size[1];
    }
    if (canvas.style["left"]!=""+Math.floor(pos[0])+"px") {
        canvas.style["left"] = Math.floor(pos[0])+"px";
        canvas.is_blank = true;
    }
    var y=Math.floor(window.innerHeight-pos[1]-size[1]);
    if (canvas.style["top"]!=""+y+"px") {
        canvas.style["top"] = ""+y+"px";
        canvas.is_blank = true;
    }
    canvas.ctx.is_blank = canvas.is_blank;
    return canvas.ctx;
  }
  UICanvas.prototype.push_layer = function() {
    this.layerstack.push([this.canvas, this.ctx]);
    var canvas=document.createElement("canvas");
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
  UICanvas.prototype.pop_layer = function() {
    if (this.layerstack.length==0) {
        console.trace("%cTHE SHEER EVIL OF IT!", "color:red");
        return ;
    }
    var item=this.layerstack.pop();
    document.body.removeChild(this.canvas);
    this.canvas = item[0];
    this.ctx = item[1];
  }
  UICanvas.prototype.set_layer = function() {
    console.log("Deprecated!");
  }
  UICanvas.prototype.reset = function() {
    console.log("Deprecated!");
  }
  UICanvas.prototype.clear = function(p, size) {
    var v1=canvas_cache_vs.next().zero(), v2=canvas_cache_vs.next().zero();
    v1[0] = p[0], v1[1] = p[1];
    v2[0] = p[0]+size[0], v2[1] = p[1]+size[1];
    v1.multVecMatrix(this.matrix).floor();
    v2.multVecMatrix(this.matrix).floor();
    v2.sub(v1);
    this.g.clearRect(v1[0], v1[1], v2[0], v2[1]);
  }
  UICanvas.prototype.invbox = function(pos, size, clr, r) {
    var cs=uicolors["InvBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas.prototype.simple_box = function(pos, size, clr, r) {
    if (clr==undefined) {
        clr = undefined;
    }
    if (r==undefined) {
        r = 2.0;
    }
    var cs=uicolors["SimpleBox"];
    cs = _box_process_clr(cs, clr);
    this.box(pos, size, cs, r);
  }
  UICanvas.prototype.hlightbox = function(pos, size, clr_mul, r) {
    var cs=uicolors["HLightBox"];
    if (clr_mul!=undefined) {
        cs = [new Vector4(cs[0]), new Vector4(cs[1]), new Vector4(cs[2]), new Vector4(cs[3])];
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                cs[i][j]*=clr_mul;
            }
        }
    }
    this.box(pos, size, cs, r);
  }
  UICanvas.prototype.box_outline = function(pos, size, clr, rfac) {
    this.box(pos, size, clr, rfac, true);
  }
  UICanvas.prototype._transform = function(p) {
    var p=canvas_cache_vs.next().load(p);
    p[2] = 0.0;
    p.multVecMatrix(this.transmat);
    return p;
  }
  UICanvas.prototype.quad = function(v1, v2, v3, v4, c1, c2, c3, c4, horiz_gradient) {
    if (c1==undefined) {
        c1 = _quad_blank;
    }
    if (c2==undefined) {
        c2 = c1;
    }
    if (c3==undefined) {
        c3 = c2;
    }
    if (c4==undefined) {
        c4 = c3;
    }
    if (horiz_gradient==undefined) {
        horiz_gradient = false;
    }
    var black=_quad_blank;
    v1 = this._transform(v1);
    v2 = this._transform(v2);
    v3 = this._transform(v3);
    v4 = this._transform(v4);
    var grads=_canvas_grad_cache;
    var hash="";
    for (var i=0; i<4; i++) {
        hash+=c1[i]+","+c2[i]+","+c3[i]+","+c4[i];
    }
    var grad;
    if (1||!(hash in grads)) {
        var min=[v1[0], v1[1]], max=[v1[0], v1[1]];
        for (var i=0; i<2; i++) {
            min[i] = Math.min(min[i], v1[i]);
            max[i] = Math.max(max[i], v1[i]);
            min[i] = Math.min(min[i], v2[i]);
            max[i] = Math.max(max[i], v2[i]);
            min[i] = Math.min(min[i], v3[i]);
            max[i] = Math.max(max[i], v3[i]);
            min[i] = Math.min(min[i], v4[i]);
            max[i] = Math.max(max[i], v4[i]);
        }
        var grad;
        if (isNaN(min[0])||isNaN(max[0])||isNaN(min[1])||isNaN(max[1])||isNaN(c1[0])||isNaN(c3[0])) {
            grad = "black";
        }
        else {
          try {
            if (horiz_gradient)
              grad = ctx.createLinearGradient(min[0], min[1]*0.5+max[1]*0.5, max[0], min[1]*0.5+max[1]*0.5);
            else 
              grad = ctx.createLinearGradient(min[0]*0.5+max[0]*0.5, min[1], min[0]*0.5+max[0]*0.5, max[1]);
            grads[hash] = grad;
            grad.addColorStop(0.0, this._css_color(c1));
            grad.addColorStop(1.0, this._css_color(c3));
          }
          catch (error) {
              print_stack(error);
              console.log("GRADIENT ERROR", min[0], min[1], max[0], max[1]);
          }
        }
    }
    else {
      grad = grads[hash];
    }
    if (grad!=undefined)
      ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(v1[0], v1[1]);
    ctx.lineTo(v2[0], v2[1]);
    ctx.lineTo(v3[0], v3[1]);
    ctx.lineTo(v4[0], v4[1]);
    ctx.fill();
  }
  UICanvas.prototype.root_start = function() {
    this.g.save();
  }
  UICanvas.prototype.root_end = function() {
    this.g.restore();
  }
  UICanvas.prototype.clip = function(rect, vis_only) {
    if (vis_only==undefined) {
        vis_only = false;
    }
    console.log("implement me: clip!!");
    return ;
    var canvas=this.canvas;
    var ctx=this.ctx;
    rect[0] = new Vector2(rect[0]);
    rect[1] = new Vector2(rect[1]);
    var v=this.viewport;
    this._clip_to_viewport(rect[0], rect[1], v);
    ctx.fillStyle = Math.random()>0.5 ? "rgba(255,0,0,0.7)" : "rgba(0,255,0,0.7)";
    ctx.beginPath();
    ctx.rect(v[0][0]+rect[0][0], canvas.height-(v[0][1]+rect[0][1]+rect[1][1]), rect[1][0], rect[1][1]);
    ctx.closePath();
    if (vis_only)
      ctx.fill();
    else 
      ctx.clip();
  }
  _es6_module.add_class(UICanvas);
  UICanvas = _es6_module.add_export('UICanvas', UICanvas);
});
es6_module_define('UIElement', ["data_api", "math", "rna_properties", "events", "vectormath"], function _UIElement_module(_es6_module) {
  es6_import(_es6_module, 'events');
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var DataAPIError=es6_import_item(_es6_module, 'data_api', 'DataAPIError');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var PropFlags=es6_import_item(_es6_module, 'rna_properties', 'PropFlags');
  var UIFlags={ENABLED: 1, HIGHLIGHT: 2, FOCUS: 4, GREYED: 8, REDERROR: 16, WARNING: 32, USE_PATH: 64, NO_RECALC: 128, FLASH: (16|32), SKIP_DRAW: 256, HAS_PAN: 512, USE_PAN: 1024, PAN_CANVAS_MAT: 2048, IS_CANVAS_ROOT: 4096, NO_FRAME_CACHE: (1<<14), INVISIBLE: (1<<15), IGNORE_PAN_BOUNDS: (1<<16), BLOCK_REPAINT: (1<<17), NO_VELOCITY_PAN: (1<<18)}
  UIFlags = _es6_module.add_export('UIFlags', UIFlags);
  var PackFlags={INHERIT_HEIGHT: 1, INHERIT_WIDTH: 2, ALIGN_RIGHT: 4, ALIGN_LEFT: 8, ALIGN_CENTER: 16, ALIGN_BOTTOM: 32, IGNORE_LIMIT: 64, NO_REPACK: 128, UI_DATAPATH_IGNORE: 256, USE_ICON: 1024|2048, USE_SMALL_ICON: 1024, USE_LARGE_ICON: 2048, ENUM_STRIP: 4096, NO_AUTO_SPACING: 8192, ALIGN_CENTER_Y: 16384, ALIGN_CENTER_X: 32768, FLIP_TABSTRIP: 65536, NO_LEAD_SPACING: (1<<17), NO_TRAIL_SPACING: (1<<18), KEEP_SIZE: (1<<19), _KEEPSIZE: ((1<<19)|128), ALIGN_TOP: (1<<20), CALC_NEGATIVE_PAN: (1<<21), PAN_X_ONLY: (1<<22), PAN_Y_ONLY: (1<<23)}
  PackFlags = _es6_module.add_export('PackFlags', PackFlags);
  var CanvasFlags={NOT_ROOT: 1, NO_PROPEGATE: 2}
  CanvasFlags = _es6_module.add_export('CanvasFlags', CanvasFlags);
  window.CanvasFlags = CanvasFlags;
  var _ui_element_id_gen=1;
  function open_mobile_keyboard(e, on_close) {
    if (on_close==undefined) {
        on_close = function() {
        };
    }
    if (IsMobile||DEBUG.screen_keyboard)
      call_keyboard(e, on_close);
  }
  open_mobile_keyboard = _es6_module.add_export('open_mobile_keyboard', open_mobile_keyboard);
  function close_mobile_keyboard(e) {
    if (IsMobile||DEBUG.screen_keyboard)
      end_keyboard(e);
  }
  close_mobile_keyboard = _es6_module.add_export('close_mobile_keyboard', close_mobile_keyboard);
  var $pos2_0iMU_inrect_2d_button=new Vector2();
  var $size2_16C__inrect_2d_button=new Vector2();
  function inrect_2d_button(p, pos, size) {
    if (g_app_state.was_touch) {
        $pos2_0iMU_inrect_2d_button.load(pos);
        $size2_16C__inrect_2d_button.load(size);
        $pos2_0iMU_inrect_2d_button.subScalar(fuzzy_ui_press_hotspot);
        $size2_16C__inrect_2d_button.addScalar(fuzzy_ui_press_hotspot*2.0);
        return inrect_2d(p, $pos2_0iMU_inrect_2d_button, $size2_16C__inrect_2d_button);
    }
    else {
      return inrect_2d(p, pos, size);
    }
  }
  inrect_2d_button = _es6_module.add_export('inrect_2d_button', inrect_2d_button);
  function UIEventHandler() {
    this.modalstack = [];
    this.modalhandler = undefined;
  }
  /*test for IE bug*/;
  if (UIEventHandler.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIEventHandler.name = 'UIEventHandler';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIEventHandler = inherit_multiple(UIEventHandler, [EventHandler], _es6_module, "UIEventHandler");
  UIEventHandler.prototype.on_tick = function() {
  }
  UIEventHandler.prototype.push_modal = function(e) {
    if (this.modalhandler!=undefined)
      this.modalstack.push(this.modalhandler);
    this.modalhandler = e;
  }
  UIEventHandler.prototype.pop_modal = function() {
    if (this.modalstack.length>0)
      this.modalhandler = this.modalstack.pop();
    else 
      this.modalhandler = undefined;
  }
  UIEventHandler.prototype._on_mousedown = function() {
    if (this.modalhandler!=undefined)
      return this.modalhandler._on_mousedown.appy(this, arguments);
    this.on_mousedown.apply(this, arguments);
  }
  UIEventHandler.prototype._on_mousemove = function() {
    if (this.modalhandler!=undefined)
      return this.modalhandler._on_mousemove.appy(this, arguments);
    this.on_mousemove.apply(this, arguments);
  }
  UIEventHandler.prototype._on_mouseup = function() {
    if (this.modalhandler!=undefined)
      return this.modalhandler._on_mouseup.appy(this, arguments);
    this.on_mouseup.apply(this, arguments);
  }
  UIEventHandler.prototype._on_keydown = function() {
    this.on_keydown.apply(this, arguments);
  }
  UIEventHandler.prototype._on_keyup = function() {
    this.on_keyup.apply(this, arguments);
  }
  UIEventHandler.prototype.on_resize = function() {
  }
  _es6_module.add_class(UIEventHandler);
  UIEventHandler = _es6_module.add_export('UIEventHandler', UIEventHandler);
  function UIElement(ctx, path, pos, size) {
    if (path==undefined) {
        path = undefined;
    }
    if (pos==undefined) {
        pos = undefined;
    }
    if (size==undefined) {
        size = undefined;
    }
    this.status_timer = undefined;
    UIEventHandler.call(this);
    this.defunct = false;
    this._uiel_id = _ui_element_id_gen++;
    this.fake_push_modal = 0;
    this.description = "";
    this.dirty = [[0, 0], [0, 0]];
    this.last_dirty = [[0, 0], [0, 0]];
    this.dirty_flag = 0;
    this.abspos = [0, 0];
    this._minsize = [0, 0];
    this._h12 = undefined;
    this.state = UIFlags.ENABLED;
    this.packflag = 0;
    this.data_path = path;
    this.ctx = ctx;
    this.parent = undefined;
    this.flash_timer_len = 650;
    this.status_timer = undefined;
    this.flash_ival = 20;
    this.last_flash = 0;
    this.pos = [0, 0];
    this.size = [0, 0];
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.recalc = 0;
    this.recalc_minsize = 0;
    if (path!=undefined) {
        this.state|=UIFlags.USE_PATH;
    }
  }
  /*test for IE bug*/;
  if (UIElement.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIElement.name = 'UIElement';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIElement = inherit_multiple(UIElement, [UIEventHandler], _es6_module, "UIElement");
  UIElement.prototype.disable = function() {
    if ((this.state&UIFlags.ENABLED))
      this.do_recalc();
    this.state&=~UIFlags.ENABLED;
  }
  UIElement.prototype.enable = function() {
    if (!(this.state&UIFlags.ENABLED))
      this.do_recalc();
    this.state|=UIFlags.ENABLED;
  }
  var $empty_arr_UIElement_get_keymaps=[];
  UIElement.prototype.get_keymaps = function() {
    return $empty_arr_UIElement_get_keymaps;
  }
  UIElement.prototype.__hash__ = function() {
    if (this._h12==undefined) {
        var n=this.constructor.name;
        if (n==undefined)
          n = "evil_ie_bug";
        this._h12 = n[2]+n[3]+n[n.length-2]+n[n.length-1]+this._uiel_id.toString();
    }
    return this._h12;
  }
  UIElement.prototype.set_context = function(ctx) {
    this.ctx = ctx;
  }
  UIElement.prototype.inc_flash_timer = function(color) {
    if (this.status_timer==undefined) {
        this.state&=~UIFlags.FLASH;
        return false;
    }
    if (this.status_timer.ready()) {
        this.status_timer = undefined;
        this.state&=~UIFlags.FLASH;
        return false;
    }
    return true;
  }
  UIElement.prototype.do_flash_color = function(color) {
    this.inc_flash_timer();
    if (!(this.state&UIFlags.FLASH))
      return color;
    var color2;
    if (this.state&UIFlags.REDERROR)
      color2 = uicolors["ErrorBox"];
    else 
      if (this.state&UIFlags.WARNING)
      color2 = uicolors["WarningBox"];
    if (color==undefined)
      color = color2;
    if (color2==undefined)
      return undefined;
    var f=this.status_timer.normval;
    if (f<0.5)
      f*=2.0;
    else 
      (f = 1.0-f)*2.0;
    var alen=color.length;
    var l1=objcache.array(alen), l2=objcache.array(alen);
    l1.length = 0;
    l2.length = 0;
    if (typeof (color[0])=="number") {
        l1.push(color);
    }
    else {
      for (var i=0; i<color.length; i++) {
          l1.push(color[i]);
      }
    }
    if (typeof (color2[0])=="number") {
        l2.push(color2);
    }
    else {
      for (var i=0; i<color2.length; i++) {
          l2.push(color2[i]);
      }
    }
    while (l1.length<l2.length) {
      l1.push(l1[l1.length-1]);
    }
    while (l2.length<l1.length) {
      l2.push(l2[l2.length-1]);
    }
    var l3=objcache.array(l1.length);
    l3.length = 0;
    for (var i=0; i<l1.length; i++) {
        var clr=new Vector4(l1[i]);
        clr.interp(l2[i], f);
        l3.push(clr);
    }
    if (l3.length==1)
      return l3[0];
    else 
      return l3;
  }
  UIElement.prototype.flash = function(status) {
    if (status==undefined) {
        status = UIFlags.REDERROR;
    }
    console.log("flash!", status);
    this.status_timer = new Timer(this.flash_timer_len);
    this.state|=status;
    this.do_recalc();
  }
  UIElement.prototype.focus = function() {
    if (this.parent!=undefined)
      this.parent.focus(this);
  }
  var $pos_UIElement_get_abs_pos=[0, 0];
  UIElement.prototype.get_abs_pos = function() {
    $pos_UIElement_get_abs_pos[0] = this.pos[0];
    $pos_UIElement_get_abs_pos[1] = this.pos[1];
    var p=this.parent;
    while (p!=undefined) {
      $pos_UIElement_get_abs_pos[0]+=p.pos[0];
      $pos_UIElement_get_abs_pos[1]+=p.pos[1];
      p = p.parent;
    }
    return $pos_UIElement_get_abs_pos;
  }
  UIElement.prototype.call_menu = function(menu, off, min_width) {
    if (off==undefined) {
        off = undefined;
    }
    if (min_width==undefined) {
        min_width = 20;
    }
    if (off==undefined) {
        off = [0, 0];
    }
    var frame;
    if (this.parent==undefined) {
        frame = this;
    }
    else {
      frame = this.parent;
    }
    this.abs_transform(off);
    while (frame.parent!=undefined) {
      frame = frame.parent;
    }
    ui_call_menu(menu, frame, off, false, min_width);
  }
  UIElement.prototype.set_prop_data = function(data, undo_push) {
    if (undo_push==undefined) {
        undo_push = true;
    }
    if (this.path_is_bad)
      return ;
    var ctx=this.ctx;
    var setpath=this.setter_path!=undefined ? this.setter_path : this.data_path;
    var prop=ctx.api.get_prop_meta(ctx, this.data_path);
    if (prop.flag&PropFlags.USE_UNDO)
      g_app_state.toolstack.exec_datapath(ctx, setpath, data, undo_push);
    else 
      ctx.api.set_prop(ctx, setpath, data);
  }
  UIElement.prototype.get_prop_data = function() {
    var ctx=this.ctx;
    try {
      var ret=ctx.api.get_prop(ctx, this.data_path);
      this.path_is_bad = false;
      this.enable();
      return ret;
    }
    catch (err) {
        if (!this.path_is_bad)
          this.do_recalc();
        this.path_is_bad = true;
        this.disable();
        return 0;
    }
  }
  UIElement.prototype.get_prop_meta = function() {
    var ctx=this.ctx;
    return ctx.api.get_prop_meta(ctx, this.data_path);
  }
  UIElement.prototype.do_recalc = function() {
    window.redraw_ui();
    if (this.state&UIFlags.BLOCK_REPAINT)
      return ;
    this.recalc = 1;
    this.recalc_minsize = 1;
    if (this.parent!=undefined)
      this.parent.do_recalc();
  }
  UIElement.prototype.abs_transform = function(pos) {
    var e=this;
    while (e!=undefined) {
      pos[0]+=e.pos[0];
      pos[1]+=e.pos[1];
      if ((e.state&UIFlags.HAS_PAN)) {
          pos[0]+=e.velpan.pan[0];
          pos[1]+=e.velpan.pan[1];
      }
      e = e.parent;
    }
  }
  UIElement.prototype.push_modal = function(e) {
    if (e==undefined) {
        this.fake_push_modal++;
        this.parent.push_modal(this);
    }
    else {
      UIEventHandler.prototype.push_modal.call(this, e);
      if (this.parent!=undefined) {
          this.parent.push_modal(this);
      }
    }
  }
  UIElement.prototype.pop_modal = function() {
    if (this.fake_push_modal) {
        this.fake_push_modal--;
        this.parent.pop_modal();
        return ;
    }
    UIEventHandler.prototype.pop_modal.call(this);
    if (this.parent!=undefined)
      this.parent.pop_modal();
  }
  UIElement.prototype.get_canvas = function() {
    var frame=this;
    while (frame.parent!=undefined&&frame.canvas==undefined) {
      frame = frame.parent;
    }
    return frame.canvas;
  }
  UIElement.prototype.is_canvas_root = function() {
    var ret=this.parent==undefined||(this.canvas!=undefined&&this.parent.get_canvas()!=this.canvas);
    ret = ret||this.state&UIFlags.IS_CANVAS_ROOT;
    ret = ret||this.constructor.name=="ScrArea";
    ret = ret&&this.canvas!=undefined;
    ret = ret&&!(this.canvas.flag&CanvasFlags.NOT_ROOT);
    return ret;
  }
  UIElement.prototype.get_hint = function() {
    if (this.description==""&&(this.state&UIFlags.USE_PATH)) {
        var prop=this.get_prop_meta();
        return prop.description!="" ? prop.description : undefined;
    }
    else {
      return this.description;
    }
  }
  UIElement.prototype.start_pan = function(start_mpos, button, last_mpos) {
    if (button==undefined) {
        button = 0;
    }
    if (last_mpos==undefined) {
        last_mpos = undefined;
    }
    if (!(this.state&UIFlags.HAS_PAN)) {
        if (this.parent==undefined) {
            console.trace();
            console.log("Warning: UIFrame.start_pan: no parent frame with pan support");
        }
        else {
          if (start_mpos!=undefined) {
              start_mpos[0]+=this.pos[0];
              start_mpos[1]+=this.pos[1];
          }
          if (last_mpos!=undefined) {
              last_mpos[0]+=this.pos[0];
              last_mpos[1]+=this.pos[1];
          }
          this.parent.start_pan(start_mpos, button, last_mpos);
        }
    }
  }
  UIElement.prototype.get_filedata = function() {
    return undefined;
  }
  UIElement.prototype.load_filedata = function(map) {
  }
  UIElement.prototype.get_uhash = function() {
    var s=this.constructor.name;
    if (s==undefined)
      s = "";
    if (this.data_path!=undefined) {
        s+=this.data_path;
    }
    if (this.parent!=undefined) {
        s = this.parent.get_uhash()+s;
    }
    return s;
  }
  UIElement.prototype.on_tick = function() {
    if (time_ms()-this.last_flash>this.flash_ival&&(this.state&UIFlags.FLASH)) {
        this.do_recalc();
        this.last_flash = time_ms();
        this.inc_flash_timer();
    }
    UIEventHandler.prototype.on_tick.call(this);
  }
  UIElement.prototype.on_keydown = function(event) {
  }
  UIElement.prototype.on_keyup = function(event) {
  }
  UIElement.prototype.on_mousemove = function(event) {
  }
  UIElement.prototype.on_mousedown = function(event) {
  }
  UIElement.prototype.on_mousewheel = function(event) {
  }
  UIElement.prototype.on_mouseup = function(event) {
  }
  UIElement.prototype.on_contextchange = function(event) {
  }
  UIElement.prototype.update_data = function(ctx) {
  }
  UIElement.prototype.cached_min_size = function(canvas, isVertical) {
    if (this.recalc_minsize) {
        this.recalc_minsize = 0;
        var ret=this.get_min_size(canvas, isVertical);
        this._minsize[0] = ret[0];
        this._minsize[1] = ret[1];
    }
    return this._minsize;
  }
  var $ret_UIElement_get_min_size=[1, 1];
  UIElement.prototype.get_min_size = function(canvas, isvertical) {
    return $ret_UIElement_get_min_size;
  }
  UIElement.prototype.build_draw = function(canvas, isvertical) {
  }
  UIElement.prototype.on_active = function() {
  }
  UIElement.prototype.on_inactive = function() {
  }
  UIElement.prototype.pack = function(canvas, isvertical) {
  }
  UIElement.prototype.gen_tooltip = function() {
  }
  UIElement.prototype.on_add = function(parent) {
  }
  UIElement.prototype.on_remove = function(parent) {
  }
  _es6_module.add_class(UIElement);
  UIElement = _es6_module.add_export('UIElement', UIElement);
  function UIHoverBox(ctx, text, is_modal, pos, size) {
    UIElement.call(this, ctx, undefined, pos, size);
    this.is_modal = is_modal;
    this.text = text;
    this.packflag|=PackFlags.NO_REPACK;
  }
  /*test for IE bug*/;
  if (UIHoverBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIHoverBox.name = 'UIHoverBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIHoverBox = inherit_multiple(UIHoverBox, [UIElement], _es6_module, "UIHoverBox");
  UIHoverBox.prototype.get_min_size = function(UICanvas, isVertical) {
    return this.size;
  }
  UIHoverBox.prototype.on_mousedown = function(event) {
    if (this.is_modal) {
        this.pop_modal();
        var mpos=[event.x, event.y];
        var p=this, lastp;
        while (p!=undefined) {
          lastp = p;
          mpos[0]+=p.pos[0];
          mpos[1]+=p.pos[1];
          p = p.parent;
        }
        this.parent.remove(this);
        this.parent.do_recalc();
        event.x = mpos[0];
        event.y = mpos[1];
        lastp._on_mousedown(event);
    }
  }
  UIHoverBox.prototype._on_mousedown = function(event) {
    if (this.state&UIFlags.ENABLED)
      this.on_mousedown(event);
  }
  UIHoverBox.prototype._on_mousemove = function(event) {
    if (this.state&UIFlags.ENABLED)
      this.on_mousemove(event);
  }
  UIHoverBox.prototype._on_mouseup = function(event) {
    if (this.state&UIFlags.ENABLED)
      this.on_mouseup(event);
  }
  UIHoverBox.prototype._on_keydown = function(event) {
    if (this.state&UIFlags.ENABLED)
      this.on_keydown(event);
  }
  UIHoverBox.prototype._on_keyup = function(event) {
    if (this.state&UIFlags.ENABLED)
      this.on_keyup(event);
  }
  UIHoverBox.prototype.on_mousemove = function(event) {
    if (this.is_modal&&!inrect_2d([event.x, event.y], [0, 0], this.size)) {
        this.pop_modal();
        this.parent.remove(this);
        this.parent.do_recalc();
    }
  }
  UIHoverBox.prototype.build_draw = function(canvas, isVertical) {
    canvas.begin(this);
    canvas.shadow_box([0, 0], this.size);
    var size=IsMobile ? this.size : [this.size[0], this.size[1]];
    canvas.box([0, 0], size, uicolors["HoverHint"]);
    canvas.text([4, 7], this.text, uicolors["BoxText"]);
    canvas.end(this);
  }
  _es6_module.add_class(UIHoverBox);
  UIHoverBox = _es6_module.add_export('UIHoverBox', UIHoverBox);
  function UIHoverHint(ctx, path, pos, size) {
    if (path==undefined) {
        path = undefined;
    }
    if (pos==undefined) {
        pos = undefined;
    }
    if (size==undefined) {
        size = undefined;
    }
    
    UIElement.call(this, ctx, path, pos, size);
    this.start_time = 0;
    this.hover_time = ui_hover_time;
    this.hovering = false;
  }
  /*test for IE bug*/;
  if (UIHoverHint.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIHoverHint.name = 'UIHoverHint';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIHoverHint = inherit_multiple(UIHoverHint, [UIElement], _es6_module, "UIHoverHint");
  UIHoverHint.prototype.start_hover = function() {
    this.start_time = time_ms();
    this.hovering = true;
  }
  UIHoverHint.prototype.stop_hover = function() {
    this.hovering = false;
  }
  UIHoverHint.prototype.on_hint = function(is_modal) {
    if (is_modal==undefined) {
        is_modal = true;
    }
    var hint=this.get_hint();
    console.log("hint: ", hint);
    if (!hint)
      return ;
    if (this.ctx==undefined)
      this.ctx = new Context();
    if (this.get_canvas()==undefined)
      return ;
    var size=new Vector2(this.get_canvas().textsize(hint));
    size.add([8.0, 12.0]);
    var pos=new Vector2([this.pos[0]+4, this.pos[1]-size[1]]);
    var hintbox=new UIHoverBox(this.ctx, hint, is_modal, pos, size);
    var abspos=[0, -size[1]];
    this.abs_transform(abspos);
    var screen=g_app_state.screen;
    var abspos2=[abspos[0], abspos[1]];
    if (abspos[1]<0) {
        abspos[1]+=size[1]+this.size[1];
    }
    abspos[0] = Math.min(Math.max(0, abspos[0]), screen.size[0]-hintbox.size[0]);
    abspos[1] = Math.min(Math.max(0, abspos[1]), screen.size[1]-hintbox.size[1]);
    hintbox.pos[0]+=abspos[0]-abspos2[0];
    hintbox.pos[1]+=abspos[1]-abspos2[1];
    is_modal = is_modal&&(g_app_state.screen.modalhandler==undefined);
    this.parent.add_floating(hintbox, is_modal);
    return hintbox;
  }
  UIHoverHint.prototype.on_active = function() {
    if (this.hovering) {
        this.start_hover();
    }
  }
  UIHoverHint.prototype.on_inactive = function() {
    this.hovering = false;
  }
  UIHoverHint.prototype.on_tick = function() {
    if (this.hovering) {
        console.log("hovering");
    }
    if (this.hovering&&time_ms()-this.start_time>=this.hover_time) {
        this.hovering = false;
        console.log("hint!");
        this.on_hint();
    }
  }
  _es6_module.add_class(UIHoverHint);
  UIHoverHint = _es6_module.add_export('UIHoverHint', UIHoverHint);
});
es6_module_define('UIFileData', [], function _UIFileData_module(_es6_module) {
  "use strict";
});
es6_module_define('UIFrame', ["util", "math", "UIElement", "vectormath", "events"], function _UIFrame_module(_es6_module) {
  "use strict";
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var Timer=es6_import_item(_es6_module, 'util', 'Timer');
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var VelocityPan=es6_import_item(_es6_module, 'events', 'VelocityPan');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var _static_mat=new Matrix4();
  var _ufbd_v1=new Vector3();
  var _canvas_threshold=1.0;
  function UIFrame(ctx, canvas, path, pos, size) {
    UIElement.call(this, ctx, path, pos, size);
    this.dirty_rects = new Array();
    this.bgcolor = undefined;
    this._pan_cache = {}
    this.pan_bounds = [[0, 0], [0, 0]];
    this.depth = 0;
    this.ctx = ctx;
    this._children = new Array();
    this.active = undefined;
    this.velpan = new VelocityPan();
    this.tick_timer = new Timer(90);
    this.mpos = [0, 0];
    this.draw_background = false;
    this.has_hidden_elements = false;
    if (canvas!=undefined) {
        this.canvas = canvas;
    }
    this.leafcount = 0;
    this.framecount = 0;
    this.rcorner = 16.0;
    this.keymap = undefined;
  }
  /*test for IE bug*/;
  if (UIFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIFrame.name = 'UIFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIFrame = inherit_multiple(UIFrame, [UIElement], _es6_module, "UIFrame");
  Object.defineProperty(UIFrame.prototype, "children", {get: function() {
    return this._children;
  }, set: function(cs) {
    var cset=new set();
    var __iter_c=__get_iter(cs);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      cset.add(c);
    }
    var __iter_c=__get_iter(list(this._children));
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (!cset.has(c)) {
          c.on_remove(this);
          c.parent = undefined;
          c.canvas = undefined;
      }
    }
    this._children.reset();
    var __iter_c=__get_iter(cs);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (!cset.has(c)) {
          this.add(c);
      }
      else {
        this._children.push(c);
      }
    }
  }, configurable: true});
  UIFrame.prototype.on_saved_uidata = function(visit_func) {
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      visit_func(c);
    }
  }
  UIFrame.prototype.on_load_uidata = function(visit) {
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      visit(c);
    }
  }
  UIFrame.prototype.on_gl_lost = function(new_gl) {
    if (this.canvas!=undefined&&!(this.canvas.gl===new_gl)) {
        this.canvas.on_gl_lost(new_gl);
    }
    if (this.children==undefined)
      return ;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.on_gl_lost(new_gl);
    }
    this.do_full_recalc();
  }
  UIFrame.prototype.start_pan = function(start_mpos, button, last_mpos) {
    if (start_mpos==undefined) {
        start_mpos = undefined;
    }
    if (button==undefined) {
        button = 0;
    }
    if (last_mpos==undefined) {
        last_mpos = undefined;
    }
    if (!(this.state&UIFlags.HAS_PAN)) {
        if (this.parent==undefined) {
            console.trace();
            console.log("Warning: UIFrame.start_pan: no parent frame with pan support");
        }
        else {
          if (start_mpos!=undefined) {
              start_mpos[0]+=this.pos[0];
              start_mpos[1]+=this.pos[1];
          }
          if (last_mpos!=undefined) {
              last_mpos[0]+=this.pos[0];
              last_mpos[1]+=this.pos[1];
          }
          this.parent.start_pan(start_mpos, button, last_mpos);
        }
    }
    else {
      this.start_pan_main(start_mpos, button, last_mpos);
    }
  }
  UIFrame.prototype.start_pan_main = function(start_mpos, button, last_mpos) {
    if (button==undefined) {
        button = 0;
    }
    if (last_mpos==undefined) {
        last_mpos = start_mpos;
    }
    if (start_mpos!=undefined) {
        this.mpos[0] = start_mpos[0];
        this.mpos[1] = start_mpos[1];
    }
    if (this.velpan==undefined)
      this.velpan = new VelocityPan();
    var mpos=[this.mpos[0], this.mpos[1]];
    var lastmpos;
    this.abs_transform(mpos);
    if (last_mpos!=undefined) {
        last_mpos = [last_mpos[0], last_mpos[1]];
        this.abs_transform(last_mpos);
    }
    else {
      last_mpos = mpos;
    }
    if (DEBUG.touch)
      console.log("sy", mpos[1]);
    var f=this;
    while (f.parent!=undefined) {
      f = f.parent;
    }
    this.velpan.can_coast = !(this.state&UIFlags.NO_VELOCITY_PAN);
    this.velpan.start(mpos, last_mpos, this, f.push_modal.bind(f), f.pop_modal.bind(f));
  }
  UIFrame.prototype.end_pan = function() {
    if (this.modalhandler==this.velpan) {
        this.velpan.end();
        this.pop_modal();
    }
    else {
      console.trace();
      console.log("Warning: UIFrame.end_pan called when not in panning mode");
      return ;
    }
  }
  UIFrame.prototype.get_keymaps = function() {
    return this.keymap!=undefined ? [this.keymap] : [];
  }
  UIFrame.prototype.do_full_recalc = function() {
    this.dirty_rects.push([[this.abspos[0], this.abspos[1]], [this.size[0], this.size[1]]]);
    this.do_recalc();
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (__instance_of(c, UIFrame))
        c.do_full_recalc();
      else 
        c.do_recalc();
    }
  }
  UIFrame.prototype.on_resize = function(newsize, oldsize) {
    if (this.canvas!=undefined) {
        this.canvas.on_resize(newsize, oldsize);
    }
    this.do_full_recalc();
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.do_recalc();
      c.on_resize(newsize, oldsize);
    }
  }
  UIFrame.prototype.on_inactive = function() {
    if (this.active!=undefined) {
        this.active.state&=~UIFlags.HIGHLIGHT;
        this.active.do_recalc();
        this.active.on_inactive();
        this.active = undefined;
        this.do_recalc();
    }
  }
  UIFrame.prototype.push_modal = function(e) {
    UIElement.prototype.push_modal.call(this, e);
  }
  UIFrame.prototype.pop_modal = function() {
    UIElement.prototype.pop_modal.call(this);
  }
  UIFrame.prototype._offset_mpos = function(event) {
    if (this.modalhandler!=null&&__instance_of(this.modalhandler, UIElement)) {
        event.x-=this.modalhandler.pos[0];
        event.y-=this.modalhandler.pos[1];
    }
    if ((this.state&UIFlags.HAS_PAN)&&this.velpan!=undefined) {
        event.x-=this.velpan.pan[0];
        event.y-=this.velpan.pan[1];
    }
  }
  UIFrame.prototype._unoffset_mpos = function(event) {
    if (this.state&UIFlags.HAS_PAN) {
        event.x+=this.velpan.pan[0];
        event.y+=this.velpan.pan[1];
    }
  }
  UIFrame.prototype.set_pan = function() {
    if (this.state&UIFlags.PAN_CANVAS_MAT)
      this.on_pan(this.velpan.pan, this.velpan.pan);
  }
  UIFrame.prototype.on_pan = function(pan, old_pan) {
    if (this.state&UIFlags.PAN_CANVAS_MAT) {
        var mat=this.canvas.global_matrix;
        var s=this.canvas.viewport[1];
        var x=(pan[0]/s[0])*2.0;
        var y=(pan[1]/s[1])*2.0;
        mat.makeIdentity();
        mat.translate(x, y, 0);
    }
    else {
      this.do_full_recalc();
    }
    this.pan_do_build();
  }
  UIFrame.prototype._on_mousemove = function(event) {
    if (this.bad_event(event))
      return ;
    if (this.modalhandler!=null) {
        this._offset_mpos(event);
        this.modalhandler._on_mousemove(event);
        return true;
    }
    else {
      return this.on_mousemove(event);
    }
  }
  UIFrame.prototype.focus = function(e) {
    if (this.active!==e&&this.active!==undefined) {
        this.active.state&=~UIFlags.HIGHLIGHT;
        this.active.on_inactive();
        this.active.do_recalc();
    }
    else 
      if (e!=undefined&&e===this.active) {
        if (this.parent!=undefined)
          this.parent.focus(this);
        return ;
    }
    if (e!=undefined) {
        e.state|=UIFlags.HIGHLIGHT;
        e.on_active();
        e.do_recalc();
    }
    this.active = e;
    if (this.parent!=undefined) {
        this.parent.focus(this);
    }
  }
  var $pos_UIFrame__find_active=[0, 0];
  UIFrame.prototype._find_active = function(e) {
    var mpos=[e.x, e.y];
    var found=false;
    for (var i=this.children.length-1; i>=0; i--) {
        var c=this.children[i];
        $pos_UIFrame__find_active[0] = c.pos[0], $pos_UIFrame__find_active[1] = c.pos[1];
        if (c.state&UIFlags.HAS_PAN) {
        }
        if (inrect_2d(mpos, $pos_UIFrame__find_active, c.size)) {
            found = true;
            if (this.active!=c&&this.active!=undefined) {
                this.active.state&=~UIFlags.HIGHLIGHT;
                this.active.on_inactive();
                this.active.do_recalc();
            }
            if (this.active!=c) {
                c.state|=UIFlags.HIGHLIGHT;
                c.on_active();
                c.do_recalc();
                this.active = c;
            }
            break;
        }
    }
    if (!found&&this.active!=undefined) {
        this.active.state&=~UIFlags.HIGHLIGHT;
        this.active.on_inactive();
        this.active.do_recalc();
        this.active = undefined;
    }
  }
  UIFrame.prototype.on_mousemove = function(e) {
    if (this.bad_event(e))
      return ;
    this._offset_mpos(e);
    var mpos=this.mpos = [e.x, e.y];
    var found=false;
    this._find_active(e);
    if (this.active!=undefined) {
        e.x-=this.active.pos[0];
        e.y-=this.active.pos[1];
        this.active._on_mousemove(e);
        e.x+=this.active.pos[0];
        e.y+=this.active.pos[1];
    }
    this._unoffset_mpos(e);
    return this.active!=undefined;
  }
  UIFrame.prototype.bad_event = function(event) {
    if (!(this.state&UIFlags.ENABLED))
      return false;
    return UIElement.prototype.bad_event.call(this, event);
  }
  UIFrame.prototype._on_doubleclick = function(event) {
    if (this.bad_event(event))
      return ;
    if (this.modalhandler!=null) {
        this._offset_mpos(event);
        this.modalhandler._on_doubleclick(event);
    }
    else {
      this.on_doubleclick(event);
    }
  }
  UIFrame.prototype._on_mousedown = function(event) {
    if (this.bad_event(event))
      return ;
    if (this.modalhandler!=null) {
        this._offset_mpos(event);
        this.modalhandler._on_mousedown(event);
    }
    else {
      this.on_mousedown(event);
    }
  }
  UIFrame.prototype.on_doubleclick = function(e) {
    if (this.bad_event(e))
      return ;
    var mpos=this.mpos = [e.x, e.y];
    this._find_active(e);
    if (this.active!=undefined) {
        e.x-=this.active.pos[0];
        e.y-=this.active.pos[1];
        this.active._on_doubleclick(e);
    }
    this._unoffset_mpos(e);
    return this.active!=undefined;
  }
  UIFrame.prototype.on_mousedown = function(e, feed_mousemove) {
    if (feed_mousemove==undefined) {
        feed_mousemove = false;
    }
    if (this.bad_event(e))
      return ;
    if (feed_mousemove)
      this.on_mousemove(e);
    else 
      this._offset_mpos(e);
    var mpos=this.mpos = [e.x, e.y];
    this._find_active(e);
    if ((this.state&UIFlags.USE_PAN)&&(e.button!=0||this.active==undefined)) {
        console.log("panning");
        this.start_pan([e.x, e.y]);
        return ;
    }
    if (this.active!=undefined) {
        e.x-=this.active.pos[0];
        e.y-=this.active.pos[1];
        this.active._on_mousedown(e);
    }
    this._unoffset_mpos(e);
    return this.active!=undefined;
  }
  UIFrame.prototype._on_mouseup = function(event) {
    if (this.bad_event(event))
      return ;
    if (this.modalhandler!=null) {
        this._offset_mpos(event);
        this.modalhandler._on_mouseup(event);
    }
    else {
      this.on_mouseup(event);
    }
  }
  UIFrame.prototype.on_mouseup = function(e) {
    if (this.bad_event(e))
      return ;
    this._offset_mpos(e);
    if (this.active!=undefined) {
        e.x-=this.active.pos[0];
        e.y-=this.active.pos[1];
        this.active._on_mouseup(e);
    }
    this._unoffset_mpos(e);
    return this.active!=undefined;
  }
  UIFrame.prototype._on_mousewheel = function(event, delta) {
    if (this.bad_event(event))
      return ;
    if (this.modalhandler!=null) {
        if (this.modalhandler["pos"]!=undefined) {
            event.x-=this.modalhandler.pos[0];
            event.y-=this.modalhandler.pos[1];
        }
        this.modalhandler._on_mousewheel(event, delta);
    }
    else {
      this.on_mousewheel(event, delta);
    }
  }
  UIFrame.prototype.on_mousewheel = function(e, delta) {
    if (this.active!=undefined) {
        if (this.modalhandler!=null&&this.modalhandler["pos"]!=undefined) {
            event.x-=this.modalhandler.pos[0];
            event.y-=this.modalhandler.pos[1];
        }
        this.active._on_mousewheel(e, delta);
    }
    return this.active!=undefined;
  }
  UIFrame.prototype.on_textinput = function(e) {
    if (this.active!=undefined) {
        this.active._on_textinput(e);
    }
    return this.active!=undefined;
  }
  UIFrame.prototype.on_keydown = function(e) {
    if (this.active!=undefined) {
        this.active._on_keydown(e);
    }
    return this.active!=undefined;
  }
  UIFrame.prototype.on_keyup = function(e) {
    if (this.active!=undefined) {
        this.active._on_keyup(e);
    }
    return this.active!=undefined;
  }
  UIFrame.prototype.on_charcode = function(e) {
    if (this.active!=undefined) {
        this.active._on_charcode(e);
    }
    return this.active!=undefined;
  }
  UIFrame.prototype.get_uhash = function() {
    var s="";
    var p=this;
    while (p!=undefined) {
      s+=p.constructor.name;
      if (__instance_of(p, Area))
        break;
      p = p.parent;
    }
    return s;
  }
  UIFrame.prototype.prepend = function(e, packflag) {
    e.defunct = false;
    this.children.prepend(e);
    if (!(__instance_of(e, UIFrame))) {
        this.leafcount++;
    }
    else {
      this.framecount++;
    }
    if (packflag!=undefined)
      e.packflag|=packflag;
    e.parent = this;
    if (e.canvas==undefined)
      e.canvas = this.canvas;
    e.on_add(this);
    this.do_recalc();
    this.update_depth();
  }
  UIFrame.prototype._set_pan = function(e) {
    e.state|=UIFlags.USE_PAN;
    if (__instance_of(e, UIFrame)) {
        var __iter_c=__get_iter(e.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          this._set_pan(c);
        }
    }
  }
  UIFrame.prototype.update_depth = function(e) {
    return ;
    var p=this;
    this.depth = 0;
    while (p.parent!=undefined) {
      p = p.parent;
      this.depth++;
    }
    function rec(f, depth) {
      if (depth==undefined) {
          depth = 0;
      }
      f.depth = depth;
      var __iter_c=__get_iter(f.children);
      var c;
      while (1) {
        var __ival_c=__iter_c.next();
        if (__ival_c.done) {
            break;
        }
        c = __ival_c.value;
        if (__instance_of(c, UIFrame)) {
            rec(c, depth+1);
        }
      }
    }
  }
  UIFrame.prototype.add = function(e, packflag) {
    if (__instance_of(e, UIFrame)&&(e.state&UIFlags.HAS_PAN)&&e.velpan==undefined) {
        e.velpan = new VelocityPan();
    }
    if (this.state&(UIFlags.HAS_PAN|UIFlags.USE_PAN)) {
        this.state|=UIFlags.USE_PAN;
        this._set_pan(e);
    }
    e.defunct = false;
    this.children.push(e);
    if (!(__instance_of(e, UIFrame))) {
        this.leafcount++;
    }
    else {
      this.framecount++;
    }
    if (packflag!=undefined)
      e.packflag|=packflag;
    e.parent = this;
    if (e.canvas==undefined)
      e.canvas = this.canvas;
    e.on_add(this);
    e.do_recalc();
    this.update_depth();
  }
  UIFrame.prototype.replace = function(a, b) {
    if (a==this.modalhandler) {
        a.pop_modal();
    }
    this.dirty_rects.push([[a.abspos[0], a.abspos[1]], [a.size[0], a.size[1]]]);
    a.on_remove(this);
    this.children.replace(a, b);
    if (this.canvas!=undefined)
      this.canvas.remove_cache(a);
    if (a==this.active)
      this.active = b;
    b.parent = this;
    if (b.canvas==undefined)
      b.canvas = this.get_canvas();
    if (b.ctx==undefined)
      b.ctx = this.ctx;
    b.on_add(this);
    b.do_recalc();
    this.update_depth();
  }
  UIFrame.prototype.remove = function(e) {
    e.defunct = true;
    this.dirty_rects.push([[e.abspos[0], e.abspos[1]], [e.size[0], e.size[1]]]);
    if (!(__instance_of(e, UIFrame))) {
        this.leafcount--;
    }
    else {
      this.framecount--;
    }
    if (e==this.modalhandler) {
        e.pop_modal();
    }
    this.children.remove(e);
    e.on_remove(this);
    if (this.canvas!=undefined)
      this.canvas.remove_cache(e);
    if (e==this.active)
      this.active = undefined;
    this.update_depth();
  }
  UIFrame.prototype.set_context = function(ctx) {
    this.ctx = ctx;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.set_context(ctx);
    }
  }
  UIFrame.prototype.load_filedata = function(obj) {
    if (obj.pan) {
        this.velpan = new VelocityPan();
        this.velpan.pan.load(obj.pan);
    }
  }
  UIFrame.prototype.disable = function() {
    UIElement.prototype.disable.call(this);
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.disable();
    }
  }
  UIFrame.prototype.enable = function() {
    UIElement.prototype.disable.call(this);
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.enable();
    }
  }
  UIFrame.prototype.get_filedata = function() {
    if (this.state&UIFlags.HAS_PAN&&this.velpan!=undefined) {
        return {pan: this.velpan.pan}
    }
    return undefined;
  }
  UIFrame.prototype.pan_do_build = function() {
    var cache=this._pan_cache;
    var cache2={}
    var i=0;
    var viewport=g_app_state.raster.viewport;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.abspos[0] = 0;
      c.abspos[1] = 0;
      c.abs_transform(c.abspos);
      var hidden=!aabb_isect_2d(c.abspos, c.size, viewport[0], viewport[1]);
      if (!this.recalc&&!hidden&&(!(i in cache)||cache[i]!=hidden)) {
          console.log("pan recalc");
          this.do_recalc();
      }
      cache2[i] = hidden;
      i++;
    }
    this._pan_cache = cache2;
  }
  UIFrame.prototype.calc_dirty = function() {
    var d=this.last_dirty;
    var ret=[[0, 0], [0, 0]];
    var first=true;
    var margin=1;
    var __iter_r=__get_iter(this.dirty_rects);
    var r;
    while (1) {
      var __ival_r=__iter_r.next();
      if (__ival_r.done) {
          break;
      }
      r = __ival_r.value;
      if (first) {
          first = false;
          ret[0][0] = r[0][0]-margin;
          ret[0][1] = r[0][1]-margin;
          ret[1][0] = r[1][0]+r[0][0]+margin*2;
          ret[1][1] = r[1][1]+r[0][1]+margin*2;
      }
      else {
        ret[0][0] = Math.min(ret[0][0], r[0][0]-margin);
        ret[0][1] = Math.min(ret[0][1], r[0][1]-margin);
        ret[1][0] = Math.max(ret[1][0], r[0][0]+r[1][0]+margin*2);
        ret[1][1] = Math.max(ret[1][1], r[0][1]+r[1][1]+margin*2);
      }
    }
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name=="ScreenBorder")
        continue;
      if (c.state&UIFlags.INVISIBLE)
        continue;
      if (!c.recalc)
        continue;
      var ret2;
      if (__instance_of(c, UIFrame)) {
          ret2 = c.calc_dirty();
      }
      else {
        ret2 = c.last_dirty;
      }
      if (first) {
          ret[0][0] = ret2[0][0];
          ret[0][1] = ret2[0][1];
          ret[1][0] = ret2[1][0]+ret2[0][0];
          ret[1][1] = ret2[1][1]+ret2[0][1];
          first = false;
      }
      else {
        for (var i=0; i<2; i++) {
            ret[0][i] = Math.min(ret[0][i], ret2[0][i]);
            ret[1][i] = Math.max(ret[1][i], ret2[1][i]+ret2[0][i]);
        }
      }
    }
    this.abspos[0] = this.abspos[1] = 0.0;
    this.abs_transform(this.abspos);
    ret[0][0] = Math.min(Math.max(ret[0][0], this.abspos[0]), this.abspos[0]+this.size[0]);
    ret[1][0]-=ret[0][0];
    ret[1][1]-=ret[0][1];
    return ret;
  }
  UIFrame.prototype.build_draw = function(canvas, isVertical, cache_frame) {
    if (cache_frame==undefined) {
        cache_frame = undefined;
    }
    var mat=_static_mat;
    this.has_hidden_elements = false;
    var d2=[[1e+17, 1e+17], [-1e+17, -1e+17]];
    function recurse(n) {
      if (__instance_of(n, UIFrame)) {
          for (var i=0; i<n.children.length; i++) {
              recurse(n.children[i]);
          }
          return ;
      }
      if (!n.recalc)
        return ;
      n.abspos[0] = n.abspos[1] = 0;
      n.abs_transform(n.abspos);
      for (var i=0; i<2; i++) {
          d2[0][i] = Math.min(d2[0][i], n.abspos[i]);
          d2[1][i] = Math.max(d2[1][i], n.abspos[i]+n.size[i]);
      }
      var g=G.g;
      g.moveTo(n.abspos[0], n.abspos[1]);
      g.rect(n.abspos[0], n.abspos[1]+n.size[1], n.size[0], n.size[1]);
      g.closePath();
      g.lineWidth = 2.0;
      g.strokeStyle = "blue";
      g.lineWidth = 1.0;
    }
    this.recalc = 0;
    if (this._limit==undefined)
      this._limit = 0;
    var d=this.calc_dirty();
    if (this.parent==undefined) {
        var g=G.g;
        recurse(this);
        d2[1][0]-=d2[0][0];
        d2[1][1]-=d2[0][1];
        g.save();
        g.clearRect(d2[0][0], d2[0][1], d2[1][0], d2[1][1]);
        g.beginPath();
        g.rect(d2[0][0], d2[0][1], d2[1][0], d2[1][1]);
        g.closePath();
        g.lineWidth = 2.0;
        g.strokeStyle = "rgba(0, 50, 250, 0.2)";
        g.stroke();
        g.lineWidth = 1.0;
        g.clip();
    }
    this.dirty_rects.reset();
    if (this.canvas==undefined) {
        var p=this;
        while (p!=undefined&&p.canvas==undefined) {
          p = p.parent;
        }
        if (p!=undefined) {
            this.canvas = p.canvas;
            this.pack(this.canvas, false);
        }
    }
    if (this.canvas==undefined) {
        if (this.parent==undefined) {
            _appstate.g.restore();
        }
        return ;
    }
    var pos=[d[0][0], d[0][1]];
    var size=[d[1][0], d[1][1]];
    pos[0]-=this.abspos[0];
    pos[1]-=this.abspos[1];
    var pushed_pan_transform=false;
    var canvas=this.canvas;
    try {
      if (this.state&UIFlags.HAS_PAN&&this.velpan!=undefined) {
          canvas.push_transform();
          pushed_pan_transform = true;
          canvas.translate(this.velpan.pan);
      }
    }
    catch (err) {
        print_stack(err);
    }
    if (this.draw_background) {
        canvas.simple_box([0, 0], this.size, this.bgcolor, this.rcorner);
    }
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.canvas==undefined)
        c.canvas = this.canvas;
      if (!c.recalc)
        continue;
      this.canvas.push_transform();
      this.canvas.translate(c.pos);
      c.abspos[0] = 0;
      c.abspos[1] = 0;
      c.abs_transform(c.abspos);
      if (!(__instance_of(c, UIFrame))) {
          var t=c.dirty;
          c.dirty = c.last_dirty;
          c.last_dirty = t;
          c.dirty[0][0] = c.abspos[0];
          c.dirty[0][1] = c.abspos[1];
          c.dirty[1][0] = c.size[0];
          c.dirty[1][1] = c.size[1];
      }
      try {
        c.build_draw(this.canvas, false);
      }
      catch (err) {
          print_stack(err);
      }
      this.canvas.pop_transform();
      c.recalc = false;
    }
    if (pushed_pan_transform) {
        this.canvas.pop_transform();
    }
    if (this.parent==undefined) {
        G.g.restore();
    }
  }
  var $zero_UIFrame_build_draw_old=[0, 0];
  UIFrame.prototype.build_draw_old = function(canvas, isVertical, cache_frame) {
    if (cache_frame==undefined) {
        cache_frame = undefined;
    }
    var mat=_static_mat;
    this.has_hidden_elements = false;
    var d=this.calc_dirty();
    if (this.is_canvas_root()) {
        if (DEBUG.use_2d_uicanvas) {
            var __iter_c=__get_iter(this.children);
            var c;
            while (1) {
              var __ival_c=__iter_c.next();
              if (__ival_c.done) {
                  break;
              }
              c = __ival_c.value;
              if (aabb_isect_2d(c.pos, c.size, d[0], d[1])) {
                  c.do_recalc();
              }
            }
        }
        this.canvas.push_transform();
        this.canvas.translate(this.pos);
    }
    if (cache_frame==undefined) {
        cache_frame = !(this.state&UIFlags.NO_FRAME_CACHE);
    }
    if (cache_frame&&this.depth==4) {
        canvas.frame_begin(this);
    }
    if (this.parent==undefined) {
        this.abspos[0] = this.abspos[1] = 0.0;
        this.abs_transform(this.abspos);
    }
    if (this.state&UIFlags.HAS_PAN&&this.velpan!=undefined) {
        if (!(this.state&UIFlags.PAN_CANVAS_MAT)) {
            canvas.push_transform();
            canvas.translate(this.velpan.pan);
        }
    }
    if (this.pos==undefined) {
        this.pos = [0, 0];
        console.log("eek");
        console.trace();
    }
    if (this.draw_background) {
    }
    var retag_recalc=false;
    this.recalc = 0;
    var viewport=g_app_state.raster.viewport;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.abspos[0] = 0;
      c.abspos[1] = 0;
      c.abs_transform(c.abspos);
      var t=c.dirty;
      c.dirty = c.last_dirty;
      c.last_dirty = t;
      c.dirty[0][0] = c.abspos[0];
      c.dirty[0][1] = c.abspos[1];
      c.dirty[1][0] = c.size[0];
      c.dirty[1][1] = c.size[1];
      var isect=aabb_isect_2d(c.abspos, c.size, viewport[0], viewport[1]);
      var pos;
      if (this.state&UIFlags.HAS_PAN)
        pos = this.velpan.pan;
      else 
        pos = $zero_UIFrame_build_draw_old;
      isect = isect||aabb_isect_2d(c.pos, c.size, pos, this.size);
      if (!isect) {
          this.has_hidden_elements = true;
          continue;
      }
      if (c.pos==undefined) {
          c.pos = [0, 0];
          c.size = [0, 0];
          console.log("eek2");
          console.trace();
      }
      mat.makeIdentity();
      _ufbd_v1.zero();
      _ufbd_v1[0] = c.pos[0];
      _ufbd_v1[1] = c.pos[1];
      mat.translate(_ufbd_v1);
      if ((c.canvas!=undefined&&c.canvas!=this.get_canvas())||c.is_canvas_root()) {
          if (c.recalc&&!(c.packflag&PackFlags.NO_REPACK)) {
              var canvas2=c.get_canvas();
              canvas2.push_transform();
              canvas2.translate(c.pos);
              c.pack(canvas2, false);
              c.build_draw(canvas2, isVertical);
              canvas2.pop_transform();
          }
          continue;
      }
      var do_skip=!c.recalc;
      if (!(__instance_of(c, UIFrame))&&this.constructor.name!="UIMenu") {
          do_skip = !c.recalc;
      }
      if (c.recalc) {
          var r=this.recalc;
          if (c.recalc&&!(c.packflag&PackFlags.NO_REPACK))
            c.pack(canvas, false);
          canvas.push_transform(mat);
          try {
            c.build_draw(canvas, isVertical);
          }
          catch (_err) {
              print_stack(_err);
              if (c==this.modalhandler)
                c.pop_modal();
              console.log("Error occured while drawing element ", c);
          }
          canvas.pop_transform(mat);
          c.recalc = 0;
      }
    }
    if (cache_frame&&this.depth==4) {
        canvas.frame_end(this);
    }
    if (retag_recalc)
      this.do_recalc();
    if (this.state&UIFlags.HAS_PAN&&this.velpan!=undefined) {
        if (!(this.state&UIFlags.PAN_CANVAS_MAT)) {
            canvas.pop_transform();
        }
    }
    if (this.is_canvas_root()) {
        this.canvas.pop_transform();
    }
    this.dirty_rects.reset();
  }
  UIFrame.prototype.on_tick = function(pre_func) {
    if (!this.tick_timer.ready())
      return ;
    prior(UIFrame, this).on_tick.call(this);
    if (this.state&UIFlags.HAS_PAN&&this.valpan==undefined) {
        this.valpan = new VelocityPan();
        this.state|=UIFlags.USE_PAN;
        function recurse(f) {
          var __iter_c=__get_iter(f.children);
          var c;
          while (1) {
            var __ival_c=__iter_c.next();
            if (__ival_c.done) {
                break;
            }
            c = __ival_c.value;
            c.state|=UIFlags.USE_PAN;
            if (__instance_of(c, UIFrame))
              recurse(c);
          }
        }
        recurse(this);
    }
    if (this.velpan!=undefined) {
        this.velpan.on_tick();
    }
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      try {
        if (pre_func!=undefined)
          pre_func(c);
        c.on_tick();
        if (c.status_timer!=undefined) {
            c.inc_flash_timer();
            c.do_recalc();
        }
      }
      catch (_err) {
          print_stack(_err);
          if (c==this.modalhandler)
            c.pop_modal();
          console.log("Error occured in UIFrame.on_tick ", c);
      }
    }
  }
  UIFrame.prototype.pack = function(canvas, isVertical) {
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.recalc&&!(c.packflag&PackFlags.NO_REPACK))
        c.pack(canvas, isVertical);
    }
  }
  UIFrame.prototype.add_floating = function(e, modal, center) {
    if (modal==undefined) {
        modal = false;
    }
    if (center==undefined) {
        center = false;
    }
    var off=[e.pos[0], e.pos[1]];
    var frame=this;
    this.abs_transform(off);
    while (frame.parent!=undefined) {
      frame = frame.parent;
    }
    if (e.canvas==undefined)
      e.canvas = frame.get_canvas();
    if (center) {
    }
    e.pos[0] = off[0];
    e.pos[1] = off[1];
    frame.add(e);
    e.do_recalc();
    frame.do_full_recalc();
    if (modal) {
        frame.push_modal(e);
    }
  }
  _es6_module.add_class(UIFrame);
  UIFrame = _es6_module.add_export('UIFrame', UIFrame);
});
es6_module_define('UIMenu', ["toolsystem", "UITextBox", "UIWidgets", "events", "UIFrame", "vectormath", "UIElement", "math", "UIPack"], function _UIMenu_module(_es6_module) {
  "use strict";
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var ignore_next_mouseup_event=es6_import_item(_es6_module, 'events', 'ignore_next_mouseup_event');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var UITextBox=es6_import_item(_es6_module, 'UITextBox', 'UITextBox');
  var ToolOp=es6_import_item(_es6_module, 'toolsystem', 'ToolOp');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  function UIMenuEntry(label, hotkey, pos, size) {
    UIElement.call(this);
    this.clicked = false;
    this.label = label;
    this.text = "";
    this.pos = pos;
    this.hotkey = hotkey;
    this.size = size;
    this.i = 0;
    this.callback = undefined;
    this.add_sep = false;
    this.packed = false;
  }
  /*test for IE bug*/;
  if (UIMenuEntry.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIMenuEntry.name = 'UIMenuEntry';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIMenuEntry = inherit_multiple(UIMenuEntry, [UIElement], _es6_module, "UIMenuEntry");
  UIMenuEntry.prototype.on_mousedown = function(event) {
    if ((event.button==0||(event.button==2&&this.parent.close_on_right))&&!this.clicked) {
        this.clicked = true;
        this.do_recalc();
        if (inrect_2d([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UIMenuEntry.prototype.on_mouseup = function(event) {
    if (event.button==0||(event.button==2&&this.parent.close_on_right)) {
        this.clicked = false;
        this.do_recalc();
        if (inrect_2d([event.x, event.y], [0, 0], this.size)) {
            if (this.callback!=undefined) {
                this.callback(this);
            }
        }
    }
  }
  UIMenuEntry.prototype.build_draw = function(canvas) {
    canvas.begin(this);
    var tsize=canvas.textsize(this.text, menu_text_size);
    var y=0.5*(this.size[1]-tsize[1]);
    var textclr, hotclr;
    if (this.state&UIFlags.HIGHLIGHT) {
        canvas.simple_box([1, 1], [this.size[0]-2, this.size[1]-2], uicolors["MenuHighlight"], 0.0);
        textclr = hotclr = uicolors["MenuTextHigh"];
    }
    else {
      textclr = uicolors["MenuText"];
      hotclr = uicolors["HotkeyText"];
    }
    canvas.text([2, y], this.text, textclr, menu_text_size);
    if (this.hotkey!=undefined) {
        var tsize=canvas.textsize(this.hotkey, menu_text_size);
        canvas.text([this.size[0]-tsize[0]-8, y], this.hotkey, hotclr, menu_text_size);
    }
    canvas.end(this);
  }
  UIMenuEntry.prototype.get_min_size = function(canvas, isvertical) {
    return [canvas.textsize(this.text, menu_text_size)[0]+4, 24];
  }
  _es6_module.add_class(UIMenuEntry);
  UIMenuEntry = _es6_module.add_export('UIMenuEntry', UIMenuEntry);
  function UIMenu(name, callback) {
    UIFrame.call(this);
    this.name = name;
    this.callback = callback;
    this.idmap = {}
    this.closed = false;
    this.chosen_id = undefined;
    this.minwidth = undefined;
    this.hkey_line_pos = 0;
    this.close_on_right = false;
    this.call_time = 0;
    this.last_active = undefined;
    this.ignore_next_mouseup = undefined;
  }
  /*test for IE bug*/;
  if (UIMenu.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIMenu.name = 'UIMenu';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIMenu = inherit_multiple(UIMenu, [UIFrame], _es6_module, "UIMenu");
  UIMenu.prototype.add_item = function(text, hotkey, id) {
    var en=new UIMenuEntry(text, hotkey, [0, 0], [0, 0]);
    en.close_on_right = this.close_on_right;
    en.i = this.children.length;
    if (id==undefined)
      id = en.id;
    this.idmap[en.i] = id;
    this.add(en);
    return en;
  }
  UIMenu.prototype.on_keydown = function(event) {
    if (event.keyCode==charmap["Enter"]) {
        if (this.active!=undefined&&this.active.constructor.name==UIMenuEntry.name) {
            this.active.callback(this.active);
        }
    }
    else 
      if (event.keyCode==charmap["Escape"]) {
        this.end_menu();
    }
  }
  UIMenu.prototype.packmenu = function(canvas) {
    var maxwid=-1;
    var y=0;
    var ehgt=IsMobile ? 45 : 25;
    var padx=2;
    this.ehgt = ehgt;
    var this2=this;
    function menu_callback(e) {
      if (this2.closed)
        return ;
      this2.end_menu();
      if (this2.callback!=undefined) {
          this2.chosen_id = this2.idmap[e.i];
          this2.callback(e, this2.idmap[e.i]);
      }
    }
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!="UIMenuEntry")
        continue;
      c.callback = menu_callback;
    }
    var y;
    if (this.name!=undefined&&this.name!="")
      y = ehgt+15;
    else 
      y = 5;
    var maxcol=0;
    var hkey_line_pos=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!="UIMenuEntry")
        continue;
      var st=c.label+"    "+c.hotkey;
      maxwid = Math.max(canvas.textsize(st, menu_text_size)[0]+30, maxwid);
      hkey_line_pos = Math.max(canvas.textsize(c.label+"    ", menu_text_size)[0]+18, hkey_line_pos);
      maxcol = Math.max(st.length, maxcol);
      y+=ehgt;
    }
    this.hkey_line_pos = hkey_line_pos;
    if (this.minwidth!=undefined)
      maxwid = Math.max(this.minwidth, maxwid);
    this.size = [maxwid, y];
    var y=5;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      if (c.constructor.name!="UIMenuEntry")
        continue;
      c.text = "    "+c.label;
      var col=Math.abs(maxcol-c.text.length-c.hotkey.length);
      c.pos[1] = y;
      c.pos[0] = padx;
      c.size[0] = maxwid;
      c.size[1] = ehgt;
      y+=ehgt;
    }
  }
  UIMenu.prototype.end_menu = function() {
    if (!this.closed) {
        this.closed = true;
        this.pop_modal();
        this.parent.remove(this);
        this.parent.do_recalc();
        if (this.parent.active==this)
          this.parent.active = this.last_active;
        if (this.ignore_next_mouseup_event!=undefined) {
            ignore_next_mouseup_event(this.ignore_next_mouseup_event);
        }
    }
  }
  UIMenu.prototype.on_mousedown = function(event) {
    if (!inrect_2d([event.x, event.y], [0, 0], this.size)) {
        this.end_menu();
    }
    else {
      UIFrame.prototype.on_mousedown.call(this, event);
    }
  }
  UIMenu.prototype.on_mousemove = function(event) {
    UIFrame.prototype.on_mousemove.call(this, event);
    if (!inrect_2d([event.x, event.y], [-12, -100], [this.size[0]+12*2, this.size[1]+200])) {
        this.end_menu();
    }
  }
  UIMenu.prototype.build_draw = function(canvas, isvertical) {
    if (!this.packed) {
        this.packmenu(canvas);
        this.packed = true;
    }
    canvas.shadow_box([8, -1], [this.size[0]-10, this.size[1]-10]);
    canvas.simple_box([0, 0], this.size, uicolors["MenuBox"][0], 0.0);
    canvas.box_outline([0, 0], this.size, uicolors["MenuBorder"], 0.0);
    canvas.text([24, this.size[1]-22], this.name, uicolors["MenuText"], menu_text_size);
    var clr=uicolors["MenuSep"];
    if (this.name!=undefined&&this.name!="")
      canvas.line([0, Math.floor(this.size[1]-30), 0], [Math.floor(this.size[0]), Math.floor(this.size[1]-30), 0], clr, clr, 1.0);
    var ehgt=this.ehgt;
    var y=ehgt+2;
    for (var i=1; i<this.children.length; i++) {
        var c=this.children[i];
        if (c.constructor.name!=UIMenuEntry.name)
          continue;
        if (!c.add_sep) {
            y+=ehgt;
            continue;
        }
        canvas.line([0, y+3, 0], [this.size[0], y+3, 0], clr, clr, 1);
        y+=ehgt;
    }
    UIFrame.prototype.build_draw.call(this, canvas, true);
    y+=10;
  }
  _es6_module.add_class(UIMenu);
  UIMenu = _es6_module.add_export('UIMenu', UIMenu);
  function ui_call_menu(menu, frame, pos, center, min_width) {
    if (center==undefined) {
        center = true;
    }
    if (min_width==undefined) {
        min_width = 20;
    }
    console.log("menu call");
    var off=[pos[0], pos[1]];
    if (frame.parent!=undefined)
      frame.parent.abs_transform(off);
    while (frame.parent!=undefined) {
      frame = frame.parent;
    }
    off[0]-=frame.pos[0];
    off[1]-=frame.pos[1];
    menu.closed = false;
    menu.minwidth = min_width;
    console.log("menu frame", frame);
    var canvas=frame.canvas;
    menu.canvas = canvas;
    var __iter_c=__get_iter(menu.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      c.do_recalc();
    }
    menu.packmenu(canvas);
    if (center) {
        off[0]-=menu.size[0]/3;
        off[1]-=menu.size[1]/3;
    }
    menu.pos[0] = off[0];
    menu.pos[1] = off[1];
    menu.call_time = time_ms();
    menu.last_active = frame.active;
    console.log("menu call");
    frame.add(menu);
    frame.push_modal(menu);
    frame.do_recalc();
    frame.dirty_rects.push([[menu.pos[0], menu.pos[1]], [menu.size[0], menu.size[1]]]);
  }
  ui_call_menu = _es6_module.add_export('ui_call_menu', ui_call_menu);
  var ToolFlags=es6_import_item(_es6_module, 'toolsystem', 'ToolFlags');
  var UndoFlags=es6_import_item(_es6_module, 'toolsystem', 'UndoFlags');
  function toolop_menu(ctx, name, oplist) {
    var oplist_instance=[];
    function op_callback(entry, id) {
      var op=oplist_instance[id];
      if (op.flag&ToolFlags.USE_DEFAULT_INPUT)
        g_app_state.toolstack.default_inputs(new Context(), op);
      ctx.toolstack.exec_tool(op);
    }
    var menu=new UIMenu(name, op_callback);
    for (var i=0; i<oplist.length; i++) {
        var opstr=oplist[i];
        var op=opstr;
        var add_sep=(i>1&&oplist[i-1]=="sep");
        if (oplist[i]=="sep") {
            continue;
        }
        if (typeof opstr=="string") {
            op = ctx.api.get_op(ctx, opstr);
        }
        if (op==undefined)
          continue;
        var hotkey;
        hotkey = ctx.api.get_op_keyhandler(ctx, opstr);
        if (DEBUG.ui_menus)
          console.log("---------", hotkey, opstr, ctx.screen);
        if (hotkey!=undefined)
          hotkey = hotkey.build_str(true);
        else 
          hotkey = "";
        oplist_instance.push(op);
        var en=menu.add_item(op.uiname, hotkey, oplist_instance.length-1);
        en.add_sep = add_sep;
    }
    return menu;
  }
  toolop_menu = _es6_module.add_export('toolop_menu', toolop_menu);
  window.UIMenu = UIMenu;
  window.ui_call_menu = ui_call_menu;
});
es6_module_define('UIPack', ["rna_properties", "UIWidgets", "vectormath", "math", "UIElement", "UIFrame"], function _UIPack_module(_es6_module) {
  "use strict";
  var PropTypes=es6_import_item(_es6_module, 'rna_properties', 'PropTypes');
  var PropFlags=es6_import_item(_es6_module, 'rna_properties', 'PropFlags');
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var UIElement, UIFrame;
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var $_mh;
  var $_swapt;
  function UIPackFrame(ctx, path_prefix) {
    UIFrame.call(this, ctx);
    this.mm = new MinMax(2);
    this._last_pack_recalc = 0;
    if (path_prefix==undefined)
      path_prefix = "";
    this.path_prefix = path_prefix;
    this.min_size = undefined;
    this.last_ms = 0;
    this.last_pos = new Vector2();
    this.last_size = new Vector2();
    this.default_packflag = 0;
  }
  /*test for IE bug*/;
  if (UIPackFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UIPackFrame.name = 'UIPackFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UIPackFrame = inherit_multiple(UIPackFrame, [UIFrame], _es6_module, "UIPackFrame");
  UIPackFrame.prototype.build_draw = function(canvas, isVertical) {
    if (this.is_canvas_root())
      this.pack(canvas, isVertical);
    UIFrame.prototype.build_draw.call(this, canvas, isVertical);
  }
  UIPackFrame.prototype.on_resize = function(newsize, oldsize) {
    UIFrame.prototype.on_resize.call(this, newsize, oldsize);
  }
  UIPackFrame.prototype.add = function(child) {
    child.packflag|=this.default_packflag;
    UIFrame.prototype.add.call(this, child);
  }
  UIPackFrame.prototype.prepend = function(child) {
    child.packflag|=this.default_packflag;
    UIFrame.prototype.prepend.call(this, child);
  }
  UIPackFrame.prototype.toolwidget = function(path, inherit_flag, label) {
    if (inherit_flag==undefined) {
        inherit_flag = 0;
    }
    if (label==undefined) {
        label = undefined;
    }
    var ret=this.toolop(path, inherit_flag, label);
    ret.path_exec_widget = true;
    return ret;
  }
  UIPackFrame.prototype._inherit_packflag = function(inherit_flag) {
    var icon_size=inherit_flag&(PackFlags.USE_LARGE_ICON|PackFlags.USE_SMALL_ICON);
    if (icon_size==0) {
        icon_size = this.default_packflag&(PackFlags.USE_LARGE_ICON|PackFlags.USE_SMALL_ICON);
    }
    inherit_flag = this.default_packflag&~(PackFlags.USE_SMALL_ICON|PackFlags.USE_SMALL_ICON);
    
    inherit_flag|=icon_size;
    return inherit_flag;
  }
  UIPackFrame.prototype.toolop = function(path, inherit_flag, label) {
    if (inherit_flag==undefined) {
        inherit_flag = 0;
    }
    if (label==undefined) {
        label = undefined;
    }
    var ctx=this.ctx;
    var opname=ctx.api.get_op_uiname(ctx, path);
    inherit_flag = this._inherit_packflag(inherit_flag);
    if (opname==undefined) {
        console.trace();
        console.log("couldn't find tool operator at path"+path+".");
        return ;
    }
    if (label!=undefined)
      opname = label;
    if (inherit_flag&PackFlags.USE_ICON) {
        var op=ctx.api.get_op(ctx, path);
        if (op==undefined) {
            console.trace();
            console.log("Error fetching operator ", path);
            var c=new UIButton(ctx, "???");
            c.packflag|=inherit_flag;
            this.add(c);
            return c;
        }
        if (DEBUG.icons)
          console.log("icon toolop", op.icon);
        if (op.icon>=0) {
            var use_small=inherit_flag&PackFlags.USE_SMALL_ICON;
            var c=new UIButtonIcon(ctx, opname, op.icon, [0, 0], [0, 0], path, undefined, undefined, use_small);
            c.packflag|=inherit_flag;
            this.add(c);
            return c;
        }
    }
    var c=new UIButton(ctx, opname, [0, 0], [0, 0], path);
    if (inherit_flag!=undefined)
      c.packflag|=inherit_flag;
    this.add(c);
    return c;
  }
  UIPackFrame.prototype.pack = function(canvas, isVertical) {
    var arr=[0, 0];
    var mm=this.mm;
    if (this.state&UIFlags.HAS_PAN) {
        mm.reset();
        var __iter_c=__get_iter(this.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          arr[0] = c.pos[0]+c.size[0];
          arr[1] = c.pos[1]+c.size[1];
          mm.minmax(c.pos);
          mm.minmax(arr);
        }
        if (this.packflag&PackFlags.CALC_NEGATIVE_PAN) {
            this.pan_bounds[0] = new Vector2(mm.min).sub(mm.max).mulScalar(0.5);
            this.pan_bounds[1] = new Vector2(mm.max).sub(mm.min);
        }
        else {
          this.pan_bounds[1] = new Vector2(mm.max).sub(mm.min);
          this.pan_bounds[1][0]-=this.size[0];
          this.pan_bounds[1][1]-=this.size[1];
        }
        if (this.packflag&PackFlags.PAN_X_ONLY) {
            this.pan_bounds[0][1] = this.pan_bounds[1][1] = 0.0;
        }
        else 
          if (this.packflag&PackFlags.PAN_Y_ONLY) {
            this.pan_bounds[0][0] = this.pan_bounds[1][0] = 0.0;
        }
    }
  }
  UIPackFrame.prototype.prop = function(path, packflag, setter_path) {
    if (packflag==undefined) {
        packflag = 0;
    }
    if (setter_path==undefined) {
        setter_path = undefined;
    }
    packflag = this._inherit_packflag(packflag);
    if (this.path_prefix.length>0)
      path = this.path_prefix+"."+path;
    if (setter_path==undefined)
      setter_path = path;
    var ctx=this.ctx;
    var prop=ctx.api.get_prop_meta(ctx, path);
    if (prop==undefined) {
        console.trace();
        console.log("couldn't find property: "+path+".", this.path_prefix);
        return ;
    }
    if (prop.type==PropTypes.INT||prop.type==PropTypes.FLOAT) {
        var range=prop.range;
        if (prop.range==undefined||(prop.range[0]==0&&prop.range[1]==0)) {
            range = [-2000, 2000];
        }
        var c=new UINumBox(ctx, prop.uiname, range, prop.data, [0, 0], [0, 0], path);
        c.packflag = packflag;
        c.unit = prop.unit;
        c.setter_path = setter_path;
        this.add(c);
    }
    else 
      if (prop.type==PropTypes.ENUM&&(packflag&PackFlags.ENUM_STRIP)) {
        var checkmap={};
        var this2=this;
        prop.ctx = ctx;
        function update_enum(chk, val) {
          if (!val) {
              chk.set = true;
              return ;
          }
          var __iter_k=__get_iter(checkmap);
          var k;
          while (1) {
            var __ival_k=__iter_k.next();
            if (__ival_k.done) {
                break;
            }
            k = __ival_k.value;
            var check=checkmap[k];
            if (check==chk) {
                prop.ctx = this2.ctx;
                prop.set_value(k);
                prop.set_data(prop.data);
                continue;
            }
            check.set = false;
            check.do_recalc();
          }
          var val=prop.values[k];
        }
        var subframe;
        if (__instance_of(this, ColumnFrame)) {
            subframe = this.col();
        }
        else {
          subframe = this.row();
        }
        subframe.packflag|=packflag;
        function update_callback(chk) {
          var val=undefined;
          var __iter_k=__get_iter(checkmap);
          var k;
          while (1) {
            var __ival_k=__iter_k.next();
            if (__ival_k.done) {
                break;
            }
            k = __ival_k.value;
            var check=checkmap[k];
            if (check==chk) {
                val = k;
                break;
            }
          }
          if (val==undefined) {
              console.log("error with ui enum strip; path:", path);
              return ;
          }
          val = ctx.api.get_prop(ctx, path)==prop.keys[val];
          if (!!val!=!!chk.set) {
              chk.set = val;
              chk.do_recalc();
          }
        }
        if (packflag&PackFlags.USE_ICON) {
            var __iter_k=__get_iter(prop.values);
            var k;
            while (1) {
              var __ival_k=__iter_k.next();
              if (__ival_k.done) {
                  break;
              }
              k = __ival_k.value;
              var label=prop.ui_value_names!=undefined ? prop.ui_value_names[k] : k;
              if (label==undefined)
                label = "(error)";
              var c=new UIIconCheck(ctx, "", prop.iconmap[prop.values[k]]);
              c.setter_path = setter_path;
              c.callback = update_enum;
              c.icon = prop.iconmap[k];
              c.draw_check = false;
              c.update_callback = update_callback;
              c.description = label+"\n"+prop.description;
              if (prop.get_value()==prop.values[k])
                c.set = true;
              subframe.add(c);
              checkmap[prop.values[k]] = c;
            }
        }
        else {
          var __iter_k=__get_iter(prop.values);
          var k;
          while (1) {
            var __ival_k=__iter_k.next();
            if (__ival_k.done) {
                break;
            }
            k = __ival_k.value;
            var label=prop.ui_value_names!=undefined ? prop.ui_value_names[k] : k;
            if (label==undefined)
              label = "(error)";
            var c=new UICheckBox(ctx, label);
            c.setter_path = setter_path;
            c.callback = update_enum;
            c.draw_check = false;
            c.update_callback = update_callback;
            if (prop.get_value()==prop.values[k])
              c.set = true;
            subframe.add(c);
            checkmap[prop.values[k]] = c;
          }
        }
        return subframe;
    }
    else 
      if (prop.type==PropTypes.ENUM) {
        var c=new UIMenuButton(ctx, undefined, [0, 0], [0, 0], path);
        c.setter_path = setter_path;
        c.packflag|=packflag;
        this.add(c);
        return c;
    }
    else 
      if (prop.type==PropTypes.VEC3) {
        range = (prop.range!=undefined&&prop.range[0]!=undefined) ? prop.range : [-2000, 2000];
        var row=this.row();
        row.packflag = packflag;
        row.label(prop.uiname);
        var c=new UINumBox(ctx, "X", range, prop.data, [0, 0], [0, 0], path+"[0]");
        c.unit = prop.unit;
        c.setter_path = setter_path+"[0]";
        c.packflag|=packflag;
        row.add(c);
        var c=new UINumBox(ctx, "Y", range, prop.data, [0, 0], [0, 0], path+"[1]");
        c.unit = prop.unit;
        c.setter_path = setter_path+"[1]";
        c.packflag|=packflag;
        row.add(c);
        var c=new UINumBox(ctx, "Z", range, prop.data, [0, 0], [0, 0], path+"[2]");
        c.unit = prop.unit;
        c.setter_path = setter_path+"[2]";
        c.packflag|=packflag;
        row.add(c);
        return row;
    }
    else 
      if (prop.type==PropTypes.VEC4&&prop.subtype==PropTypes.COLOR4) {
        var field=new UIColorPicker(ctx);
        field.state|=UIFlags.USE_PATH;
        field.data_path = path;
        field.setter_path = setter_path;
        this.add(field, packflag);
        return field;
    }
    else 
      if (prop.type==PropTypes.VEC4) {
        range = (prop.range!=undefined&&prop.range[0]!=undefined) ? prop.range : [-2000, 2000];
        var row=this.row();
        row.label(prop.uiname);
        var c=new UINumBox(ctx, "X", range, prop.data, [0, 0], [0, 0], path+"[0]");
        c.setter_path = setter_path+"[0]";
        c.packflag|=packflag;
        c.unit = prop.unit;
        row.add(c);
        var c=new UINumBox(ctx, "Y", range, prop.data, [0, 0], [0, 0], path+"[1]");
        c.setter_path = setter_path+"[1]";
        c.packflag|=packflag;
        c.unit = prop.unit;
        row.add(c);
        var c=new UINumBox(ctx, "Z", range, prop.data, [0, 0], [0, 0], path+"[2]");
        c.setter_path = setter_path+"[2]";
        c.packflag|=packflag;
        c.unit = prop.unit;
        row.add(c);
        var c=new UINumBox(ctx, "W", range, prop.data, [0, 0], [0, 0], path+"[3]");
        c.setter_path = setter_path+"[3]";
        c.packflag|=packflag;
        c.unit = prop.unit;
        row.add(c);
        return row;
    }
    else 
      if (prop.type==PropTypes.STRING&&(prop.flag&PropFlags.LABEL)) {
        var ret=this.label(path, true, packflag);
        ret.setter_path = setter_path;
        return ret;
    }
    else 
      if (prop.type==PropTypes.BOOL) {
        var check;
        if (packflag&PackFlags.USE_ICON) {
            check = new UIIconCheck(ctx, "", prop.icon, undefined, undefined, path);
        }
        else {
          check = new UICheckBox(ctx, prop.uiname, undefined, undefined, path);
        }
        check.setter_path = setter_path;
        check.packflag|=packflag;
        this.add(check);
    }
    else 
      if (prop.type==PropTypes.FLAG) {
        var row=this.row();
        row.packflag|=packflag;
        if (path.trim().endsWith("]")) {
            var s=path.trim();
            var i=s.length-1;
            while (i>=0&&s[i-1]!="[") {
              i--;
            }
            var key=s.slice(i, s.length-1).trim();
            var uiname=prop.ui_key_names[key];
            if (uiname==undefined) {
                console.log("WARNING: possibly bad flag mask (will try interpreting it as integer)", path);
                key = parseInt(key);
                uiname = prop.ui_key_names[key];
            }
            if (isNaN(parseInt(key))&&key in prop.keys) {
                key = prop.keys[key];
            }
            if (uiname==undefined)
              uiname = "(corrupted)";
            var check=new UICheckBox(ctx, uiname, undefined, undefined, path);
            this.add(check);
            check.packflag|=PackFlags.INHERIT_WIDTH;
            check.setter_path = setter_path;
            return check;
        }
        else {
          row.label(prop.uiname+":");
          var __iter_k=__get_iter(prop.keys);
          var k;
          while (1) {
            var __ival_k=__iter_k.next();
            if (__ival_k.done) {
                break;
            }
            k = __ival_k.value;
            var uiname=prop.ui_key_names[k];
            var path2=path+"["+k+"]";
            var check=new UICheckBox(ctx, uiname, undefined, undefined, path2);
            check.packflag|=PackFlags.INHERIT_WIDTH;
            check.setter_path = setter_path+"["+k+"]";
            row.add(check);
          }
          return check;
        }
    }
    else {
      if (DEBUG.ui_datapaths)
        console.log("warning: unimplemented property type for path "+path+" in user interface code");
    }
  }
  UIPackFrame.prototype.label = function(text, use_path, align) {
    if (use_path==undefined) {
        use_path = false;
    }
    if (align==undefined) {
        align = 0;
    }
    align = this._inherit_packflag(align);
    if (use_path!=undefined&&use_path) {
        var c=new UILabel(this.ctx, "", [0, 0], [0, 0], text);
        this.add(c);
        if (align)
          c.packflag|=align;
        return c;
    }
    else {
      var c=new UILabel(this.ctx, text, [0, 0], [0, 0], undefined);
      this.add(c);
      if (align)
        c.packflag|=align;
      return c;
    }
  }
  UIPackFrame.prototype.tabstrip = function(align, default_packflag) {
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    var flip=this.default_packflag&PackFlags.FLIP_TABSTRIP;
    flip = flip||(align&PackFlags.FLIP_TABSTRIP);
    var ret=new UITabPanel(this.ctx, undefined, undefined, flip);
    ret.packflag|=align|PackFlags.INHERIT_WIDTH;
    ret.default_packflag = this._inherit_packflag(default_packflag);
    this.add(ret);
    return ret;
  }
  UIPackFrame.prototype.panel = function(label, permid, align, default_packflag) {
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    align|=this.default_packflag;
    var ret=new UIPanel(this.ctx, label, permid);
    ret.packflag|=align|PackFlags.INHERIT_WIDTH;
    ret.default_packflag = this.default_packflag|default_packflag;
    this.add(ret);
    return ret;
  }
  UIPackFrame.prototype.row = function(path_prefix, align, default_packflag) {
    if (path_prefix==undefined) {
        path_prefix = "";
    }
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    align|=this.default_packflag;
    var row=new RowFrame(this.ctx, this.path_prefix);
    this.add(row);
    row.default_packflag|=default_packflag|this.default_packflag;
    row.packflag|=align;
    return row;
  }
  UIPackFrame.prototype.col = function(path_prefix, align, default_packflag) {
    if (path_prefix==undefined) {
        path_prefix = "";
    }
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    align|=this.default_packflag;
    var col=new ColumnFrame(this.ctx, this.path_prefix);
    this.add(col);
    col.default_packflag|=default_packflag|this.default_packflag;
    col.packflag|=align;
    return col;
  }
  UIPackFrame.prototype.on_tick = function() {
    UIFrame.prototype.on_tick.call(this);
    if (time_ms()-this._last_pack_recalc>300) {
        this._pack_recalc();
        this._last_pack_recalc = time_ms();
    }
  }
  UIPackFrame.prototype._pack_recalc = function() {
    if (time_ms()-this.last_ms<40) {
        return ;
    }
    this.last_ms = time_ms();
    if (this.last_pos.vectorDistance(this.pos)>0.0001||this.last_size.vectorDistance(this.size)>1e-05) {
        if (DEBUG.complex_ui_recalc) {
            console.log("complex ui recalc", this.pos.toString(), this.last_pos.toString(), this.last_pos.vectorDistance(this.pos), this.last_size.vectorDistance(this.size));
        }
        this.parent.do_full_recalc();
        this.do_recalc();
        var __iter_c=__get_iter(this.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          if (!(__instance_of(c, UIFrame))) {
              c.recalc = 1;
          }
        }
        this.last_pos.load(this.pos);
        this.last_size.load(this.size);
    }
  }
  _es6_module.add_class(UIPackFrame);
  UIPackFrame = _es6_module.add_export('UIPackFrame', UIPackFrame);
  function RowFrame(ctx, path_prefix, align) {
    UIPackFrame.call(this, ctx, path_prefix);
    this.packflag|=PackFlags.INHERIT_HEIGHT|align;
    this.pad = [4, 4];
  }
  /*test for IE bug*/;
  if (RowFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        RowFrame.name = 'RowFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  RowFrame = inherit_multiple(RowFrame, [UIPackFrame], _es6_module, "RowFrame");
  RowFrame.prototype.get_min_size = function(canvas, isvertical) {
    if (canvas==undefined) {
        console.trace();
        console.log("Warning: undefined canvas in get_min_size");
        return ;
    }
    var maxwidth=0;
    var tothgt=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      var size;
      if (!(c.packflag&PackFlags.KEEP_SIZE))
        size = c.cached_min_size(canvas, isvertical);
      else 
        size = c.size;
      tothgt+=size[1]+this.pad[1];
      maxwidth = Math.max(maxwidth, size[0]+2);
    }
    if (this.min_size!=undefined) {
        maxwidth = Math.max(maxwidth, this.min_size[0]);
        tothgt = Math.max(tothgt, this.min_size[1]);
    }
    return [Math.max(maxwidth, 1), Math.max(tothgt, 1)];
  }
  RowFrame.prototype.pack = function(canvas, is_vertical) {
    if (canvas==undefined) {
        console.trace();
        console.log("Warning: undefined canvas in pack");
        return ;
    }
    if (this.size[0]==0&&this.size[1]==0) {
        this.size[0] = this.parent.size[0];
        this.size[1] = this.parent.size[1];
    }
    var minsize=this.get_min_size(canvas, is_vertical);
    var spacing;
    if (this.packflag&PackFlags.NO_AUTO_SPACING) {
        spacing = this.pad[1];
    }
    else {
      var spacing=Math.floor((this.size[1]-minsize[1])/this.children.length);
      spacing = Math.max(spacing, this.pad[1]);
    }
    var x=0;
    var y;
    if (this.packflag&PackFlags.ALIGN_BOTTOM)
      y = this.pad[1];
    else 
      y = this.size[1]-this.pad[1];
    for (var i=0; i<this.children.length; i++) {
        var c=this.children[i];
        var size;
        if (!(c.packflag&PackFlags.KEEP_SIZE))
          size = c.cached_min_size(canvas, is_vertical);
        else 
          size = c.size;
        size = [size[0], size[1]];
        size[0] = Math.min(size[0], this.size[0]);
        if (c.packflag&PackFlags.INHERIT_WIDTH)
          size[0] = this.size[0]-2;
        if (c.packflag&PackFlags.INHERIT_HEIGHT)
          size[1]+=spacing;
        if (c.size==undefined)
          c.size = [0, 0];
        c.size[0] = size[0];
        c.size[1] = size[1];
        var final_y=y;
        if (!(this.packflag&PackFlags.ALIGN_BOTTOM))
          final_y-=size[1];
        if (this.packflag&PackFlags.ALIGN_RIGHT) {
            c.pos = [this.size[0]-size[0]-x, final_y];
        }
        else 
          if (this.packflag&PackFlags.ALIGN_LEFT) {
            c.pos = [x, final_y];
        }
        else {
          c.pos = [x+Math.floor(0.5*(this.size[0]-size[0])), final_y];
        }
        var space=(c.packflag&PackFlags.INHERIT_HEIGHT) ? 0 : spacing;
        if (this.packflag&PackFlags.ALIGN_BOTTOM)
          y+=c.size[1]+space;
        else 
          y-=c.size[1]+space;
        if (!(c.packflag&PackFlags.NO_REPACK))
          c.pack(canvas, is_vertical);
    }
    UIPackFrame.prototype.pack.call(this, canvas, is_vertical);
  }
  _es6_module.add_class(RowFrame);
  RowFrame = _es6_module.add_export('RowFrame', RowFrame);
  function ColumnFrame(ctx, path_prefix, align) {
    UIPackFrame.call(this, ctx, path_prefix);
    this.packflag|=PackFlags.INHERIT_WIDTH|align;
    this.pad = [2, 2];
  }
  /*test for IE bug*/;
  if (ColumnFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ColumnFrame.name = 'ColumnFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ColumnFrame = inherit_multiple(ColumnFrame, [UIPackFrame], _es6_module, "ColumnFrame");
  ColumnFrame.prototype.get_min_size = function(canvas, isvertical) {
    if (canvas==undefined) {
        console.trace();
        console.log("Warning: undefined canvas in get_min_size");
        return ;
    }
    var maxheight=0;
    var totwid=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      var size;
      if (!(c.packflag&PackFlags.KEEP_SIZE))
        size = c.cached_min_size(canvas, isvertical);
      else 
        size = [c.size[0], c.size[1]];
      totwid+=size[0]+this.pad[0];
      maxheight = Math.max(maxheight, size[1]+this.pad[1]);
    }
    if (this.min_size!=undefined) {
        totwid = Math.max(totwid, this.min_size[0]);
        maxheight = Math.max(maxheight, this.min_size[1]);
    }
    return [totwid, maxheight];
  }
  ColumnFrame.prototype.pack = function(canvas, is_vertical) {
    if (canvas==undefined) {
        console.trace();
        console.log("Warning: undefined canvas in pack");
        return ;
    }
    if (!(this.packflag&PackFlags.ALIGN_LEFT)&&!(this.packflag&PackFlags.ALIGN_RIGHT))
      this.packflag|=PackFlags.ALIGN_CENTER;
    if (this.size[0]==0&&this.size[1]==0) {
        this.size[0] = this.parent.size[0];
        this.size[1] = this.parent.size[1];
    }
    var minsize=this.get_min_size(canvas, is_vertical);
    if (this.packflag&PackFlags.NO_AUTO_SPACING) {
        spacing = this.pad[0];
    }
    else {
      var spacing=Math.floor((this.size[0]-minsize[0])/(this.children.length));
      spacing = Math.max(spacing, this.pad[0]);
    }
    var sum=0;
    var max_wid=0;
    var max_hgt=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      var s;
      if (!(c.packflag&PackFlags.KEEP_SIZE))
        s = c.cached_min_size(canvas, is_vertical);
      else 
        s = [c.size[0], c.size[1]];
      max_wid = Math.max(s[0], max_wid);
      max_hgt = Math.max(s[1], max_hgt);
      sum+=s[0];
    }
    if (!(this.packflag&PackFlags.IGNORE_LIMIT))
      max_wid*=((this.size[0])/sum);
    var x;
    var y;
    if (this.packflag&PackFlags.ALIGN_BOTTOM) {
        y = this.pad[1];
    }
    else 
      if (this.packflag&PackFlags.ALIGN_TOP) {
        y = this.size[1]-max_hgt-this.pad[1];
    }
    else {
      y = (this.size[1]-max_hgt)*0.5;
    }
    var startx;
    if (this.packflag&PackFlags.NO_LEAD_SPACING)
      startx = 0;
    else 
      startx = this.pad[0];
    var do_center_post=false;
    if (this.packflag&PackFlags.ALIGN_RIGHT) {
        x = this.size[0]-startx;
    }
    else 
      if (this.packflag&PackFlags.ALIGN_LEFT) {
        x = startx;
    }
    else {
      this.packflag|=PackFlags.ALIGN_CENTER;
      x = 0;
    }
    var pad=this.pad[0];
    var finalwid=0;
    var __iter_c=__get_iter(this.children);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      var size;
      if (!(c.packflag&PackFlags.KEEP_SIZE))
        size = c.cached_min_size(canvas, is_vertical);
      else 
        size = c.size;
      size = [size[0], size[1]];
      if (!(this.packflag&PackFlags.IGNORE_LIMIT)) {
          if (c.packflag&PackFlags.INHERIT_WIDTH)
            size[0] = Math.min(size[0], max_wid-pad)+spacing;
          else 
            size[0] = Math.min(size[0], max_wid-pad);
      }
      if (c.packflag&PackFlags.INHERIT_HEIGHT)
        size[1] = this.size[1]-this.pad[1];
      if (c.size==undefined)
        c.size = [0, 0];
      c.size[0] = size[0];
      c.size[1] = size[1];
      var space=(c.packflag&PackFlags.INHERIT_WIDTH) ? 0 : spacing;
      if (this.packflag&PackFlags.ALIGN_RIGHT) {
          c.pos = [x-size[0], y];
          finalwid = this.size[0]-x-size[0]-1;
          x-=Math.floor(size[0]+pad+space);
      }
      else {
        c.pos = [x, y];
        finalwid = x+size[0];
        x+=Math.floor(size[0]+pad+space);
      }
      if (!(c.packflag&PackFlags.NO_REPACK))
        c.pack(canvas, is_vertical);
    }
    if ((this.packflag&PackFlags.ALIGN_CENTER)&&finalwid<this.size[0]) {
        var __iter_c=__get_iter(this.children);
        var c;
        while (1) {
          var __ival_c=__iter_c.next();
          if (__ival_c.done) {
              break;
          }
          c = __ival_c.value;
          if (this.packflag&PackFlags.ALIGN_RIGHT)
            c.pos[0]-=Math.floor((this.size[0]-finalwid)*0.5);
          else 
            c.pos[0]+=Math.floor((this.size[0]-finalwid)*0.5);
        }
    }
    UIPackFrame.prototype.pack.call(this, canvas, is_vertical);
  }
  _es6_module.add_class(ColumnFrame);
  ColumnFrame = _es6_module.add_export('ColumnFrame', ColumnFrame);
  var _te=0;
  function ToolOpFrame(ctx, path) {
    RowFrame.call(this, ctx, path);
    this.rebuild = true;
    this.strct = undefined;
    this.ctx = ctx;
  }
  /*test for IE bug*/;
  if (ToolOpFrame.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        ToolOpFrame.name = 'ToolOpFrame';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  ToolOpFrame = inherit_multiple(ToolOpFrame, [RowFrame], _es6_module, "ToolOpFrame");
  ToolOpFrame.prototype.do_rebuild = function(ctx) {
    var strct=this.ctx.api.get_struct(ctx, this.path_prefix);
    this.children.reset();
    if (strct==undefined)
      return ;
    this.strct = strct;
    var __iter_p=__get_iter(strct);
    var p;
    while (1) {
      var __ival_p=__iter_p.next();
      if (__ival_p.done) {
          break;
      }
      p = __ival_p.value;
      if (!(p.flag&PackFlags.UI_DATAPATH_IGNORE))
        this.prop(p.name, PackFlags.INHERIT_WIDTH);
    }
  }
  ToolOpFrame.prototype.on_tick = function() {
    var strct=this.ctx.api.get_struct(this.ctx, this.path_prefix);
    if (strct!=this.strct) {
        this.do_rebuild(this.ctx);
        this.do_recalc();
        this.strct = strct;
    }
    RowFrame.prototype.on_tick.call(this);
  }
  ToolOpFrame.prototype.build_draw = function(canvas, isVertical) {
    if (this.rebuild) {
        this.do_rebuild(this.ctx);
        this.rebuild = false;
    }
    canvas.simple_box([0, 0], this.size, [0.2, 0.2, 0.2, 0.1]);
    RowFrame.prototype.build_draw.call(this, canvas, isVertical);
  }
  _es6_module.add_class(ToolOpFrame);
  ToolOpFrame = _es6_module.add_export('ToolOpFrame', ToolOpFrame);
});
es6_module_define('UITabPanel', ["UIElement", "math", "UIPack", "vectormath", "UIWidgets", "UIFrame"], function _UITabPanel_module(_es6_module) {
  "use strict";
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  function _UITab(text, description, id, tbound) {
    this.text = text;
    this.description = description;
    this.id = id;
    this.tbound = tbound;
    this.pos = [0, 0];
    this.size = [0, 0];
  }
  /*test for IE bug*/;
  if (_UITab.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        _UITab.name = '_UITab';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  _UITab = create_prototype(_UITab, _es6_module, "_UITab");
  _es6_module.add_class(_UITab);
  _UITab = _es6_module.add_export('_UITab', _UITab);
  function UITabBar(ctx, mode, callback) {
    if (mode==undefined) {
        mode = "v";
    }
    if (callback==undefined) {
        callback = undefined;
    }
    UIElement.call(this, ctx);
    this.highlight = undefined;
    this.active = undefined;
    this.tabs = new Array();
    this.mm = new MinMax(2);
    this.callback = callback;
    this.triwid = 4;
    this.mode = mode;
    this.thickness = this.min_thickness = IsMobile ? 28 : 25;
  }
  /*test for IE bug*/;
  if (UITabBar.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UITabBar.name = 'UITabBar';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UITabBar = inherit_multiple(UITabBar, [UIElement], _es6_module, "UITabBar");
  UITabBar.prototype.add_tab = function(text, tooltip, id) {
    if (tooltip==undefined) {
        tooltip = "";
    }
    if (id==undefined) {
        id = undefined;
    }
    var tab=new _UITab(text, tooltip, id, undefined);
    this.tabs.push(tab);
    if (this.active==undefined)
      this.active = tab;
  }
  UITabBar.prototype.get_min_size = function(canvas, isVertical) {
    var thickness=this.min_thickness;
    var tpad=this.triwid*2.0;
    var twid=tpad;
    var __iter_c=__get_iter(this.tabs);
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      var sz=canvas.textsize(c.text);
      twid+=sz[0]+tpad*2.0;
      thickness = Math.max(sz[1], thickness);
    }
    this.thickness = thickness;
    if (this.mode=="v")
      return [thickness, twid];
    else 
      return [twid, thickness];
  }
  UITabBar.prototype.build_draw = function(canvas, isVertical) {
    var ax=0, ay=1;
    var w=this.thickness;
    var tri=this.triwid;
    var pos=[0, this.size[1]];
    var size=[w, 0];
    var pos2=[Math.floor(w/1.5)-7, 0];
    var pos3=[0, 0];
    var size2=[0, 0];
    var rot=new Matrix4();
    rot.rotate(0, 0, Math.pi/2);
    var y1=this.active.pos[1]-tri;
    var y2=this.active.pos[1]+this.active.size[1]+tri;
    if (y1<5)
      y1 = 0;
    if (y2>=this.size[1]-5)
      y2 = this.size[1]-1;
    var __iter_t=__get_iter(this.tabs);
    var t;
    while (1) {
      var __ival_t=__iter_t.next();
      if (__ival_t.done) {
          break;
      }
      t = __ival_t.value;
      if (t.tbound==undefined) {
          t.tbound = canvas.textsize(t.text);
          t.tbound = [t.tbound[0], t.tbound[1]];
      }
      size[0] = w;
      size[1] = t.tbound[0]+12;
      pos[1]-=t.tbound[0]+8+tri*2.0;
      t.pos[0] = pos[0];
      t.pos[1] = pos[1];
      t.size[0] = size[1];
      t.size[1] = size[1];
      pos3[0] = pos[0]+size[0];
      pos3[1] = pos[1]+size[1];
      this.mm.minmax(pos);
      this.mm.minmax(pos3);
      pos2[1] = pos[1]+4;
      if (t==this.highlight&&t!=this.active)
        canvas.simple_box(pos, size, uicolors["HighlightTab"]);
      else 
        if (t!=this.active)
        canvas.simple_box(pos, size, 0.85);
      else {
        pos3[0] = 0;
        pos3[1] = y1;
        size2[0] = w+1;
        size2[1] = y2-y1;
        canvas.box2(pos3, size2, uicolors["SimpleBox"]);
      }
      canvas.text(pos2, t.text, uicolors["TabText"], undefined, undefined, Math.PI/2.0);
    }
    var lineclr=uicolors["TabPanelOutline"];
    if (!(this.packflag&PackFlags.FLIP_TABSTRIP)) {
        canvas.line([w, 0], [w, y1], lineclr);
        canvas.line([0, y1], [w, y1], lineclr);
        canvas.line([0, y1], [0, y2], lineclr);
        canvas.line([0, y2], [w, y2], lineclr);
        canvas.line([w, y2], [w, this.size[1]], lineclr);
    }
    else {
      canvas.line([0, 0], [0, y1], lineclr);
      canvas.line([w, y1], [0, y1], lineclr);
      canvas.line([w, y1], [w, y2], lineclr);
      canvas.line([w, y2], [0, y2], lineclr);
      canvas.line([0, y2], [0, this.size[1]], lineclr);
    }
  }
  UITabBar.prototype.on_inactive = function() {
    if (this.highlight!=undefined) {
        this.highlight = undefined;
        this.do_recalc();
    }
  }
  UITabBar.prototype.on_mousedown = function(event) {
    var mpos=[event.x, event.y];
    this.find_active(mpos);
    if (this.highlight!=undefined) {
        if (this.highlight!=this.active) {
            this.active = this.highlight;
            this.do_recalc();
            if (this.callback!=undefined) {
                this.callback(this.active.text, this.active.id);
            }
        }
    }
  }
  UITabBar.prototype.find_active = function(mpos) {
    var tab=undefined;
    var __iter_t=__get_iter(this.tabs);
    var t;
    while (1) {
      var __ival_t=__iter_t.next();
      if (__ival_t.done) {
          break;
      }
      t = __ival_t.value;
      if (inrect_2d(mpos, t.pos, t.size)) {
          tab = t;
          break;
      }
    }
    if (tab!=this.highlight)
      this.do_recalc();
    this.highlight = tab;
  }
  UITabBar.prototype.on_mousemove = function(event) {
    var mpos=[event.x, event.y];
    this.find_active(mpos);
  }
  _es6_module.add_class(UITabBar);
  UITabBar = _es6_module.add_export('UITabBar', UITabBar);
  function UITabPanel(ctx, size, mode, flip) {
    if (size==undefined) {
        size = undefined;
    }
    if (mode==undefined) {
        mode = "v";
    }
    if (flip==undefined) {
        flip = false;
    }
    UIFrame.call(this, ctx);
    this.flip = flip;
    if (flip)
      this.packflag|=PackFlags.FLIP_TABSTRIP;
    if (size!=undefined) {
        this.size = size;
    }
    this.mode = mode;
    this.subframe = mode=="v" ? new ColumnFrame(ctx) : new RowFrame(ctx);
    this.subframe.pos = [0, 0];
    this.subframe.pad[1] = 0;
    this.subframe.pad[0] = flip ? 4 : 0;
    this.subframe.packflag|=PackFlags.NO_AUTO_SPACING|PackFlags.ALIGN_LEFT|PackFlags.ALIGN_BOTTOM;
    this.subframe.packflag|=PackFlags.IGNORE_LIMIT;
    this.subframe.packflag|=PackFlags.NO_LEAD_SPACING|PackFlags.NO_TRAIL_SPACING;
    this.subframe.default_packflag|=PackFlags.INHERIT_WIDTH;
    var this2=this;
    function callback(text, id) {
      this2.tab_callback(text, id);
    }
    this.panels = new Array();
    this.tabstrip = new UITabBar(ctx, undefined, callback);
    this.tabstrip.packflag|=PackFlags.INHERIT_HEIGHT;
    this.content = new RowFrame();
    this.content.pad[1] = 4;
    this.content.rcorner = 0.0;
    this.content.draw_background = true;
    this.subframe.add(this.tabstrip);
    if (flip) {
        this.tabstrip.packflag|=PackFlags.FLIP_TABSTRIP;
        this.subframe.prepend(this.content);
    }
    else {
      this.subframe.add(this.content);
    }
    this.add(this.subframe);
  }
  /*test for IE bug*/;
  if (UITabPanel.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UITabPanel.name = 'UITabPanel';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UITabPanel = inherit_multiple(UITabPanel, [UIFrame], _es6_module, "UITabPanel");
  UITabPanel.prototype.on_saved_uidata = function(visit) {
    UIFrame.prototype.on_saved_uidata.call(this, visit);
    var __iter_t=__get_iter(this.tabstrip.tabs);
    var t;
    while (1) {
      var __ival_t=__iter_t.next();
      if (__ival_t.done) {
          break;
      }
      t = __ival_t.value;
      visit(t.id);
    }
  }
  UITabPanel.prototype.on_load_uidata = function(visit) {
    UIFrame.prototype.on_load_uidata.call(this, visit);
    var __iter_t=__get_iter(this.tabstrip.tabs);
    var t;
    while (1) {
      var __ival_t=__iter_t.next();
      if (__ival_t.done) {
          break;
      }
      t = __ival_t.value;
      visit(t.id);
    }
  }
  UITabPanel.prototype.load_filedata = function(map) {
    if (map.active) {
        var ts=this.tabstrip.tabs;
        for (var i=0; i<ts.length; i++) {
            if (ts[i].text==map.active) {
                this.tabstrip.active = ts[i];
                this.tab_callback(ts[i].text, ts[i].id);
                this.do_recalc();
                break;
            }
        }
    }
  }
  UITabPanel.prototype.get_filedata = function() {
    if (this.tabstrip.active!=undefined)
      return {active: this.tabstrip.active.text}
  }
  UITabPanel.prototype.get_uhash = function() {
    var s=prior(UITabPanel, this).get_uhash.call(this);
    var __iter_t=__get_iter(this.tabstrip.tabs);
    var t;
    while (1) {
      var __ival_t=__iter_t.next();
      if (__ival_t.done) {
          break;
      }
      t = __ival_t.value;
      s+=t.text;
    }
    return s;
  }
  UITabPanel.prototype.build_draw = function(canvas, isVertical) {
    this.draw_background = true;
    UIFrame.prototype.build_draw.call(this, canvas, isVertical);
    var lineclr=uicolors["TabPanelOutline"];
    var t=this.tabstrip.thickness;
    var sx=this.flip ? this.tabstrip.pos[0] : this.size[0];
    var y=this.is_canvas_root() ? this.pos[1] : 0;
    if (!(this.packflag&PackFlags.FLIP_TABSTRIP)) {
        canvas.line([t, y], [sx, y], lineclr);
        canvas.line([t, y+this.size[1]-1], [sx, y+this.size[1]-1], lineclr);
    }
    else {
      canvas.line([0, y], [sx, y], lineclr);
      canvas.line([0, y+this.size[1]-1], [sx, y+this.size[1]-1], lineclr);
    }
  }
  UITabPanel.prototype.tab_callback = function(text, id) {
    var content=this.content;
    var __iter_c=__get_iter(list(content.children));
    var c;
    while (1) {
      var __ival_c=__iter_c.next();
      if (__ival_c.done) {
          break;
      }
      c = __ival_c.value;
      content.remove(c);
      c.parent = content;
    }
    if (id!=undefined)
      content.add(id);
    content.do_full_recalc();
  }
  UITabPanel.prototype.pack = function(canvas, isVertical) {
    this.subframe.size[0] = this.size[0];
    this.subframe.size[1] = this.size[1];
    UIFrame.prototype.pack.call(this, canvas, isVertical);
  }
  UITabPanel.prototype.panel = function(label, align, default_packflag) {
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    align|=this.default_packflag|PackFlags.ALIGN_LEFT;
    var ret=new RowFrame(this.ctx);
    ret.packflag|=align;
    ret.default_packflag = this.default_packflag|default_packflag;
    this.add_tab(label, ret);
    return ret;
  }
  UITabPanel.prototype.panel_col = function(label, align, default_packflag) {
    if (align==undefined) {
        align = 0;
    }
    if (default_packflag==undefined) {
        default_packflag = 0;
    }
    align|=this.default_packflag|PackFlags.ALIGN_LEFT;
    var ret=new ColumnFrame(this.ctx, label);
    ret.packflag|=align;
    ret.default_packflag = this.default_packflag|default_packflag;
    this.add_tab(label, ret);
    return ret;
  }
  UITabPanel.prototype.add_tab = function(text, frame, description) {
    if (this.tabstrip.tabs.length==0)
      this.content.add(frame);
    var uhash=frame.get_uhash;
    frame.get_uhash = function() {
      return uhash.call(frame)+text;
    }
    this.tabstrip.add_tab(text, description, frame);
    frame.parent = this.content;
    this.do_full_recalc();
  }
  UITabPanel.prototype.get_min_size = function(canvas, isVertical) {
    return this.subframe.get_min_size(canvas, isVertical);
  }
  _es6_module.add_class(UITabPanel);
  UITabPanel = _es6_module.add_export('UITabPanel', UITabPanel);
});
es6_module_define('UITextBox', ["vectormath", "UIWidgets", "UIFrame", "UIElement", "events", "UIPack", "math"], function _UITextBox_module(_es6_module) {
  "use strict";
  var $_mh;
  var $_swapt;
  var Vector2=es6_import_item(_es6_module, 'vectormath', 'Vector2');
  var Vector3=es6_import_item(_es6_module, 'vectormath', 'Vector3');
  var Matrix4=es6_import_item(_es6_module, 'vectormath', 'Matrix4');
  var Vector4=es6_import_item(_es6_module, 'vectormath', 'Vector4');
  var MinMax=es6_import_item(_es6_module, 'math', 'MinMax');
  var inrect_2d=es6_import_item(_es6_module, 'math', 'inrect_2d');
  var aabb_isect_2d=es6_import_item(_es6_module, 'math', 'aabb_isect_2d');
  var UIElement=es6_import_item(_es6_module, 'UIElement', 'UIElement');
  var UIFlags=es6_import_item(_es6_module, 'UIElement', 'UIFlags');
  var CanvasFlags=es6_import_item(_es6_module, 'UIElement', 'CanvasFlags');
  var open_mobile_keyboard=es6_import_item(_es6_module, 'UIElement', 'open_mobile_keyboard');
  var close_mobile_keyboard=es6_import_item(_es6_module, 'UIElement', 'close_mobile_keyboard');
  var PackFlags=es6_import_item(_es6_module, 'UIElement', 'PackFlags');
  var KeyMap=es6_import_item(_es6_module, 'events', 'KeyMap');
  var ToolKeyHandler=es6_import_item(_es6_module, 'events', 'ToolKeyHandler');
  var FuncKeyHandler=es6_import_item(_es6_module, 'events', 'FuncKeyHandler');
  var KeyHandler=es6_import_item(_es6_module, 'events', 'KeyHandler');
  var charmap=es6_import_item(_es6_module, 'events', 'charmap');
  var TouchEventManager=es6_import_item(_es6_module, 'events', 'TouchEventManager');
  var EventHandler=es6_import_item(_es6_module, 'events', 'EventHandler');
  var UIFrame=es6_import_item(_es6_module, 'UIFrame', 'UIFrame');
  var UIButtonAbstract=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonAbstract');
  var UIButton=es6_import_item(_es6_module, 'UIWidgets', 'UIButton');
  var UIButtonIcon=es6_import_item(_es6_module, 'UIWidgets', 'UIButtonIcon');
  var UIMenuButton=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuButton');
  var UICheckBox=es6_import_item(_es6_module, 'UIWidgets', 'UICheckBox');
  var UINumBox=es6_import_item(_es6_module, 'UIWidgets', 'UINumBox');
  var UILabel=es6_import_item(_es6_module, 'UIWidgets', 'UILabel');
  var UIMenuLabel=es6_import_item(_es6_module, 'UIWidgets', 'UIMenuLabel');
  var ScrollButton=es6_import_item(_es6_module, 'UIWidgets', 'ScrollButton');
  var UIVScroll=es6_import_item(_es6_module, 'UIWidgets', 'UIVScroll');
  var UIIconCheck=es6_import_item(_es6_module, 'UIWidgets', 'UIIconCheck');
  var RowFrame=es6_import_item(_es6_module, 'UIPack', 'RowFrame');
  var ColumnFrame=es6_import_item(_es6_module, 'UIPack', 'ColumnFrame');
  var UIPackFrame=es6_import_item(_es6_module, 'UIPack', 'UIPackFrame');
  function UITextBox(ctx, text, pos, size, path) {
    if (text==undefined) {
        text = "";
    }
    if (pos==undefined) {
        pos = undefined;
    }
    if (size==undefined) {
        size = undefined;
    }
    if (path==undefined) {
        path = undefined;
    }
    UIElement.call(this, ctx, path);
    this.on_end_edit = undefined;
    if (pos!=undefined) {
        this.pos[0] = pos[0];
        this.pos[1] = pos[1];
    }
    if (size!=undefined) {
        this.size[0] = size[0];
        this.size[1] = size[1];
    }
    this.prop = undefined;
    this.text = text;
    this.start_text = text;
    this.min_width = 110;
    if (this.state&UIFlags.USE_PATH) {
        this.prop = ctx.api.get_prop_meta(ctx, this.data_path);
        this.val = this.prop.data;
        this.text = this.prop.uiname+": ";
    }
    this.selecting = false;
    this.cur_sel_i = 0;
    this.sel = [0, 0];
    this.selcursor = 0;
    this.cursor = 0;
    this.last_cursor = 0;
    this.callback = undefined;
    this.text_offx = 13;
    this.text_min_offx = 13;
    this.replace_mode = false;
    this.editing = false;
    this.gmap = undefined;
    this.cancel_on_escape = false;
    this.mpos = [0, 0];
    this.last_mpos = [0, 0];
  }
  /*test for IE bug*/;
  if (UITextBox.name==undefined) {
      /*
          not sure if we can set .name
          in all recent versions of IE
        */
;
      try {
        UITextBox.name = 'UITextBox';
      }
      catch (_cerror1) {
          print_stack(_cerror1);
          console.trace("WARNING: failed to fix class constructor name! Evil!");
      }
  }
  UITextBox = inherit_multiple(UITextBox, [UIElement], _es6_module, "UITextBox");
  UITextBox.prototype.set_text = function(text) {
    if (this.text!=text)
      this.do_recalc();
    this.text = text;
  }
  UITextBox.prototype.on_tick = function() {
    if (!this.editing&&(this.state&UIFlags.USE_PATH)) {
        var val=this.get_prop_data();
        if (!(this.state&UIFlags.ENABLED))
          return ;
        if (val!=this.text) {
            this.text = val==undefined ? val : "";
            this.do_recalc();
        }
    }
    if (this.editing&&this.cursor!=this.last_cursor) {
        this.do_recalc();
        this.last_cursor = this.cursor;
    }
  }
  UITextBox.prototype.on_mousedown = function(event) {
    this.mpos = [event.x, event.y];
    if (event.button==0) {
        if (this.editing==false) {
            this.begin_edit(event);
            this.selecting = true;
        }
        else 
          if (!this.selecting&&!inrect_2d([event.x, event.y], [0, 0], this.size)) {
            this.end_edit(false);
        }
        else {
          this.selecting = true;
          this.cursor = this.selcursor;
          this.set_cursor();
          if (!event.shiftKey) {
              this.sel = [this.cursor, this.cursor];
          }
          else {
            this.handle_selecting();
          }
        }
    }
  }
  UITextBox.prototype.on_mouseup = function(event) {
    this.mpos = [event.x, event.y];
    if (this.editing&&this.selecting) {
        this.selecting = false;
        this.do_recalc();
    }
  }
  UITextBox.prototype.handle_selecting = function() {
    var cur=this.selcursor;
    if (cur<this.sel[0]&&this.cur_sel_i==1) {
        this.sel[1] = this.sel[0];
        this.cur_sel_i = 0;
    }
    else 
      if (cur>this.sel[1]&&this.cur_sel_i==0) {
        this.cur_sel_i = 1;
    }
    this.sel[this.cur_sel_i] = cur;
    this.cursor = cur;
    this.set_cursor();
  }
  UITextBox.prototype.on_mousemove = function(event) {
    this.mpos = [event.x, event.y];
    if (!this.editing)
      return ;
    if (inrect_2d(this.last_mpos, [-10, -10], [this.size[0]+20, this.size[1]+20])!=inrect_2d(this.mpos, [-10, -10], [this.size[0]+20, this.size[1]+20])) {
        this.do_recalc();
    }
    if (inrect_2d([event.x, event.y], [-10, -10], [this.size[0]+20, this.size[1]+20])) {
        this.find_selcursor(event);
    }
    if (this.selecting) {
        this.handle_selecting();
    }
    this.last_mpos = [this.mpos[0], this.mpos[1]];
  }
  UITextBox.prototype.begin_edit = function(event) {
    if (this.editing) {
        console.trace("Invalid UITextBox.begin_edit() call");
        this.end_edit();
        return ;
    }
    this.focus();
    console.log("begin textbox edit");
    this.do_recalc();
    this.editing = true;
    this.push_modal();
    this.start_text = new String(this.text);
    this.gen_glyphmap();
    this.do_recalc();
    if (event!=undefined) {
        this.find_selcursor(event);
    }
    else {
      this.selcursor = 0;
    }
    this.cursor = this.selcursor;
    this.sel = [0, this.text.length];
    var this2=this;
    function end_edit() {
      this2.end_edit(false, false);
    }
    open_mobile_keyboard(this, end_edit);
  }
  UITextBox.prototype.end_edit = function(cancel, close_keyboard) {
    if (cancel==undefined) {
        cancel = false;
    }
    if (close_keyboard==undefined) {
        close_keyboard = true;
    }
    this.editing = false;
    if (cancel) {
        this.text = this.start_text;
    }
    this.parent.pop_modal();
    this.do_recalc();
    this.selecting = false;
    this.state&=~UIFlags.HIGHLIGHT;
    this.text_offx = this.text_min_offx;
    if (this.callback) {
        this.callback(this, this.text);
    }
    if (this.state&UIFlags.USE_PATH) {
        this.set_prop_data(this.text);
    }
    if (close_keyboard)
      close_mobile_keyboard();
    if (this.on_end_edit)
      this.on_end_edit(this, cancel);
  }
  UITextBox.prototype.set_cursor = function() {
    this.cursor = Math.max(Math.min(this.cursor, this.text.length), 0);
    if (this.editing&&this.cursor!=this.last_cursor) {
        this.do_recalc();
        this.last_cursor = this.cursor;
        var pad1=this.text_min_offx;
        var pad2=28;
        if (this.gmap[this.cursor]>this.size[0]-pad2) {
            this.text_offx+=this.size[0]-pad2-this.gmap[this.cursor];
            this.gen_glyphmap();
        }
        else 
          if (this.gmap[this.cursor]<pad1) {
            this.text_offx+=pad1-this.gmap[this.cursor];
            this.gen_glyphmap();
        }
    }
  }
  UITextBox.prototype.insert = function(text) {
    if (this.has_sel()) {
        var text2=this.text.slice(0, this.sel[0])+text+this.text.slice(this.sel[1], this.text.length);
        this.replace_text(text2);
        this.cursor = this.sel[0]+text.length;
        this.sel = [0, 0];
    }
    else {
      var text2=this.text.slice(0, this.cursor)+text+this.text.slice(this.cursor, this.text.length);
      this.replace_text(text2);
      this.cursor+=text.length;
    }
  }
  UITextBox.prototype.delcmd = function(dir) {
    if (this.has_sel()) {
        this.insert("");
    }
    else {
      if (this.cursor+dir>=0&&this.cursor+dir<=this.text.length) {
          var text2;
          if (dir>0) {
              text2 = this.text.slice(0, this.cursor)+this.text.slice(this.cursor+1, this.text.length);
          }
          else {
            text2 = this.text.slice(0, this.cursor-1)+this.text.slice(this.cursor, this.text.length);
            this.cursor-=1;
            this.set_cursor();
          }
          this.replace_text(text2);
      }
    }
    this.set_cursor();
  }
  UITextBox.prototype.find_next_textbox = function() {
    var p=this.parent;
    console.log("Fix dependency here");
    while (p!=undefined&&p.parent!=undefined) {
      if (p.parent.constructor.name=="ScrArea"||__instance_of(p, Dialog)) {
          break;
      }
      p = p.parent;
    }
    var root=p;
    p = this.parent;
    var i=this.parent.children.indexOf(this);
    var c=this;
    function find_textbox(e, exclude) {
      if (__instance_of(e, UITextBox)&&e!=exclude)
        return e;
      if (__instance_of(e, UIFrame)) {
          var __iter_c_0=__get_iter(e.children);
          var c_0;
          while (1) {
            var __ival_c_0=__iter_c_0.next();
            if (__ival_c_0.done) {
                break;
            }
            c_0 = __ival_c_0.value;
            var ret=find_textbox(c_0, exclude);
            if (ret!=undefined)
              return ret;
          }
      }
    }
    var next;
    do {
      next = find_textbox(c, this);
      if (next)
        break;
      p = p.parent;
      c = c.parent;
      i = p.children.indexOf(c);
    } while (p!=root);
    
    if (!next) {
        next = find_textbox(root, this);
    }
    if (!next) {
        console.log("Error in find_next_textbox()");
        this.end_edit();
        return ;
    }
    if (next==this) {
        this.end_edit();
        return ;
    }
    this.end_edit();
    next.begin_edit();
  }
  UITextBox.prototype.on_charcode = function(event) {
    console.log("text input", event);
    this.insert(event["char"]);
  }
  UITextBox.prototype.select_all = function() {
    this.sel = [0, this.text.length];
    this.do_recalc();
  }
  UITextBox.prototype.on_textinput = function(event) {
    console.log("text input", event);
  }
  UITextBox.prototype.on_keydown = function(event) {
    var this2=this;
    function start_sel() {
      if (!this2.has_sel()) {
          this2.sel[0] = this2.sel[1] = this2.cursor;
      }
    }
    if (event.keyCode==charmap["Enter"]) {
        this.end_edit();
    }
    else 
      if (event.keyCode==charmap["Escape"]) {
        this.end_edit(this.cancel_on_escape);
    }
    else 
      if (event.keyCode==charmap["Left"]) {
        start_sel();
        this.cursor-=1;
        this.set_cursor();
        if (event.shiftKey) {
            this.selcursor = this.cursor;
            this.handle_selecting();
        }
        else {
          this.sel = [0, 0];
        }
    }
    else 
      if (event.keyCode==charmap["Right"]) {
        start_sel();
        this.cursor+=1;
        this.selcursor = this.cursor;
        this.set_cursor();
        if (event.shiftKey) {
            this.selcursor = this.cursor;
            this.handle_selecting();
        }
        else {
          this.sel = [0, 0];
        }
    }
    else 
      if (event.keyCode==charmap["Insert"]) {
        this.replace_mode^=true;
        this.do_recalc();
    }
    else 
      if (event.keyCode==charmap["Delete"]) {
        this.delcmd(1);
    }
    else 
      if (event.keyCode==charmap["Backspace"]) {
        this.delcmd(-1);
    }
    else 
      if (event.keyCode==charmap["A"]&&event.ctrlKey&&!event.shiftKey&&!event.altKey) {
        this.select_all();
        this.do_recalc();
    }
    else 
      if (event.keyCode==charmap["Home"]) {
        start_sel();
        this.cursor = 0;
        this.selcursor = this.cursor;
        this.set_cursor();
        if (event.shiftKey) {
            this.selcursor = this.cursor;
            this.handle_selecting();
        }
        else {
          this.sel = [0, 0];
        }
    }
    else 
      if (event.keyCode==charmap["End"]) {
        start_sel();
        this.cursor = this.text.length;
        this.selcursor = this.cursor;
        this.set_cursor();
        if (event.shiftKey) {
            this.selcursor = this.cursor;
            this.handle_selecting();
        }
        else {
          this.sel = [0, 0];
        }
    }
    else 
      if (event.keyCode==charmap["Tab"]) {
        this.find_next_textbox();
    }
  }
  UITextBox.prototype.find_selcursor = function(event) {
    var gmap=this.gmap;
    var selcursor=0;
    if (event.x<=gmap[0]) {
        selcursor = 0;
    }
    else 
      if (event.x>=gmap[gmap.length-1]) {
        selcursor = this.text.length;
    }
    else {
      for (var i=0; i<gmap.length-1; i++) {
          if (event.x>=gmap[i]&&event.x<=gmap[i+1]) {
              selcursor = i;
              break;
          }
      }
    }
    if (selcursor!=this.selcursor) {
        this.selcursor = selcursor;
        this.do_recalc();
    }
  }
  UITextBox.prototype.replace_text = function(text) {
    this.text = text;
    this.gen_glyphmap();
    this.set_cursor();
    this.selcursor = Math.min(Math.max(0, this.selcursor), this.text.length);
    this.do_recalc();
  }
  UITextBox.prototype.has_sel = function() {
    return this.sel[1]-this.sel[0]>0;
  }
  UITextBox.prototype.gen_glyphmap = function() {
    this.gmap = [];
    var gmap=this.gmap;
    function calc_callback(vrect, trect) {
      gmap.push(Math.min(vrect[0], trect[0]));
    }
    if (this.canvas==undefined)
      return ;
    var s="";
    gmap.push(0);
    for (var i=0; i<this.text.length; i++) {
        s+=this.text[i];
        var b=this.canvas.textsize(s);
        calc_callback(b, b);
    }
    var bounds=this.canvas.textsize(this.text)[0];
    gmap.push(bounds);
    this.text_offx = Math.min(this.text_offx, gmap[gmap.length-1]);
    for (var i=0; i<gmap.length; i++) {
        gmap[i] = Math.floor(gmap[i])+this.text_offx;
    }
  }
  UITextBox.prototype.build_draw = function(canvas) {
    var tsize=canvas.textsize(this.text);
    canvas.begin(this);
    if (!(this.state&UIFlags.ENABLED))
      canvas.box([0, 0], this.size, this.do_flash_color(uicolors["DisabledBox"]));
    else 
      if (this.editing)
      canvas.invbox([0, 0], this.size, uicolors["TextBoxInv"], 16);
    else 
      if (this.state&UIFlags.HIGHLIGHT)
      canvas.box([0, 0], this.size, uicolors["TextBoxHighlight"], 16);
    else {
      canvas.box([0, 0], this.size, uicolors["TextBoxInv"], 16);
    }
    canvas.push_scissor([0, 0], this.size);
    if (this.editing&&this.has_sel()) {
        var x1=this.gmap[this.sel[0]];
        var x2=this.gmap[this.sel[1]];
        canvas.simple_box([x1, 0], [x2-x1, this.size[1]], uicolors["TextSelect"], 100);
    }
    canvas.text([this.text_offx, (this.size[1]-tsize[1])*0.25], this.text, uicolors["DefaultText"]);
    if (this.editing) {
        if (inrect_2d(this.mpos, [-10, -10], [this.size[0]+20, this.size[1]+20])) {
            if (!this.has_sel()||(this.selcursor<this.sel[0]||this.selcursor>this.sel[1])) {
                var x=this.gmap[this.selcursor];
                if (x==undefined)
                  x = 0;
                canvas.line([x, 0], [x, this.size[1]], uicolors["HighlightCursor"], undefined, 2.0);
            }
        }
        if (!this.has_sel()) {
            var x=this.gmap[this.cursor];
            var w=this.replace_mode ? 4.0 : 2.0;
            if (x!=undefined&&w!=undefined) {
                canvas.line([x, 0], [x, this.size[1]], uicolors["TextEditCursor"], undefined, w);
            }
        }
    }
    canvas.pop_scissor();
    canvas.end(this);
  }
  UITextBox.prototype.get_min_size = function(canvas, isvertical) {
    return [this.min_width, 26];
  }
  _es6_module.add_class(UITextBox);
  UITextBox = _es6_module.add_export('UITextBox', UITextBox);
});
