module.exports.member   = member;
module.exports.payment  = payment;
module.exports.donation = donation;
module.exports.sub      = sub;

function member (proto) {

	var proto = proto || {};
	var that = {};

	that.password          = proto.password          || "correct";

	that.id                = proto.id                || "87654321";
	that.firstName         = proto.firstName         || "Besart";
	that.lastName          = proto.lastName          || "Hoxhaj";
	that.initials          = proto.initials          || "B J H";
	that.title             = proto.title             || "Mr.";
	that.primaryEmail      = proto.primaryEmail      || "primary@email.com";
	that.secondaryEmail    = proto.secondaryEmail    || "secondary@email.com";
	that.status            = proto.status            || "active";
	that.newsType          = proto.newsType          || "Post";
        
	that.address1          = proto.address1          || "Virtual Road D3";
	that.address2          = proto.address2          || "Mercury";
	that.county            = proto.county            || "Bobland";
	that.postcode          = proto.postcode          || "314159";
	that.deliverer         = proto.deliverer         || "";

	that.homePhone         = proto.homePhone         || "1111-2222-3333";
	that.workPhone         = proto.workPhone         || "2222-1111-3333";
	that.mobilePhone       = proto.mobilePhone       || "3333-1111-2222";

	that.membershipType    = proto.membershipType    || "Annual Double";
	that.dateJoined        = proto.dateJoined        || "12-12-2012";
	that.giftAidSignedDate = proto.giftAidSignedDate || "12-12-2014";
	that.standingOrder     = proto.standingOrder     || "No";
	that.notes             = proto.notes             || "Nice dude.";
	that.registered        = proto.registered        || "Unregistered";
	that.giftAidSigned     = proto.giftAidSigned     || false;
	that.membershipDueDate = proto.membershipDueDate || "01-Jan";

	that.fullName  = that.title + " " + that.firstName + " " + that.initials + " " + that.lastName;

	return that;
};


function payment (prot) {

  var prot = prot || {};
  var that = {};

  that.date          = prot.date          || "11/08/2013";
  that.type          = prot.type          || "CASH";
  that.listReference = prot.listReference || "INV1234";
  that.total         = prot.total         || 25;
  that.notes         = prot.notes         || "Payment for membership";

  return that;
}

function donation (prot) {

  var prot = prot || {};
  var that = {};

  that.amount = prot.amount || "10";
  that.notes  = prot.notes  || "donation yo";

  return that;
}

function sub (amount) {

  var that = {};

  that.amount = amount || "20";

  return that;
}