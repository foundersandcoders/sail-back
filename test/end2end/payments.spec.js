var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var params       = browser.params;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var ViewPayments = params.helpers.pages.PaymentMember;
var MemberPaymentsControls = browser.params.helpers.pages.MemberPaymentsControls;

describe("Create payment: ", function(){
	var memberAdd   = new CreateMember();
	var memberMock  = Mocks.member({id: "4170239"});
	var paymentControls  = new MemberPaymentsControls();
  var paymentMock = Mocks.payment({});
  var viewPayment = new ViewPayments();
  var donationMock = Mocks.donation();
  var subMock = Mocks.sub();

	// create member
  it("create a member", function (){
		browser.ignoreSynchronization = true;
		browser.driver.get(params.service.clerk + "/addmember");

		memberAdd.id.sendKeys(memberMock.id);
		memberAdd.firstName.sendKeys(memberMock.firstName);
		memberAdd.initials.sendKeys(memberMock.initials);
		memberAdd.lastName.sendKeys(memberMock.lastName);
		memberAdd.title.sendKeys(memberMock.title);
		memberAdd.primaryEmail.sendKeys(memberMock.primaryEmail);
		memberAdd.createButton.click();

		expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);
	});

  // create payments
  it("enter payment details", function () {
	browser.ignoreSynchronization = true;
	expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    element(by.cssContainingText("option", paymentMock.type)).click();

    paymentControls.paymentDate.sendKeys(paymentMock.date);
    paymentControls.paymentReference.sendKeys(paymentMock.listReference);
    paymentControls.paymentAmount.sendKeys(paymentMock.total);
    paymentControls.paymentNote.sendKeys(paymentMock.notes);
    paymentControls.paymentSubmit.click();
  });

  it("check payment has appeared", function (){

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    browser.refresh();
    browser.sleep(1000);
    browser.refresh();
    browser.sleep(1000);

    expect(viewPayment.dateS.first().getText()).toBe("08-11-2013");
    expect(viewPayment.paymentS.first().getText()).toBe(paymentMock.total.toString());
    expect(viewPayment.balanceDueS.first().getText()).toBe(String(0-Number(paymentMock.total)));
    expect(viewPayment.referenceS.first().getText()).toBe(paymentMock.listReference);
    expect(viewPayment.descriptionS.first().getText()).toBe("Payment by " + paymentMock.type);
    expect(viewPayment.noteS.first().getText()).toBe(paymentMock.notes);
  });

  it("enter donation details", function () {
    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    paymentControls.donationAmount.sendKeys(donationMock.amount);
    paymentControls.donationNote.sendKeys(donationMock.notes);
    paymentControls.donationPay.click();
  });

  it("check donation has appeared", function () {

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    browser.refresh();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);

    expect(viewPayment.chargeS.first().getText()).toBe(donationMock.amount);
    expect(viewPayment.descriptionS.first().getText()).toBe("Donation");
    expect(viewPayment.balanceDueS.first().getText()).toBe(String(0-Number(paymentMock.total) + Number(donationMock.amount)));
    expect(viewPayment.noteS.first().getText()).toBe(donationMock.notes);
  });

  it("enter subscription details", function () {
    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    paymentControls.subAmount.sendKeys(subMock.amount);
    paymentControls.subBtn.click();
  });

  it("check subscription has appeared", function () {

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    browser.refresh();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);

    expect(viewPayment.chargeS.first().getText()).toBe(subMock.amount);
    expect(viewPayment.descriptionS.first().getText()).toBe("Subscription");
    expect(viewPayment.balanceDueS.first().getText()).toBe(String(0-Number(paymentMock.total) + Number(donationMock.amount) + Number(subMock.amount)));
  });

  it("enter subscription details", function () {
    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    paymentControls.subAmount.sendKeys(subMock.amount);
    paymentControls.subRefundBtn.click();
  });

  it("check subscription has appeared", function () {

    browser.ignoreSynchronization = true;
    expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

    browser.refresh();
    browser.sleep(2000);
    browser.refresh();
    browser.sleep(2000);

    expect(viewPayment.chargeS.first().getText()).toBe(String(0-Number(subMock.amount)));
    expect(viewPayment.descriptionS.first().getText()).toBe("Subscription refund");
    expect(viewPayment.balanceDueS.first().getText()).toBe(String((0-Number(paymentMock.total)) + Number(donationMock.amount) + (Number(subMock.amount) - Number(subMock.amount))));
  });

});
