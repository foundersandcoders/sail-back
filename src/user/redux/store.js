/* @flow */
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import future from 'redux-future'
import heartbeat from './middleware/heartbeat.js'

export default createStore(reducer)
  // applyMiddleware(heartbeat, future)(createStore)(reducer)
