'use strict'

var React = require('react')
var request = require('xhr')
var { PersonalFields, AddressFields, MembershipFields} =
    require('../components/member_fields/specific.js')
var Navigation = require('../../shared/navigation.js')
var Spinner = require('../../shared/spinner.js')

var member_schema = require('../../models/members.js')
var manage_member = require('../hocs/manage_member.js')
var map = require('app/map.js')
var { standardise } = require('app/transform_dated')

var NewMember = React.createClass({
  displayName: 'AddMember',
  getInitialState: function () { return {} },

  submit_handler: function (e) {
    e.preventDefault()
    // not checked server side
    if (!this.props.member.date_joined) {
      return this.setState({ date_joined_error: true })
    }
    this.setState({ submitting: true })

    request({
      method: 'POST',
      uri: '/addmember',
      json: standardise(this.props.member),
    }, (err, res, body) => {
      this.setState({ submitting: false, submitted: true, member_id: body.id })
    })
  },

  blur_handler: function (e) {
    this.props.verify_member(
      e
      , () => {
        if (!this.props.member.date_joined) {
          this.props.validation_error('date_joined')
        } else {
          this.setState({ date_joined_error: false })
        }
      }
    )
  },

  render: function () {
    return (
  <div>
  <div className='new-member-container'>
    <h1>New Member Form</h1>
      <form onSubmit={this.submit_handler}>
        { [PersonalFields, AddressFields, MembershipFields].map((Fields, i) =>
          <Fields
              key={i}
              mode='edit'
              member={this.props.member}
              blur_handler={this.blur_handler}
              skips={['activation_status']}
              errors={this.props.errors}
              onChange={this.props.change_handler} /> ) }
        <input type='submit' value='Submit 'id='save-button' />
        { this.state.submitting
          ? <Spinner />
        : this.state.date_joined_error
          ? <div id="spinner">Check 'Date Joined'</div>
        : this.state.submitted
            ? <div id='member-num'>
              Member ID is: { this.state.member_id }
            </div>
            : '' }
      </form>
      <a href='#/' className='flex-button'>
        <button className='button-primary'>Home</button>
      </a>
    </div>
  </div>
    )
  }
})

module.exports = manage_member(NewMember, {
  deliverer: 'Post',
  membership_type: 'annual-single' }, () => {})
