const chrome = require('chrome-framework');
const Storage = require('./json-viewer/storage');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  try {
    if (request.action === "GET_OPTIONS") {
      Storage.load((options) => {
        sendResponse({ err: null, value: options });
      });
    }
  } catch(e) {
    console.error('[JSONViewer] error: ' + e.message, e);
    sendResponse({err: e});
  }

  // Manifest V3 requirement
  // Always return true to handle async responses
  return true; 
});

chrome.omnibox.onInputEntered.addListener(function (text) {
  const url = chrome.runtime.getURL("pages/omnibox.html?scratch-page=true");
  chrome.tabs.create({ url: url });
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log('[JSONViewer] inputChanged: ' + text);
  suggest([
    {
      content: "Format JSON",
      description: "(Format JSON) Open a page with json highlighted"
    },
    {
      content: "Scratch pad",
      description: "(Scratch pad) Area to write and format/highlight JSON"
    }
  ]);
});