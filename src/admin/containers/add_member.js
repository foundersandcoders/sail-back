'use strict'

const React = require('react')
const { connect } = require('react-redux')

const MemberFields = require('../dumb_components/add_member.js')
const { fields } = require('../dumb_components/fields.js')
const { create_member } = require('../redux/modules/member.js')

const buttons = () => (<button type='submit'>Submit</button>)

var NewMember = (
  { create_member
  }
) => (
  <div>
    <div className='new-member-container'>
      <h1>New Member Form</h1>
      <MemberFields
        fields={fields}
        Buttons={buttons}
        onSubmit={create_member}
        mode='edit'
      />
      <a href='#/' className='flex-button'>
        <button className='button-primary'>Home</button>
      </a>
    </div>
  </div>
)

const map_state_to_props = () => ({})
const map_dispatch_to_props = (
  { create_member
  }
)

module.exports = connect(map_state_to_props, map_dispatch_to_props)(NewMember)
