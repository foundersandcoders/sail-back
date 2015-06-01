var stop        = function(){return browser.pause()};
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;

describe("Sign in: ", function(){
	var signIn = new SignInPages();

	beforeEach(function (){
		browser.manage().deleteAllCookies();
	});
	it("should be able to sign in", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/login");

		signIn.email.sendKeys(params.email);
		signIn.password.sendKeys(params.password);
		signIn.submit.click();
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/admin');
	});
});