'use babel';
/** @jsx etch.dom */
import etch from 'etch';
export default class IndentCodeCrumbsView {
  constructor(props, children) {
    this.props = Object.assign({
      crumbs: []
    }, props);
    etch.initialize(this);
  }

  render() {
    return (
      <indent-codecrumbs>
        <ul className={`indent-codecrumbs ${this.props.fullWidth ? "indent-codecrumbs_full": ""}`}>
        {
          this.props.crumbs.map(_ =>
            <li on={{click: () => this.props.crumbsClick(_)}} title={_.title} className={`indent-codecrumbs__el ${this.props.color ? _.scopeClasses : ""}`}>
              <div className='indent-codecrumbs__crumb-text'>{_.title}</div>
            </li>
          )
        }
        </ul>
      </indent-codecrumbs>
    );
  }

  update(props, children) {
    this.props = Object.assign(this.props, props);
    return etch.update(this);
  }
  async destroy() {
    await etch.destroy(this);
  }
}
