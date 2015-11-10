var fs = require('fs')
var parse_csv = require('../src/services/parse_csv.js').parse
var members_csv = fs.readFileSync('../foch-data/members.csv')

var members = { type: 'members', result: members_csv.toString() }

parse_csv(members, write_members)

function write_members (err, json) {
  fs.writeFileSync('../foch-data/members.json', JSON.stringify(json)) }
