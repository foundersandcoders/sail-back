# Sail back

[![Build Status](https://travis-ci.org/foundersandcoders/sail-back.svg?branch=reactify)](https://travis-ci.org/foundersandcoders/sail-back)

Membership management system for Friends of Chichester Harbour.

![Logo](http://www.friendsch.org/images/headings/heading01.jpg)

## Table of Contents

- [Run](#run)
- [Q&A](#Q\ &\ A)

## Run

In order to start the app you need a MySql database running on localhost for more details see [config](https://github.com/foundersandcoders/sail-back/blob/master/config/env/development.js#L15).
(You will need to `create database foch_testing`)

Once the database server is running you can run the app with:

```
git clone https://github.com/foundersandcoders/sail-back
npm install
npm run dev
```

## file structure

```
/
  assets/ <--- public static files
    styles/
    images/
  api/
    controllers/ <--- endpoint logic
    models/ <--- data shapes
    policies/ <--- permissions
    queries/ <--- SQL queries
  config/
    routes/  <--- mapping routes to handlers
  test/
    backend/
    laws/ <--- property testing for redux modules with jsverify
  views/
  server.js
  package.json
  ...
```

## Q & A

### Where shall I focus my attentions?

Most of the action is in `src/admin/redux/modules`
There is also a little bit of action spread throughout `api/controllers`

### Isn't the code a bit weird?

Yes in places it is. It will seem a bit less weird if you look at
* [*The Mostly Adequate Guide*][maq]
* [Ramda][ramda]
* [Sanctuary][sanctuary]

[maq]: https://drboolean.gitbooks.io/mostly-adequate-guide/content/
[ramda]: https://github.com/ramda/ramda
[sanctuary]: https://github.com/sanctuary-js/sanctuary

**But perhaps the best place to start** [Underscore You're Doing it Wrong][wrong]

[wrong]: https://www.youtube.com/watch?v=m3svKOdZijA

### What do I need to know that isn't here yet?

#### Upload
* Sails config
* Scripts
* foch_data folder

#### What is Sails doing for me?

