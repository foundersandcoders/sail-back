exports.admins = function () {

	var dummyBes = {
		first_name: 'Besart',
		last_name: 'Hoxhaj',
		primary_email: 'bes@foch.com',
		secondary_email: 'bes2@foch.com',
		password: 'cnvo2hh89h',
		privileges: 'admin'
	};

	var dummyWil = {
		first_name: 'Wil',
		last_name: 'Fisher',
		primary_email: 'wil@foch.com',
		secondary_email: 'wil2@foch.com',
		password: 'afd892hadf',
		privileges: 'admin'
	};

	var dummyRichard = {
		first_name: 'Richard',
		last_name: 'Evans',
		primary_email: 'richard@foch.com',
		secondary_email: 'richard2@foch.com',
		password: '98fasdh39f',
		privileges: 'admin'
	};

	var dummyAdmin = {
		first_name: 'Anon',
		last_name: 'Ymouse',
		primary_email: 'admin@foch.com',
		secondary_email: 'admin2@foch.com',
		password: 'ads78fkj39r',
		privileges: 'admin'
	};

	return [dummyBes, dummyWil, dummyRichard, dummyAdmin];
};