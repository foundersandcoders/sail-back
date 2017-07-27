/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const {  merge } = require('ramda')

import sub_due_section from '../components/sub_due_section.js'

import
  { sub_due_tab
  , SEND_SUB_REMINDER
  } from '../redux/modules/email/reducer.js'

const Email = (props) => <div>Hello</div>
//{sub_due_section(props)}

const without_default = cb => e => {
  e.preventDefault()
  cb(e)
}

export default connect(null , { sub_due_tab })(Email)
