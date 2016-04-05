#!/usr/bin/env node

var fs = require('fs')
var parse_csv = require('../src/services/parse_csv.js').parse
var normalize = require('path').normalize

var type = process.argv[2]
var path = normalize(__dirname + '../../../foch-data/' + type + '.csv')
var csv = fs.readFileSync(path)

var result = { type: type, result: csv.toString() }

parse_csv(result, write)

function write (err, json) {
  if (err) throw err
  fs.writeFileSync(
      normalize(__dirname + '../../../foch-data/' + type + '.json')
      , JSON.stringify(json)) }
