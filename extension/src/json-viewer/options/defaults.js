module.exports = {
  theme: "default",
  addons: {
    prependHeader: true,
    maxJsonSize: 400,
    alwaysFold: false,
    foldLevel: 2,
    foldSkipArrays: false,
    alwaysRenderAllContent: false,
    sortKeys: false,
    sortOrder: "",
    clickableUrls: true,
    wrapLinkWithAnchorTag: false,
    openLinksInNewWindow: true,
    autoHighlight: true,
    persistentSearch: false,
  },
  structure: {
    readOnly: true,
    lineNumbers: true,
    firstLineNumber: 1,
    lineWrapping: true,
    foldGutter: true,
    tabSize: 2,
    indentCStyle: false,
    showArraySize: false
  },
  overrides: [
    {
      urlPattern: "github\\.com",
      addons: {
        sortOrder: "id,name,full_name,description,html_url",
        foldLevel: 3,
        maxJsonSize: 800
      }
    }
  ],
  style: [
    ".CodeMirror {",
    "  font-family: monaco, Consolas, Menlo, Courier, monospace;",
    "  font-size: 16px;",
    "  line-height: 1.5em;",
    "}"
  ].join('\n')
}
