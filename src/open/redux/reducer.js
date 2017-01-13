import { combineReducers } from 'redux'
import form from './form_reducer.js'
import page from './modules/page.js'

export default combineReducers({ form, page })
