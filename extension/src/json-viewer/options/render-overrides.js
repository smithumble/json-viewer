var jsonFormater = require('../jsl-format');

function renderOverrides(CodeMirror, value) {
  var overridesInput = document.getElementById('overrides');
  overridesInput.innerHTML = jsonFormater(JSON.stringify(value));

  return CodeMirror.fromTextArea(overridesInput, {
    mode: "application/ld+json",
    lineWrapping: true,
    lineNumbers: true,
    tabSize: 2
  });
}

module.exports = renderOverrides;
