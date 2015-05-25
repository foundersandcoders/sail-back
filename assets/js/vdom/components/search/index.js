"use strict";

var view  = require("./view");

module.exports = function (utils, state) {

	var that = {};
	var cc = false;

	that.render = function () {

		if (cc) {
			return view(state.members(), utils.moment);
		} else {
			cc = true;
		}
	};

	return that;
};
