'use strict'

var test = require('tape')
var server = require('./startServer.js')

function openConnection (mySqlConnection, config) {
  return mySqlConnection.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true,
  })
}

test('Drop database', function (t) {
  // Raw connection
  var mySqlPath = process.env.PWD + '/node_modules/sails-mysql/node_modules/mysql'
  var mysql = require(mySqlPath)
  var sailsMySqlConfig = sails.config.connections.localMySql
  var mySqlConnection = openConnection(mysql, sailsMySqlConfig)


  mySqlConnection.query('DROP database test;', function (errMySqlDrop) {
    mySqlConnection.query('CREATE database test;', function (errMySqlCreate) {
      t.end()
    })
  })
})
