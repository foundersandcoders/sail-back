var React = require('react')

module.exports = React.createClass({
  render: function () {
    return (
      <div {...this.props} className={'table-entry ' + this.props.header}>
        <p className={this.props.header}>
          {this.props.entry}
        </p>
      </div>
    )
  }
})
