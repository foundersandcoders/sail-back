'use strict'

var fs = require('fs')
var through = require('through2')
var csv = require('csv2')

module.exports = {
  payments: payments,
  members: members
}

function safely (arg) {
  return arg === 'TRUE' ?
    true :
  arg === 'FALSE' ?
    false :
  !arg || arg === 'NULL' ?
    null : arg }

function members () {
    var list = []
    var memKeys = Object.keys({
      id: list[0],
      title: list[1],
      initials: list[2],
      last_name: list[3],
      first_name: list[4],
      address1: list[5],
      address2: list[6],
      address3: list[7],
      address4: list[8],
      county: list[9],
      postcode: list[10],
      deliverer: list[11],
      home_phone: list[12],
      mobile_phone: list[13],
      work_phone: list[14],
      date_of_birth: list[15],
      age: list[16],
      primary_email: list[17],
      secondary_email: list[18],
      email_bounced: list[19],
      date_joined: list[20],
      membership_type: list[21],
      date_changed: list[22],
      life_payment_date: list[23],
      notes: list[24],
      gift_aid: list[25],
      date_gift_aid_signed: list[26],
      date_gift_aid_cancelled: list[27],
      standing_order: list[28],
      delete_record: list[29],
      lapsed_member: list[30],
    })
  function write (fields, enc, next) {
    var member = memKeys.reduce(function (mem, field, i) {
      mem[field] = safely(fields[i])
      if (field.match('email') && !mem[field]) mem[field] = null
      if (field.match('date') && mem[field]) mem[field] = new Date(mem[field])
      return mem }, {})

    this.push(JSON.stringify(member) + ',')
    return next()
  }

  return fs.createReadStream('./test/upload/mockmembers.csv')
   .pipe(csv())
   .pipe(through.obj({highWaterMark: 1000000000}, write))
   .pipe(fs.createWriteStream('memberObj.js'))
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
    .pipe(csv())
    .pipe(through.obj(write))
}

members()
