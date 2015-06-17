"use strict";

var mockPayments = "03/01/12;6085;5;0;0;5;0;8 - Standing Order;61201;;";

var mockMembers  = "6085;Mr;J V;Abel;;59 Southbrook Road;Langstone;;Havant;Hampshire;PO9 1RL;PH;02392 482218;;;;0;;;FALSO;;Single;;;;VERO;01/01/07;;FALSO;FALSO;FALSO\n6086;Mrs;D S;Abel-Smith;;Partridge Cottage;Pook Lane;;East Lavant;West Sussex;PO18 0AU;Post;;;;;0;;;FALSO;;Single;;;;FALSO;;;VERO;FALSO;FALSO";

var arrPayments = [{
    "member": "471800",
    "type": "CHQ",
    "reference": "DH47F",
    "category": "subscription",
    "description": "Some description",
    "amount": 50.5,
    "notes": "This is a note",
    "date": "2011-01-01T00:00:00.000Z",
    "id": 1,
    "createdAt": "2015-06-17T11:47:27.000Z",
    "updatedAt": "2015-06-17T11:47:27.000Z"
  },{
    "member": "471800",
    "type": "CHQ",
    "reference": "DH47F",
    "category": "donation",
    "description": "Some description",
    "amount": 20,
    "notes": "This is a nice donation",
    "date": "2012-01-01T00:00:00.000Z",
    "id": 2,
    "createdAt": "2015-06-17T11:47:27.000Z",
    "updatedAt": "2015-06-17T11:47:27.000Z"
  },{
    "member": "471800",
    "type": "CHQ",
    "reference": "DH47F",
    "category": "payment",
    "description": "Some description",
    "amount": 30.5,
    "notes": "This is a nice payment",
    "date": "2013-01-01T00:00:00.000Z",
    "id": 3,
    "createdAt": "2015-06-17T11:47:27.000Z",
    "updatedAt": "2015-06-17T11:47:27.000Z"
  },{
    "member": "471800",
    "type": "CASH",
    "reference": null,
    "category": "payment",
    "description": "Payment",
    "amount": 200,
    "notes": null,
    "date": "2015-06-16T23:00:00.000Z",
    "id": 4,
    "createdAt": "2015-06-17T11:50:41.000Z",
    "updatedAt": "2015-06-17T11:50:41.000Z"
  }
];

module.exports = {
	members:  mockMembers,
	payments: mockPayments,
	arrPayments: arrPayments
};