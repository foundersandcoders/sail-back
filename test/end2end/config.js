/**
 *
 *
 */

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	multiCapabilities: [{
		browserName: 'chrome'
	}],
	specs: [
		'./auth/signup.spec.js',
		'./auth/signin.spec.js',
		'./admin/member.search.spec.js',
		'./admin/member.create.spec.js',
		'./admin/member.edit.spec.js',
		'./admin/member.payments.spec.js',
		// './admin/upload.spec.js'
	],
	params: {
		admin: {
			email:    'admin@foch.org',
			password: 'ads78fkj39r'
		},
		service: {
			clerk: 'http://localhost:1337'
		},
		helpers: {
			pages:  require(__dirname  + '/pages.js'),
			mocks:  require(__dirname  + '/mocks.js'),
			object: require(__dirname + '/_helpers/form-input-object.js')
		}
	},
	jasmineNodeOpts: {
		showColors: true,
		isVerbose: true,
		includeStackTrace: true
	}
}