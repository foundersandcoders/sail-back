var React = require('react')
var Row = require('./row')

module.exports = function (onClick){
  return React.createClass({
    render: function () {
     return (
       <div
         onClick = { onClick(this.props.row_num) }
         className = { this.props.selected === this.props.row_num ? 'chosen': '' }
       >
         <Row {...this.props} />
       </div>) } })};
