var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;

function $ (val) { return element(by.id(val));}

	describe('Initialize tests on signup', function () {

		it('should delete cookies and clear localStorage', function (){
			browser.ignoreSynchronization = true;
			browser.driver.get(params.service.clerk);
			expect(browser.getCurrentUrl()).toContain(params.service.clerk);

			browser.manage().deleteAllCookies();
			browser.executeScript('window.localStorage.clear();');
		});
	});

	describe('Sign up process: ', function(){

		var signUp    = new SignUpPages();
		var signIn    = new SignInPages();
		var mock      = Mocks.member({
			primaryEmail: 'besart@' + Math.random().toString(36).substring(10) + '.org',
			password:     'besart_random'
		});

		it('should see the signup form', function (){
			browser.ignoreSynchronization = true;
			browser.driver.get(params.service.clerk);
			expect(browser.getCurrentUrl()).toContain(params.service.clerk);

			expect($("sign-up-panel-1").isPresent()).toBe(true);
		});

		it('Panel 1 - email and password', function (){
			browser.ignoreSynchronization = true;

			expect($("sign-up-panel-2").isPresent()).toBe(false);

			$("email").sendKeys("besart@gmail.com");
			$("confirm-email").sendKeys("besart@gmail.com");
			$("password").sendKeys("hello");
			$("confirm-password").sendKeys("hello");

			$("next-btn").click();

			expect($("sign-up-panel-2").isPresent()).toBe(true);
		});

		it('Panel 2 - membership type', function () {
			browser.ignoreSynchronization = true;

			expect($("sign-up-panel-3").isPresent()).toBe(false);
			expect($("sign-up-panel-2").isPresent()).toBe(true);

			element(by.cssContainingText("option", "Life double")).click();
			$("next-btn").click();
		});

		it('Panel 3 - personal', function (){

			expect($("sign-up-panel-4").isPresent()).toBe(false);
			expect($("sign-up-panel-3").isPresent()).toBe(true);

			$("title").sendKeys("title");
			$("initials").sendKeys("initials");
			$("first_name").sendKeys("Besart");
			$("last_name").sendKeys("Hoxhaj");
			$("next-btn").click();

			expect($("sign-up-panel-4").isPresent()).toBe(true);
		});

		it('Panel 4 - address', function (){

			expect($("sign-up-panel-5").isPresent()).toBe(false);
			expect($("sign-up-panel-4").isPresent()).toBe(true);

			$("address1").sendKeys("address1");
			$("address2").sendKeys("address2");
			$("address3").sendKeys("address3");
			$("address4").sendKeys("address4");
			$("county").sendKeys("county");
			$("postcode").sendKeys("postcode");
			$("next-btn").click();

			expect($("sign-up-panel-5").isPresent()).toBe(true);
		});

		it('Panel 5 - contacts', function (){

			expect($("sign-up-panel-6").isPresent()).toBe(false);
			expect($("sign-up-panel-5").isPresent()).toBe(true);

			$("home").sendKeys("home");
			$("mobile").sendKeys("mobile");
			expect($("primary").getAttribute("value")).toBe("besart@gmail.com");
			$("secondary").sendKeys("secondary");
			$("next-btn").click();
			
			expect($("sign-up-panel-6").isPresent()).toBe(true);
		});

		it('Panel 6 - gift aid', function (){

			expect($("sign-up-panel-7").isPresent()).toBe(false);
			expect($("sign-up-panel-6").isPresent()).toBe(true);

			$("print").click();
			$("next-btn").click();
			
			expect($("sign-up-panel-7").isPresent()).toBe(true);
		});

		it('Panel 7 - news type', function (){

			expect($("sign-up-panel-8").isPresent()).toBe(false);
			expect($("sign-up-panel-7").isPresent()).toBe(true);

			element(by.cssContainingText("option", "Online")).click();
			$("next-btn").click();
			
			expect($("sign-up-panel-8").isPresent()).toBe(true);
		});

		it('Panel 8 - check data', function (){

			expect($("sign-up-panel-8").isPresent()).toBe(true);

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
		});

		it('Confirm data', function (){

			expect($("sign-up-panel-8").isPresent()).toBe(true);

			$("confirm").click();

			stop();

			expect($("emailSent").isPresent()).toBe(true);

			$("continue").click();
		});

		it("Should see home menu", function (){

			expect($("vieworsignup").isPresent()).toBe(true);
		});
	});
// ------------------------------------------------------------------------------------
// Activation
// ------------------------------------------------------------------------------------









// ------------------------------------------------------------------------------------