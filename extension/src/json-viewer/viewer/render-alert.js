const loadCSS = require('../load-css');

function renderAlert(pre, options, content, timeout) {
  loadCSS({ path: "/assets/viewer-alert.css", id: "json-viewer-alert-css" });

  const alert = document.createElement("div");
  alert.className = "json-viewer-alert";

  const closeBtn = document.createElement("a");
  closeBtn.className = "close";
  closeBtn.href = "#";
  closeBtn.title = "Close";
  // Use textContent instead of innerHTML for CSP compliance
  closeBtn.textContent = "×";
  closeBtn.onclick = function (e) {
    e.preventDefault();
    document.body.removeChild(alert);
  }

  alert.appendChild(closeBtn);

  if (typeof content === "string") {
    const contentElement = document.createElement("div");
    // Use textContent instead of innerHTML for CSP compliance
    contentElement.textContent = content;
    alert.appendChild(contentElement);
  } else {
    alert.appendChild(content);
  }

  document.body.appendChild(alert);

  if (timeout) {
    setTimeout(function () {
      if (document.body.contains(alert)) {
        document.body.removeChild(alert);
      }
    }, timeout);
  }
}

module.exports = renderAlert;