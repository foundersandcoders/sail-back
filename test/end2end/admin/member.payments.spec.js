var stop       = function(){return browser.pause()};

var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var params       = browser.params;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var ViewPayments = params.helpers.pages.PaymentMember;
var MemberPaymentsControls = browser.params.helpers.pages.MemberPaymentsControls;

function $ (val) { return element(by.id(val));}

describe("Create payment: ", function(){
    var memberAdd       = new CreateMember();
    var memberMock      = Mocks.member({id: "4170239"});
    var paymentControls = new MemberPaymentsControls();
    var paymentMock     = Mocks.payment({});
    var viewPayment     = new ViewPayments();
    var donationMock    = Mocks.donation();
    var subMock         = Mocks.sub();

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

    // create payments
    it("enter payment details", function () {

        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        $("payment_btn").click();
        browser.sleep(500);
        element(by.cssContainingText("option", "CASH")).click();
        $("date").sendKeys("11-11-2013");
        $("reference").sendKeys(paymentMock.listReference);
        $("amount").sendKeys(paymentMock.total);
        $("notes").sendKeys(paymentMock.notes);
        $("charge").click();
        browser.sleep(500);
    });

    it("check payment has appeared", function (){

        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        expect(viewPayment.dateS.first().getText()).toBe("11-11-2013");
        expect(viewPayment.paymentS.first().getText()).toBe(paymentMock.total.toString());
        // expect(viewPayment.balanceDueS.first().getText()).toBe(String(0-Number(paymentMock.total)));
        expect(viewPayment.referenceS.first().getText()).toBe(paymentMock.listReference);
        expect(viewPayment.descriptionS.first().getText()).toBe("Payment by " + paymentMock.type);
        expect(viewPayment.noteS.first().getText()).toBe(paymentMock.notes);
    });

    it("enter donation details", function () {
        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        browser.sleep(500);
        $("donation_btn").click();
        browser.sleep(500);
        $("amount").sendKeys(donationMock.amount);
        $("notes").sendKeys(donationMock.notes);
        $("charge").click();
    });

    it("check donation has appeared", function () {

        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        browser.sleep(500);
        expect(viewPayment.chargeS.last().getText()).toBe(donationMock.amount);
        expect(viewPayment.descriptionS.last().getText()).toBe("Donation");
        // expect(viewPayment.balanceDueS.first().getText()).toBe(String(0-Number(paymentMock.total) + Number(donationMock.amount)));
        expect(viewPayment.noteS.last().getText()).toBe(donationMock.notes);
    });

    it("enter subscription details", function () {
        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        $("subscription_btn").click();
        browser.sleep(500);
        $("amount").sendKeys(subMock.amount);
        $("charge").click();
    });

    it("check subscription has appeared", function () {

        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + '/members/' + memberMock.id);

        browser.sleep(500);
        expect(viewPayment.chargeS.last().getText()).toBe(subMock.amount);
        expect(viewPayment.descriptionS.last().getText()).toBe("Subscription");
        // expect(viewPayment.balanceDueS.last().getText()).toBe(String(0-Number(paymentMock.total) + Number(donationMock.amount) + Number(subMock.amount)));
    });
});