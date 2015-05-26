// // Reset password codes

// module.exports = {
// 	migrate: 'alter',
// 	attributes: {
// 		code: {
// 			type: 'STRING'
// 		},
// 		user: {
// 			model: 'users'
// 		},
// 		valid: {
// 			type: "BOOLEAN",
// 			defaultsTo: true
// 		},
// 		expire_date: {
// 			type: 'DATE'
// 		}
// 	}
// };