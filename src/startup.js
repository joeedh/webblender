"use strict";

import {G} from 'appstate';
import {init_sdna} from 'sdna';
import {init_rna} from 'rna_api';

export function start() {
  init_sdna();
  init_rna();
  G.startup();
  
  G.load_default_file();
}
