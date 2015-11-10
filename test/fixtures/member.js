module.exports = { 
  id: 1234,
  first_name: 'Wil',
  last_name: 'Eritrea',
  news_type: 'Post',
  activation_status: 'deactivated',
  primary_email: 'wil@foch.org',
  secondary_email: 'wil2@foch.org',
  deletion_date: new Date(),
  deletion_reason: {
    description: 'I turned purple'
  },
  email_bounced: true,
  address1: '123 Fake Street',
  address2: 'Psychophysical Substrate',
  address3: 'Endoscopic Rectomy',
  county: 'Whisk Yortshore',
  postcode: '123 80e',
  home_phone: '12384',
  work_phone: '184391',
  mobile_phone: 'a9134',
  date_gift_aid_signed: new Date(),
  notes: 'I am green',
  standing_order: true,
  membership_type: 'life_double',
  date_joined: new Date(),
  events_booked: require('./events.js'),
  payments: require('./payments.js')
}
