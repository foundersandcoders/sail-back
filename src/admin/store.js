'use strict'

const { createStore, applyMiddleware } = require('redux')
const reducer = require('./reducers')
const { default: future_middleware } = require('redux-future')

module.exports = applyMiddleware(future_middleware)(createStore)(reducer)
