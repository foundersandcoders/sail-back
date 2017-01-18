import React from 'react'
import { connect } from 'react-redux'
import { pick, length, identity, propOr } from 'ramda'

import SearchResults from '../components/search_results.js'

import { list_by_deliverer
       , list_by_gift_aid_status
       , list_by_email_bounced
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

const GiftAidForm = ({ list_by_gift_aid_status }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Gift Aid Status</h2>
    <form className='member-analysis-form' onSubmit={e => {
      e.preventDefault()
      list_by_gift_aid_status(e.target[0].value)
    }}
    >
      <select className='member-analysis-dropdown'>
        <option value='true'>Signed</option>
        <option value='false'>Not Signed</option>
        <option value='null'>Unknown</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>

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

const EmailBouncedForm = ({ list_by_email_bounced }) =>
  <div className='member-analysis-form-container'>
    <h2>Select Email Bounced Status</h2>
    <form className='member-analysis-form' onSubmit={e => {
      e.preventDefault()
      list_by_email_bounced(e.target[0].value)
    }}
    >
      <select className='member-analysis-dropdown'>
        <option value='true'>True</option>
        <option value='false'>False</option>
        <option value='null'>Unknown</option>
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>

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

const DelivererForm = ({ list_by_deliverer, member_analysis: { deliverers } }) =>
  <div className='member-analysis-form-container'>
    <h2>Search for Deliverer</h2>
    <form className='member-analysis-form' onSubmit={e => {
      const deliverer = e.target[0].value === 'No Deliverer' ? 'null' : e.target[0].value
      e.preventDefault()
      list_by_deliverer(deliverer)
    }}
    >
      <select className='member-analysis-dropdown'>
        {deliverers.map((deliverer, i) =>
          <option key={i}>{deliverer}</option>)
        }
      </select>
      <button type='submit'>Search</button>
    </form>
  </div>

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
      <h4>Annual Single - {numbers_report['annual-single']} members</h4>
      <h4>Annual Double - {numbers_report['annual-double']} members</h4>
      <h4>Annual Family - {numbers_report['annual-family']} members</h4>
      <h4>Life Single - {numbers_report['life-single']} members</h4>
      <h4>Life Double - {numbers_report['life-double']} members</h4>
      <h4>Annual Corporate - {numbers_report['annual-corporate']} members</h4>
      <h4>Annual Group - {numbers_report['annual-group']} members</h4>
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


export const GiftAidReport =
  connect(pick([ 'member_analysis' ]), { list_by_gift_aid_status })(GiftAidSection)

export const EmailBouncedReport =
  connect(pick([ 'member_analysis' ]), { list_by_email_bounced })(EmailBouncedSection)

export const DelivererReport =
  connect(pick([ 'member_analysis' ]), { list_by_deliverer })(DelivererSection)

export const OverdueReport =
  connect(pick([ 'member_analysis' ]), null)(Overdue)

export const NumbersReport =
  connect(identity, null)(MemberNumbers)
