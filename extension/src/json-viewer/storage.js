const defaults = require('./options/defaults');
const merge = require('./merge');

const NAMESPACE = "v2.options";
const chrome = require('chrome-framework');

module.exports = {
  save: function (obj) {
    chrome.storage.local.set({ [NAMESPACE]: JSON.stringify(obj) }, () => {
      if (chrome.runtime.lastError) {
        console.error("[JSONViewer] Error saving options:", chrome.runtime.lastError);
      } else {
        console.log("[JSONViewer] Options saved successfully.");
      }
    });
  },

  load: function (callback) {
    const self = this
    const options = this._createDefaultOptions();

    // For MV3, we need to handle async storage but return defaults synchronously
    if (!chrome?.storage?.local) return options

    chrome.storage.local.get(NAMESPACE, function (result) {
      if (chrome.runtime.lastError) {
        console.error("[JSONViewer] Error loading options:", chrome.runtime.lastError);
        callback(options)
        return;
      }

      const storedOptions = JSON.parse(result[NAMESPACE] ?? '{}');
      Object.assign(options, self._processOptions(storedOptions));
      callback(options)
    });

  },

  _createDefaultOptions: function () {
    return {
      theme: defaults.theme,
      addons: merge({}, defaults.addons),
      structure: defaults.structure,
      style: defaults.style
    };
  },

  _processOptions: function (options) {
    if (!options) return this._createDefaultOptions();

    const processed = {};
    processed.theme = options.theme || defaults.theme;
    processed.addons = options.addons ?
      (typeof options.addons === 'string' ? JSON.parse(options.addons) : options.addons) :
      {};
    processed.addons = merge({}, defaults.addons, processed.addons);
    processed.structure = options.structure ?
      (typeof options.structure === 'string' ? JSON.parse(options.structure) : options.structure) :
      defaults.structure;
    processed.style = options.style && options.style.length > 0 ? options.style : defaults.style;
    return processed;
  }
}