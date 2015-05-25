var $$ = module.exports.$$ = function (query) {

	var that = {};

	try{
		that.elm = document.getElementById(query);
	} catch (e) {
		console.log("Error: ", e, query);
		return {error: e, query: query};
	}

	that.valSelect = function () {

		try {
			var a = that.elm.options[that.elm.selectedIndex].value;
		} catch (e) {
			console.log("Error: ", e, query);
		}

		return a;
	};

	that.value = function () {

		try {
			var a = that.elm.value;
		} catch (e) {
			console.log("Error: ", e, query);
		}

		return a;
	};

	that.text = function () {

		try {
			var a = that.elm.textContent;
		} catch (e) {
			console.log("Error: ", e, query);
		}

		return a;
	};

	that.checkedValue = function () {

		try {
			var a = that.elm.checked;
		} catch (e) {
			console.log("Error: ", e, query);
		}

		return a;
	};

	return that;
};


var replaceNice = module.exports.replaceNice = function replaceNice (string) {

	return (string || "").replace("-", " ").split(" ").map(function (elm){
		return elm.charAt(0).toUpperCase() + elm.slice(1);
	}).join(" ");
};


var createOpts = module.exports.createOpts = function (method, payload) {

	try{
		var id = $$("member-id").text();
	} catch(e) {
		console.log("Err _createOptions: ", e);
	}

	if(method === "PUT"){
		return {
			method: method,
			url: "/api/members/" + id,
			json: payload
		}
	} else if (method === "GET") {
		return {
			method: method,
			url: "/api/members/" + id,
		}
	}
};