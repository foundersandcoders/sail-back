'use strict'

process.env.NODE_ENV = 'testing'

// services
require('./services/Utils.test.js')
require('./services/Upload.test.js')
require('./services/ForgotPass.test.js')

// acceptance server
require('./_bootstrap/start.test.js')
require('./private/upload.test.js')
require('./private/addMember.test.js')
require('./auth/signup.test.js')
require('./auth/signin.test.js')
require('./auth/forgot.test.js')
require('./account/myAccount.test.js')
require('./account/update.test.js')
require('./payments/payments.test.js')
require('./events/booking.test.js')
require('./events/events.test.js')
require('./_bootstrap/dropDb.test.js')
require('./_bootstrap/end.test.js')
