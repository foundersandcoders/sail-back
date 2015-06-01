module.exports = function (query) {

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

	that.append = function (node) {

		try {
			that.elm.appendChild(node);
		} catch (e) {
			console.log("Error: ", e, query);
		}
	}

	return that;
};