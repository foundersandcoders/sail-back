var pathToRegexp = require('path-to-regexp');
var queryString  = require('query-string');


module.exports = router;


function router (state) {

	// browsers only
	if (!window) return;

	var loc     = window.location;
	var win     = window;
	var started = false;

	function hash () {
		return ( '/' + (loc.href.split('#')[1] || ''));
	}

	function getQueryString (url) {
		return url.split("?")[1] || "";
	}

	function paramsParse (path) {

		var keys = [];
		var re   = pathToRegexp(path, keys);

		return re.exec(hash());
	}

	window.addEventListener("hashchange", function () {

		state.route.set(hash());
	});

	function route (path, handler) {
	
		var o         = {};
		o.params      = paramsParse(path);
		o.parsedQuery = queryString.parse(getQueryString(hash()));

		if(o.params) {
			return handler(state, o);
		}
	}
	
	return route;
}