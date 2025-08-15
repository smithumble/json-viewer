const merge = require('../merge');
const getOptions = require('./get-options');

function getUrlOptionsOverrides(options, currentUrl) {
  for (const urlOptionsOverrides of options.overrides) {
    try {
      const regex = new RegExp(urlOptionsOverrides.urlPattern, 'i');
      if (regex.test(currentUrl)) {
        return urlOptionsOverrides;
      }
    } catch (e) {
      console.warn('[JSONViewer] Invalid URL pattern regex:', urlOptionsOverrides?.urlPattern, e);
    }
  }

  return {};
}

function applyUrlOptionsOverrides(options, url) {
  const urlOptionsOverrides = getUrlOptionsOverrides(options, url);
  const mergedOptions = merge({}, options, urlOptionsOverrides);
  delete mergedOptions.overrides;

  if (process.env.NODE_ENV === 'development') {
    console.debug('[JSONViewer] Using options:', mergedOptions);
  }
  
  return mergedOptions;
}

function getUrlOptions(url) {
  return new Promise(function (resolve, reject) {
    getOptions().then(function(options) {
      const urlOptions = applyUrlOptionsOverrides(options, url);
      resolve(urlOptions);
    }).catch(function(err) {
      reject(err);
    });
  });
}

module.exports = getUrlOptions;
