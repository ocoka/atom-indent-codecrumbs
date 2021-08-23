'use babel';
import common from './common';
const rg = /(virtual|async|const|let|var|interface|class|function|export|public|private)\s/g
const rg2 = /([\w<>]+)\s+([\w<>]+).*/g;
export default function(lineText) {
  return common(lineText.replace(rg, '')).replace(rg2,'$2->$1');
}
