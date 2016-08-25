import React from 'react'
import { reduxForm } from 'redux-form'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'
// import GiftAidButton from './cancel_gift_aid_button.js'

const GiftAidButton = require('../../../shared/components/payments_table/deletion_entry.js')

export default (props) =>
  <div>
    <EditDetails {...props} />
    <div className='end-membership'>
      {props.my_details.activation_status && props.my_details.activation_status.initial_value !== 'deactivated'
        ? <EndMembershipLoader {...props} />
        : <p>Please contact us if you would like to reinstate your membership.</p>
      }
    </div>
    {props.my_details.gift_aid_signed && <GiftAidButton update_member_user={props.update_member_user} />}
  </div>


const EndMembershipLoader = (props) =>
  <EndMembership
    {...props}
    fields={['activation_status', 'notes', 'user_notes', 'deletion_date']}
  />

const EndMembership = reduxForm(
  { form: 'member'
  , fields: []
})(EndMembershipForm)
