'use strict'

var React = require('react')
var Field = require('../components/field.js')

var EmailPage = module.exports = (props) =>
  <div className='main-container email-page'>
    <form className='search-options flex'>
      <Field
        name='Template'
        mode='edit'
        input_or_select={input_or_select}
      />
      <Field
        name='Membership Category'
        mode='edit'
        input_or_select={input_or_select}
      />
      <input type='submit' value='Generate Letters' />
    </form>
  </div>

EmailPage.displayName = 'EmailPage'

var input_or_select = (props) =>
  select_maker(
      props.name === 'Template'
      ? template_options
      : subscription_options
  )

var select_maker = (options) =>
  ({ type: 'select', options: options })

var template_options = [
  'Template One'
]

var subscription_options = [
  'TEST'
  , 'annual-single'
  , 'annual-double'
  , 'annual-family'
  , 'annual-group'
  , 'annual-corporate'
  , 'life-single'
  , 'life-double'
]
