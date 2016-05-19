/* @flow */
const { createAction, handleAction } = require('redux-actions')
const { stopSubmit } = require('redux-form')
const { flip, replace, compose, map, prop, concat, converge, contains
  , mergeAll, unapply, cond, T, identity, is, reject, propOr, chain, keys
  , path, reduce, assoc, join, values, equals, assocPath, over, lens } =
    require('ramda')

const { get_body, post } = require('app/http')
const { format: format_dated, standardise } = require('app/transform_dated')

const { fieldStructure } = require('../../form_fields/member.js')

import type { Action } from 'redux'

const FETCHING_MEMBER =
  'FETCHING_MEMBER'
export const FETCHED_MEMBER =
  'MEMBER_FETCHED'
const DEACTIVATED_MEMBER =
  'DEACTIVATED_MEMBER'
const REACTIVATED_MEMBER =
  'REACTIVATED_MEMBER'
export const UPDATED_MEMBER =
  'UPDATED_MEMBER'
const CREATED_MEMBER =
  'CREATED_MEMBER'

const reducer: (member: Object, action: Action) => Object =
  (member = { }, { type, payload }) => {
    switch (type) {
      case FETCHED_MEMBER:
        return prepare_for_form(payload)
      case DEACTIVATED_MEMBER:
        return (
          { ...member
          , activation_status: { value: 'deactivated' }
          , deletion_date: { value: new Date().toISOString() }
          }
        )
      case REACTIVATED_MEMBER:
        return (
          { ...member
          , activation_status: { value: 'activated' }
          , deletion_date: {}
          , deletion_reason: { value: null }
          }
        )
      case UPDATED_MEMBER:
        return (
          { ...member
          , ...prepare_for_form(payload)
          })
      case CREATED_MEMBER:
        return typeof payload === 'string'
          ? { ...member, id: { value: payload } }
          : member
      default:
        return member
    }
  }

const post_user_url = '/api/members/{ID}'

const get_user_url = '/members/{ID}'

const make_user_url = url => flip(replace('{ID}'))(url)

const null_to_undefined = val => val === null ? undefined : val

const parse_if_needed = cond(
  [ [is(String), JSON.parse]
  , [T, identity]
  ]
)

const pull_across = origin => destination =>
  over(lens(path(origin), assocPath(destination)), identity)

const reshape = compose
  ( pull_across(['membership_type', 'value'])(['membership_type'])
  , pull_across(['membership_type', 'amount'])(['subscription_amount'])
  )

const reshape_if_necessary = (member) =>
  typeof member.membership_type === 'object' ? reshape(member) : member

const prepare_for_form = (member) =>
  ({ ...wrap_values(member)
  , other:
    { subscription_amount: member.subscription_amount
    , payments: member.payments
    }
  })

const wrap_values = map((v) => (v && { value: String(v) }))

const to_member = compose
  ( format_dated
  , reshape_if_necessary
  , map(null_to_undefined)
  , parse_if_needed
  )

const flatten = converge
  ( unapply(mergeAll)
  , map(propOr({}), ['personal', 'address', 'membership', 'edit'])
  )

const has_errors = compose(Boolean, path(['body', 'error']))

const to_errors = (dispatch) => ({ body: { invalidAttributes } }) => {
  const errors = reduce
    ( (errors, key) =>
        assoc(key, invalidAttributes[key][0].message, errors)
      , {}
      , keys(invalidAttributes)
    )
  dispatch(
    stopSubmit(
      'member'
      , { _error: join(' ', values(errors))
        , ...errors
        }
    )
  )
}

const id_value = compose(String, path(['body', 'id']))

const null_empty = map((v) => v == '' ? null : v)

const errors_or = (on_success) => (dispatch) =>
  cond(
    [ [has_errors, to_errors(dispatch)]
    , [T, on_success]
    ]
  )

const errors_or_to_member = errors_or(to_member)

const error_id = errors_or(id_value)

export const fetch_member = createAction
  ( FETCHED_MEMBER
  , compose(map(to_member), get_body, make_user_url(get_user_url))
  )

export const update_member = createAction
  ( UPDATED_MEMBER
  , (member, dispatch) => compose
    ( map(errors_or_to_member(dispatch))
    , compose(post, null_empty, standardise)(member)
    , make_user_url(post_user_url)
    )(member.id)
  )

export const deactivate_member = createAction(DEACTIVATED_MEMBER)

export const reactivate_member = createAction(REACTIVATED_MEMBER)

export const create_member = createAction
  ( CREATED_MEMBER
  , (member, dispatch) =>
    compose(map(error_id(dispatch)), flip(post)('addmember'), standardise)(member)
  )

export default reducer

