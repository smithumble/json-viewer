require('./options-styles');
var CodeMirror = require('codemirror');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/mode/css/css');
var sweetAlert = require('sweetalert');

var Storage = require('./json-viewer/storage');
var renderThemeList = require('./json-viewer/options/render-theme-list');
var renderAddons = require('./json-viewer/options/render-addons');
var renderStructure = require('./json-viewer/options/render-structure');
var renderOverrides = require('./json-viewer/options/render-overrides');
var renderStyle = require('./json-viewer/options/render-style');
var bindSaveButton = require('./json-viewer/options/bind-save-button');
var bindResetButton = require('./json-viewer/options/bind-reset-button');
var getOptions = require('./json-viewer/viewer/get-options');


function isValidJSON(pseudoJSON) {
  try {
    JSON.parse(pseudoJSON);
    return true;

  } catch (e) {
    return false;
  }
}

function renderVersion() {
  var version = process.env.VERSION;
  var versionLink = document.getElementsByClassName('version')[0];
  versionLink.innerHTML = version;
  versionLink.href = "https://github.com/tulios/json-viewer/tree/" + version;
}

function onLoaded() {
  getOptions().then((options) => {
    renderVersion();
    renderThemeList(CodeMirror, options.theme);
    var addonsEditor = renderAddons(CodeMirror, options.addons);
    var structureEditor = renderStructure(CodeMirror, options.structure);
    var overridesEditor = renderOverrides(CodeMirror, options.overrides);
    var styleEditor = renderStyle(CodeMirror, options.style);
  
    bindResetButton();
    bindSaveButton([addonsEditor, structureEditor, overridesEditor, styleEditor], function (options) {
      if (!isValidJSON(options.addons)) {
        sweetAlert("Ops!", "\"Add-ons\" isn't a valid JSON", "error");
  
      } else if (!isValidJSON(options.structure)) {
        sweetAlert("Ops!", "\"Structure\" isn't a valid JSON", "error");
  
      } else if (!isValidJSON(options.overrides)) {
        sweetAlert("Ops!", "\"Overrides\" isn't a valid JSON", "error");
  
      } else {
        Storage.save(options);
        sweetAlert("Success", "Options saved!", "success");
      }
    });
  })
}

document.addEventListener("DOMContentLoaded", onLoaded, false);
