/**
 *
 *
 */

var utils = module.exports = {
	is:            require("torf"),
	clean:         require("d-bap"),
	lazy:          require("lazy.js"),
	request:       require("./services/request.js").request,
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