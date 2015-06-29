exports.admins = function () {

	var admins = [{
		id: '471800',
		title: 'Mr',
		initials: 'S',
		postcode: 'E1 0SY',
		first_name: 'Besart',
		last_name: 'Hoxhaj',
		primary_email: 'bes@foch.org',
		secondary_email: 'bes2@foch.org',
		password: 'cnvo2hh89h',
		privileges: 'admin',
		activation_status: 'activated',
		gift_aid_signed: false,
		date_joined: new Date(),
		membership_type: module.exports.membershipTypes()[0].value
	},
	{
		privileges: 'admin',
		id: '1111',
		title: 'Mr',
		initials: 'E S',
		postcode: 'E1 0SY',
		first_name: 'Richard',
		last_name: 'Evans',
		primary_email: 'riche80@outlook.com',
		gift_aid_signed: false,
		date_joined: new Date(),
		membership_type: module.exports.membershipTypes()[0].value
	},
	// {
	// 	privileges: 'admin',
	// 	id: '78403',
	// 	title: 'Mr',
	// 	initials: 'E S',
	// 	postcode: 'E1 0SY',
	// 	first_name: 'Ettore',
	// 	last_name: 'Scabron',
	// 	primary_email: 'besartshyti@gmail.com',
	// 	gift_aid_signed: false,
	// 	date_joined: new Date(),
	// 	membership_type: module.exports.membershipTypes()[0].value
	// },
	{
		id: '471663',
		title: 'Mr',
		initials: 'S',
		postcode: 'E1 0SY',
		first_name: 'Wil',
		last_name: 'Fisher',
		primary_email: 'wil@foch.org',
		secondary_email: 'wil2@foch.org',
		password: 'afd892hadf',
		privileges: 'admin',
		date_joined: new Date(),
		gift_aid_signed: false,
		membership_type: module.exports.membershipTypes()[0].value
	},{
		id: '433893',
		title: 'Mr',
		initials: 'S',
		postcode: 'E1 0SY',
		first_name: 'Richard',
		last_name: 'Evans',
		primary_email: 'richard@foch.org',
		secondary_email: 'richard2@foch.org',
		password: '98fasdh39f',
		privileges: 'admin',
		activation_status: 'deactivated',
		deletion_reason: module.exports.deletionReasons()[1].value,
		deletion_date: new Date(),
		date_joined: new Date(),
		gift_aid_signed: false,
		membership_type: module.exports.membershipTypes()[2].value
	},{
		id: '471893',
		title: 'Mr',
		initials: 'S',
		postcode: 'E1 0SY',
		first_name: 'Anon',
		last_name: 'Ymouse',
		primary_email: 'admin@foch.org',
		secondary_email: 'admin2@foch.org',
		password: 'ads78fkj39r',
		privileges: 'admin',
		date_joined: new Date(),
		gift_aid_signed: false,
		membership_type: module.exports.membershipTypes()[3].value
	}];

	return admins;
};

exports.payments = function () {

	var payments = [{
			member: module.exports.admins()[0].id, // bes
			category: 'subscription',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 50.5,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a note',
			date: new Date("2011")
		},
		{
			member: module.exports.admins()[0].id, // bes
			category: 'donation',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 20,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a nice donation',
			date: new Date("2012")
		},
		{
			member: module.exports.admins()[0].id, // bes
			category: 'payment',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 30.5,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a nice payment',
			date: new Date("2013")
		},
		{
			member: module.exports.admins()[0].id, // bes
			category: 'payment',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 50.5,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a nice payment',
			date: new Date("2013")
		},
		{
			member: module.exports.admins()[1].id, // richard
			category: 'subscription',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 15.5,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a note',
			date: new Date("2011")
		},
	];

	return payments;
};

exports.deletionReasons = function () {

	var reasons = [{
			value: "deceased",
			description: "Deceased"
		},{
			value: "notResponding",
			description: "Did not respond to reminders"
		},{
			value: "duplicate",
			description: "Duplicate"
		}, {
			value: "dissatisfied",
			description: "Expressed dissatisfaction"
		},{
			value: "mailReturned",
			description: "Mail returned to us"
		}, {
			value: "moved",
			description: "Moved away"
		},{
			value: "notifiedTermination",
			description: "Notified termination"
		}, {
			value: "other",
			description: "Other"
		}
	];

	return reasons;
};

exports.membershipTypes = function () {

	var types = [{
			value: 'annual-single',
			description: 'Annual Single',
			amount: 10
		},{
			value: 'annual-double',
			description: 'Annual Double',
			amount: 15
		},{
			value: 'annual-family',
			description: 'Annual Family',
			amount: 20
		},{
			value: 'life-single',
			description: 'Life Single',
			amount: 175
		},{
			value: 'life-double',
			description: 'Life Double',
			amount: 250
		},{
			value: 'annual-group',
			description: 'Annual Group',
			amount: 25
		},{
			value: 'annual-corporate',
			description: 'Annual Corporate',
			amount: 150
		}
	];

	return types;
};

exports.paymentTypes = function () {

	var types = [{
			code: 'CHQ',
			description: 'cheque'
		},{
			code: 'CASH',
			description: 'cash'
		},{
			code: 'SOA',
			description: 'standing order payment advised (by member)'
		},{
			code: 'SOR',
			description: 'standing order received (and shown on bank statement)'
		},{
			code: 'BACSA',
			description: 'BACS payment advised (by member)'
		},{
			code: 'BACSR',
			description: 'BACS payment received by bank (and shown on bank statement)'
		},{
			code: 'CAFA',
			description: 'charities aid foundation payment advised by member'
		},{
			code: 'CAFR',
			description: 'charities aid foundation payment received by bank (shown on bank statement)'
		},{
			code: 'HO',
			description: 'payment received by Harbour Office along with harbour dues'
		}
	];

	return types;
};

exports.references = function () {

	var references = [{
			code: 'DH47F',
			description: 'One'
		},{
			code: 'DFH58',
			description: 'Two'
		},{
			code: 'DF43D',
			description: 'Three'
		}
	];

	return references;
};

exports.events = function () {

	var yesterday = new Date();
	yesterday.setMonth(yesterday.getMonth() - 1);

	var today = new Date();

	var tomorrow = new Date();
	tomorrow.setMonth(tomorrow.getMonth() + 1);

	var afterTomorrow = new Date();
	afterTomorrow.setMonth(afterTomorrow.getMonth() + 2);

	var events = [
		{
			title: 'Past at Dan',
			reference: 'OOC6K',
			short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
			photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
			date: yesterday,
			time: '19:00',
			location: 'London',
			host: 'Dan',
			price_per_member: 15,
			price_per_guest: 20,
			max_number_of_guests: 5,
			total_places_available: 20
		},{
			title: 'Today at Wil',
			reference: 'CH11D',
			short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
			photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
			date: today,
			time: '19:00',
			location: 'London',
			host: 'Wil',
			price_per_member: 15,
			price_per_guest: 20,
			max_number_of_guests: 5,
			total_places_available: 20
		},{
			title: 'Visit at Chichester',
			reference: 'YH77D',
			short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
			photo_url: 'http://mtbl1.vm.bytemark.co.uk/familydaysout/wp-content/uploads/Chichester-Solar-Boat-Harbour-8.jpg',
			date: tomorrow,
			time: '19:00',
			location: 'London',
			host: 'Bes',
			price_per_member: 15,
			price_per_guest: 20,
			max_number_of_guests: 5,
			total_places_available: 20
		},{
			title: 'Party in London',
			reference: 'YH56D',
			short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
			photo_url: 'http://www.splashmood.com/wp-content/uploads/2014/06/Yeh-Jawaani-Hai-Deewani-Night-Party-HD-Wallpaper.jpg',
			date: afterTomorrow,
			time: '21:00',
			location: 'London',
			host: 'Wil',
			price_per_member: 15,
			price_per_guest: 20,
			max_number_of_guests: 5,
			total_places_available: 20
		}
	];

	return events;
};

exports.bookings = function () {

	var bookings = [
		{
			event_id: '1', // bes party
			head_member: '471800', // bes account
			number_of_members: 5,
			number_of_guests: 1
		}
	];

	return bookings;
};