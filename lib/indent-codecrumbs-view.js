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
        <ul class='codecrumbs'>
        {
          this.props.crumbs.map(_ =>
            <li className={`indent-codecrumbs__el ${this.props.color ? _.scopeClasses : ""}`}>
              {_.title}
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