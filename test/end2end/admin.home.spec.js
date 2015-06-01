var stop        = function(){return browser.pause()};
var AdminPages  = browser.params.helpers.pages.Admin;
var params      = browser.params;

describe("Admin home screen: ", function(){
	var admin    = new AdminPages();

	// it("new member button", function () {
	// 	browser.ignoreSynchronization = true;

	// 	admin.newMemberButton.click();

	// 	expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/addmember');
	// });
	it("search by member name", function (){
		browser.ignoreSynchronization = true;


		stop();
	});
});