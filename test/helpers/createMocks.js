"use strict";

module.exports = {
	member: member,
	payment: payment
};

function member () {

	return {
		title:           "Mr",
		initials:        "B H",
		last_name:       "Hoxhaj",
		primary_email:   "besart@hoxhaj.com",
		password:        "secret",
		membership_type: "annual-double",
		address1:        "Moon",
		address2:        "Street",
		address3:        "24",
		address4:        "Second floor",
		postcode:        "J89 001",
		gift_aid_signed: false
	};
}

function payment () {

	return {
		member: parseInt(Math.random() * 100000),
		category: "payment",
		type: "CASH",
		description: "Hello world!",
		amount: "20",
		date: new Date()
	};
}