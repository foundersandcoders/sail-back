#!/usr/bin/env node

var fs = require('fs')
var parse_csv = require('../src/services/parse_csv.js').parse

var type = process.argv[2]
var csv = fs.readFileSync(__dirname + '../../foch-data/' + type + '.csv')

var result = { type: type, result: csv.toString() }

parse_csv(result, write)

function write (err, json) {
  fs.writeFileSync(
      __dirname + '../../foch-data/' + type + '.json'
      , JSON.stringify(json)) }
