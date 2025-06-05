const chrome = require('chrome-framework');

function getOptions() {
  return new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ action: "GET_OPTIONS" }, function (response) {
      const err = response.err;
      const value = response.value;

      if (err) {
        reject('getOptions: ' + err.message);
        return
      }
      
      resolve(value);
    });
  });
}

module.exports = getOptions;
