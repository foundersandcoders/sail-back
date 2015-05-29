var memberTypes = module.exports.memberTypes = [{
		value: "annual-single",
		description: "Annual Single"
	}, {
		value: "annual-double",
		description: "Annual Double"
	},{
		value: "annual-family",
		description: "Annual Family"
	},{
		value: "life-single",
		description: "Life Single"
	},{
		value: "life-double",
		description: "Life Double"
	},{
		value: "group-annual",
		description: "Group Annual"
	},{
		value: "corporate-annual",
		description: "Corporate Annual"
	}
];

var newsType = module.exports.newsType = [{
		value: "post",
		description: "Post"
	},{
		value: "online",
		description: "Online"
	}
];

var deletionReasons = module.exports.deletionReasons = [{
		value:      "deceased",
		description: "Deceased"
	},{
		value: "notResponding",
		description: "Did not respond to reminders"
	},{
		value: "duplicate",
		description: "Duplicate"
	}, {
		value: "dissatisfied",
		description: "Expressed dissatisfaction"
	},{
		value: "mailReturned",
		description: "Mail returned to us"
	}, {
		value: "moved",
		description: "Moved away"
	},{
		value: "notifiedTermination",
		description: "Notified termination"
	}, {
		value: "other",
		description: "Other"
	}
];

var paymentTypes = module.exports.paymentTypes = [
	{value:"CHQ",   description: "CHQ"},
	{value:"CASH",  description: "CASH"},
	{value:"SOA",   description: "SOA"},
	{value:"SOR",   description: "SOR"},
	{value:"BACSA", description: "BACSA"},
	{value:"BACSR", description: "BACSR"},
	{value:"CAFA",  description: "CAFA"},
	{value:"CAFR",  description: "CAFR"},
	{value:"HO",    description: "HO"}
];