/* @flow */
const { reducer: form } = require('redux-form')
import sign_up from './modules/signup.js'

export default form.plugin({ sign_up })
