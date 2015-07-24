"use strict";

export var filecache = {
};

export function fetch_file(url, response_type="arraybuffer") {
  if (url in filecache) {
      return new Promise(function(resolve, reject) {
          resolve(filecache[url]);
      });
  }
  
  var promise = new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.responseType = response_type;
    
    req.onreadystatechange = function() {
      if (req.status == 200 && req.response != null) {
          filecache[url] = req.response;
          resolve(req.response);
      } else if (req.status >= 400) {
          reject(req.statusText);
      }
    }
    
    req.open("GET", url, true);
    req.send();
  });
  
  return promise;
}

fetch_file("/blendfile.blend").then(function(data) {
    console.log("got startup .blend");
    window._startup_blend = data;
});
