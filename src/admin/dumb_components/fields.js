const fieldStructure =
    { personal:
      [ 'id'
      , 'title'
      , 'initials'
      , 'first_name'
      , 'last_name'
      , 'age'
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
    }

const fields = Object.keys(fieldStructure).reduce((fields, list) =>
  fields.concat(fieldStructure[list].map((field) => list + '.' + field)), [])

module.exports = { fields, fieldStructure }
