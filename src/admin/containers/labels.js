/* @flow */
import React from 'react'
import { connect } from 'react-redux'
const { prop, props, map, filter, compose, splitEvery, keys, merge }
  = require('ramda')

import { newsletter_labels } from '../redux/modules/labels.js'
import r from 'app/r'

const Labels = (
  { addresses
  , newsletter_labels
  }
) =>
  <div>
    <button onClick={newsletter_labels}>Newsletter Labels</button>
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

const font_style = text =>
  ({ style: { fontSize: Math.min(12, 300 / text[0].length) + 'pt' } })

const Label = compose
  ( r('td')({className: 'label' })
  , text =>
    map(r('div')(merge({ className: 'label-line'}, font_style(text))), text)
  , filter(Boolean)
  , props(lines)
  )

const LabelRow
  = compose(r('tr')({ className: 'label-row' }), map(Label))

export default
  connect(prop('newsletter_labels'), { newsletter_labels })(Labels)

