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
		membership_type: module.exports.membershipTypes()[0].value
	},{
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
		},{
			member: module.exports.admins()[0].id, // bes
			category: 'donation',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 20,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a nice donation',
			date: new Date("2012")
		},{
			member: module.exports.admins()[0].id, // bes
			category: 'payment',
			type: module.exports.paymentTypes()[0].code, // join table
			description: 'Some description',
			amount: 30.5,
			reference: module.exports.references()[0].code, // join table
			notes: 'This is a nice payment',
			date: new Date("2013")
		}
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
			description: 'Annual Single'
		},{
			value: 'annual-double',
			description: 'Annual Double'
		},{
			value: 'annual-family',
			description: 'Annual Family'
		},{
			value: 'life-single',
			description: 'Life Single'
		},{
			value: 'life-double',
			description: 'Life Double'
		},{
			value: 'annual-group',
			description: 'Annual Group'
		},{
			value: 'annual-corporate',
			description: 'Annual Corporate'
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
