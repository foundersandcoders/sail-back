import { createAction } from 'redux-actions'
import { get_body, put_body } from 'app/http'
import { lensProp, over, toString } from 'ramda'

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
      const idLens = lensProp('id')
      const shapedPayload = over(idLens, toString, payload)
      return { ...state, user_details: shapedPayload }
    case SUBMIT_USER_DETAILS:
      return {...state, edit_mode: false }
    case TOGGLE_EDIT_MODE:
      return { ...state, edit_mode: !state.edit_mode }
    default:
      return state
  }
}


const newBody = {
  "payments": [
    {
      "member": 12345,
      "category": "subscription",
      "type": null,
      "description": null,
      "amount": 17500,
      "reference": null,
      "notes": ":)",
      "date": "2013-01-01T00:00:00.000Z",
      "id": 9,
      "createdAt": "2016-08-02T10:18:20.000Z",
      "updatedAt": "2016-08-02T10:18:20.000Z"
    }
  ],
  "events_booked": [],
  "membership_type": {
    "description": "Annual Single",
    "value": "annual-single",
    "amount": 1000,
    "createdAt": "2016-08-02T10:18:20.000Z",
    "updatedAt": "2016-08-02T10:18:20.000Z"
  },
  "id": 12345,
  "title": "Mr",
  "initials": "JM",
  "first_name": "Jo",
  "address1": "XYZ",
  "address2": "XYZ",
  "address3": "XYZ",
  "address4": "XYZ",
  "county": "XYZ",
  "postcode": "E1 0SY",
  "home_phone": null,
  "mobile_phone": null,
  "work_phone": null,
  "primary_email": "jmurphy.web@gmail.com",
  "secondary_email": null,
  "notes": null,
  "gift_aid_signed": false,
  "date_gift_aid_signed": null,
  "gift_aid_cancelled": false,
  "date_gift_aid_cancelled": null,
  "standing_order": null,
  "activation_status": "activated",
  "news_type": "online",
  "due_date": "2017-01-01T00:00:00.000Z",
  "deletion_date": null,
}


export const change_tab =
  createAction(CHANGE_TAB)

export const fetch_user_details =
  createAction(FETCH_USER_DETAILS, () => get_body('/api/account'))

export const submit_user_details =
  createAction(SUBMIT_USER_DETAILS, () => put_body(newBody, '/api/account')) //TODO make api call to update databas

export const toggle_edit_mode =
  createAction(TOGGLE_EDIT_MODE)
