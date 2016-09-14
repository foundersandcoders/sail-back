import React from 'react'
import { reduxForm } from 'redux-form'
import { propOr } from 'ramda'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'
import ConfirmGiftAid from '../../../shared/components/confirm_deletion.js'
import GiftAidButtons from './gift_aid_buttons.js'
import GiftAidSection from './gift_aid_section.js'

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


const EndMembership = reduxForm(
  { form: 'member'
  , fields: []
})(EndMembershipForm)
