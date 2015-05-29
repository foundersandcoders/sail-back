var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;


describe("Create member: ", function(){
	var memberAdd  = new CreateMember();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	// TODO: create a member with all the attributes
	it("should be able to fill all inputs and create a member.", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/addmember");

		memberAdd.id.sendKeys(memberMock.id);
		memberAdd.firstName.sendKeys(memberMock.firstName);
		memberAdd.initials.sendKeys(memberMock.initials);
		memberAdd.lastName.sendKeys(memberMock.lastName);
		memberAdd.title.sendKeys(memberMock.title);
		memberAdd.email1.sendKeys(memberMock.email1);
		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);
	});
	// TODO: check a member with all the attributes
	it("should see the correct values", function () {
		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

		stop();

		expect(memberView.id.getText()).toBe(memberMock.id);
		expect(memberView.fullName.getText()).toBe(memberMock.fullName);
		expect(memberView.status.getText()).toBe(memberMock.status);
		expect(memberView.dateJoined.getText()).toBe(memberMock.dateJoined);
		expect(memberView.registered.getText()).toBe(memberMock.registered);
	});
});