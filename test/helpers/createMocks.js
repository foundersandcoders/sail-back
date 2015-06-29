"use strict";

module.exports = {
	member: member,
	payment: payment,
	eventItem: eventItem
};

function member (id) {

	return {
		id:              id || 9999,
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

function eventItem (places) {

	return {
		title: 'Dinner at Bes',
		reference: 'YH77D',
		short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
		photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
		date: new Date(),
		time: '19:00',
		location: 'London',
		host: 'Bes',
		price_per_member: 15,
		price_per_guest: 20,
		max_number_of_guests: 5,
		total_places_available: places || 20
	};
}