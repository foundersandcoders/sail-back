const { createStore, applyMiddleware } = require('redux')
const reducer = require('./reducer.js')
import future from 'redux-future'
import heartbeat from './middleware/heartbeat.js'

module.exports =
  applyMiddleware(heartbeat, future)(createStore)(reducer)
