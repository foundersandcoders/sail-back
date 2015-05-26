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
				step: function (results) {

					var subscription         = that._stamp(count, results.data[0], that._blue("sub"));
					subscription.type        = "subscription";
					subscription.total       = subscription.subscription;
					subscription.description = "Subscription";

					var donation             = that._stamp(count, results.data[0], that._blue("donation"));
					donation.type            = "donation";
					donation.total           = donation.donation;
					donation.description     = "Donation";

					var events               = that._stamp(count, results.data[0], that._blue("event"));
					events.type              = "event";
					events.total             = events.events;
					events.description       = "Event";

					var payment              = that._stamp(count, results.data[0], that._blue("payment"));
					payment.type             = "payment";
					payment.description      = "Payment by " + payment.type_code.split(" - ")[1];

					count += 1;

					var payments = [];

					[subscription, donation, events, payment].forEach(function (record) {
						if (record.total && record.total !== "0") {

							console.log("RECORD", record);
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
				step: function (results) {

					var member       = that._stamp(count, results.data[0], that._blue("member"));
					member.dueDate   = moment("01-01", "DD-MM");

					count +=1

					Members
					.create(member)
					.exec(function (err, item) {

						if (err) return err;
						else console.log(item);
					});
				},
				complete: function () {

					if (!complete) {
						complete = true;
						return cb("Done members");
					}
				}
			});
		},
		_stamp: function (count, data, stampPattern){

			var obj       = {};
			var stampKeys = Object.keys(stampPattern);

			if (count === 0 && (data.length !== stampKeys.length)) {
				console.log(data.length);
				console.log("d", data);
				console.log(stampKeys.length);
				throw new Error({message: "Blueprint does not match with file csv columns"});
			}

			for(var ii = 0; ii < stampKeys.length; ii += 1){
				if (!is.ok(stampPattern[stampKeys[ii]].remove)) {

					obj[stampKeys[ii]] = that._transform(data[ii], stampPattern[stampKeys[ii]].type);
				}
			}

			return obj;
		},
		_transform: function (value, type) {

			if(is.type(value, type)){
				return value;
			}else if(type === "number"){
				return parseInt(value);
			}else if(type === "date"){
        return moment(value, "DD-MM-YY").format();
			}else if(type === "boolean"){
				return value === "VERO" ? true : false;
			}else if(type === "custom"){
				return value === "FALSO" ? "active" : "deleted";
			}
		},
		_blue: function (type){

			var bluprintPayments;

			if (type === "payment") {

				bluprintPayments = {
					date:           {remove:false, type: "date"},
					member_id:      {remove:false, type: "string"},
					subscription:   {remove:true,  type: "number"},
					donation:       {remove:true,  type: "number"},
					events:         {remove:true,  type: "number"},
					total:          {remove:false, type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:false, type: "string"},
					list_reference: {remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "sub") {

				bluprintPayments = {
					date:           {remove:false, type: "date"},
					member_id:      {remove:false, type: "string"},
					subscription:   {remove:false, type: "number"},
					donation:       {remove:true,  type: "number"},
					events:         {remove:true,  type: "number"},
					total:          {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true,  type: "string"},
					list_reference: {remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "donation") {
				bluprintPayments = {
					date:           {remove:false, type: "date"},
					member_id:      {remove:false, type: "string"},
					subscription:   {remove:true, type: "number"},
					donation:       {remove:false, type: "number"},
					events:         {remove:true, type: "number"},
					total:          {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true, type: "string"},
					list_reference: {remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "event") {
				bluprintPayments = {
					date:           {remove:false, type: "date"},
					member_id:      {remove:false, type: "string"},
					subscription:   {remove:true, type: "number"},
					donation:       {remove:true, type: "number"},
					events:         {remove:false, type: "number"},
					total:          {remove:true,  type: "number"},
					difference:     {remove:true,  type: "number"},
					type_code:      {remove:true, type: "string"},
					list_reference: {remove:false, type: "string"},
					notes:          {remove:false, type: "string"},
					deleted:        {remove:false, type: "boolean"}
				};
			} else if (type === "member") {

				bluprintPayments = {
					id: 				{remove:false, type: "string"},
					title: 				{remove:false, type: "string"},
					initials: 			{remove:false, type: "string"},
					last_name: 			{remove:false, type: "string"},
					first_name: 		{remove:false, type: "string"},
					postcode: 			{remove:false, type: "string"},
					primary_email: 		{remove:false, type: "string"},
					secondary_email:	{remove:false, type: "string"},
					gift_aid_signed:    {remove:false, type: "boolean"},
				};

				/*
				bluprintPayments = {
					id:                      {remove:false, type: "string"},
					title:                   {remove:false, type: "string"},
					initials:                {remove:false, type: "string"},
					last_name:               {remove:false, type: "string"},
					first_name:              {remove:false, type: "string"},
					address1:                {remove:false, type: "string"},
					address2:                {remove:false, type: "string"},
					address3:                {remove:false, type: "string"},
					address4:                {remove:false, type: "string"},
					county:                  {remove:false, type: "string"},
					postcode:                {remove:false, type: "string"},
					deliverer:               {remove:false, type: "string"},
					home_phone:              {remove:false, type: "string"},
					mobile_phone:            {remove:false, type: "string"},
					work_phone:              {remove:false, type: "string"},
					birthday:                {remove:false, type: "date"},
					age:                     {remove:true,  type: "number"},
					primary_email:           {remove:false, type: "string"},
          			secondary_email:         {remove:false, type: "string"},
					email_bounced:           {remove:false, type: "boolean"},
					date_joined:             {remove:false, type: "date"},
					membership_type:         {remove:false, type: "string"},
					date_type_changed:       {remove:false, type: "date"},
					life_payment_date:       {remove:false, type: "date"},
					notes:                   {remove:false, type: "string"},
					gift_aid_signed:         {remove:false, type: "boolean"},
					date_gift_aid_signed:    {remove:false, type: "date"},
					date_gift_aid_cancelled: {remove:false, type: "date"},
					standing_order:          {remove:false, type: "boolean"},
					status:                  {remove:false, type: "custom"},
					deletion_date:           {remove:false, type: "date"},
					deletion_reason:         {remove:false, type: "string"},
				};*/
			}

			return bluprintPayments;
		}
	};

	return that;
}
