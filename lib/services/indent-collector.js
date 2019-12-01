'use babel';
/* TODO: maybe somehow colorize or iconize or mark breadcrumbs based on language scope ? */

/* each language scope can has its own filters */
const filters = {
  'source.js': require('./filters/js-ts'),
  'source.ts': require('./filters/js-ts'),
}

const splitRg = /\W/;

const IndentCollector = {
  collect: function collectOnIndentCollector(textEditor, positionPoint) {
    const res = [];
    const doColor = atom.config.get('atom-indent-codecrumbs.colorCrumbs');
    let curPos = positionPoint.row, prevPad, curCol;

    while (curPos > 0) {
      let lineText = textEditor.lineTextForBufferRow(curPos), scopeClasses = '';
      if (!lineText.length) {
        curPos--;
        continue;
      }
      const pad = lineText.length - (lineText = lineText.trimLeft(), lineText.length);
      if (prevPad == null) {
        prevPad = pad;
      } else if (pad < prevPad) {
        curCol = pad || 1;
        let scope = textEditor.scopeDescriptorForBufferPosition([curPos, curCol]);
        if (scope && scope.scopes.length) {
          if (filters[scope.scopes[0]]) {
            let filteredlineText = filters[scope.scopes[0]].call(null, lineText);
            if (filteredlineText.length != lineText) {
              const match = splitRg.exec(filteredlineText);
              if (match) {
                const colStart = lineText.indexOf(filteredlineText.substr(0, match.index));
                if (colStart) {
                  curCol = pad + colStart;
                  scope = textEditor.scopeDescriptorForBufferPosition([curPos, curCol]);
                }
              }
              lineText = filteredlineText;
            }
          }
          if (doColor && scope.scopes[1]) {
            scopeClasses = scope.scopes[1].replace(/\./g,' ');
          }
        }
        res.unshift({
          title: lineText,
          scopeClasses,
          pos: [curPos, curCol]
        });
        prevPad = pad;
      }
      curPos--;
    }
    if (res.length === 0) {
      return [{ title: 'ROOT' }];
    }

    return res;
  }
}
export default IndentCollector;
