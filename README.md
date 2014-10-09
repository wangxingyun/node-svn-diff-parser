SVN Diff Parser

Installation
=====

via npm:

```bash
$ npm install svn-diff-parser # use -g if you want to use diff2html
```

Usage
=====


---

```
git diff [file|dir] > filename.diff
diff2html path/to/filename.diff > filename.html
```

Node
----

```javascript
var diffParser = require("svn-diff-parser");
var diffFiles = diffParser.parse(diffString);
console.log(diffFiles); // here have all info you need.
```