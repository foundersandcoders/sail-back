var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var EditMember   = browser.params.helpers.pages.EditMember;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Edit member: ", function(){
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

		expect(memberEdit.membershipType.$('option:checked').getText()).toBe(memberMock.membershipType);
		expect(memberEdit.dateJoined.getAttribute("value")).toBe(memberMock.dateJoined);
		expect(memberEdit.lifePaymentDate.getAttribute("value")).toBe((memberMock.lifePaymentDate || ""));
		expect(memberEdit.registered.isSelected()).toBe((memberMock.registered === "Registered"));
		expect(memberEdit.giftAidSigned.isSelected()).toBe(memberMock.giftAidSigned);
		expect(memberEdit.giftAidSignedDate.getAttribute("value")).toBe(memberMock.giftAidSignedDate);
		expect(memberEdit.standingOrder.isSelected()).toBe((memberMock.standingOrder === "Yes"));
		expect(memberEdit.notes.getAttribute("value")).toBe(memberMock.notes);
	});
});