const { createAction, handleAction } = require('redux-actions')
const { __, replace, compose, map, prop, concat, converge, mergeAll, apply } =
  require('ramda')

const { get, post } = require('app/http')
const { format: format_dated } = require('app/transform_dated')

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

const reducer = (member = { }, action) => {
  switch (action.type) {
    case FETCHED_MEMBER:
      return { ...TEMP_FUNC_OBJECTIZE(action.payload) }
    case DEACTIVATED_MEMBER:
      return (
        { ...member
        , deactivation_reason: action.payload
        , deletion_date: new Date().toISOString()
        , activation_status: 'deactivated'
        })
    case REACTIVATED_MEMBER:
      return (
        { ...member
        , deactivation_reason: undefined
        , activation_status: 'activated'
        })
    case UPDATED_MEMBER:
      return (
        { ...member
        , ...action.payload
        })
    default:
      return member
  }
}

const TEMP_FUNC_OBJECTIZE = (member) => (
  Object.keys(member).reduce((obj, key) =>
    ({...obj, [key]: { value: '' + member[key] } })
  , {})
)

const user_url = 'api/members/{ID}'

const make_user_url = replace('{ID}', __, user_url)

const make_user_request_url = compose
  ( concat(__, '?populate=[payments,membership_type]')
  , make_user_url
  )

const null_to_undefined = val => val === null ? undefined : val

const reshape = ({ membership_type: { value, amount } = {}, ...member }) =>
  ({...member, membership_type: value, subscription_amount: amount })

const to_member = compose
  ( format_dated
  , reshape
  , map(null_to_undefined)
  , JSON.parse
  , prop('body')
  )

const flatten = converge
  ( apply(mergeAll)
  , [prop('personal'), prop('address'), prop('membership')]
  )

const fetch_member = createAction
  ( FETCHED_MEMBER
  , compose(map(to_member), get, make_user_request_url)
  )

const update_member = createAction(
  UPDATED_MEMBER
  , (member) => compose
    ( map(prop('body'))
    , post(flatten(member))
    , make_user_url
    )(member.personal.id)
)
const deactivate_member = createAction(DEACTIVATED_MEMBER)

const reactivate_member = createAction(REACTIVATED_MEMBER)

module.exports = reducer

Object.assign(
  module.exports,
  { fetch_member
  , deactivate_member
  , reactivate_member
  , update_member
  , UPDATED_MEMBER
  }
)
