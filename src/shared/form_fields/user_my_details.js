// TODO: delete file

export const contact_fields =
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
  , 'work_phone'
  , 'mobile_phone'
  ]

export const membership_fields =
  [ 'id'
  , 'membership_type'
  , 'due_date'
  , 'notes'
  , 'news_type'
  ]

export const account_fields =
  [ 'new_password'
  , 'confirm_new_password'
  , 'standing_order'
  , 'date_gift_aid_signed'
  , 'end_membership_notes'
  ]

export const read_only =
  [ 'id'
  , 'due_date'
  ]

export const options =
  { membership_type:
    [ 'annual-corporate'
    , 'annual-double'
    , 'annual-family'
    , 'annual-group'
    , 'annual-single'
    , 'life-double'
    , 'life-single'
    ]
  , news_type:
    [ 'post'
    , 'online'
    ]
  }
