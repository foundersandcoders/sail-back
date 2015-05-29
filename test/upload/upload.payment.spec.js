"use strict";

var test = require("tape");
var request = require("request");
var fs = require("fs");
var through = require("through2");
var req = require("hyperquest");

var mockPayments = require("./mocks.js").payments;
var payments = [];

// make request to upload
test("create payments array", function (t) {

    var mockstream = mockPayments()
    mockstream.pipe(through.obj(function (buf, enc, next) {

       payments.push(buf);
       return next();
    }, function (cb) {
   
        t.equals(payments.length, 21, "21 payments in array");
        t.end();
        return cb();
    }));
    
});

test("POST to /upload?type=payments", function (t) {

/*
    var opts = {
        method: "POST",
        uri: "http://requestb.in/123j9ar1",
        body: {
            payments: payments
        }
    };
*/

    var opts = {
        method: "POST",
        uri: "http://0.0.0.0:1337/upload?type=payments",
        body: payments,
        json: true
    }; 

    request(opts, function (e, h, r) {
  
        console.log(r);
        console.log(e);
        t.end();
    });
/*    var r = req.post("http://requestb.in/123j9ar1");
    r.write(JSON.stringify({
        wil: "hello"
    }));
    r.end();
    r.on("end", function () {
        
        t.end();
    })
    */
    /* 
    mockPayments().on("data", function (data) {
        
        r.write(JSON.stringify(data));
    });
    r.pipe(process.stdout);
    */
});
// check db to confirm correct upload : 
