/* @flow */
import { createAction } from 'redux-actions'
const { objOf, map } = require('ramda')
import { compose } from 'sanctuary'

import { get_body } from 'app/http'

import type { Action, Reducer } from 'redux'

type State = typeof initialState


const initialState = { addresses: [] }

const reducer: Reducer<State, Action>
  = (state = initialState, { type, payload }) => {
    switch (type) {
      case NEWSLETTER_LABELS:
        return compose(objOf('addresses'))(map(addresses))(payload.results)
      default:
        return state
    }
  }

export default reducer

const addresses = (
  { title
  , first_name
  , last_name
  , ...address_lines
  }
) => (
  { addressee: `${title}. ${first_name} ${last_name}`
  , ...address_lines
  }
)

const NEWSLETTER_LABELS =
  'NEWSLETTER_LABELS'

export const newsletter_labels =
  createAction(NEWSLETTER_LABELS, () => get_body('/api/newsletter-labels'))
