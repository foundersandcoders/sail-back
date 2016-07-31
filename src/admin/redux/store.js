/* @flow */
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import future from 'redux-future'
import heartbeat from '../../shared/redux/middleware/heartbeat.js'

export default
  applyMiddleware(heartbeat, future)(createStore)(reducer)
