/* @flow */
import { createAction } from 'redux-actions'
const { objOf, map } = require('ramda')
import { compose } from 'sanctuary'
import { get_body } from 'app/http'

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'

import type { Action, Reducer } from 'redux'

type State = typeof initialState


const initialState = { addresses: [] }

const reducer: Reducer<State, Action>
  = (state = initialState, { type, payload }) => {
    switch (type) {
      case NEWSLETTER_LABELS:
        return compose(objOf('addresses'))(map(addresses))(payload.results)
      case PATH_UPDATE:
        return initialState
      default:
        return state
    }
  }

export default reducer

const addresses = (
  { title
  , first_name
  , last_name
  , initials
  , ...address_lines
  }
) => (
  { addressee: `${title || ''} ${first_name || initials || ''} ${last_name}`
  , ...address_lines
  }
)

const NEWSLETTER_LABELS =
  'NEWSLETTER_LABELS'

export const newsletter_labels =
  createAction(NEWSLETTER_LABELS, () => get_body('/api/newsletter-labels'))
