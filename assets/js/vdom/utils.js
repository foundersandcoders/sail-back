/**
 *
 *
 */

var utils = module.exports = {
	is:            require("torf"),
	clean:         require("d-bap"),
	lazy:          require("lazy.js"),
	request:       require("./services/request.js").request,
	$$:            require("./services/jquery.like.js"),
	createOpts:    require("./services/request").createOpts,
	parseCsv:      require("./services/parsecsv.js").parse,
	formPost:      require("./services/formpost.js"),
	dateConverter: require("./services/dateconverter.js"),
	processEvents: require("./services/processevents.js"),
	replaceNice:   require("./helpers").replaceNice,
	lastSub:       require("./helpers").lastSub,
	vDomHelpers:   require("./services/vdom"),
	mocks:         require("./services/mockdata.js"),
	orderPayments: require("./helpers").orderPayments,
	balanceDue:    require("./helpers").balanceDue,
	validate:      require("./services/validate.js"),
};
