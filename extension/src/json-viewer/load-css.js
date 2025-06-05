function loadCSS(opts) {
  return new Promise(function(resolve, reject) {
    try {
      const url = chrome.runtime.getURL(opts.path);
      const link = document.createElement("link");
      link.href = url;
      link.type = "text/css";
      link.rel = "stylesheet";
      link.id = opts.id;
      
      link.onload = function() {
        resolve();
      };
      
      link.onerror = function(e) {
        console.error("[JSONViewer] Error loading CSS:", opts.path, e);
        // Resolve anyway to continue with the process
        resolve();
      };
      
      document.getElementsByTagName("head")[0].appendChild(link);

    } catch(e) {
      console.error("[JSONViewer] Exception in loadCSS:", e);
      // Resolve anyway to continue with the process
      resolve();
    }
  });
}

module.exports = loadCSS;
