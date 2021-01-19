(function() {
  var DiffFile;

  module.exports = DiffFile = (function() {
    function DiffFile(firstLine) {
      this.name = firstLine.split(' ')[1];
      this.lines = [];
    }

    DiffFile.prototype.setIndex = function(indexLine) {
      var match;
      match = indexLine.split(/\s/g)[2].replace(')', '');
      return this.from = match;
    };

    DiffFile.prototype.finishHeaderParse = function(line) {
      var match;
      match = line.split(/\s/g)[2].replace(')', '');
      this.to = match;
      return this.headerParsed = true;
    };

    DiffFile.prototype.appendLine = function(line) {
      var match;
      this.lines.push(line);
      if (line.type === 'chunk') {
        match = line.content.match(/^@@\s+\-([^\s]+)\s+\+([^\s]+)/);
        this.deletionLineNum = match[1].split(',')[0];
        return this.additionLineNum = match[2].split(',')[0];
      } else if (line.type === 'normal') {
        line.deletionLineNum = this.deletionLineNum++;
        return line.additionLineNum = this.additionLineNum++;
      } else if (line.type === 'deletion') {
        return line.deletionLineNum = this.deletionLineNum++;
      } else if (line.type === 'addition') {
        return line.additionLineNum = this.additionLineNum++;
      }
    };

    return DiffFile;

  })();

}).call(this);
