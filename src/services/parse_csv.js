"use strict";

var parseLibrary = require("csv-parse");
var blueprints   = require("./blueprints.js");
var is           = require("torf");

module.exports = {
  parse: parseFun
};

/**
 *  Parse csv function.
 *
 *  @param {Object}   - object in the form of {type: type, result: result} where type
 *            is a string and result a string
 *  @param {Function} - callback function with the data transformed in an array
 *
 */
function parseFun (file, callback) {

  parseLibrary(file.result, function (err, outputFromCsvParser) {

    if (err) return callback(err);

    var json = jsonify(outputFromCsvParser, file.type);

    return callback(undefined, json);
  });
};

function jsonify (file, fileType) {

  var stamp = blueprints[fileType];

  return file.map(function (row, index) {
    var obj = _stamp(index, row, stamp)
    if (obj.id === 9811 || obj.id === '9811') { console.log(obj) }
    return _stamp(index, row, stamp);
  });
}

/**
 *  given a {stamp_object} and a {data_object} with the same
 *  number of properties, returns a new object with the
 *  values of the {data_object} and the keys of {stamp_object}
 *
 *  @param  {number} -
 *  @param  {object} -
 *  @param  {object} -
 *  @return {object} - 'stampedobject'
 */
function _stamp (index, data, stamppattern){

  var stampedobj = {};
  var stampkeys  = Object.keys(stamppattern);

  if (index === 0 && (data.length !== stampkeys.length)) {


    throw new Error("Blueprint does not match with file csv columns");
  }

  stampkeys.forEach(function (keystamp, index){

    if (!is.ok(stamppattern[stampkeys[index]].remove)) {

      if(keystamp === "membership_type") {

        stampedobj.membership_type = _membershipTypeMap(data[index]);
      } else {

        stampedobj[keystamp] = _transform(data[index], stamppattern[keystamp].type);
      }
    }
  });

  return stampedobj;
}

/**
 *
 *
 */
function _transform (value, type) {

  return type === "boolean" && !is.ok(value) ?
      false :
  !is.ok(value) ?
      null :
  is.type(value, type) ?
      encode(value) :
  type === "number" ?
      parseInt(value, 10) :
  type === "date" ?
      _dateconvert(value) :
  type === "boolean" ?
      value === "TRUE" ? true : false :
  type === "custom" ?
      value === "deactivated" ? "deactivated" : "activated" :
  type === "notes" ?
      value.replace('\\n', '\n', 'g') :
      null }

function encode(s) {
  return unescape(encodeURIComponent(s)) }

function decode(s) {
  return decodeURIComponent(escape(s));
}

function _dateconvert (str) {

  function isValidDate(d) {
    if ( {}.toString.call(d) !== "[object Date]")
      return false;
    return !isNaN(d.getTime())
  }

  var dt    = require('app/standardise_date.js')(str);

  if(isValidDate(new Date(dt))){
    return dt;
  }else{
    return null;
  };
}

function _membershipTypeMap (membership_type) {

  var type = {
    'Single':    'annual-single',
    'Double':    'annual-double',
    'Family':    'annual-family',
    'Group':     'annual-group',
    'Corporate': 'annual-corporate',
    'Life Sgl':  'life-single',
    'Life Dble': 'life-double'
  };

  return type[membership_type];
}