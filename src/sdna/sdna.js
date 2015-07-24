import * as parse_sdna from 'parse_sdna';
import * as sdna_code from 'sdna_code';

export * from 'parse_sdna';
export var SDNA = parse_sdna.SDNA;
export var SDNAParser = parse_sdna.SDNAParser;

var SDNASubClass = parse_sdna.SDNASubClass;

var _sdna_prototype_idgen = 0;
export var _sdna_prototype_maps = {}; //maps prototype id's to constructors

function makeSDNAClass(stt) {
  var code = """
  var CLSNAME;
  
  CLSNAME = function CLSNAME() {
    this._bl_instance_id = parse_sdna.sdna_instance_idgen.next();
  };
  """.replace(/CLSNAME/g, stt.name);
  
  var cls = eval(code);
  
  //EVIL CODE FOR TRANSPILER
  inherit_multiple_intern(cls, [SDNASubClass]);
  //</evil>
  
  //FUTURE ES6 CORRECT CODE
  //  cls.prototype = Object.create(SDNASubClass.prototype);
  
  cls.prototype._sdna_prototype_id = _sdna_prototype_idgen++;
  cls.prototype._bl_sdna = stt;
  _sdna_prototype_maps[cls.prototype._sdna_prototype_id] = cls;
  
  cls.sdna_write = function() {
  }
  
  cls.sdna_read = function(view, off) {
  }
  
  cls._bl_sdna = stt;
  return cls;
}

export class SDNATypeManager {
  constructor() {
      this.sdna = undefined;
      this.bases = {};
  }
  
  register(cls) {
    var stt = cls.prototype._bl_sdna;
    var sid = cls.prototype._sdna_prototype_id;
    
    _sdna_prototype_maps[sid] = cls;
    this[stt.name] = cls;
    
    startup_report("registered sdna.types." + stt.name, "blue");
  }
  
  load_code(code) {
    var parser = new parse_sdna.SDNAParser();
    var sdna = parser.parse(code, parse_sdna.ENDIAN_LITTLE, 8);
    this.sdna = sdna;
    
    for (var k in sdna.structs) {
      this[k] = this.bases[k] = makeSDNAClass(sdna.structs[k]);
    }
    
    console.log(sdna)
  }
}

export var types = new SDNATypeManager();
export var bases = types.bases;

startup_report("  parsing sdna structs. . .", "teal");

types.load_code(sdna_code.sdna);

export function init_sdna() {
//  startup_report("initializing sdna object system. . .")
}