var React = require('react')
var MemberFields = require('./')

var personal_ids = ['id', 'title', 'initials', 'first_name',
    'last_name', 'primary_email', 'secondary_email']

var address_ids = ['address1', 'address2', 'address3', 'address4', 'county',
    'postcode', 'deliverer', 'home_phone', 'work_phone', 'mobile_phone']

var membership_ids = ['date_joined', 'membership_type', 'life_payment_date',
    'date_membership_type_changed', 'date_gift_aid_signed',
    'date_gift_aid_cancelled', 'standing_order', 'notes', 'registered',
    'due_date', 'news_type', 'email_bounced', 'activation_status']

var deletion_ids = ['deletion_reason', 'deletion_date']

fields_with_ids = (ids) => (props) =>
    <MemberFields {...props} ids={ids} />

exports.PersonalFields = fields_with_ids(personal_ids)

exports.AddressFields = fields_with_ids(address_ids)

exports.MembershipFields = fields_with_ids(membership_ids)

exports.DeletionFields = fields_with_ids(deletion_ids)
