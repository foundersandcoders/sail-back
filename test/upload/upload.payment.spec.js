var test = require("tape");
var request = require("givit");
var fs = require("fs");
var through = require("through2");

var mockPayments = require("./mocks.js").payments;

// make request to upload
test("POST to /upload?type=payments", function (t) {

    var payments = [];
    mockPayments().pipe(through.obj(function (buf, enc, next) {
   
       console.log(buf);
       payments.push(buf);
    }, function () {
   
        console.log(payments);
        t.end();
    }));
   
   /*
    var opts = {
        method: "POST",
        uri: "http://localhost:1337/upload?type=payments"
    };
    
    opts.body = {};
    opts.body[mockPayments] = ""

    request(opts, function (err, body) {
  
        console.log(arguments);
        t.end(); 
    });
    */
/*
    var upload = request.post();
    upload.pipe(through(write, end));

    upload.write("hello");
    upload.end("hello");
    
    var payments = fs.createReadStream("./mockpayments.csv");
    payments.pipe(upload, {end: false});
    payments.pipe(process.stdout);

    var data = '';
    function write (buf, enc, next) { data += buf; console.log("i"); next(); }
    function end () {
        t.equal(data, "hehllo", "looks as expected"); 
        t.end();
    }

    var payments = fs.createReadStream("./mockpayments.csv")
    .pipe(process.stdout);
    
*/

});

// check db to confirm correct upload 
