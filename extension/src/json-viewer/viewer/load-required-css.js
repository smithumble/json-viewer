const loadCSS = require('../load-css');
const themeDarkness = require('../theme-darkness');

function loadRequiredCss(options) {
  return new Promise(function (resolve) {
    const promises = [];

    const theme = options.theme.replace(/ /g, "-");
    promises.push(loadCSS({
      path: "/assets/viewer.css",
      id: "json-viewer-css"
    }));

    if (theme !== "default") {
      const themePath = `/themes/${themeDarkness(theme)}/${theme}.css`;
      promises.push(loadCSS({
        path: themePath,
        id: "json-viewer-theme-css"
      }));
    }

    if (options.style?.length > 0) {
      const style = document.createElement("style");
      style.id = "json-viewer-custom-css";

      // Use textContent instead of innerHTML for CSP compliance
      style.textContent = options.style;

      document.getElementsByTagName("head")[0].appendChild(style);
    }

    Promise.all(promises).then(() => resolve())
  });
}

module.exports = loadRequiredCss;
