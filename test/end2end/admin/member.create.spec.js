var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Create member: ", function(){
	var memberAdd  = new CreateMember();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	it("should be able to fill all inputs and create a member.", function (){

		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/addmember");
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/addmember");

		// profile
		memberAdd.id.sendKeys(memberMock.id);
		memberAdd.firstName.sendKeys(memberMock.firstName);
		memberAdd.initials.sendKeys(memberMock.initials);
		memberAdd.lastName.sendKeys(memberMock.lastName);
		memberAdd.title.sendKeys(memberMock.title);

		// address
		memberAdd.address1.sendKeys(memberMock.address1);
		memberAdd.address2.sendKeys(memberMock.address2);
		memberAdd.county.sendKeys(memberMock.county);
		memberAdd.postcode.sendKeys(memberMock.postcode);
		// // memberAdd.deliverer.sendKeys(memberMock.deliverer);

		// contact
		memberAdd.homePhone.sendKeys(memberMock.homePhone);
		memberAdd.workPhone.sendKeys(memberMock.workPhone);
		memberAdd.mobilePhone.sendKeys(memberMock.mobilePhone);
		memberAdd.primaryEmail.sendKeys(memberMock.primaryEmail);
		memberAdd.secondaryEmail.sendKeys(memberMock.secondaryEmail);

		// membership
		element(by.cssContainingText("option", memberMock.membershipType)).click();
		memberAdd.dateJoined.sendKeys(memberMock.dateJoined);
		memberAdd.giftAidSigned.click();
		memberAdd.giftAidSignedDate.sendKeys(memberMock.giftAidSignedDate);
		element(by.cssContainingText("option", memberMock.newsType)).click();
		memberAdd.notes.sendKeys(memberMock.notes);

		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);
	});

	it("should see the correct values for personal info", function () {

		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

		expect(memberView.fullName.getText()).toBe(memberMock.fullName);
		expect(memberView.id.getText()).toBe(memberMock.id);
		expect(memberView.primaryEmail.getText()).toBe(memberMock.primaryEmail);
		expect(memberView.secondaryEmail.getText()).toBe(memberMock.secondaryEmail);
		expect(memberView.status.getText()).toBe(memberMock.status);
		expect(memberView.newsType.getText()).toBe(memberMock.newsType);
	});

	it("should see the correct values for address info", function () {

		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

		expect(memberView.address1.getText()).toBe(memberMock.address1);
		expect(memberView.address2.getText()).toBe(memberMock.address2);
		expect(memberView.county.getText()).toBe(memberMock.county);
		expect(memberView.postcode.getText()).toBe(memberMock.postcode);
		expect(memberView.homePhone.getText()).toBe(memberMock.homePhone);
		expect(memberView.workPhone.getText()).toBe(memberMock.workPhone);
		expect(memberView.mobilePhone.getText()).toBe(memberMock.mobilePhone);
	});

	it("should see the correct values for membership info", function () {

		browser.ignoreSynchronization = true;
		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

		expect(memberView.dateJoined.getText()).toBe(memberMock.dateJoined);
		expect(memberView.membershipType.getText()).toBe(memberMock.membershipType);
		expect(memberView.giftAidSignedDate.getText()).toBe(memberMock.giftAidSignedDate);
		expect(memberView.standingOrder.getText()).toBe(memberMock.standingOrder);
		expect(memberView.registered.getText()).toBe(memberMock.registered);
		expect(memberView.membershipDueDate.getText()).toBe(memberMock.membershipDueDate);
	});
});