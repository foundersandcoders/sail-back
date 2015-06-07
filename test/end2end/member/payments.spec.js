var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

function $ (val) { return element(by.id(val));}

describe('Go to main menu', function (){

	it("Click to home", function () {

		expect($("vieworsignup").isPresent()).toBe(false);
		$("menu-nav").click();
	});
	it("Be in home", function () {

		expect($("vieworsignup").isPresent()).toBe(true);
	});
});

describe("Payments", function () {

	it("go to payment screen", function () {

		expect($("my-account").isPresent()).toBe(false);
		$("#make-payment").click();
		expect($("my-account").isPresent()).toBe(true);
	});
});