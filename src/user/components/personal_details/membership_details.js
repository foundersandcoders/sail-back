import React from 'react'
import { reduxForm } from 'redux-form'
import { propOr } from 'ramda'

import EndMembershipForm from './end_membership_form.js'
import EditDetails from './edit_details.js'
import ConfirmDeletion from '../../../shared/components/confirm_deletion.js'
import GiftAidButtons from './gift_aid_buttons.js'
import GiftAidSection from './gift_aid_section.js'
import StandingOrderButtons from './standing_order_buttons.js'

export default (props) =>
  <div>
    <EditDetails {...props} />
    {propOr('false', 'value')(props.personal_details.standing_order) === 'true'
      && <ConfirmDeletion delete={props.cancel_standing_order} buttons={StandingOrderButtons} text='Cancel Standing Order' />
    }
    {propOr('false', 'value')(props.personal_details.gift_aid_signed) === 'true'
      ? <ConfirmDeletion delete={props.toggle_gift_aid.bind(null, false)} buttons={GiftAidButtons} text='Revoke Gift Aid'/>
      : <GiftAidSection toggle_gift_aid={props.toggle_gift_aid.bind(null, true)}/>
    }
    <div className='end-membership'>
      {props.personal_details.activation_status && props.personal_details.activation_status.initial_value !== 'deactivated'
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
