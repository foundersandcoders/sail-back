import React from 'react'

import MyDetailsForm from './details_form.js'

export default (props) =>
  <div>
    <MyDetailsForm fields={fields} onSubmit={submit} />
  </div>

const fields =
[ 'title'
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
, 'deliverer'
, 'home_phone'
, 'work_phone'
, 'mobile_phone'
]



const submit = (data) => console.log(data);
