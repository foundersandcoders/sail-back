var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;

// ------------------------------------------------------------------------------------
// Old signup
// ------------------------------------------------------------------------------------
	// describe('As admin I can login and see admin home screen', function(){
	// 	var signUp    = new SignUpPages();
	// 	var signIn    = new SignInPages();

	// 	beforeEach(function (){
	// 		browser.manage().deleteAllCookies();
	// 	});
	// 	it("should be closed to non-admin", function () {
	// 		browser.ignoreSynchronization = true;
	// 		browser.driver.get(params.service.clerk + "/admin");

	// 		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/login');
	// 	});
	// 	it('from "signUp"', function(){
	// 		browser.ignoreSynchronization = true;
	// 		browser.driver.get(params.service.clerk + "/signup");

	// 		signUp.email.sendKeys("besart");
	// 		signUp.password.sendKeys("hello");
	// 		signUp.cpassword.sendKeys("hello");
	// 		signUp.submit.click();
	// 		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/admin');
	// 	});

	// 	it("should be able to signIn after signup", function (){
	// 		browser.ignoreSynchronization = true;
	// 		browser.driver.get(params.service.clerk + "/login");

	// 		signIn.email.sendKeys("besart");
	// 		signIn.password.sendKeys("hello");
	// 		signIn.submit.click();
	// 		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/admin');
	// 	});
	// });
// ------------------------------------------------------------------------------------
// New signup
// ------------------------------------------------------------------------------------
	describe('Validation "signUp" process: ', function(){
		var signUp    = new SignUpPages();
		var signIn    = new SignInPages();
		var mock      = Mocks.member({
			primaryEmail: 'besart@' + Math.random().toString(36).substring(10) + '.org',
			password:     'besart_random'
		});

		beforeEach(function (){
			browser.manage().deleteAllCookies();
		});
		// it('from "signIn" can go to "signUp"', function(){
		// 	browser.ignoreSynchronization = true;
		// 	browser.driver.get(params.service.clerk+'/signin');
		// 	expect(browser.getCurrentUrl()).toContain(params.service.clerk+'/signin');
		// 	signIn.signUpLink.click();
		// 	expect(browser.getCurrentUrl()).toContain(params.service.clerk+'/signup');
		// });
		it('if EMAIL is already in use, stay in the page and show error message', function (){
			browser.ignoreSynchronization = true;
			browser.driver.get(params.service.clerk+'/signup');
			expect(browser.getCurrentUrl()).toContain(params.service.clerk+'/signup');
			signUp.email.sendKeys(params.admin.email);
			signUp.cemail.sendKeys(params.admin.email);
			signUp.password.sendKeys(mock.password);
			signUp.cpassword.sendKeys(mock.password);
			signUp.submit.click();
			// expect(signUp.errorMess.getText()).toBe('Email has an active account. Sign in.');
		});
		it('if no email is provided, show red border', function (){
			browser.ignoreSynchronization = true;
			browser.driver.get(params.service.clerk+'/signup');
			signUp.submit.click();
			// expect(signUp.email.getCssValue('border')).toBe(params.error.color);
		});
		it('should be able to ENTER and EMAIL and signUp', function (){
			browser.ignoreSynchronization = true;
			browser.driver.get(params.service.clerk+'/signup');
			expect(browser.getCurrentUrl()).toContain(params.service.clerk+'/signup');
			signUp.email.sendKeys(mock.primaryEmail);
			signUp.cemail.sendKeys(mock.primaryEmail);
			signUp.password.sendKeys(mock.password);
			signUp.cpassword.sendKeys(mock.password);
			signUp.submit.click();
			expect(signUp.checkEmailMess.isPresent()).toBe(true);
		});
	});
// ------------------------------------------------------------------------------------
// Activation
// ------------------------------------------------------------------------------------









// ------------------------------------------------------------------------------------