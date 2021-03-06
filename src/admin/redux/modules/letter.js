/* @flow */
import { FETCHED_MEMBER } from '../../../shared/redux/modules/member.js'
import { mergeAll, converge, unapply, compose, objOf, prop } from 'ramda'

import type { Action, Reducer } from 'redux'

type State = {}

const reducer: Reducer<State, Action> =
  (state = { id: 0, address: [], name: '' }, { type, payload }) => {
    switch (type) {
      case FETCHED_MEMBER:
        return converge
          ( unapply(mergeAll)
          , [ compose(objOf('name'), getName)
            , compose(objOf('address'), getAddress)
            , compose(objOf('id'), prop('id'))
            ]
          )(payload)
      default:
        return state
    }
  }

const getName = ({ title, full_name }) => title + ' ' + full_name

const getAddress = (
  { title
  , first_name = ''
  , last_name = ''
  , address1
  , address2
  , address3
  , address4
  , county
  , postcode
  }
) =>
  [ `${title} ${(first_name && first_name[0]) || ''} ${last_name}`
  , address1
  , address2
  , address3
  , address4
  , county
  , postcode ]

export default reducer
