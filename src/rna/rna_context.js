"use strict";

import {PropTypes, PropFlags, RNAProperty, IntProperty, FloatProperty, 
        Vec3Property, StringProperty} from 'rna_properties';

import {
  DataStructArray, DataStruct, DataStructArray, DataPath
} from 'data_api_types';

export function rna_define_window() {
  
  return new DataStruct([
    new DataPath(new FloatProperty(), "sizex", "sizex", true),
    new DataPath(new FloatProperty(), "sizey", "sizey", true)
  ]);
}

export function rna_define_screen() {
  return new DataStruct([
  ]);
}

export function rna_define_context() {
  var ContextStruct = new DataStruct([
    new DataPath(rna_define_screen(), "screen", "ctx.screen", true),
    new DataPath(rna_define_window(), "window", "ctx.window", true)
  ]);
  
  return ContextStruct;
}
