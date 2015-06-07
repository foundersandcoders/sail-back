var stop         = function(){return browser.pause()};
var Mocks        = browser.params.helpers.mocks;
var CreateMember = browser.params.helpers.pages.CreateMember;
var EditMemeber  = browser.params.helpers.pages.EditMemeber;
var ViewMember   = browser.params.helpers.pages.ViewMember;
var params       = browser.params;

describe("Edit member mode: ", function (){
	var memberAdd  = new CreateMember();
	var memberEdit = new EditMemeber();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	it("should be able to switch to edit mode", function () {});
	it("should be able to switch to view mode", function () {});
});

describe("Edit member: ", function (){
	var memberAdd  = new CreateMember();
	var memberEdit = new EditMemeber();
	var memberView = new ViewMember();
	var memberMock = Mocks.member();

	it("should be able to switch to edit mode", function () {});
	it("should be able to see the right input values", function () {});
	it("should be able to modify the inputs and save", function () {});
});