var memberTypes = module.exports.memberTypes = [{
		value: "annual-single",
		description: "Annual single"
	}, {
		value: "annual-double",
		description: "Annual double"
	},{
		value: "annual-family",
		description: "Annual family"
	},{
		value: "life-single",
		description: "Life single"
	},{
		value: "life-double",
		description: "Life double"
	},{
		value: "group-annual",
		description: "Group"
	},{
		value: "corporate-annual",
		description: "Corporate"
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

var memberPropsMapper = module.exports.memberPropsMapper = [
	{ prop: "title",           desc: "Title" },
	{ prop: "initials",        desc: "Initials" },
	{ prop: "first_name",      desc: "First name" },
	{ prop: "last_name",       desc: "Last name" },
	{ prop: "address1",        desc: "Address 1" },
	{ prop: "address2",        desc: "Address 2" },
	{ prop: "address3",        desc: "Address 3" },
	{ prop: "address4",        desc: "Address 4" },
	{ prop: "county",          desc: "County" },
	{ prop: "postcode",        desc: "Postcode" },
	{ prop: "home_phone",      desc: "Home phone" },
	{ prop: "mobile_phone",    desc: "Mobile phone" },
	{ prop: "primary_email",   desc: "Primary email" },
	{ prop: "secondary_email", desc: "Secondary email" },
	{ prop: "membership_type", desc: "Membership type", select: true, options: module.exports.memberTypes },
	{ prop: "news_type",       desc: "News type",       select: true, options: module.exports.newsType    }
];