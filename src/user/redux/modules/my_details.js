import { createAction } from 'redux-actions'
import { get_body, put_body } from 'app/http'

const CHANGE_TAB =
  'CHANGE_TAB'
const FETCH_USER_DETAILS =
  'FETCH_USER_DETAILS'
const SUBMIT_USER_DETAILS =
  'SUBMIT_USER_DETAILS'
const TOGGLE_EDIT_MODE =
  'TOGGLE_EDIT_MODE'

const initialState =
  { active_tab: 'contact_details'
  , edit_mode: false
  }

// TODO: disable tabs when on editmode

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return { ...state, active_tab: payload }
    case FETCH_USER_DETAILS:
      return { ...state, user_details: payload }
    case SUBMIT_USER_DETAILS:
      return {...state, edit_mode: false }
    case TOGGLE_EDIT_MODE:
      return { ...state, edit_mode: !state.edit_mode }
    default:
      return state
  }
}

const newBody = {
  "payments": [],
  "events_booked": [],
  "membership_type": {
    "description": "Annual Single",
    "value": "annual-single",
    "amount": 1000,
    "createdAt": "2016-08-02T09:45:51.000Z",
    "updatedAt": "2016-08-02T09:45:51.000Z"
  },
  "id": 14030,
  "title": "Mr",
  "initials": "IG",
  "last_name": "Gonzalez",
  "first_name": "Juan",
  "address1": "XYZ",
  "address2": "XYZ",
  "address3": "XYZ",
  "address4": "XYZ",
  "county": "XYZ",
  "postcode": "E2 0SY",
  "deliverer": null,
  "home_phone": null,
  "mobile_phone": null,
  "work_phone": null,
  "primary_email": "ivan@foundersandcoders.com",
  "secondary_email": null,
  "email_bounced": false,
  "date_joined": "2016-08-01T23:00:00.000Z",
  "date_membership_type_changed": null,
  "life_payment_date": null,
  "notes": null,
  "gift_aid_signed": false,
  "date_gift_aid_signed": null,
  "gift_aid_cancelled": false,
  "date_gift_aid_cancelled": null,
  "standing_order": null,
  "activation_status": "activated",
  "news_type": "online",
  "due_date": "2017-01-01T00:00:00.000Z",
  "registered": "unregistered",
  "deletion_date": null,
  "privileges": "member",
  "activation_date": null,
  "createdAt": "2016-08-02T09:45:57.000Z",
  "updatedAt": "2016-08-02T09:45:57.000Z",
  "full_name": "Ivan Gonzalez"
}

export const change_tab =
  createAction(CHANGE_TAB)

export const fetch_user_details =
  createAction(FETCH_USER_DETAILS, () => get_body('/api/account'))

export const submit_user_details =
  createAction(SUBMIT_USER_DETAILS, () => put_body(newBody, '/api/account')) //TODO make api call to update databas

export const toggle_edit_mode =
  createAction(TOGGLE_EDIT_MODE)
