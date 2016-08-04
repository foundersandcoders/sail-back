import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fieldStructure, required } from '../../../admin/form_fields/member.js'
import buttons from '../my_details/buttons.js'


export default (props) => <div>some tab</div>
//   <ViewMember
//     {...props}
//     fields={fieldStructure.membership}
//     Buttons={buttons({...props, cancel_member_click: fn})}
//     mode={props.mode}
//     onSubmit={() => console.log('clicked')}
//     required={required}
//   />
//
// const ViewMember = reduxForm(
//   { form: 'user'
//   , validate
//   , fields: []
//   }
//   )(MemberFields)
//
// // const edit_button = toggle => () => <button type='button' onClick={toggle}>Edit</button>
// const fn = () => { console.log('sdf');}
