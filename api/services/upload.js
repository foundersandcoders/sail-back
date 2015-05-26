"use strict";


var parse   = require("babyparse");
var is      = require("torf");
var moment  = require("moment");


module.exports = function () {

	var that = {
		payments: function (csv, cb) {

			var complete = false;
			var count = 0;

			parse.parse(csv, {
				delimiter: ";",
				newline: "\n",
				step: function (results) {

					var subscription         = that._stamp(count, results.data[0], that._blue("sub"));
					subscription.category    = "subscription";
					subscription.amount      = subscription.subscription;
					subscription.description = "Subscription";

					var donation             = that._stamp(count, results.data[0], that._blue("donation"));
					donation.category        = "donation";
					donation.amount          = donation.donation;
					donation.description     = "Donation";

					var events               = that._stamp(count, results.data[0], that._blue("event"));
					events.category          = "event";
					events.amount            = events.events;
					events.description       = "Event";

					var payment              = that._stamp(count, results.data[0], that._blue("payment"));
					payment.category         = "payment";
					payment.description      = "Payment by " + payment.type.split(" - ")[1];

					count += 1;

					var payments = [];

					[subscription, donation, events, payment].forEach(function (record) {
						if (record.amount && record.amount !== "0") {

							Payments
							.create(record)
							.exec(function (err, item) {

								if (err) return err;
								else console.log("ITEM", item);
							});
						}
					});
				},
				complete: function () {

					if (!complete) {
						complete = true;
						return cb("Done paymnets");
					}
				}
			});
		},
		members: function (csv, cb){

			var complete = false;
			var count = 0;

			parse.parse(csv, {
				delimiter: ";",
				newline: "\n",
				step: function (results) {

					console.log('Results: ', results.data);

					var member       = that._stamp(count, results.data[0], that._blue("member"));
					member.dueDate   = new Date("01/01");

					if (count === 0) {

						count +=1
					} else {

						count +=1

						Members
						.create(member)
						.exec(function (err, item) {

							if (err) {
								sails.log.error("Error: ", member);
								throw err;
							} else {
								sails.log.info("UPLOADED: ", item);
							}
						});
					}
				},
				complete: function () {

					if (!complete) {
						complete = true;
						return cb("Done members");
					}
				}
			});
		},
		/**
		 *	Given a {stamp_object} and a {data_object} with the same
		 *	number of properties, returns a new object with the
		 *	values of the {data_object} and the keys of {stamp_object}
		 *	
		 *	@param  {Number} - 
		 *	@param  {Object} -
		 *	@param  {Object} -
		 *	@return {Object} - 'stampedObject'
		 */
		_stamp: function (count, data, stampPattern){

			var stampedObj = {};
			var stampKeys  = Object.keys(stampPattern);

			if (count === 0 && (data.length !== stampKeys.length)) {
				// console.log(data.length);
				// console.log("Header: ", data);
				// console.log(stampKeys.length);
				sails.log.error("Data: ", data);
				throw new Error({message: "Blueprint does not match with file csv columns"});
			}

			stampKeys.forEach(function (keyStamp, index){

				if (!is.ok(stampPattern[stampKeys[index]].remove)) {

					if(keyStamp === "membership_type") {

						data[index] = that._membershipTypeMap(data[index]);
					}

					stampedObj[keyStamp] = that._transform(data[index], stampPattern[keyStamp].type);
				}
			});

			return stampedObj;
		},
		/**
		 *	
		 *
		 */
		_transform: function (value, type) {

			if (!is.ok(value)) {
				return null;
			}

			if (is.type(value, type)) {

				return value;
			} else if (type === "number"){

				return parseInt(value);
			} else if (type === "date"){

				return that._dateConvert(value);
			} else if (type === "boolean"){

				return value === "VERO" ? true : false;
			} else if (type === "custom"){

				return value === "FALSO" ? "activated" : "deactivated";
			} else {

				return null;
			}
		},
		_dateConvert: function (str) {
			function isValidDate(d) {
				if ( Object.prototype.toString.call(d) !== "[object Date]" )
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
					type:           {remove:false, type: "string"},
					reference: 		{remove:false, type: "string"},
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

				// bluprint = {
				// 	id: 				{remove:false, type: "string"},
				// 	title: 				{remove:false, type: "string"},
				// 	initials: 			{remove:false, type: "string"},
				// 	last_name: 			{remove:false, type: "string"},
				// 	first_name: 		{remove:false, type: "string"},
				// 	postcode: 			{remove:false, type: "string"},
				// 	primary_email: 		{remove:false, type: "string"},
				// 	secondary_email:	{remove:false, type: "string"},
				// 	gift_aid_signed:    {remove:false, type: "boolean"},
				// };
				
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
}
