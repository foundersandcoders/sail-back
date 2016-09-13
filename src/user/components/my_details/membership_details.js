import React from 'react'
import { reduxForm } from 'redux-form'
import { propOr } from 'ramda'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'
import ConfirmGiftAid from '../../../shared/components/confirm_deletion.js'
import GiftAidButtons from './gift_aid_buttons.js'

export default (props) =>
  <div>
    <EditDetails {...props} />
    {propOr('false', 'value')(props.my_details.gift_aid_signed) === 'true'
      ? <ConfirmGiftAid delete={props.toggle_gift_aid.bind(null, false)} buttons={GiftAidButtons} text='Revoke Gift Aid'/>
      : <GiftAidSection toggle_gift_aid={props.toggle_gift_aid.bind(null, true)}/>
    }
    <div className='end-membership'>
      {props.my_details.activation_status && props.my_details.activation_status.initial_value !== 'deactivated'
        ? <EndMembershipLoader {...props} />
        : <p>Please contact us if you would like to reinstate your membership.</p>
      }
    </div>
  </div>

const EndMembershipLoader = (props) =>
  <EndMembership
    {...props}
    fields={['activation_status', 'notes', 'user_notes', 'deletion_date']}
  />

const GiftAidSection = ({toggle_gift_aid}) => {
  const handleSubmit = e => {
    e.preventDefault()
    toggle_gift_aid()
  }
  return (
    <div>
      <p><b>You have not made a Gift Aid Declaration</b></p>
      <p>
        <i>
          You can boost the value of your subscription/donation to the Friends by 25p of
          Gift Aid for every £1 subscribed/donated. Gift Aid is reclaimed by the Friends
          from the tax you pay for the current tax year. If you wish to Gift Aid your
          subscription/donations to the Friends for this year, future years and the past
          4 years please tick the box below.
        </i>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='checkbox' required/>
          <p>
            I wish to make a Gift Aid Declaration to the Friends. I am a UK taxpayer and
            understand that if I pay less Income Tax and/or Capital Gains Tax than the
            amount of Gift Aid claimed on all my donations in that tax year it is my
            responsibility to pay any difference.
          </p>
        </div>
        <button type='submit'>Confirm Gift Aid</button>
      </form>
    </div>
  )
}

const EndMembership = reduxForm(
  { form: 'member'
  , fields: []
})(EndMembershipForm)
