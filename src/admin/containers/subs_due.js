/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const {  merge, prop } = require('ramda')

import sub_due_section from '../components/sub_due_section.js'

import { update_subs_due } from '../redux/modules/subs_due.js'


const SubsDue = (props) =>
  <div> {sub_due_section(props)} </div>

export default connect
    (prop('subs_due')
    , { update_subs_due })
    (SubsDue)
