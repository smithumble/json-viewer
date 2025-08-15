const chrome = require('chrome-framework');
const svgGear = require('./svg-gear');
const svgRaw = require('./svg-raw');
const svgUnfold = require('./svg-unfold');
const svgSearch = require('./svg-search');

function renderExtras(pre, options, highlighter) {
  const extras = document.createElement("div");
  extras.className = "extras";

  if (!options.addons.autoHighlight) {
    extras.className += ' auto-highlight-off';
  }

  const optionsLink = document.createElement("a");
  optionsLink.className = "json_viewer icon gear";
  optionsLink.href = chrome.runtime.getURL("/pages/options.html");
  optionsLink.target = "_blank";
  optionsLink.innerHTML = svgGear;
  extras.appendChild(optionsLink);

  const rawLink = document.createElement("a");
  rawLink.className = "json_viewer icon raw";
  rawLink.href = "#";
  rawLink.title = "Original JSON toggle";
  rawLink.innerHTML = svgRaw;
  rawLink.onclick = function(e) {
    e.preventDefault();

    if (pre.hidden) {
      // Raw enabled
      highlighter.hide();
      pre.hidden = false;
      extras.classList.add('auto-highlight-off');
      return
    }
    
    // Raw disabled
    highlighter.show();
    pre.hidden = true;
    extras.className = extras.className.replace(/\s+auto-highlight-off/, '');
  }

  const unfoldLink = document.createElement("a");
  unfoldLink.className = "json_viewer icon unfold";
  unfoldLink.href = "#";
  unfoldLink.title = "Fold/Unfold all toggle";
  unfoldLink.innerHTML = svgUnfold;
  unfoldLink.onclick = function(e) {
    e.preventDefault();
    const value = pre.getAttribute('data-folded')

    if (value === 'true' || value === true) {
      highlighter.unfoldAll();
      pre.setAttribute('data-folded', false)
      return
    }

    highlighter.fold();
    pre.setAttribute('data-folded', true)
  }

  pre.setAttribute('data-folded', options.addons.alwaysFold)

  const searchLink = document.createElement("a");
  searchLink.className = "json_viewer icon search";
  searchLink.href = "#";
  searchLink.title = "Search in JSON";
  searchLink.innerHTML = svgSearch;
  searchLink.onclick = function(e) {
    e.preventDefault();
    highlighter.openSearchDialog(highlighter.editor);
  }
  
  extras.appendChild(optionsLink);
  extras.appendChild(rawLink);
  extras.appendChild(unfoldLink);
  extras.appendChild(searchLink);

  document.body.appendChild(extras);
}

module.exports = renderExtras;
