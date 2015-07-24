import os, os.path

if not os.path.exists("src/config/config_defines.js"):
  print("Auto-generating src/config/config_defines.js. . .")
  
  f = open("src/config/config_defines.js", "w")
  f.close()

if not os.path.exists("src/config/config_local.js"):
  print("Auto-generating src/config/config_local.js. . .")
  
  f = open("src/config/config_local.js", "w")
  f.write("'use strict';\n");
  f.close()

try:
  import build_local
except:
  build_local = {}

basepath = os.path.abspath(os.path.normpath(os.getcwd()))
sources = [
	"src/html/main.html",
  "src/es6/module.js",
  "src/es6/typesystem.js",
  "src/datafiles/iconsheet.svg",
  "src/datafiles/iconsheet.png",
  "src/datafiles/iconsheet16.png"
]

for root, dirs, files in os.walk("src"):
  for f in files:
    if not f.endswith(".js"): continue
    path = os.path.join(root, f);
    path = os.path.abspath(os.path.normpath(path))
    
    if "es6" in path: continue;
    
    if path.startswith(basepath):
      path = path[len(basepath):]
    path = path.replace(os.path.sep, "/")
    
    if len(path.strip()) == 0: continue;
    print(path, root)
    
    while path[0] == "/":
      path = path[1:]
      
    sources.append(path)
    
print(sources)

copy_targets = {
  "blendfile.blend" : "src/datafiles/blendfile.blend"
}

optional_copy_targets = {
}

js_targets = {"app.js"        : sources
             }

