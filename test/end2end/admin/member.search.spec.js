
var params       = browser.params;
var Mocks        = browser.params.helpers.mocks;

function stop () { return browser.pause()};
function $ (val) { return element(by.css(val));}

describe("Search functionality", function () {

	it("should see form", function () {

		browser.ignoreSynchronization = true;
		expect($(".search-container").isPresent()).toBe(true);
	});

	it("Should see table result when press search", function () {

		browser.ignoreSynchronization = true;
		$("#search-button").click();
		browser.sleep(1500);
		expect($(".search-table-section-member-rows").isPresent()).toBe(true);
	});

	it("The results should contain 2", function () {

		browser.ignoreSynchronization = true;
		// form hooks created we now that there are two "acitve" members
		expect(element.all(by.css("#member-id")).get(0).getText()).toContain("433893");
		expect(element.all(by.css("#member-id")).get(1).getText()).toContain("471663");
	});

	it("Search for 'Hox' last name", function () {

		browser.ignoreSynchronization = true;
		$("#search-field-lastName").sendKeys("Evans");
		$("#search-button").click();
		browser.sleep(1500);

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/members/433893");
	});
});