var FoldingWidget = {
  createFoldingWidget: function(from, to, editor, options) {
    var tokenInfo = this.getTokenInfo(from, editor);
    var shouldShowSize = this.shouldShowSizeInFoldingMarkers(tokenInfo.isArray, options);
    
    if (!shouldShowSize) {
      return '\u2194';
    }

    var count = this.getFoldingItemCount(from, to, tokenInfo, editor);
    return count ? `\u21A4 ${count} \u21A6` : '\u2194';
  },

  getTokenInfo: function(from, editor) {
    var prevLine = editor.getLine(from.line);
    var isArray = prevLine.lastIndexOf('[') > prevLine.lastIndexOf('{');
    
    return {
      isArray: isArray,
      startToken: isArray ? '[' : '{',
      endToken: isArray ? ']' : '}'
    };
  },

  shouldShowSizeInFoldingMarkers: function(isArray, options) {
    if (isArray && options.structure.showArraySizeFoldingMarkers) {
      return true;
    }
    if (!isArray && options.structure.showObjectSizeFoldingMarkers) {
      return true;
    }
    return false;
  },

  getFoldingItemCount: function(from, to, tokenInfo, editor) {
    var internal = editor.getRange(from, to);
    var cleanedInternal = this.cleanInternalContent(internal);
    var toParse = tokenInfo.startToken + cleanedInternal + tokenInfo.endToken;
    
    try {
      var parsed = JSON.parse(toParse);
      return Object.keys(parsed).length;
    } catch(e) {
      return undefined;
    }
  },

  cleanInternalContent: function(internal) {
    // Clean the content by removing Array[n] annotations that were added by jsl-format
    return internal.replace(/Array\[\d+\]\[/g, '[');
  }
};

module.exports = FoldingWidget;
