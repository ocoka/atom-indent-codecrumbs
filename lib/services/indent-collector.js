'use babel';

/* TODO: maybe somehow colorize or iconize or mark breadcrumbs based on language scope ? */

/* each language scope can has its own filters */
const filters = {
  'source.js': require('./filters/js'),
}

const IndentCollector = {
  collect: function collectOnIndentCollector(textEditor, positionPoint) {
    const res = [];
    const doColor = atom.config.get('atom-indent-codecrumbs.colorCrumbs');
    let curPos = positionPoint.row;

    if (curPos === 0) {
      return [{ title: 'ROOT' }];
    }
    let prevPad;

    while (curPos > 0) {
      let lineText = textEditor.lineTextForBufferRow(curPos), scopeClasses = '';
      const pad = lineText.length - (lineText = lineText.trimLeft(), lineText.length);
      if (prevPad == null) {
        prevPad = pad;
      } else if (pad < prevPad) {
        const scope = textEditor.scopeDescriptorForBufferPosition([curPos, pad]);
        if (scope && scope.scopes.length) {
          if (filters[scope.scopes[0]]) {
            lineText = filters[scope.scopes[0]].call(null, lineText);
          }
          if (doColor && scope.scopes[1]) {
            scopeClasses = scope.scopes[1].replace(/\./g,' ');
          }
        }
        if (lineText.length) {
          res.unshift({
            title: lineText,
            scopeClasses
          })
          prevPad = pad;
        }
      }
      curPos--;
    }

    return res;
  }
}
export default IndentCollector;
