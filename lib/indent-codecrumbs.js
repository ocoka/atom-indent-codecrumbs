'use babel';

import { CompositeDisposable, Disposable } from 'atom';
import IndentCodeCrumbsView from './indent-codecrumbs-view';
import IndentCollector from './services/indent-collector';

let prevEditorSubscription;
let updateClb;
export default class IndentCodeCrumbs {
  constructor(serializedState) {
    this.view = new IndentCodeCrumbsView({
      crumbs: [],
      color: atom.config.get('atom-indent-codecrumbs.colorCrumbs')
    });
    this.subscriptions = new CompositeDisposable(
      atom.workspace.observeActiveTextEditor(this.onTextEditor.bind(this)),
      atom.config.onDidChange('atom-indent-codecrumbs.colorCrumbs', ({oldValue, newValue}) => {
        this.view.update({
          color: newValue
        })
      })
    );
  }
  onTextEditor(textEditor) {
    /* editor switched or all closed, clear previous subscriptions */
    if (prevEditorSubscription) {
      prevEditorSubscription.dispose();
    }
    if (updateClb) {
      clearTimeout(updateClb);
    }

    /* all editors closed */
    if (!textEditor) return;

    /* subscribe to cursor movement of new editor, to recalculate crumbs */
    textEditor.onDidChangeCursorPosition((data) => {
      if (updateClb) {
        clearTimeout(updateClb);
      }
      updateClb = setTimeout(() => {
        this.updateCrumbsFromEditor(textEditor, data.newBufferPosition);
        /* delay for fast movement */
      }, 500);
    });
    this.updateCrumbsFromEditor(textEditor, textEditor.getCursorBufferPosition());
  }
  updateCrumbsFromEditor(textEditor, pos) {
    this.view.update({
      crumbs: IndentCollector.collect(textEditor, pos)
    });
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://indent-codecrumbs';
  }

  getElement() {
    return this.view.element;
  }

  // Optional: Destroy the component. Async/await syntax is pretty but optional.
  async destroy() {
    this.subscription.dispose();
    // call etch.destroy to remove the element and destroy child components
    await this.view.destroy();
    // then perform custom teardown logic here...
  }
}
