"use strict";

var is           = require("torf");
var moment       = require("moment");
var lazy         = require("lazy.js");

module.exports = function () {

    function createCharge (payment, type) {
   
        var charge = {
            date: payment.date,
            member: payment.member,
            type_code: payment.type_code,
            reference: payment.reference,
            notes: payment.notes
        };
        
        if (type[type.length-1] === "s") type = type.substr(0, type.length - 1);
        
        charge.category = type;
        charge.description = type[0].toUpperCase()
        charge.description += type.substr(1, type.length - 1);
        charge.amount = payment[type] || payment.amount;
       
        if (type === "payment") charge.description += " by " + charge.type_code;
       
        return charge;
    }

	var that = {
		payments: function (payments, cb) {

            var count = 0;
            var problems = [];
            var transactions = [];
            payments.forEach(function (payment, i) {
       
                var subscription = createCharge(payment, "subscription");
                var donation     = createCharge(payment, "donation");
                var events       = createCharge(payment, "events");
                var payment      = createCharge(payment, "payment");
               
                [subscription, donation, events, payment]
                .forEach(function (record) {
                    
                    if (record.amount && record.amount!== "0") {
                        transactions.push(record);
                    }
                });
            });
           
            transactions.forEach(function (transaction) {
                Payments
                .create(transaction)
                .exec(function (err, items) {
             
                    count +=1;
                    if (err) problems.push({payment: transaction, error: err});
                    else if (count === transactions.length) return cb(null, {
                        problems: problems,
                        problem_count: problems.length,
                        done: true
                    }); 
                });
            })
        },
		members: function (members, cb){
        
            console.log(members);        
            var count = 0;
            var problems = [];
            var transactions = [];
            members.forEach(function (member) {
            
                member.due_date = new Date("01/01");
                member.notes = "";
                
                Members
                .create(member)
                .exec(function (err, items) {
              
                    count += 1;
                    if (err) problems.push({member: member, error: err});
                    else if (count === members.length) return cb(null, {
                        problems: problems,
                        problem_count: problems.length,
                        done: true
                    });
                });
            }); 
		},
		/**
		 *	given a {stamp_object} and a {data_object} with the same
		 *	number of properties, returns a new object with the
		 *	values of the {data_object} and the keys of {stamp_object}
		 *	
		 *	@param  {number} - 
		 *	@param  {object} -
		 *	@param  {object} -
		 *	@return {object} - 'stampedobject'
		 */
		_stamp: function (count, data, stamppattern){

			var stampedobj = {};
			var stampkeys  = object.keys(stamppattern);

			if (count === 0 && (data.length !== stampkeys.length)) {
				// console.log(data.length);
				// console.log("header: ", data);
				// console.log(stampkeys.length);
				sails.log.error("data: ", data);
				throw new error({message: "blueprint does not match with file csv columns"});
			}

			stampkeys.foreach(function (keystamp, index){

				if (!is.ok(stamppattern[stampkeys[index]].remove)) {

					if(keystamp === "membership_type") {

						data[index] = that._membershiptypemap(data[index]);
					}

					// sails.log.info("debug:", keystamp, data[index]);

					stampedobj[keystamp] = that._transform(data[index], stamppattern[keystamp].type);
				}
			});

			return stampedobj;
		},
		/**
		 *	
		 *
		 */
		_transform: function (value, type) {


			// some entries should be boolen but they are are empty
			if(type === "boolean" && !is.ok(value)) {
				return false;
			}

			if (!is.ok(value)) {
				return null;
			}

			if (is.type(value, type)) {

				return value;
			} else if (type === "number"){

				return parseint(value);
			} else if (type === "date"){

				return that._dateconvert(value);
			} else if (type === "boolean"){

				return value === "vero" ? true : false;
			} else if (type === "custom"){

				return value === "falso" ? "activated" : "deactivated";
			} else {

				return null;
			}
		},
		_dateconvert: function (str) {
			function isvaliddate(d) {
				if ( object.prototype.tostring.call(d) !== "[object date]" )
					return false;
				return !isNaN(d.getTime());
			}

			var parts = str.split("/");
			var dt = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
			if(isValidDate(dt)){
				return dt;
			}else{
				return null;
			};
		},
		_membershipTypeMap: function (membership_type) {

			var type = [
				{original: 'Single',    imported: 'annual-single'},
				{original: 'Double',    imported: 'annual-double'},
				{original: 'Family',    imported: 'annual-family'},
				{original: 'Group',     imported: 'annual-group'},
				{original: 'Corporate', imported: 'annual-corporate'},
				{original: 'Life Sgl',  imported: 'life-single'},
				{original: 'Life Dble', imported: 'life-double'}
			];

			type.forEach(function (element, index) {

				if(element.original === membership_type) {
					return element.imported;
				}
			});
		},
		_blue: function (type){

			var bluprint;

			if (type === "payment") {

				bluprint = {
					date:           {remove:false, type: "date"},
					member:         {remove:false, type: "string"},
					subscription:   {remove:true,  type: "number"},
					donation:       {remove:true,  type: "number"},
					events:         {remove:true,  type: "number"},
					amount:         {remove:false, type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:false, type: "string"},
					reference: 	    {remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "sub") {

				bluprint = {
					date:           {remove:false, type: "date"},
					member:     	{remove:false, type: "string"},
					subscription:   {remove:false, type: "number"},
					donation:       {remove:true,  type: "number"},
					events:         {remove:true,  type: "number"},
					amount:         {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true,  type: "string"},
					reference:  	{remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "donation") {
				bluprint = {
					date:           {remove:false, type: "date"},
					member:      	{remove:false, type: "string"},
					subscription:   {remove:true,  type: "number"},
					donation:       {remove:false, type: "number"},
					events:         {remove:true,  type: "number"},
					total:          {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true,  type: "string"},
					reference: 		{remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "event") {
				bluprint = {
					date:           {remove:false, type: "date"},
					member:    		{remove:false, type: "string"},
					subscription:   {remove:true,  type: "number"},
					donation:       {remove:true,  type: "number"},
					events:         {remove:false, type: "number"},
					total:          {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true,  type: "string"},
					reference: 		{remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "member") {
/*
				bluprint = {
					id: 				{remove:false, type: "string"},
					// title: 				{remove:false, type: "string"},
					// initials: 			{remove:false, type: "string"},
					// last_name: 			{remove:false, type: "string"},
					// first_name: 		{remove:false, type: "string"},
					// postcode: 			{remove:false, type: "string"},
					// primary_email: 		{remove:false, type: "string"},
					// secondary_email:	{remove:false, type: "string"},
					// gift_aid_signed:    {remove:false, type: "boolean"},
				};
*/				
                     bluprint = {
                     	id:                           {remove:false, type: "string"},
                     	title:                        {remove:false, type: "string"},
                     	initials:                     {remove:false, type: "string"},
                     	last_name:                    {remove:false, type: "string"},
                     	first_name:                   {remove:false, type: "string"},
                     	address1:                     {remove:false, type: "string"},
                     	address2:                     {remove:false, type: "string"},
                     	address3:                     {remove:false, type: "string"},
                     	address4:                     {remove:false, type: "string"},
                     	county:                       {remove:false, type: "string"},
                     	postcode:                     {remove:false, type: "string"},
                     	deliverer:                    {remove:false, type: "string"},
                     	home_phone:                   {remove:false, type: "string"},
                     	mobile_phone:                 {remove:false, type: "string"},
                     	work_phone:                   {remove:false, type: "string"},
                     	birthday:                     {remove:true,  type: "date"},   // birthday
                     	age: 		                  {remove:true,  type: "number"}, // age
                     	primary_email:                {remove:false, type: "string"},
                     	secondary_email:              {remove:false, type: "string"},
                     	email_bounced:                {remove:false, type: "boolean"},
                     	date_joined:                  {remove:false, type: "date"},
                     	membership_type:              {remove:false, type: "string"},
                     	date_membership_type_changed: {remove:false, type: "date"},
                     	life_payment_date:            {remove:false, type: "date"},
                     	notes:                        {remove:false, type: "string"},
                     	gift_aid_signed:              {remove:false, type: "boolean"},
                     	date_gift_aid_signed:         {remove:false, type: "date"},
                     	date_gift_aid_cancelled:      {remove:false, type: "date"},
                     	standing_order:               {remove:false, type: "boolean"},
                     	activation_status:            {remove:false, type: "custom"},
                     	lapsedMember:                 {remove:true,  type: "custom"},   // lapsedMember
			    };
			}

			return bluprint;
		}
	};

	return that;
};
