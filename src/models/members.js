'use strict'

var yup = require('yup')
var date_schema = require('./date.js')

module.exports = yup.object().shape({
  title: yup.string().required(),
  initials: yup.string(),
  last_name: yup.string().required(),
  first_name: yup.string(),
  address1: yup.string(),
  address2: yup.string(),
  address3: yup.string(),
  address4: yup.string(),
  county: yup.string(),
  postcode: yup.string(),
  deliverer: yup.string(),
  home_phone: yup.string(),
  mobile_phone: yup.string(),
  work_phone: yup.string(),
  primary_email: yup.string().required(),
  secondary_email: yup.string(),
  email_bounced: yup.bool(),
  date_joined: date_schema,
  membership_type: yup.mixed(),
  date_membership_type_changed: date_schema,
  life_payment_date: date_schema,
  notes: yup.string(),
  gift_aid_signed: yup.bool(),
  date_gift_aid_signed: date_schema,
  gift_aid_cancelled: yup.bool(),
  date_gift_aid_cancelled: date_schema,
  standing_order: yup.bool(),
  activation_status: yup.mixed().oneOf(
      [undefined, 'created', 'activated', 'deactivated']),
  password: yup.string(),
  news_type: yup.mixed().oneOf(
      [undefined, 'post', 'online', 'Post', 'Online']),
  due_date: date_schema,
  deletion_date: date_schema,
  activated_date: date_schema,
  deletion_reason: yup.mixed()
})

