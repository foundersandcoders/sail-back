"use strict";

var test    = require("tape");
var request = require("request");
var fs      = require("fs");
var through = require("through2");
var req     = require("hyperquest");

var mockMembers = require("./mocks.js").members;
var members = [];

// make request to upload
test("create members array", function (t) {

    var mockstream = mockMembers()
    mockstream.pipe(through.obj(function (buf, enc, next) {

       members.push(buf);
       return next();
    }, function (cb) {

        t.equals(members.length, 14, "14 members in array");
        t.end();
        return cb();
    }));

});

test("POST to /upload?type=members", function (t) {

    var opts = {
        method: "POST",
        uri: "http://0.0.0.0:1337/upload?type=members",
        body: members,
        json: true
    };

    request(opts, function (e, h, r) {

        console.log("response", r);
        t.equals(r.problem_count, 0, "no problems");
        t.ok(r.done, "upload finished");
        t.end();
    });
});

test("records should exists", function (t) {

    var opts = {

        method: "GET",
        uri: "http://0.0.0.0:1337/api/members"
    };

    request(opts, function (e, h, r) {

        var payments = JSON.parse(r);
        t.ok(payments.length > 4, "records created");
        t.end();
    });
});
