function exposeJson(text, outsideViewer) {
  console.info("[JSONViewer] Your json was stored into 'window.json', enjoy!");

  try {
    var parsedJson = JSON.parse(text);
    window.json = parsedJson;
  } catch (e) {
    console.error("[JSONViewer] Failed to expose JSON:", e);
  }
}

module.exports = exposeJson;
