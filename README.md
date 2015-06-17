# Sail back

Membership management system for Friends of Chichester Harbour.

![Logo](http://www.friendsch.org/images/headings/heading01.jpg)


## Run

In order to start the app:

```
git clone https://github.com/foundersandcoders/sail-back
npm install
npm run dev
```

## Upload of existing data

On the `/upload` endpoint is possible to upload existing data, mainly **members** and **payments**.

The upload function expects to receive a well **predefined** set of columns, in particular:

```js
// Members
{
	id:                           {type: "string"},
	title:                        {type: "string"},
	initials:                     {type: "string"},
	last_name:                    {type: "string"},
	first_name:                   {type: "string"},
	address1:                     {type: "string"},
	address2:                     {type: "string"},
	address3:                     {type: "string"},
	address4:                     {type: "string"},
	county:                       {type: "string"},
	postcode:                     {type: "string"},
	deliverer:                    {type: "string"},
	home_phone:                   {type: "string"},
	mobile_phone:                 {type: "string"},
	work_phone:                   {type: "string"},
	birthday:                     {type: "date"},   // birthday
	age: 		                  {type: "number"}, // age
	primary_email:                {type: "string"},
	secondary_email:              {type: "string"},
	email_bounced:                {type: "boolean"},
	date_joined:                  {type: "date"},
	membership_type:              {type: "string"},
	date_membership_type_changed: {type: "date"},
	life_payment_date:            {type: "date"},
	notes:                        {type: "string"},
	gift_aid_signed:              {type: "boolean"},
	date_gift_aid_signed:         {type: "date"},
	date_gift_aid_cancelled:      {type: "date"},
	standing_order:               {type: "boolean"},
	activation_status:            {type: "custom"},
	deletion_date:                {type: "date"},
	deletion_reason:              {type: "string"},
	lapsedMember:                 {type: "custom"}   // lapsedMember
}

// Payments
{
	date:           {type: "date"},
	member:         {type: "string"},
	subscription:   {type: "number"},
	donation:       {type: "number"},
	events:         {type: "number"},
	payment:        {type: "number"},
	difference:     {type: "number"},
	type_code:      {type: "string"},
	reference: 	    {type: "string"},
	notes:          {type: "string"}
}
```

The **type** must be ***strictly*** respected. In particular special care must be given to `date`, `boolean`, `number` and `custom`.
In fact if something is expected to be a **number**, it can not be a currency value. For what concerns **dates** instead this must be
in the `dd/mm/yyyy` format.