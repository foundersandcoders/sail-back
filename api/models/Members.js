/*global
  sails, Members, Payments, MembershipTypes
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

var R = require('ramda')
var bcrypt = require('bcryptjs')
var is = require('torf')

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

var handle_membership_change = cb => updated_member =>
  Members
    .findOne(updated_member.id)
    .populate('payments', {
      where: {
        category: [ 'subscription', 'payment' ],
        date: { '>': new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
      }
    })
    .exec(function (error, stored_member) {
      if (error) return sails.log.error(error)
      if (!updated_member.membership_type || updated_member.membership_type === stored_member.membership_type) return cb(updated_member)
      return MembershipTypes
        .find()
        .exec(function (error, membership_types) {
          if (error) return console.error(error)
          var membership_prices = membership_types.reduce(function (prices, membership_type) {
            prices[membership_type.value] = membership_type.amount
            return prices
          }, {})

          if (stored_member.membership_type.match('annual') && updated_member.membership_type.match('life')) {
            return Payments
              .create({
                member: stored_member.id,
                description: 'Life subscription £' + membership_prices[updated_member.membership_type]/100,
                amount: membership_prices[updated_member.membership_type],
                date: new Date(),
                category: 'subscription'
              })
              .exec(function (error, payment) { // eslint-disable-line
                if (error) return console.error(error)
                updated_member.date_membership_type_changed = new Date()
                updated_member.life_payment_date = new Date()
                updated_member.due_date = null
                return cb(updated_member)
              })
          }

          var upgrade_single_double = stored_member.membership_type === 'annual-single' && updated_member.membership_type === 'annual-double'
          var upgrade_single_family = stored_member.membership_type === 'annual-single' && updated_member.membership_type === 'annual-family'
          var upgrade_double_family = stored_member.membership_type === 'annual-double' && updated_member.membership_type === 'annual-family'

          var downgrade_double_single = stored_member.membership_type === 'annual-double' && updated_member.membership_type === 'annual-single'
          var downgrade_family_single = stored_member.membership_type === 'annual-family' && updated_member.membership_type === 'annual-single'
          var downgrade_family_double = stored_member.membership_type === 'annual-family' && updated_member.membership_type === 'annual-double'

          var payments_by_date = R.pipe(R.map(R.over(R.lensProp('date'), Date.parse)), R.sortBy(R.prop('date')))(stored_member.payments)
          var payments_since_last_subscription = R.slice(R.findIndex(R.propEq('category', 'subscription'))(payments_by_date), Infinity)(payments_by_date)
          var subscription_balance = payments_since_last_subscription.reduce(function (sum, payment) {
            if (payment.category === 'subscription') return sum + payment.amount
            if (payment.category === 'payment') return sum - payment.amount
            return sum
          }, 0)


          if ((upgrade_single_double || upgrade_single_family || upgrade_double_family) && subscription_balance > 0) {
            var upgrade_amount = membership_prices[updated_member.membership_type] - membership_prices[stored_member.membership_type]
            return Payments
              .create({
                member: stored_member.id,
                description: 'Upgrade annual subscription £' + upgrade_amount/100,
                amount: upgrade_amount,
                date: new Date(),
                category: 'subscription'
              })
              .exec(function (error, payment) { // eslint-disable-line
                if (error) return console.error(error)
                updated_member.date_membership_type_changed = new Date()
                updated_member.life_payment_date = null
                updated_member.due_date = new Date()
                return cb(updated_member)
              })
          }

          if ((downgrade_double_single || downgrade_family_single || downgrade_family_double) && subscription_balance > 0) {
            var downgrade_amount = membership_prices[stored_member.membership_type] - membership_prices[updated_member.membership_type]
            return Payments
              .create({
                member: stored_member.id,
                description: 'Reduced annual subscription -£' + downgrade_amount/100,
                amount: -downgrade_amount,
                date: new Date(),
                category: 'subscription'
              })
              .exec(function (error, payment) { // eslint-disable-line
                if (error) return console.error(error)
                updated_member.date_membership_type_changed = new Date()
                updated_member.life_payment_date = null
                updated_member.due_date = new Date()
                return cb(updated_member)
              })
          }

          return Payments
            .create({
              member: stored_member.id,
              description: 'New subscription rate',
              amount: membership_prices[updated_member.membership_type],
              date: new Date(),
              category: 'subscription'
            })
            .exec(function (error, payment) { //eslint-disable-line
              if (error) return console.error(error)
              updated_member.date_membership_type_changed = new Date()
              updated_member.life_payment_date = updated_member.membership_type.match('life') ? new Date() : null
              updated_member.due_date = new Date()
              return cb(updated_member)
            })
        })
    })

var handle_gift_aid_change = cb => updated_member =>
  Members
    .findOne(updated_member.id)
    .exec(function (error, stored_member) {
      if (error) return sails.log.error(error)
      if (!('gift_aid_signed' in updated_member) || updated_member.gift_aid_signed === stored_member.gift_aid_signed) return cb(updated_member)
      if (updated_member.gift_aid_signed) {
        updated_member.date_gift_aid_signed = new Date()
        updated_member.date_gift_aid_cancelled = null
        return cb(updated_member)
      }
      updated_member.date_gift_aid_cancelled = new Date()
      updated_member.date_gift_aid_signed = null
      return cb(updated_member)
    })

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
      type: 'BOOLEAN',
      defaultsTo: false
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
      defaultsTo: new Date()
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
  beforeCreate: (member, cb) => hash_password('password')(cb)(member),
  beforeUpdate: (member, cb) => handle_membership_change(handle_gift_aid_change(hash_password('new_password')(cb)))(member)
}
