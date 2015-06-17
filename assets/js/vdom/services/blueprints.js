"use strict";


module.exports = {
	members: {
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
		deletion_date:                {remove:false, type: "date"},
		deletion_reason:              {remove:false, type: "string"},
		lapsedMember:                 {remove:true,  type: "custom"}   // lapsedMember
	},
	payments: {
		date:           {remove:false, type: "date"},
		member:         {remove:false, type: "string"},
		subscription:   {remove:false, type: "number"},
		donation:       {remove:false, type: "number"},
		events:         {remove:false, type: "number"},
		amount:         {remove:false, type: "number"},
		difference:     {remove:true,  type: "number"},
		type_code:      {remove:false, type: "string"},
		reference: 	    {remove:false, type: "string"},
		notes:          {remove:false, type: "string"},
		// deleted:        {remove:false, type: "boolean"}
	}
}
