/*global
  sails, Members
*/

/**
* Members.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

/**
 *	Starred properties are required. The requirements
 *	will be done programmatically on the front end.
 *	This because uploaded data are don't meet the
 *	requirements.
 */

var bcrypt = require('bcryptjs')
var is = require('torf')
var ForgotPass = require('../services/ForgotPass.js')

var hash_password = key => cb => member => {
  if (!is.ok(member[key])) return cb(null, member)
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return cb(err)
    bcrypt.hash(member[key], salt, (error, hash) => {
      if (error) {
        sails.log.error(error)
        cb(err)
      } else {
        delete member.new_password
        member.password = hash
        cb(null, member)
      }
    })
  })
}

var handle_membership_change = cb => member =>
  Members
    .findOne(member.id)
    .exec(function (error, item) {
      if (error) return sails.log.error(error)
      if (!member.membership_type || member.membership_type === item.membership_type) return cb(member)
      member.date_membership_type_changed = new Date()
      member.life_payment_date = member.membership_type.match('life') ? new Date() : null
      cb(member)
    })

var handle_gift_aid_change = cb => member =>
  Members
    .findOne(member.id)
    .exec(function (error, item) {
      if (error) return sails.log.error(error)
      if (member.gift_aid_signed === item.gift_aid_signed) return cb(member)
      if (member.gift_aid_signed) {
        member.date_gift_aid_signed = new Date()
        member.date_gift_aid_cancelled = null
        return cb(member)
      }
      member.date_gift_aid_cancelled = new Date()
      member.date_gift_aid_signed = null
      return cb(member)
    })

var handle_deactivation = cb => member => {
  if (member.activation_status !== 'deactivated') return cb(member)
  member.password = ForgotPass.randomString()
  cb(member)
}

module.exports = {
  attributes: {
    // ------------------------------------------------------------
    // Original data
    // ------------------------------------------------------------
    id: {
      type: 'INT',
      autoIncrement: 12000,
      unique: true,
      primaryKey: true
    },
    /* Required */
    title: {
      type: 'STRING'
    },
    /* Required */
    initials: {
      type: 'STRING'
    },
    /* Required */
    last_name: {
      type: 'STRING'
    },
    first_name: {
      type: 'STRING'
    },
    address1: {
      type: 'STRING'
    },
    address2: {
      type: 'STRING'
    },
    address3: {
      type: 'STRING'
    },
    address4: {
      type: 'STRING'
    },
    county: {
      type: 'STRING'
    },
    /* Required */
    postcode: {
      type: 'STRING'
    },
    deliverer: {
      type: 'STRING'
    },
    home_phone: {
      type: 'STRING'
    },
    mobile_phone: {
      type: 'STRING'
    },
    /* NOT Required */
    primary_email: {
      type: 'STRING',
      unique: true
    },
    /* Required */
    /**
     *	Apparently there are some
     *	entries with the same
     *	secondary email
     *
     */
    secondary_email: {
      type: 'STRING'
    },
    email_bounced: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    date_joined: {
      type: 'DATE'
    },
    membership_type: {
      model: 'MembershipTypes',
      required: true
    },
    date_membership_type_changed: {
      type: 'DATE'
    },
    life_payment_date: {
      type: 'DATE'
    },
    notes: {
      type: 'TEXT'
    },
    /* Required */
    gift_aid_signed: {
      type: 'BOOLEAN',
      defaultsTo: false
    },
    date_gift_aid_signed: {
      type: 'DATE'
    },
    date_gift_aid_cancelled: {
      type: 'DATE'
    },
    standing_order: {
      type: 'BOOLEAN'
    },
    activation_status: {
      type: 'STRING',
      enum: ['created', 'activated', 'deactivated'],
      defaultsTo: 'activated'
    },
    // ------------------------------------------------------------
    // Additional data
    // ------------------------------------------------------------
    password: {
      type: 'STRING'
    },
    /**
     *	Whether the member has selected to receive news
     *	by email or by post. This defaults to post which
     *  means each member MUST supply an address.
     */
    news_type: {
      type: 'STRING',
      enum: ['post', 'online'],
      defaultsTo: 'post'
    },
    /**
     *	The date when the next subscription payment
     *	is due. By default is the 01/Jan of the following
     *	year.
     *	Example: a member has its due date on the 01/Jan/20xx
     *	if he decides to pay in advance, at the date yy/yy/yyyy
     *	the new due date will become that day + one year
     *	i.e. yy/yy/(yyyy + 1)
     */
    due_date: {
      type: 'DATE',
      defaultsTo: new Date('01/01/' + (new Date().getFullYear() + 1))
    },
    /**
     *	This differentiate whether a member has
     *	created an online account.
     *	By default is 'unregistered' only if the
     *	member is created by an 'admin' or uploaded.
     */
    registered: {
      type: 'STRING',
      enum: ['registered', 'unregistered'],
      defaultsTo: 'unregistered'
    },
    /**
     *  This is the date that the member's
     *  {activation_status} was set to "deactivated"
     */
    deletion_date: {
      type: 'DATE'
    },
    privileges: {
      type: 'STRING',
      enum: ['member', 'admin'],
      defaultsTo: 'member'
    },
    /**
     *  When the member signs up, they get an activation
     *  email with an activation code. This is the date
     *  when they click the activation code.
     */
    activation_date: {
      type: 'DATE'
    },
    // ------------------------------------------------------------
    // Relations
    // ------------------------------------------------------------
    deletion_reason: {
      model: 'DeletionReasons'
    },
    activation_codes: {
      collection: 'ActivationCodes',
      via: 'member'
    },
    reset_password_codes: {
      collection: 'ResetPassCodes',
      via: 'member'
    },
    payments: {
      collection: 'Payments',
      via: 'member'
    },
    events_booked: {
      collection: 'BookingRecords',
      via: 'head_member'
    },
    // ------------------------------------------------------------
    // Methods
    // ------------------------------------------------------------
    toJSON: function () {
      var obj = this.toObject()
      // Remove the password object value
      delete obj.password
      delete obj.reset_password_codes
      delete obj.activation_codes
      // return the new object without password
      obj.full_name = (obj.first_name || '') + ' ' + (obj.last_name || '')
      return obj
    }
  // ------------------------------------------------------------
  },
  beforeCreate: (member, cb) => {
    console.log('beforeCreate');
    return hash_password('password')(cb)(member)
  },
  beforeUpdate: (member, cb) => {
    console.log('beforeUpdate');
    return handle_deactivation(handle_membership_change(handle_gift_aid_change(hash_password('new_password')(cb))))(member)
  }
}
