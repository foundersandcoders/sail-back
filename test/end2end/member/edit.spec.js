var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;

function $ (val) { return element(by.id(val));}

describe('Edit member: ', function (){

	it('FROM past test, check if we are in "HOME"', function (){

		expect($("vieworsignup").isPresent()).toBe(true);
		$("vieworsignup").click();
	});

	it('Check values', function () {

		expect($("account").isPresent()).toBe(true);

		var memberPropsMapper = [
			{ value: "title",            prop: "title",           desc: "Title" },
			{ value: "initials",         prop: "initials",        desc: "Initials" },
			{ value: "Besart",           prop: "first_name",      desc: "First name" },
			{ value: "Hoxhaj",           prop: "last_name",       desc: "Last name" },
			{ value: "address1",         prop: "address1",        desc: "Address 1" },
			{ value: "address2",         prop: "address2",        desc: "Address 2" },
			{ value: "address3",         prop: "address3",        desc: "Address 3" },
			{ value: "address4",         prop: "address4",        desc: "Address 4" },
			{ value: "county",           prop: "county",          desc: "County" },
			{ value: "postcode",         prop: "postcode",        desc: "Postcode" },
			{ value: "home",             prop: "home_phone",      desc: "Home phone" },
			{ value: "mobile",           prop: "mobile_phone",    desc: "Mobile phone" },
			{ value: "besart@gmail.com", prop: "primary_email",   desc: "Primary email" },
			{ value: "secondary",        prop: "secondary_email", desc: "Secondary email" },
			{ value: "life-double",      prop: "membership_type", desc: "Membership type", select: true, options: module.exports.memberTypes },
			{ value: "online",           prop: "news_type",       desc: "News type",       select: true, options: module.exports.newsType    }
		];

		memberPropsMapper.forEach(function (elm) {

			expect($(elm.prop).getText()).toBe(elm.desc);
			expect($("value-"+elm.prop).getText()).toBe(elm.value);
		});

		$("edit-account").click();
	});

	it('Check values inside inputs', function () {

		expect($("edit-title").isPresent()).toBe(true);

		var memberPropsMapper = [
			{ value: "title",            prop: "title",           desc: "Title" },
			{ value: "initials",         prop: "initials",        desc: "Initials" },
			{ value: "Besart",           prop: "first_name",      desc: "First name" },
			{ value: "Hoxhaj",           prop: "last_name",       desc: "Last name" },
			{ value: "address1",         prop: "address1",        desc: "Address 1" },
			{ value: "address2",         prop: "address2",        desc: "Address 2" },
			{ value: "address3",         prop: "address3",        desc: "Address 3" },
			{ value: "address4",         prop: "address4",        desc: "Address 4" },
			{ value: "county",           prop: "county",          desc: "County" },
			{ value: "postcode",         prop: "postcode",        desc: "Postcode" },
			{ value: "home",             prop: "home_phone",      desc: "Home phone" },
			{ value: "mobile",           prop: "mobile_phone",    desc: "Mobile phone" },
			{ value: "besart@gmail.com", prop: "primary_email",   desc: "Primary email" },
			{ value: "secondary",        prop: "secondary_email", desc: "Secondary email" },
			{ value: "life-double",      prop: "membership_type", desc: "Membership type", select: true, options: module.exports.memberTypes },
			{ value: "online",           prop: "news_type",       desc: "News type",       select: true, options: module.exports.newsType    }
		];

		memberPropsMapper.forEach(function (elm) {

			expect($(elm.prop).getAttribute('value')).toBe(elm.value);
		});
	});

	it('Modify values', function (){

		expect($("edit-title").isPresent()).toBe(true);

		var memberPropsMapper = [
			{ value: "title",            prop: "title",           desc: "Title" },
			{ value: "initials",         prop: "initials",        desc: "Initials" },
			{ value: "Besart",           prop: "first_name",      desc: "First name" },
			{ value: "Hoxhaj",           prop: "last_name",       desc: "Last name" },
			{ value: "address1",         prop: "address1",        desc: "Address 1" },
			{ value: "address2",         prop: "address2",        desc: "Address 2" },
			{ value: "address3",         prop: "address3",        desc: "Address 3" },
			{ value: "address4",         prop: "address4",        desc: "Address 4" },
			{ value: "county",           prop: "county",          desc: "County" },
			{ value: "postcode",         prop: "postcode",        desc: "Postcode" },
			{ value: "home",             prop: "home_phone",      desc: "Home phone" },
			{ value: "mobile",           prop: "mobile_phone",    desc: "Mobile phone" },
			{ value: "besart@gmail.com", prop: "primary_email",   desc: "Primary email" },
			{ value: "secondary",        prop: "secondary_email", desc: "Secondary email" },
			{ value: "group",             prop: "membership_type", desc: "Membership type", select: true, options: module.exports.memberTypes },
			{ value: "post",              prop: "news_type",       desc: "News type",       select: true, options: module.exports.newsType    }
		];

		memberPropsMapper.forEach(function (elm) {

			if(elm.select) {
				var opt = elm.value.charAt(0).toUpperCase() + elm.value.slice(1);
				element(by.cssContainingText("option", opt)).click();
			} else {
				$(elm.prop).sendKeys('-m');
			}
		});

		$("save-cahnges").click();
	});

	it('Check modified values', function () {
		expect($("account").isPresent()).toBe(true);

		var memberPropsMapper = [
			{ value: "title",            prop: "title",           desc: "Title" },
			{ value: "initials",         prop: "initials",        desc: "Initials" },
			{ value: "Besart",           prop: "first_name",      desc: "First name" },
			{ value: "Hoxhaj",           prop: "last_name",       desc: "Last name" },
			{ value: "address1",         prop: "address1",        desc: "Address 1" },
			{ value: "address2",         prop: "address2",        desc: "Address 2" },
			{ value: "address3",         prop: "address3",        desc: "Address 3" },
			{ value: "address4",         prop: "address4",        desc: "Address 4" },
			{ value: "county",           prop: "county",          desc: "County" },
			{ value: "postcode",         prop: "postcode",        desc: "Postcode" },
			{ value: "home",             prop: "home_phone",      desc: "Home phone" },
			{ value: "mobile",           prop: "mobile_phone",    desc: "Mobile phone" },
			{ value: "besart@gmail.com", prop: "primary_email",   desc: "Primary email" },
			{ value: "secondary",        prop: "secondary_email", desc: "Secondary email" },
			// { value: "life-double",      prop: "membership_type", desc: "Membership type", select: true, options: module.exports.memberTypes },
			// { value: "online",           prop: "news_type",       desc: "News type",       select: true, options: module.exports.newsType    }
		];

		memberPropsMapper.forEach(function (elm) {

			expect($(elm.prop).getText()).toBe(elm.desc);
			expect($("value-"+elm.prop).getText()).toBe(elm.value + "-m");
		});

		expect($("value-membership_type").getText()).toBe("group-annual");
		expect($("value-news_type").getText()).toBe("post");

		$("edit-account").click();
	});
});