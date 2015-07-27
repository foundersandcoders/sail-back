'use strict';

var test        = require('tape');
var EventsModel = require('../../../api/models/Events.js');


test('#getPlacesAvailable', function (t) {

	EventsModel.getPlacesAvailable(1, function (err, places) {

		console.log(arguments);
		t.end();
	});
});