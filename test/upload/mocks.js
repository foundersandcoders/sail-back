"use strict";

var fs      = require("fs");
var through = require("through2");
var csv     = require("csv2");

module.exports = {
    payments: payments
}; 

function payments () {

    var payments = [];
    
    function write (fields, enc, next) { 
        
        var payment = {
            date: fields[0],
            member: fields [1],
            subscription: fields[2],
            donation: fields[3],
            events: fields[4],
            amount: fields[5],
            difference: fields[6],
            type_code: fields[7],
            reference: fields[8],
            notes: fields[9],
            deleted: fields[10],
        };
        
        this.push(payment);        
        console.log(payment);
        return next();
    }
  
    return fs.createReadStream("./mockpayments.csv")
    .pipe(csv({separator: ";"}))
    .pipe(through.obj(write));
};

payments();
