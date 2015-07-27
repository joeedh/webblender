"use strict";

import 'polyfill';
import * as util from 'util';
import {init_data_api} from 'data_api';

window.IsMobile = false;
window.DEBUG = {
};

import 'theme';
import 'appstate'; //ensure G exists

import {init_sdna} from 'sdna';

export function start() {
  init_theme();
  
  init_sdna();
  init_data_api();
  
  G.startup();
  G.load_default_file();
  
  //begin regular timer event
  var last_tick = util.time_ms();
  var tick_event = {
    type : "tick"
  };
  
  window.setInterval(function() {
    if (util.time_ms() - last_tick < 200) {
      return;
    }
    
    last_tick = util.time_ms();
    if (G.event_manager != undefined) {
      G.event_manager.fireEvent(tick_event);
    }
  }, 10);
}
