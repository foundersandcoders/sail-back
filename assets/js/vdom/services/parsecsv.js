"use strict";

var parse      = require("csv-parse");
var lazy       = require("lazy.js");
var blueprints = require("./blueprints");
var is         = require("torf");

module.exports = {
	parse: parseFun
};

function parseFun (file, callback) {

	parse(file.result, {delimiter: ";"}, stamp);
	
	function stamp (err, outputFromCsvParser) {
				
		if (err) return callback(err);

		var json = jsonify(outputFromCsvParser, file.type);

		return callback(undefined, json);
	}
};

function jsonify (file, fileType) {

	var stamp = blueprints[fileType];
	
	return lazy(file).map(function (row, index) {

		return _stamp(index, row, stamp);
	}).toArray();
}

/**
 *	given a {stamp_object} and a {data_object} with the same
 *	number of properties, returns a new object with the
 *	values of the {data_object} and the keys of {stamp_object}
 *	
 *	@param  {number} - 
 *	@param  {object} -
 *	@param  {object} -
 *	@return {object} - 'stampedobject'
 */
function _stamp (count, data, stamppattern){

	var stampedobj = {};
	var stampkeys  = Object.keys(stamppattern);

	if (count === 0 && (data.length !== stampkeys.length)) {
		// console.log(data.length);
		// console.log("header: ", data);
		// console.log(stampkeys.length);
		throw new Error({message: "blueprint does not match with file csv columns"});
	}

	stampkeys.forEach(function (keystamp, index){

		if (!is.ok(stamppattern[stampkeys[index]].remove)) {

			if(keystamp === "membership_type") {

				data[index] = _membershipTypeMap(data[index]);
			}

			// sails.log.info("debug:", keystamp, data[index]);

			stampedobj[keystamp] = _transform(data[index], stamppattern[keystamp].type);
		}
	});

	return stampedobj;
}

/**
 *	
 *
 */
function _transform (value, type) {


	// some entries should be boolen but they are are empty
	if(type === "boolean" && !is.ok(value)) {
		return false;
	}

	if (!is.ok(value)) {
		return null;
	}

	if (is.type(value, type)) {

		return value;
	} else if (type === "number"){

		return parseInt(value);
	} else if (type === "date"){

		return _dateconvert(value);
	} else if (type === "boolean"){

		return value === "VERO" ? true : false;
	} else if (type === "custom"){

		return value === "FALSE" ? "activated" : "deactivated";
	} else {

		return null;
	}
}

function _dateconvert (str) {
	function isValidDate(d) {
		if ( {}.toString.call(d) !== "[object Date]" )
			return false;
		return !isNaN(d.getTime());
	}

	var parts = str.split("/");
	var dt = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
	if(isValidDate(dt)){
		return dt;
	}else{
		return null;
	};
}

function _membershipTypeMap (membership_type) {

	var type = [
		{original: 'Single',    imported: 'annual-single'},
		{original: 'Double',    imported: 'annual-double'},
		{original: 'Family',    imported: 'annual-family'},
		{original: 'Group',     imported: 'annual-group'},
		{original: 'Corporate', imported: 'annual-corporate'},
		{original: 'Life Sgl',  imported: 'life-single'},
		{original: 'Life Dble', imported: 'life-double'}
	];

	type.forEach(function (element, index) {

		if(element.original === membership_type) {
			return element.imported;
		}
	});
}