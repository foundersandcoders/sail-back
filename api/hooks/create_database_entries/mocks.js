exports.admins = function () {

	// var dummyBes = {
	// 	title: 'Mr',
	// 	initials: 'S',
	// 	postcode: 'E1 0SY',
	// 	first_name: 'Besart',
	// 	last_name: 'Hoxhaj',
	// 	primary_email: 'bes@foch.com',
	// 	secondary_email: 'bes2@foch.com',
	// 	password: 'cnvo2hh89h',
	// 	privileges: 'admin',
	// 	// membership_type: module.exports.membershipTypes()[0]
	// };

	// var dummyWil = {
	// 	title: 'Mr',
	// 	initials: 'S',
	// 	postcode: 'E1 0SY',
	// 	first_name: 'Wil',
	// 	last_name: 'Fisher',
	// 	primary_email: 'wil@foch.com',
	// 	secondary_email: 'wil2@foch.com',
	// 	password: 'afd892hadf',
	// 	privileges: 'admin',
	// 	// membership_type: module.exports.membershipTypes()[0]
	// };

	// var dummyRichard = {
	// 	title: 'Mr',
	// 	initials: 'S',
	// 	postcode: 'E1 0SY',
	// 	first_name: 'Richard',
	// 	last_name: 'Evans',
	// 	primary_email: 'richard@foch.com',
	// 	secondary_email: 'richard2@foch.com',
	// 	password: '98fasdh39f',
	// 	privileges: 'admin',
	// 	// membership_type: module.exports.membershipTypes()[4]
	// };

	var dummyAdmin = {
		title: 'Mr',
		initials: 'S',
		postcode: 'E1 0SY',
		first_name: 'Anon',
		last_name: 'Ymouse',
		primary_email: 'admin@foch.com',
		secondary_email: 'admin2@foch.com',
		password: 'ads78fkj39r',
		privileges: 'admin',
		membership_type: 1
	};

	return [/*dummyBes, dummyWil, dummyRichard, */dummyAdmin];
};

exports.membershipTypes = function () {

	var types = [{
			value: "annual-single",
			description: "Annual Single"
			// members: [1]
		}
		// ,{
		// 	value: "annual-double",
		// 	description: "Annual Double"
		// },{
		// 	value: "annual-family",
		// 	description: "Annual Family"
		// },{
		// 	value: "life-single",
		// 	description: "Life Single"
		// },{
		// 	value: "life-double",
		// 	description: "Life Double"
		// },{
		// 	value: "group-annual",
		// 	description: "Group Annual"
		// },{
		// 	value: "corporate-annual",
		// 	description: "Corporate Annual"
		// }
	];

	return types;
};