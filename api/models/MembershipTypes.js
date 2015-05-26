// // Memberhsip types

module.exports = {
	migrate: 'alter',
	attributes: {
		description: {
			type: 'STRING'
		},
		value: {
			type: 'STRING'
		},
		members: {
			collection: 'Members',
			via: 'membership_type'
		}
	}
};