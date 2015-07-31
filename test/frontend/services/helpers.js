'use strict'

var mockPayments = 'DatePaid;MembershipID;MembershipPaid;Donation;Event;Payment;Difference;PaymentMethod;Bank Slip Ref;PaymentNotes\n' +
  '03/01/12;6085;5;0;0;5;0;8 - Standing Order;61201;;'

var mockMembers = 'MembershipID;Title;Initial;Surname;FirstName;Add1;Add2;Add3;Add4;County;PostCode;Deliverer;HomePhone;MobilePhone;WorkPhone;DOB;Age;Email;Email2;EmailReturned;DateJoined;Membership Type;DateStatusChange;LifePaymentDate;Membership Notes;Gift Aid;Date Signed;GADCancelled;StandingOrder;DeleteRecord;DateofDeletion;Reason For Deletion;LapsedMember\n' +
  '11111;Mr;D S;SofeŽ;John Bes;lfkdsja;kjladfsdfsa;;;London;klfhadjs;Post;;;;;0;djkfhsa@bhfd.com;;VERO;12/3/2012;Single;;;;VERO;22/3/2006;;FALSO;FALSO;;;FALSO\n' +
  '5344;Mr;J V;asdf;;fasdfasdfasdf;Langstone;;cz<zxc;cvxzvcx;cv cvx;PH;789435 484532218;;;;0;;;FALSO;;Single;;;;VERO;01/01/07;;FALSO;FALSO;FALSO\n' +
  '78954;Mrs;D S;fasdfa;;lkfasjdha;afsdf;;fjdksa;kjsdfha;PO18 0AU;Post;;;;;0;;;FALSO;;Single;;;;FALSO;;;VERO;FALSO;FALSO'

var arrPayments = [{
  'member': '471800',
  'type': 'CHQ',
  'reference': 'DH47F',
  'category': 'subscription',
  'description': 'Some description',
  'amount': 50.5,
  'notes': 'This is a note',
  'date': '2011-01-01T00:00:00.000Z',
  'id': 1,
  'createdAt': '2015-06-17T11:47:27.000Z',
  'updatedAt': '2015-06-17T11:47:27.000Z'
}, {
  'member': '471800',
  'type': 'CHQ',
  'reference': 'DH47F',
  'category': 'donation',
  'description': 'Some description',
  'amount': 20,
  'notes': 'This is a nice donation',
  'date': '2012-01-01T00:00:00.000Z',
  'id': 2,
  'createdAt': '2015-06-17T11:47:27.000Z',
  'updatedAt': '2015-06-17T11:47:27.000Z'
}, {
  'member': '471800',
  'type': 'CHQ',
  'reference': 'DH47F',
  'category': 'payment',
  'description': 'Some description',
  'amount': 30.5,
  'notes': 'This is a nice payment',
  'date': '2013-01-01T00:00:00.000Z',
  'id': 3,
  'createdAt': '2015-06-17T11:47:27.000Z',
  'updatedAt': '2015-06-17T11:47:27.000Z'
}, {
  'member': '471800',
  'type': 'CASH',
  'reference': null,
  'category': 'payment',
  'description': 'Payment',
  'amount': 200,
  'notes': null,
  'date': '2015-06-16T23:00:00.000Z',
  'id': 4,
  'createdAt': '2015-06-17T11:50:41.000Z',
  'updatedAt': '2015-06-17T11:50:41.000Z'
}
]

module.exports = {
  members: mockMembers,
  payments: mockPayments,
  arrPayments: arrPayments
}
