var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var EditMember   = browser.params.helpers.pages.EditMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Check edit mode member: ", function(){
	var memberEdit = new EditMember();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	it("by default should be in 'VIEW MODE'", function (){

		browser.ignoreSynchronization = true;

		expect(memberEdit.mode.isPresent()).toBe(true);
		expect(memberEdit.modeSave.isPresent()).toBe(false);
		expect(memberEdit.modeCancel.isPresent()).toBe(false);
		expect(memberEdit.mode.getText()).toBe("Edit");
	});

	it("should be able to switch to 'EDIT MODE'", function (){

		browser.ignoreSynchronization = true;

		memberEdit.mode.click();

		browser.sleep(1500);
	});

	it("should see 'EDIT MODE' buttons", function (){

		browser.ignoreSynchronization = true;

		expect(memberEdit.modeSave.isPresent()).toBe(true);
		expect(memberEdit.modeCancel.isPresent()).toBe(true);
		expect(memberEdit.modeSave.getText()).toBe("Save");
		expect(memberEdit.modeCancel.getText()).toBe("Cancel");
	});

	it("should see the 'PROFILE' inputs pre-filled", function () {

		browser.ignoreSynchronization = true;

		expect(memberEdit.id.getAttribute("value")).toBe(memberMock.id);
		expect(memberEdit.title.getAttribute("value")).toBe(memberMock.title);
		expect(memberEdit.initials.getAttribute("value")).toBe(memberMock.initials);
		expect(memberEdit.firstName.getAttribute("value")).toBe(memberMock.firstName);
		expect(memberEdit.lastName.getAttribute("value")).toBe(memberMock.lastName);
		expect(memberEdit.primaryEmail.getAttribute("value")).toBe(memberMock.primaryEmail);
		expect(memberEdit.secondaryEmail.getAttribute("value")).toBe(memberMock.secondaryEmail);
	});

	it("should see the 'ADDRESS' inputs pre-filled", function () {

		browser.ignoreSynchronization = true;

		expect(memberEdit.address1.getAttribute("value")).toBe(memberMock.address1);
		expect(memberEdit.address2.getAttribute("value")).toBe(memberMock.address2);
		expect(memberEdit.county.getAttribute("value")).toBe(memberMock.county);
		expect(memberEdit.postcode.getAttribute("value")).toBe(memberMock.postcode);
		expect(memberEdit.homePhone.getAttribute("value")).toBe(memberMock.homePhone);
		expect(memberEdit.workPhone.getAttribute("value")).toBe(memberMock.workPhone);
		expect(memberEdit.mobilePhone.getAttribute("value")).toBe(memberMock.mobilePhone);
	});

	it("should see the 'MEMBERSHIP' inputs pre-filled", function () {

		browser.ignoreSynchronization = true;

		expect(memberEdit.membershipType.$('option:checked').getText()).toBe("Annual double");
		expect(memberEdit.dateJoined.getAttribute("value")).toBe(memberMock.dateJoined);
		expect(memberEdit.lifePaymentDate.getAttribute("value")).toBe((memberMock.lifePaymentDate || ""));
		expect(memberEdit.registered.isSelected()).toBe((memberMock.registered === "Registered"));
		expect(memberEdit.giftAidSigned.isSelected()).toBe(memberMock.giftAidSigned);
		expect(memberEdit.giftAidSignedDate.getAttribute("value")).toBe(memberMock.giftAidSignedDate);
		expect(memberEdit.standingOrder.isSelected()).toBe((memberMock.standingOrder === "Yes"));
		expect(memberEdit.notes.getAttribute("value")).toBe(memberMock.notes);
	});
});

describe("Edit member: ", function(){
	var memberEdit = new EditMember();
	var memberView = new ViewMember();

	var memberMock = Mocks.member({
		title: "Mrs.",
		initials: "G",
		firstName: "Willimina",
		lastName: "Gregory",
		primaryEmail: "willo@mars.com",
		secondaryEmail: "olliw@sram.moc",
		newsType: "Online",
		address1: "21 The Moon",
		address2: "Outer Galaxy",
		county: "West",
		postcode: "M1 00N",
		homePhone: "020123456",
		workPhone: "12341234",
		mobilePhone: "4314321",
		membershipType: "Annual single",
		dateJoined: "22-12-1999",
		lifePaymentDate: "",
		registered: "Registered",
		giftAidSigned: true,
		giftAidSignedDate: "12-03-1977",
		standingOrder: true,
		notes: "Nice lady."
	});

	it("should change the 'PROFILE' inputs - title", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.title);
		memberEdit.title.sendKeys(memberMock.title);
	});

	it("should change the 'PROFILE' inputs - initials", function () {
		browser.ignoreSynchronization = true;
		
		params.helpers.object.clear(memberEdit.initials);
		memberEdit.initials.sendKeys(memberMock.initials);
	});

	it("should change the 'PROFILE' inputs - firstName", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.firstName);
		memberEdit.firstName.sendKeys(memberMock.firstName);
	});

	it("should change the 'PROFILE' inputs - lastName", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.lastName);
		memberEdit.lastName.sendKeys(memberMock.lastName);
	});

	it("should change the 'PROFILE' inputs - primaryEmail", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.primaryEmail);
		memberEdit.primaryEmail.sendKeys(memberMock.primaryEmail);
	});

	it("should change the 'PROFILE' inputs - secondaryEmail", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.secondaryEmail);
		memberEdit.secondaryEmail.sendKeys(memberMock.secondaryEmail);
	});

	it("should change the 'PROFILE' inputs - newsType", function (){

		browser.ignoreSynchronization = true;
		element(by.cssContainingText("option", memberMock.newsType)).click();
	});

	it("should change the 'PROFILE' inputs - address1", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.address1);
		memberEdit.address1.sendKeys(memberMock.address1);
	});

	it("should change the 'PROFILE' inputs - address2", function () {
	
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.address2);
		memberEdit.address2.sendKeys(memberMock.address2);
	});

	it("should change the 'PROFILE' inputs - county", function () {
		
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.county);
		memberEdit.county.sendKeys(memberMock.county);
	});

	it("should change the 'PROFILE' inputs - postcode", function () {
		
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.postcode);
		memberEdit.postcode.sendKeys(memberMock.postcode);
	});

	it("should change the 'PROFILE' inputs - homePhone", function () {
		
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.homePhone);
		memberEdit.homePhone.sendKeys(memberMock.homePhone);
	});

	it("should change the 'PROFILE' inputs - workPhone", function () {
		
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.workPhone);
		memberEdit.workPhone.sendKeys(memberMock.workPhone);
	});

	it("should change the 'PROFILE' inputs - mobilePhone", function () {
		
		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.mobilePhone);
		memberEdit.mobilePhone.sendKeys(memberMock.mobilePhone);
	});

	it("should change the 'PROFILE' inputs - membershipType", function () {
		
		browser.ignoreSynchronization = true;

		element(by.cssContainingText("option", memberMock.membershipType)).click();
		params.helpers.object.clear(memberEdit.dateJoined);
		memberEdit.dateJoined.sendKeys(memberMock.dateJoined);
	});	

	it("should change the 'PROFILE' inputs - lifePaymentDate", function () {
		
		browser.ignoreSynchronization = true;
		
		params.helpers.object.clear(memberEdit.lifePaymentDate);
		memberEdit.lifePaymentDate.sendKeys(memberMock.lifePaymentDate);
	});	

	it("should change the 'PROFILE' inputs - registered", function () {

		browser.ignoreSynchronization = true;

		memberEdit.registered.click();
	});	

	it("should change the 'PROFILE' inputs - giftAidSigned", function () {

		browser.ignoreSynchronization = true;

		memberEdit.giftAidSigned.click();
	});	

	it("should change the 'PROFILE' inputs - giftAidSignedDate", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.giftAidSignedDate);
		memberEdit.giftAidSignedDate.sendKeys(memberMock.giftAidSignedDate);
		memberEdit.standingOrder.click();
	});	

	it("should change the 'PROFILE' inputs - notes", function () {

		browser.ignoreSynchronization = true;

		params.helpers.object.clear(memberEdit.notes);
		memberEdit.notes.sendKeys(memberMock.notes);
	});

	it("should click 'SAVE'", function (){

		browser.ignoreSynchronization = true;

		element(by.id("edit-member-save")).click();

		browser.sleep(1000);
	});

	it("should see the 'UPDATE' values for personal info", function () {

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

		// expect(memberView.dateJoined.getText()).toBe(memberMock.dateJoined);
		expect(memberView.membershipType.getText()).toBe("Annual Single");
		// expect(memberView.giftAidSignedDate.getText()).toBe(memberMock.giftAidSignedDate);
		expect(memberView.standingOrder.getText()).toBe((memberMock.standingOrder ? "Yes" : "No"));
		expect(memberView.registered.getText()).toBe(memberMock.registered);
		expect(memberView.membershipDueDate.getText()).toBe(memberMock.membershipDueDate);
	});
});