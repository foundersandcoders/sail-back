const { assoc, reduce, converge, unapply, mergeAll } = require('ramda')
const validate_email = require('email-validator').validate
const valid_email = (field) => (values) =>
  !values[field] || validate_email(values[field])
const { exists, selected, check_tests, date } = require('app/validate')
const to_title = require('app/to_title_case')

const fieldStructure =
  { personal:
    [ 'id'
    , 'title'
    , 'initials'
    , 'first_name'
    , 'last_name'
    , 'primary_email'
    , 'secondary_email'
    ]
  , address:
    [ 'address1'
    , 'address2'
    , 'address3'
    , 'address4'
    , 'county'
    , 'postcode'
    , 'deliverer'
    , 'home_phone'
    , 'mobile_phone'
    ]
  , membership:
    [ 'date_joined'
    , 'membership_type'
    , 'life_payment_date'
    , 'date_membership_type_changed'
    , 'gift_aid_signed'
    , 'date_gift_aid_signed'
    , 'date_gift_aid_cancelled'
    , 'standing_order'
    , 'notes'
    , 'registered'
    , 'due_date'
    , 'news_type'
    , 'email_bounced'
    , 'activation_status'
    ]
  , edit:
    [ 'deletion_reason'
    ]
  }

const addMemberfieldStructure =
  { firstColumn:
    [ 'title'
    , 'initials'
    , 'first_name'
    , 'last_name'
    , 'primary_email'
    , 'secondary_email'
    , 'home_phone'
    , 'mobile_phone'
    , 'deliverer'
    ]
  , secondColumn:
    [ 'address1'
    , 'address2'
    , 'address3'
    , 'address4'
    , 'county'
    , 'postcode'
    , 'membership_type'
    , 'date_membership_type_changed'
    , 'date_joined'
    ]
  , thirdColumn:
    [ 'gift_aid_signed'
    , 'date_gift_aid_signed'
    , 'standing_order'
    , 'notes'
    , 'registered'
    , 'due_date'
    , 'news_type'
    , 'email_bounced'
    ]
  }
const user_field_structure =
  { contact:
    [ 'id'
    , 'title'
    , 'initials'
    , 'first_name'
    , 'last_name'
    , 'primary_email'
    , 'secondary_email'
    , 'address1'
    , 'address2'
    , 'address3'
    , 'address4'
    , 'county'
    , 'postcode'
    , 'home_phone'
    , 'mobile_phone'
    ]
    , membership:
    [ 'id'
    , 'membership_type'
    , 'due_date'
    , 'date_gift_aid_signed'
    , 'date_gift_aid_cancelled'
    ]
  }

const sign_up_fields =
  [ 'title'
  , 'first_name'
  , 'last_name'
  , 'initials'
  , 'address1'
  , 'address2'
  , 'address3'
  , 'address4'
  , 'postcode'
  , 'home_phone'
  , 'mobile_phone'
  , 'primary_email'
  , 'verify_email'
  , 'password'
  , 'verify_password'
  , 'membership_type'
  ]

const field_order =
  [ 'personal'
  , 'address'
  , 'membership'
  ]

const add_member_field_order =
  [ 'firstColumn'
  , 'secondColumn'
  , 'thirdColumn'
  ]

const fields = field_order.reduce((fields, list) =>
  fields.concat(fieldStructure[list]), [])

const options =
  { deletion_reason:
    [ 'deceased'
    , 'not-responding'
    , 'duplicate'
    , 'mail-return'
    , 'moved'
    , 'notified-termination'
    , 'other'
    ]
  , standing_order:
    [ 'false'
    , 'true'
    ]
  , membership_type:
    [ 'annual-single'
    , 'annual-double'
    , 'annual-family'
    , 'annual-group'
    , 'annual-corporate'
    , 'life-single'
    , 'life-double'
    , 'accounts'
    ]
  , news_type:
    [ 'post'
    , 'online'
    ]
  , gift_aid_signed:
    [ 'false'
    , 'true'
    ]
  , email_bounced:
    [ 'false'
    , 'true'
    ]
  }

const read_only =
  [ 'id'
  , 'registered'
  , 'activation_status'
  ]

const required =
  [ 'title'
  , 'last_name'
  , 'address1'
  , 'postcode'
  , 'membership_type'
  , 'news_type'
  ]

const read_only_user = [ ...read_only, 'due_date', 'date_gift_aid_signed', 'date_gift_aid_cancelled', 'membership_type' ]

const read_only_sign_up =
  [ 'title'
  , 'first_name'
  , 'last_name'
  , 'initials'
  , 'address1'
  , 'address2'
  , 'address3'
  , 'address4'
  , 'postcode'
  , 'home_phone'
  , 'mobile_phone'
  , 'primary_email'
  , 'password'
  , 'membership_type'
  ]

const add_member_required = [ ...required, 'date_joined' ]

const sign_up_required = [ ...required, 'first_name', 'password', 'primary_email' ]

const validate = required => values => {

  const { membership_type } = values

  const add_test = (tests, key) =>
    assoc(key, options[key] ? selected : exists, tests)

  // add dynamic required fields
  const req_1 = required.concat( membership_type && membership_type.match(/life/) ? ['life_payment_date']: [] )
  const req_2 = req_1.concat( membership_type && membership_type.match(/annual/) ? ['due_date']: [] )

  const required_tests = reduce(add_test, {}, req_2)
  const email_tests =
    { primary_email: valid_email
    , secondary_email: valid_email
    }
  const date_tests = reduce
    ( (tests, key) =>
      key.match(/date/) && !key.match(/due/) ? assoc(key, date, tests) : tests
    , {}
    , fields
    )

  const verified = field => values =>
    values[field] === values[field.replace(/verify_/, (match, offset, whole_string) => whole_string.match(/email/) ? 'primary_' : '')] // eslint-disable-line

  const verification_tests = reduce(
    (tests, key) => assoc(key, verified, tests)
    , {}
    , [ 'verify_email', 'verify_password' ]
  )

  return converge
    ( unapply(mergeAll)
    , [ check_tests('required', required_tests)
      , check_tests('invalid email', email_tests)
      , check_tests('invalid date', date_tests)
      , check_tests('does not match', verification_tests)
      ]
    )(values)
}

const normalise =
  { last_name: to_title
  , first_name: to_title
  }

module.exports =
  { fields
  , fieldStructure
  , options
  , field_order
  , read_only
  , validate
  , normalise
  , required
  , read_only_user
  , user_field_structure
  , add_member_required
  , addMemberfieldStructure
  , add_member_field_order
  , sign_up_fields
  , sign_up_required
  , read_only_sign_up
  }
