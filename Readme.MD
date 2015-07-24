WebBlender is a web-based implemention of blender's (the 
open-source 3D content creation suite) architectural
design.  It derives its core types from Blender's SDNA system.

The goal is to have something flexible enough that it can read
and write .blends while preserving information it does not 
understand (currently reading works).

# Building #

WebBlender is written in ES6, and currently comes with it's very own,
horrible transpiler.  At this point, it's hard to feel motivated to
switch to babel when ES6 is being implemented in browsers as we speak
(and I don't plan on using any custom syntax extensions, as I do in
fairmotion).

To build, unzip tools/libs/ply-3.4.tar.gz:

    cd tools/libs
    tar -xzvf ply-3.4.tar.gz;

Next, install PLY (which is a parse generator):

    python setup.py install

Thoeretically, this should work with both py2 and py3,
however I don't test both of 'em very often.

Next, go back to the root folder, and run:

    python js_build.py

Note that if you have inkscape installed the build script
will attempt to render several iconsheets.

# Install web server #
Run:

  npm update

# Running #
To run the webserver:

  npm app.js

It will run on port 3000 (it tells you).
