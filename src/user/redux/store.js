/* @flow */
import { createStore, applyMiddleware } from 'redux'

//middleware
import heartbeat from './middleware/heartbeat.js'
import future from 'redux-future'

//root reducer
import reducers from './reducer.js'


const storeWithMiddleware = applyMiddleware(heartbeat, future)(createStore)(reducers)

export default storeWithMiddleware
