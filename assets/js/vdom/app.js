;(function () {
	"use strict";

	var utils = module.exports.utils = {
		is:            require("torf"),
		clean:         require("d-bap"),
		lazy:          require("lazy.js"),
		diff:          require('virtual-dom/diff'),
		patch:         require('virtual-dom/patch'),
		createElement: require('virtual-dom/create-element'),
		request:       require("./services/request.js").request,
		upload:        require("upload-element"),
		moment:        require("moment"),
		observ:        require("observ"),
		observS:       require("observ-struct"),
		observA:       require("observ-array"),
		h:             require("virtual-dom/h"),
		$$:            require("./services/jQuery.like.js"),
		createOpts:    require("./services/request").createOpts,
		parseCsv:      require("./services/parsecsv.js").parse,
		replaceNice:   require("./helpers").replaceNice,
		lastSub:       require("./helpers").lastSub,
		vDomHelpers:   require("./services/vDom"),
		mocks:         require("./services/mockData.js"),
		orderPayments: require("./helpers").orderPayments,
		balanceDue:    require("./helpers").balanceDue,
	};

	try{
		// require("./pages/adminhome.js")(utils);
		// require("./pages/member.page.js")(utils);
		// require("./pages/maintenance.js")(utils);
		require("./pages/signup.js")(utils);
	} catch (e){
		console.log("Index: ", e)
	}
}());
