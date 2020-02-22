'use babel';
import { CompositeDisposable, Disposable } from 'atom';
import IndentCodeCrumbs from './indent-codecrumbs';
export default {

  config: {
    colorCrumbs: {
      title: "Colorize crumbs based on grammar",
      type: "boolean",
      default: true
    },
    crumbsPosition: {
      title: "Crumbs panel positioning",
      type: "string",
      default: "top",
      enum: [
        {value: 'top', description: 'Place at top'},
        {value: 'bar', description: 'Place at bottom'}
      ]
    },
    fullWidth: {
      title: "Crumbs will take as much width as possible",
      type: "boolean",
      default: false
    }
  },

  state: null,

  panel: null,

  destroyExistPanel() {
    ['getFooterPanels', 'getHeaderPanels'].forEach(method=>{
      atom.workspace[method]().forEach(panel => {
        if (panel.getItem() instanceof IndentCodeCrumbs) {
          panel.getItem().destroy();
          panel.destroy();
        }
      });
    });
  },
  resetState() {
    this.state = {
      active: false
    };
  },
  activate(state) {
    this.subscriptions = new CompositeDisposable(
      // Register command that toggles this view
      atom.commands.add(
        'atom-workspace',
        {
          'indent-codecrumbs:toggle': () => this.toggle()
        }),
      new Disposable(this.destroyExistPanel.bind(this)),
      atom.config.onDidChange('atom-indent-codecrumbs.crumbsPosition', () => {
        this.switchPanel();
      })
    );
    if (state) {
      try {
        this.state = JSON.parse(state);
      }
      catch(e) {
        this.resetState();
      }
    } else {
      this.resetState();
    }
    if (this.state.active) {
      this.openPanel();
    }
  },
  deactivate() {
    this.subscriptions.dispose();
  },

  serialize(){
    return JSON.stringify(this.state);
  },
  openPanel() {
    this.state.active = true;
    this.panel = atom.workspace[atom.config.get('atom-indent-codecrumbs.crumbsPosition') === 'top' ? 'addHeaderPanel' : 'addFooterPanel']({
      item: new IndentCodeCrumbs(),
      visible: true
    });
  },
  switchPanel() {
    this.destroyExistPanel();
    this.openPanel();
  },
  toggle() {
    if (this.panel) {
      this.state.active = false;
      this.panel.getItem().destroy();
      this.panel.destroy();
      this.panel = null;
    } else {
      this.openPanel();
    }
  }
};
