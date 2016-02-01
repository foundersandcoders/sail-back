const { createAction, handleAction } = require('redux-actions')
const { stopSubmit } = require('redux-form')
const { __, replace, compose, map, prop, concat, converge, contains, mergeAll,
  unapply, cond, T, identity, is, filter, propOr, chain, keys, path, reduce
  , assoc } =
    require('ramda')

const { get, post } = require('app/http')
const { format: format_dated, standardise } = require('app/transform_dated')

const { fieldStructure } = require('../../form_fields/member.js')

const FETCHING_MEMBER =
  'FETCHING_MEMBER'
const FETCHED_MEMBER =
  'MEMBER_FETCHED'
const DEACTIVATED_MEMBER =
  'DEACTIVATED_MEMBER'
const REACTIVATED_MEMBER =
  'REACTIVATED_MEMBER'
const UPDATED_MEMBER =
  'UPDATED_MEMBER'
const CREATED_MEMBER =
  'CREATED_MEMBER'

const reducer =
  (member = { }, { type, payload }) => {
    switch (type) {
      case FETCHED_MEMBER:
        return { ...payload }
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
          , ...payload
          })
      case CREATED_MEMBER:
        return { id: { value: compose(String, path(['body', 'id']))(payload) } }
      default:
        return member
    }
  }

const user_url = 'api/members/{ID}'

const make_user_url = replace('{ID}', __, user_url)

const make_user_request_url = compose
  ( concat(__, '?populate=[payments,membership_type]')
  , make_user_url
  )

const null_to_undefined = val => val === null ? undefined : val

const parse_if_needed = cond(
  [ [is(String), JSON.parse]
  , [T, identity]
  ]
)

const reshape = ({ membership_type: { value, amount } = {}, ...member }) =>
  ({...member, membership_type: value, subscription_amount: amount })

const prepare_for_form = (member) =>
  ({ ...wrap_values(member)
  , other:
    { subscription_amount: member.subscription_amount
    , payments: member.payments
    }
  })

const wrap_values = map((v) => (v && { value: String(v) }))

const to_member = compose
  ( prepare_for_form
  , format_dated
  , reshape
  , map(null_to_undefined)
  , parse_if_needed
  , prop('body')
  )

const flatten = converge
  ( unapply(mergeAll)
  , map(propOr({}), ['personal', 'address', 'membership', 'edit'])
  )

const has_errors = path(['body', 'error'])

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
      , { _error: 'Save failed'
        , ...errors
        }
    )
  )
}

const errors_or_to_member = (dispatch) =>
  cond(
    [ [has_errors, to_errors(dispatch)]
    , [T, to_member]
    ]
  )

const fetch_member = createAction
  ( FETCHED_MEMBER
  , compose(map(to_member), get, make_user_request_url)
  )

const update_member = createAction
  ( UPDATED_MEMBER
  , (member, dispatch) => compose
    ( map(errors_or_to_member(dispatch))
    , compose(post, standardise)(member)
    , make_user_url
    )(member.id)
  )

const deactivate_member = createAction(DEACTIVATED_MEMBER)

const reactivate_member = createAction(REACTIVATED_MEMBER)

const create_member = createAction
  ( CREATED_MEMBER
  , compose(post(__, 'addmember'), standardise)
  )

module.exports = reducer

Object.assign
  ( module.exports
  , { fetch_member
    , deactivate_member
    , reactivate_member
    , update_member
    , create_member
    , FETCHED_MEMBER
    , UPDATED_MEMBER
    }
  )

