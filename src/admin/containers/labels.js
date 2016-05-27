/* @flow */
import React from 'react'
import { connect } from 'react-redux'
const { prop, props, map, filter, compose, splitEvery, keys }
  = require('ramda')

import { newsletter_labels } from '../redux/modules/labels.js'
import r from 'app/r'

const Labels = (
  { addresses
  , newsletter_labels
  }
) =>
  <div>
    <button onClick={newsletter_labels}></button>
    <table>
      { r('tbody')()(compose(map(LabelRow), splitEvery(3))(addresses)) }
    </table>
  </div>

const lines =
  [ 'addressee'
  , 'address1'
  , 'address2'
  , 'address3'
  , 'address4'
  , 'postcode'
  , 'county'
  ]

const Label = compose
  ( r('td')({className: 'label' })
  , map(r('div')({ className: 'label-line' }))
  , filter(Boolean)
  , props(lines)
  )

const LabelRow
  = compose(r('tr')({ className: 'label-row' }), map(Label))

export default
  connect(prop('newsletter_labels'), { newsletter_labels })(Labels)

