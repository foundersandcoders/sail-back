'use strict'

Function.prototype.bind = require('function-bind')

// admin app tests
require('./admin/routes.test.js')
require('./admin/pages/add_member.test.js')
require('./admin/pages/data_maintenance.test.js')
require('./admin/pages/home.test.js')
require('./admin/pages/view_member.test.js')
require('./admin/pages/add_event.test.js')

// open app tests
require('./open/signin.test.js')
