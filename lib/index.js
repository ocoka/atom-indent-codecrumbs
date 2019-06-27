'use babel';
import { CompositeDisposable, Disposable } from 'atom';
import IndentCodeCrumbs from './indent-codecrumbs';
export default {

  panel: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Add an opener for our view.
      atom.views.addViewProvider(IndentCodeCrumbs),
      // Register command that toggles this view
      atom.commands.add(
        'atom-workspace',
        {
          'indent-codecrumbs:toggle': () => this.toggle()
        }),
      new Disposable(() => {
        atom.workspace.getHeaderPanels().forEach(item => {
          if (item instanceof IndentCodeCrumbs) {
            item.destroy();
          }
        });
      })
    );
  },
  deactivate() {
    this.subscriptions.dispose();
  },
  toggle() {
    if (this.panel) {
      this.panel.getItem().destroy();
      this.panel.destroy();
      this.panel = null;
    } else {
      this.panel = atom.workspace.addHeaderPanel({
        item: new IndentCodeCrumbs(),
        visible: true
      });
    }
  }
};
