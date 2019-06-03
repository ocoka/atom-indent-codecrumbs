'use babel';
const rg = /(const|let|var|interface|class|function|export|default|public|private)[\s=]/g
const rg2 = /\s*[\{\}=]\s*/g
export default function(lineText) {
  return lineText.replace(rg, '').replace(rg2, '').trim();
}
