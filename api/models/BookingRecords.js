/**
 *
 *
 *
 */

module.exports = {
	migrate: 'alter',
	attributes: {
		event_id: {
			model: 'Events'
		},
		head_member: {
			model: 'Members'
		},
		number_of_members: {
			type: 'FLOAT'
		},
		number_of_guests: {
			type: 'FLOAT'
		}
	}
};