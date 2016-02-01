const { prop, keys, assoc, reduce } = require('ramda')
const { exists, selected, check_tests } = require('app/validate')

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
      , 'work_phone'
      , 'mobile_phone'
      ]
    , membership:
      [ 'date_joined'
      , 'membership_type'
      , 'life_payment_date'
      , 'date_membership_type_changed'
      , 'date_gift_aid_signed'
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

const field_order =
  [ "personal"
  , "address"
  , "membership"
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
    ]
  , news_type:
    [ 'post'
    , 'online'
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

const validate = (values) => {
  const tests =
    { title: exists
    , last_name: exists
    , date_joined: exists
    , membership_type: selected
    }

  return check_tests(tests, values)
}


module.exports =
  { fields
  , fieldStructure
  , options
  , field_order
  , read_only
  , validate
  }
