"use strict";

var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;
var path        = require("path");

function $ (val) { return element(by.id(val));}

describe("Upload", function () {

    it('Load page', function () {
    
        browser.ignoreSynchronization = true;
       
        browser.driver.get(params.service.clerk + "/maintenance");
        expect(browser.getCurrentUrl()).toContain("/maintenance");
    });
    
    it("Should load members", function () {
   
        browser.ignoreSynchronization = true;
        
        var pathToCsv = "./mock.members.csv";
        var absPath = path.resolve(__dirname, pathToCsv);
        
        $("upload-members").sendKeys(absPath);
    });
    
    it("Should display length if no duplicates", function () {
   
        browser.ignoreSynchronization = true;

        expect($("file-length").getText()).toContain("1");
    });
    
    it("Click confirm members upload", function () {
   
        browser.ignoreSynchronization = true;

        var confirmButton = $("confirm-upload");
        expect(confirmButton.getText()).toContain("Upload");
        browser.driver.manage().window().maximize();
        confirmButton.click();
        browser.sleep(1000);
    });

    it("Check if member are uploaded", function () {

        browser.ignoreSynchronization = true;
        browser.driver.get(params.service.clerk + "/admin");
        $("search-field-id").sendKeys("6085");
        $("search-button").click();
        browser.sleep(1500);

        expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/members/6085");
    });

    it("Upload payments", function () {

        browser.ignoreSynchronization = true;
        browser.driver.get(params.service.clerk + "/maintenance");
        var pathToCsv = "./mock.payments.csv";
        var absPath = path.resolve(__dirname, pathToCsv);

        $("upload-payments").sendKeys(absPath);
    });

    it("Click confirm payments upload", function () {
   
        browser.ignoreSynchronization = true;
        var confirmButton = $("confirm-upload");
        expect(confirmButton.getText()).toContain("Upload");
        browser.driver.manage().window().maximize();
        confirmButton.click();
    });

    it("Check if member are uploaded", function () {

        browser.ignoreSynchronization = true;
        browser.driver.get(params.service.clerk + "/members/6085");
        expect(browser.getCurrentUrl()).toContain(params.service.clerk + "/members/6085");
    });
});