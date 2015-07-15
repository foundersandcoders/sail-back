"use strict";


var Joi = require("joi");


module.exports = validate;

/**
 *
 *
 */
function validate (type, obj, callback) {

	if(type === "member") {

		return member(obj, callback);
	} else if (type === "payment") {

		return payment(obj, callback);
	} else if (type === "booking") {
		return booking(obj, callback);
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
		// gift_aid_signed: Joi.boolean().required()
	});

	return validateCall(object, schema, callback);
}

function payment (object, callback) {

	var schema = Joi.object().keys({
		category: Joi.any().valid(["donation", "event", "subscription", "payment"]).required(),
		member:   Joi.any().required(),
		amount:   Joi.number().required(),
		// date:     Joi.date().required()
	});

	return validateCall(object, schema, callback);
}

function booking (object, callback) {

	var schema = Joi.object().keys({
		event_id:    Joi.any().required(),
		head_member: Joi.any().required()
	});

	return validateCall(object, schema, callback);
}

function validateCall (object, schema, callback) {

	return Joi.validate(object, schema, {
		abortEarly: true,
		allowUnknown: true,
		skipFunctions: true
	}, callback);
}