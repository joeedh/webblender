import os, os.path, sys, struct

path = sys.argv[1];
file = open(path, "rb")
buf = file.read()
file.close()

header = buf[:len(b"BLENDER")+5]

if not header.startswith(b"BLENDER"):
  sys.stderr.write("bad header! " + header + "\n")
  sys.exit(-1)
  
"""
typedef struct BHead {
	int code, len;
	void *old;
	int SDNAnr, nr;
} BHead;
"""

print(header)
psize = 8 if header[7] == ord(b"-") else 4
endian = "big" if header[8] == ord(b"V") else "little"


fmt = "cccciQii" if psize == 8 else "cccciiii"
fmt = (">" if endian == "big" else "<") + fmt

fi = len(header)

def read_bhead(buf, fi):
    sz = struct.calcsize(fmt)
    bh = struct.unpack(fmt, buf[fi:fi+sz])
    code = bh[0]+bh[1]+bh[2]+bh[3]
    
    return {
      "code" : code,
      "len"  : bh[4],
      "ptr"  : bh[5],
      "SDNAnr" : bh[6],
      "nr"   : bh[7]
    }

def read_bheads(buf, start):
  fi = start
  sz = struct.calcsize(fmt)  
  
  codes = []
  bheads = []
  while fi+sz < len(buf):
    bh = read_bhead(buf, fi)
    codes.append(bh["code"])
    
    data = buf[fi+sz:fi+sz+bh["len"]]
    print(fi, fi+sz+bh["len"], len(buf))
    
    bh["data"] = data
    bh["start"] = fi
    bheads.append(bh)
    fi += bh["len"] + sz
    
  return bheads 

sdna = None
for bh in read_bheads(buf, fi):
  if bh["code"] == b"DNA1":
    sdna = bh 

data = sdna["data"]
out = "export var sdna = new Uint8Array([\n    "


ci = 0
i = 0
for c in data:
  if ci > 70:
    out += "\n    "
    ci = 0
  if i  > 0:
    out += ","
    
  out += str(c)
  
  ci += len(str(c))+1
  i += 1
out += "]);\n"

print("buflen", len(buf))
def write(outpath):
  file = open(outpath, "w")
  file.write(out)
  file.close()

if len(sys.argv) > 2:
  write(sys.argv[2])
  