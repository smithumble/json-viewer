(function(mod) {
    mod(
        require("codemirror"), 
        require("codemirror/addon/search/searchcursor"), 
        require("codemirror/addon/dialog/dialog"),
        require("codemirror/addon/search/search")
    );
})(function(CodeMirror) {
  "use strict";
  
  // Override the findPersistent command to remove clearSearch call
  CodeMirror.commands.findPersistent = function(cm) {
    // Check if search dialog is already open
    var searchInput = cm.display.wrapper.querySelector(".CodeMirror-search-field");
    if (searchInput) {
      // Search dialog is already open - focus on input and select text
      searchInput.focus();
      searchInput.select();
    } else {
      // No search dialog open - start a new persistent search
      cm.execCommand("findPersistentNext");
    }
  };

  // Store the original openDialog method
  var originalOpenDialog = CodeMirror.prototype.openDialog;
  
  // Override the openDialog method
  CodeMirror.prototype.openDialog = function(template, callback, options) {
    if (!options) options = {};
    
    // If this is a search dialog
    if (template && template.querySelector && template.querySelector('.CodeMirror-search-field')) {
      // Set default closeOnBlur to false for search dialogs
      if (options.closeOnBlur === undefined) {
        options.closeOnBlur = false;
      }
    }
    
    // Call the original function
    return originalOpenDialog.call(this, template, callback, options);
  };
});