const { createStore, applyMiddleware } = require('redux')
const reducer = require('./reducer.js')
const { default: future_middleware } = require('redux-future')

module.exports = applyMiddleware(future_middleware)(createStore)(reducer)
