'use strict'

var test = require('tape')
var converter = require('./../../../assets/js/vdom/services/dateconverter.js')
var helpers = require('../../helpers/createMocks.js')

test('Date converter: ', function (t) {
  t.test('should return an array with the dates converted', function (st) {
    var payments = [
      {date: new Date('12/12/12')},
      {date: new Date('11/11/11')},
      {date: new Date('10/10/10')},
      {date: new Date('09/09/09')}
    ]

    var data = converter(payments)

    st.equals(data[3].date, '09 Sep 09', 'right date')
    st.end()
  })
})
