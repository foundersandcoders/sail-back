'use strict';

var test    = require("tape");
var server  = require("./startServer.js");

test('Stop server', function (t) {

	server(function (err, instance) {

		t.ok(instance, 'got instance');

		instance.lower(function () {

			t.pass('lower sails');
			t.end();
			process.exit(0);
		});
	});
});