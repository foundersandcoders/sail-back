var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;

function $ (val) { return element(by.id(val));}

describe('Sign in process: ', function(){

	it("should sign in successful", function () {

		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/signin");

		$("email").sendKeys(params.admin.email);
		$("password").sendKeys(params.admin.password);
		$("signin-btn").click();
	});

	it("after sign in should be redirected to admin page", function () {

		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/admin");
	});
});