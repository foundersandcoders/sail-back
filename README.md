# Sail back

[![Join the chat at https://gitter.im/foundersandcoders/sail-back](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/foundersandcoders/sail-back?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/foundersandcoders/sail-back.svg?branch=reactify)](https://travis-ci.org/foundersandcoders/sail-back)

Membership management system for Friends of Chichester Harbour.

![Logo](http://www.friendsch.org/images/headings/heading01.jpg)

## Table of Contents

- [Run](#run)
- [Payments](#payments)
- [Upload](#upload)

## Run

In order to start the app you need a MySql database running on localhost for more details see [config](https://github.com/foundersandcoders/sail-back/blob/master/config/env/development.js#L15).

Once the database server is running you can run the app with:

```
git clone https://github.com/foundersandcoders/sail-back
npm install
npm run dev
```

## Payments

In dev mode is possible to test the payment system, in order to do so use these credentials:

```
PayPal
  Email: us-customer@commercefactory.org
  Password: test1234

Credit Card
  Number: 4111 1111 1111 1111
  CVV: 123
  Expiration date: 11/20
```

## Upload

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
  age:                      {type: "number"}, // age
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
  reference:      {type: "string"},
  notes:          {type: "string"}
}
```

The **type** must be ***strictly*** respected. In particular special care must be given to `date`, `boolean`, `number` and `custom`.
In fact if something is expected to be a **number**, it can not be a currency value. For what concerns **dates** instead this must be
in the `dd/mm/yyyy` format.

## file structure

```
/
  assets/ <--- public static files
    js/
      app.js <--- main component and routing logic (built from pages)
      pages/ <--- main pages of aff (built from services and components)
      services/ <--- reusable generic utilities
      components/ <--- reusable *vdom* components

    styles/
  api/
  config/
  tasks/
  test/
  views/
  server.js
  package.json
  ...
```

## Notes to be integrated
* Some devs need to run redis concurrently with the server for the app to run. Without it, request.session is not defined at critical points; the app looks for properties on this ?object and thus throws an exception.
* Must setup a foch_testing database to correctly run tests (probably something similar is needed to run production)
* on first run, the `models.migrate` property in `config/env/development.js` should be set to `alter`. On subsequent runs, it should be reverted to `safe`.
* Add directions for data migration
* WATCH OUT WITH COMPARISONS IN TESTING -- an interpolated string creates a
different string of props for a component than putting it in directly.
e.g. `<span>My name is {name}!</span>` may produce a span with props
`['My name is ', 'Sarah', !]`, so be careful not to test against an element like
`<span>My name is Sarah!</span>`, which has props `['My name is Sarah!]`
