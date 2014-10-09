(function() {
  var DiffFile;

  DiffFile = require('./diff_file');

  module.exports.parse = function(diffStr) {
    var currentFile, files, lines;
    files = [];
    currentFile = null;
    lines = diffStr.split("\n");
    lines.pop();
    lines.forEach(function(line) {
      if (line.match(/^Index/)) {
        currentFile = new DiffFile(line);
        return files.push(currentFile);
      } else {
        if (!currentFile.headerParsed) {
          if (line.match(/^\-\-\-/)) {
            currentFile.setIndex(line);
          }
          if(line.match(/^={67}$/)) {
            return;
          }
          if (line.match(/^\+\+\+/)) {
            return currentFile.finishHeaderParse(line);
          }
        } else {
          if (line.match(/^@@/)) {
            return currentFile.appendLine({
              content: line,
              type: 'chunk'
            });
          } else if (line.match(/^-/)) {
            return currentFile.appendLine({
              content: line,
              type: 'deletion'
            });
          } else if (line.match(/^\+/)) {
            return currentFile.appendLine({
              content: line,
              type: 'addition'
            });
          } else {
            return currentFile.appendLine({
              content: line,
              type: 'normal'
            });
          }
        }
      }
    });
    return files;
  };

}).call(this);
