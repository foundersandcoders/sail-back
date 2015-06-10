"use strict";

var stop        = function(){return browser.pause()};
var Mocks       = browser.params.helpers.mocks;
var SignUpPages = browser.params.helpers.pages.SignUp;
var SignInPages = browser.params.helpers.pages.SignIn;
var params      = browser.params;
var path        = require("path");

function $ (val) { return element(by.id(val));}

describe("Upload", function () {

    it('load page', function () {
    
        browser.ignoreSynchronization = true;
       
        browser.driver.get(params.service.clerk + "/maintenance");
        expect(browser.getCurrentUrl()).toContain("/maintenance");
        
        browser.manage().deleteAllCookies();
    });
    
    it("should load members", function () {
   
        browser.ignoreSynchronization = true;
        
        var pathToCsv = "./mockmembers.csv";
        var absPath = path.resolve(__dirname, pathToCsv);
        
        $("upload-members").sendKeys(absPath);
    });
    
    it("should display length if no duplicates", function () {
   
        browser.ignoreSynchronization = true;

        expect($("file-length").getText()).toContain("14");
    });
    
    it("click confirm", function () {
   
        browser.ignoreSynchronization = true;

        var confirmButton = $("confirm-upload");
        expect(confirmButton.getText()).toContain("Upload");
        browser.driver.manage().window().maximize();
        confirmButton.click(); 
    });
    
    it("click confirm", function () {

        browser.ignoreSynchronization = true;
    });
});