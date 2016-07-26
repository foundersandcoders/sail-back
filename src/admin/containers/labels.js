/* @flow */
import React from 'react'
import { connect } from 'react-redux'
const { prop, props, map, filter, compose, splitEvery, keys, merge, length}
  = require('ramda')
const trace = require('app/trace')

import { newsletter_labels } from '../redux/modules/labels.js'
import r from 'app/r'

const Labels = (
  { addresses
  , newsletter_labels
  }
) =>
  <div>
    <button onClick={newsletter_labels}>Newsletter Labels</button>
    {compose(map(table_builder), splitEvery(21), top_up)(addresses)}
  </div>

const top_up = arr =>
  length(arr) % 3 > 0 ? top_up(arr.concat(dummy_ob)) : arr

const table_builder = address_block =>
  <table className='labels-tables' key={address_block[0].addressee}>
    { r('tbody')()(compose(map(LabelRow), splitEvery(3))(address_block)) }
  </table>

const lines =
  [ 'addressee'
  , 'address1'
  , 'address2'
  , 'address3'
  , 'address4'
  , 'postcode'
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

const dummy_ob =
  { addressee: ' '
  , address1: ' '
  , address2: ' '
  , address3: ' '
  , address4: ' '
  , postcode: ' '
  }
