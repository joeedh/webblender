"use strict";

import 'polyfill';

import {hashtable} from 'util';
import * as util from 'util';

import {SDNAParser, ENDIAN_LITTLE, ENDIAN_BIG} from 'sdna';
import * as sdna_mod from 'sdna';

/*
class Int64 {
  constructor(higher, lower) {
    this.higher = higher;
    this.lower = lower;
  }
  
  [Symbol.keystr]() {
    return ""+this.higher+":"+this.lower;
  }
  
  toDouble() {
    return this.lower | (this.higher<<32);
  }
  
//  valueOf() {
//    return this.lower | (this.higher<<32);
//  }
}
*/

/*
polyfill DataView.prototype.get[u]Int64()

yeah yeah we cast to double, oh the horror
*/

if (DataView.prototype.getUint64Array == undefined) {
    DataView.prototype.getUint64 = function(i, endian) {
        var b1 = this.getUint32(i, endian);
        var b2 = this.getUint32(i+4, endian);
        
        if (endian)
          return b1 + b2*Math.pow(2.0, 32);
        else
          return b2 + b1*Math.pow(2.0, 32);
    }
    
    DataView.prototype.getInt64 = function(i, endian) {
        var b1 = this.getUint32(i, endian);
        var b2 = this.getUint32(i+4, endian);
        
        if (!endian) {
          var t = b1; b1 = b2; b2 = t;
        }
        
        if (b2 & ((1<<32)-1)) {
          b1 = ~b1;
          b2 = ~b2;
          
          return -(b1 + b2*Math.pow(2.0, 32));
        }
        
        return b1 + b2*Math.pow(2.0, 32);
    }
}

import {cachering} from 'util';

var SEEK_SET = 0
var SEEK_CUR = 1

export class FileData {
    constructor(buf) {
        this.main = {};
        this.buf = buf;
        this.i = 0;
        this.version = undefined;

        this.view = new DataView(buf);
        this.uview = new Uint8Array(buf);
        
        this.libblocks = undefined; //primary data will go here
        this.directdata = undefined; //secondary data, usually owned by libblocks
        this.oldmap = undefined; //pointer map;
        this.link_doneset = new util.set();
        
        this.endian = 1; //true means little endian
        this.ptrsize = 4;
        this.sdna = undefined;
        this.host_typemanager = sdna_mod.types;
    }
    
    seek(i, origin=SEEK_SET) {
        if (origin == SEEK_SET) {
          this.i = i;
        } else if (origin == SEEK_CUR) {
          this.i += i;
        }
    }
    
    skip(n) {
      this.i += n;
    }
    
    rewind() {
        this.i = 0;
    }
  
    read_byte() {
        var ret = this.view.getUint8(this.i, this.endian);
        this.i += 1;
        return ret;
    }
    
    read_char() {
        var ret = this.view.getUint8(this.i, this.endian);
        this.i += 1;
        return String.fromCharCode(ret);
    }
    
    read_short() {
        var ret = this.view.getInt16(this.i, this.endian);
        this.i += 2;
        return ret;
    }
    
    read_ushort() {
        var ret = this.view.getUint16(this.i, this.endian);
        this.i += 2;
        return ret;
    }
    
    read_int() {
        var ret = this.view.getInt32(this.i, this.endian);
        this.i += 4;
        return ret;
    }
    
    read_uint() {
        var ret = this.view.getUint32(this.i, this.endian);
        this.i += 4;
        return ret;
    }
      
    read_long() {
        return this.read_int();
    }
    
    read_ulong() {
        return this.read_uint();
    }
    
    read_int64_t() {
        var ret = this.view.getInt64(this.i, this.endian);
        this.i += 8;
        return ret;
    }
    
    read_uint64_t() {
        var ret = this.view.getUint64(this.i, this.endian);
        this.i += 8;
        return ret;
    }
    
    read_float() {
      var ret = this.view.getFloat32(this.i, this.endian);
      this.i += 4;
      return ret;
    }
    
    read_double() {
      var ret = this.view.getFloat64(this.i, this.endian);
      this.i += 8;
      return ret;
    }
    
    tell() {
        return this.i;
    }
    
    read_pointer() {
      if (this.ptrsize == 4) {
          return this.read_uint();
      } else {
          return this.read_uint64_t();
      }
    }
    
    read_bytes(n) {
        var ret = this.buf.slice(this.i, this.i+n);
        this.i += n;
        return ret;
    }
    
    eof() {
        return this.i >= this.buf.byteLength;
    }
    
    //ascii, mercifully
    read_string(size) {
        if (isNaN(size)) {
            throw new Error("Size was NaN");
        }
        
        var si = this.i, ei = si+size, hit_zero=false;
        var uview = this.uview;
        var s = "";
        
        while (si < ei) {
            var v = uview[si];
            
            if (v == 0) {
                hit_zero = true;
                si++;
                continue;
            }
            
            if (!hit_zero) {
                s += String.fromCharCode(v);
            }
            
            si++;
        }
        
        this.i = si;
        return s;
    }
}

export class BHead {
    constructor() {
      this.code = undefined; this.len = 0;
      this.old = 0; this.sdna = 0;
      this.nr = 0;
    }
}

var read_bhead_cache = cachering.fromConstructor(BHead, 64);

export function read_bhead(fd) {
    var bh = read_bhead_cache.next();
    
    bh.code = fd.read_string(4);
    bh.len = fd.read_int();
    bh.old = fd.read_pointer();
    bh.sdna = fd.read_int();
    bh.nr = fd.read_int();
    
    return bh;
}

export function load_file(fd) {
    if (fd.read_string(7) != "BLENDER") {
        throw new Error("Invalid file");
    }
    
    var ptrsize = fd.read_char() == "-" ? 8 : 4;
    fd.ptrsize = ptrsize;
    
    //are we little-endian
    var endian = fd.read_char() == "v";
    fd.endian = endian;
    
    var version = fd.read_string(3);
    fd.version = version;

    var filestart = fd.tell();
    
    var data=[];
    var libblocks = [];
    var olds=[];
    var snrs=[];
    var nrs=[];
    var oldmap = new hashtable();
    fd.oldmap = oldmap;
    
    var totbhead = 0;
    var _ci=0;
    var dna = undefined;
    
    //find dna code
    while (!fd.eof()) {
      var bh = read_bhead(fd);
      
      if (bh.code == "DNA1") {
        dna = fd.read_bytes(bh.len);
      } else {
        fd.skip(bh.len);
      }
      
      if (_ci++ > 100000) {
          console.log("infinite loop");
          break;
      }
    }
    
    if (dna == undefined) {
        throw new Error("Could not find SDNA");
    }
    
    var parser = new SDNAParser();
    dna = new Uint8Array(dna);
    
    var sdna = parser.parse(dna, fd.endian ? ENDIAN_LITTLE : ENDIAN_BIG, fd.ptrsize);
    fd.sdna = sdna;
    
    console.log(sdna);
    
    fd.seek(filestart);
    
    var _ci = 0;
    
    while (!fd.eof()) {
      var bh = read_bhead(fd);
      var next = fd.tell() + bh.len;
      
      if (bh.code == "DATA") {
        //console.log("- reading ", bh.code);
        var obj = sdna.read(bh, fd);

        oldmap.set(bh.old, obj);
        data.push(obj);
      } else if (bh.code == "ENDB") {
        break;
      } else if (bh.code != "DNA1") {
        //console.log("- reading block type", bh.code);
        
        var block = sdna.read(bh, fd);
        oldmap.set(bh.old, block);
        
        libblocks.push(block);
      }
      
      fd.seek(next);
      
      if (_ci++ > 100000) {
          console.log("infinite loop");
          break;
      }
    }
    
    fd.oldmap = oldmap;
    fd.libblocks = libblocks;
    fd.directdata = data;
    
    var libblocks2 = [];
    
    for (var i=0; i<libblocks.length; i++) {
        var block = libblocks[i];
        
        if (block.constructor === Array) {
            for (var j=0; j<block.length; j++) {
              libblocks2.push(block[j]);
            }
        } else {
          libblocks2.push(block);
        }
    }
    
    libblocks = libblocks2;
    
    for (var i=0; i<libblocks.length; i++) {
        var block = libblocks[i];
        
        block._bl_sdna.link(block, fd);
    }
    for (var i=0; i<data.length; i++) {
      var d = data[i];
      
      if (d.constructor === Array) {
        for (var j=0; j<d.length; j++) {
          d[j]._bl_sdna.link(d[j], fd);
        }
      } else {
        d._bl_sdna.link(d, fd);
      }
    }
    
    
    //console.log(data);
    //console.log(libblocks);
    //console.log(oldmap);
}
