import React from 'react'
import { connect } from 'react-redux'
import { pick, length, propOr } from 'ramda'

import SearchResults from '../components/search_results.js'
import GiftAidForm from '../components/gift_aid_form.js'
import EmailBouncedForm from '../components/email_bounced_form.js'
import DelivererForm from '../components/deliverer_form.js'
import MembershipForm from '../components/membership_form.js'

import { list_by_deliverer
       , list_by_gift_aid_status
       , list_by_email_bounced
       , list_by_membership
       }
from '../redux/modules/member_analysis.js'

const GiftAidSection = (props) => {
  const { member_analysis: { members_by_gift_aid_status, no_matches } } = props
  const fields = [ 'id', 'name', 'postcode']
  return (
    <div>
      {GiftAidForm(props)}
      <SearchResults fields={fields} results={members_by_gift_aid_status} error={no_matches}/>
    </div>
  )
}

const EmailBouncedSection = (props) => {
  const { member_analysis: { members_by_email_bounced, no_matches } } = props
  const fields = [ 'id', 'name', 'primary_email' ]
  return (
    <div className='email-bounced-section'>
      {EmailBouncedForm(props)}
      <h2 className='email-bounced-report-header'>Number of members: {length(members_by_email_bounced)}</h2>
      <h2 className='email-bounced-report-header'>Report produced on {(new Date()).toDateString()}</h2>
      <SearchResults fields={fields} results={members_by_email_bounced} error={no_matches}/>
    </div>
  )
}

const DelivererSection = (props) => {
  const { member_analysis: { members_by_deliverer, no_matches } } = props
  const fields = [ 'id', 'name', 'postcode']
  return (
    <div>
      {DelivererForm(props)}
      <SearchResults fields={fields} results={members_by_deliverer} error={no_matches}/>
    </div>
  )
}

const Overdue = (props) => {
  const { member_analysis: { members_120_overdue, no_matches } } = props
  const fields = [ 'id', 'name', 'membership_type', 'due_date', 'last_payment' ]
  return (
    <div>
      <SearchResults fields={fields} results={members_120_overdue} error={no_matches} />
    </div>
  )
}

const MemberNumbers = ({ member_analysis }) => {
  const numbers_report = propOr({}, 'numbers_report', member_analysis)
  return (
    <div className='numbers-report-section'>
      <h2>Report produced on {(new Date()).toDateString()}</h2>
      <br></br>
      <h3>The total number of active members is <b>{numbers_report.activated}</b></h3>
      <br></br>
      <h3>The breakdown is as follows:</h3>
      <br></br>
      <h4>Annual Single - {numbers_report['annual-single']}</h4>
      <h4>Annual Double - {numbers_report['annual-double']}</h4>
      <h4>Annual Family - {numbers_report['annual-family']}</h4>
      <h4>Life Single - {numbers_report['life-single']}</h4>
      <h4>Life Double - {numbers_report['life-double']}</h4>
      <h4>Annual Corporate - {numbers_report['annual-corporate']}</h4>
      <h4>Annual Group - {numbers_report['annual-group']}</h4>
      <h4>Accounts - {numbers_report.accounts}</h4>
      <br></br>
      <h4>Registered - {numbers_report.registered}</h4>
      <h4>Unregistered - {numbers_report.unregistered}</h4>
      <br></br>
      <h4>Gift Aid signed - {numbers_report.gift_aid}</h4>
      <h4>Gift Aid not signed - {numbers_report.no_gift_aid}</h4>
      <br></br>
      <h4>Newsletter delivered by post - {numbers_report.post}</h4>
      <h4>Newsletter read online - {numbers_report.online}</h4>
      <br></br>
      <h4>Members with email address - {numbers_report.email}</h4>
      <h4>Members without email address - {numbers_report.no_email}</h4>
    </div>
  )
}

const MembershipSection = (props) => {
  const { member_analysis: { members_by_membership, no_matches } } = props
  const fields = [ 'id', 'name', 'primary_email', 'date_joined' ]
  return (
    <div>
      {MembershipForm(props)}
      <SearchResults fields={fields} results={members_by_membership} error={no_matches}/>
    </div>
  )
}

export const GiftAidReport =
  connect(pick([ 'member_analysis' ]), { list_by_gift_aid_status })(GiftAidSection)

export const EmailBouncedReport =
  connect(pick([ 'member_analysis' ]), { list_by_email_bounced })(EmailBouncedSection)

export const DelivererReport =
  connect(pick([ 'member_analysis' ]), { list_by_deliverer })(DelivererSection)

export const OverdueReport =
  connect(pick([ 'member_analysis' ]), null)(Overdue)

export const NumbersReport =
  connect(pick([ 'member_analysis' ]), null)(MemberNumbers)

export const MembershipReport =
  connect(pick(['member_analysis' ]), { list_by_membership })(MembershipSection)
