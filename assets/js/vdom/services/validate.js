"use strict";


var Joi = require("joi");


module.exports = validate;

/**
 *
 *
 */
function validate (type, obj, callback) {

	if(type === "member") {

		member(obj, callback);
	} else {

		return callback("No schema found", undefined);
	}
}

function member (object, callback) {

	var schema = Joi.object().keys({
		password:        Joi.string().required(),
		primary_email:   Joi.string().email().required(),
		membership_type: Joi.string().required(),
		// title:           Joi.string().required(),
		// initials:        Joi.string().required(),
		// last_name:       Joi.string().required(),
		// address1:        Joi.string().required(),
		// address2:        Joi.string().required(),
		// address3:        Joi.string().required(),
		// address4:        Joi.string().required(),
		// postcode:        Joi.string().required(),
		// gift_aid_signed: Joi.boolean().required(),
	});

	Joi.validate(object, schema, {
		abortEarly: true,
		allowUnknown: true,
		skipFunctions: true
	}, callback);
}