'use strict'

var fs = require('fs')
var through = require('through2')
var csv = require('csv2')

module.exports = {
  payments: payments,
  members: members
}

function members () {
  function write (fields, enc, next) {
    var member = {
      id: fields[0],
      title: fields[1],
      initials: fields[2],
      surname: fields[3],
      first_name: fields[4],
      address1: fields[5],
      address2: fields[6],
      address3: fields[7],
      address4: fields[8],
      county: fields[9],
      postcode: fields[10],
      deliverer: fields[11],
      home_phone: fields[12],
      mobile_phone: fields[13],
      work_phone: fields[14],
      date_of_birth: fields[15],
      age: fields[16],
      primary_email: fields[17],
      secondary_email: fields[18],
      email_bounced: fields[19],
      date_joined: fields[20],
      membership_type: fields[21],
      date_changed: fields[22],
      life_payment_date: fields[23],
      notes: fields[24],
      gift_aid: fields[25],
      date_gift_aid_signed: fields[26],
      date_gift_aid_cancelled: fields[27],
      standing_order: fields[28],
      delete_record: fields[29],
      lapsed_member: fields[30],
    }

    this.push(member)
    return next()
  }

  return fs.createReadStream('./test/upload/mockmembers.csv')
    .pipe(csv({separator: ';'}))
    .pipe(through.obj(write))
}

function payments () {
  function write (fields, enc, next) {
    var payment = {
      date: fields[0],
      member: fields [1],
      subscription: fields[2],
      donation: fields[3],
      events: fields[4],
      amount: fields[5],
      difference: fields[6],
      type_code: fields[7],
      reference: fields[8],
      notes: fields[9],
      deleted: fields[10],
    }

    this.push(payment)
    return next()
  }

  return fs.createReadStream('./test/upload/mockpayments.csv')
    .pipe(csv({separator: ';'}))
    .pipe(through.obj(write))
}

members()
