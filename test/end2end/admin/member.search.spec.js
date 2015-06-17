
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
		// form hooks created we now that there are three "acitve" members
		expect(element.all(by.css("#member-id")).count()).toBe(4);
	});

	it("Search for 'Hox' last name", function () {

		browser.ignoreSynchronization = true;
		$("#search-field-lastName").sendKeys("Fis");
		$("#search-button").click();
		browser.sleep(1500);

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/members/471663");
	});
});