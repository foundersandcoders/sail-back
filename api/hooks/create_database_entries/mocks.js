exports.members = function () {
  var members = [{
    id: '471800',
    title: 'Mr',
    initials: 'S',
    address1: 'XYZ',
    address2: 'XYZ',
    address3: 'XYZ',
    address4: 'XYZ',
    county: 'XYZ',
    postcode: 'E1 0SY',
    first_name: 'Besart',
    last_name: 'Hoxhaj',
    primary_email: 'bes@foch.org',
    secondary_email: 'bes2@foch.org',
    password: 'cnvo2hh89h',
    privileges: 'admin',
    activation_status: 'activated',
    gift_aid_signed: false,
    date_joined: new Date(),
    membership_type: module.exports.membershipTypes()[0].value
  },
    {
      privileges: 'admin',
      id: '1111',
      title: 'Mr',
      initials: 'E S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'Richard',
      last_name: 'Evans',
      primary_email: 'riche80@outlook.com',
      gift_aid_signed: false,
      date_joined: new Date(),
      membership_type: module.exports.membershipTypes()[0].value
    },
    // {
    // 	privileges: 'admin',
    // 	id: '78403',
    // 	title: 'Mr',
    // 	initials: 'E S',
    // address1: 'XYZ',
    // address2: 'XYZ',
    // address3: 'XYZ',
    // address4: 'XYZ',
    // county: 'XYZ',
    // 	postcode: 'E1 0SY',
    // 	first_name: 'Ettore',
    // 	last_name: 'Scabron',
    // 	primary_email: 'besartshyti@gmail.com',
    // 	gift_aid_signed: false,
    // 	date_joined: new Date(),
    // 	membership_type: module.exports.membershipTypes()[0].value
    // },
    {
      id: '471663',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'Wil',
      last_name: 'Fisher',
      primary_email: 'wil@foch.org',
      secondary_email: 'wil2@foch.org',
      password: 'backdoor',
      privileges: 'admin',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value
    }, {
      id: '433893',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'Richard',
      last_name: 'Evans',
      primary_email: 'richard@foch.org',
      secondary_email: 'richard2@foch.org',
      password: '98fasdh39f',
      privileges: 'admin',
      activation_status: 'deactivated',
      deletion_reason: module.exports.deletionReasons()[1].value,
      deletion_date: new Date(),
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[2].value
    }, {
      id: '471893',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'Anon',
      last_name: 'Ymouse',
      primary_email: 'admin@foch.org',
      secondary_email: 'admin2@foch.org',
      password: 'ads78fkj39r',
      privileges: 'admin',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[3].value
    }, {
      id: '33123',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House',
      last_name: 'Hat',
      primary_email: 'house@foch.org',
      secondary_email: 'hat@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[3].value
    },
    {
      id: '014030',
      title: 'Mr',
      initials: 'IG',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E2 0SY',
      first_name: 'Ivan',
      last_name: 'Gonzalez',
      primary_email: 'ivan@foundersandcoders.com',
      password: 'correct',
      privileges: 'member',
      activation_status: 'activated',
      gift_aid_signed: false,
      date_joined: new Date(),
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'online'
    },
    {
      id: '12345',
      title: 'Mr',
      initials: 'JM',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'Jack',
      last_name: 'Murphy',
      primary_email: 'jmurphy.web@gmail.com',
      password: 'correct',
      privileges: 'member',
      activation_status: 'activated',
      gift_aid_signed: false,
      date_joined: new Date(),
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'online'
    }, {
      id: '331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1@foch.org',
      secondary_email: 'hat1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331232',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House2',
      last_name: 'Hat2',
      primary_email: 'house2@foch.org',
      secondary_email: 'hat2@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331233',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House3',
      last_name: 'Hat3',
      primary_email: 'house3@foch.org',
      secondary_email: 'hat3@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331234',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House4',
      last_name: 'Hat4',
      primary_email: 'house4@foch.org',
      secondary_email: 'hat4@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331235',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House5',
      last_name: 'Hat5',
      primary_email: 'house5@foch.org',
      secondary_email: 'hat5@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331236',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House6',
      last_name: 'Hat6',
      primary_email: 'house6@foch.org',
      secondary_email: 'hat6@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '331237',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House7',
      last_name: 'Hat7',
      primary_email: 'house7@foch.org',
      secondary_email: 'hat7@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '33331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1dds2@foch.org',
      secondary_email: 'hats1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '1331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1sd2@foch.org',
      secondary_email: 'hatd1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '2331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1ff2@foch.org',
      secondary_email: 'hatf1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '3331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1g2@foch.org',
      secondary_email: 'hatw1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '4331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1h2@foch.org',
      secondary_email: 'hate1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '5331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1j2@foch.org',
      secondary_email: 'hatr1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '6331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1k2@foch.org',
      secondary_email: 'hatrt1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '7331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1l2@foch.org',
      secondary_email: 'hatyu1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '8331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1e2@foch.org',
      secondary_email: 'hatio1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }, {
      id: '9331231',
      title: 'Mr',
      initials: 'S',
      address1: 'XYZ',
      address2: 'XYZ',
      address3: 'XYZ',
      address4: 'XYZ',
      county: 'XYZ',
      postcode: 'E1 0SY',
      first_name: 'House1',
      last_name: 'Hat1',
      primary_email: 'house1x2@foch.org',
      secondary_email: 'hathgd1@foch.org',
      password: 'secure',
      privileges: 'member',
      date_joined: new Date(),
      gift_aid_signed: false,
      membership_type: module.exports.membershipTypes()[0].value,
      news_type: 'post',
      standing_order: true
    }]

  return members
}

exports.payments = function () {
  var payments = [{
    member: module.exports.members()[0].id,
    category: 'subscription',
    type: module.exports.paymentTypes()[3].code, // join table
    description: 'Some description',
    amount: 5050,
    notes: 'This is a note',
    date: new Date('2011')
  },
    {
      member: module.exports.members()[0].id,
      category: 'donation',
      description: 'Some description',
      amount: 2000,
      notes: 'This is a nice donation',
      date: new Date('2012')
    },
    {
      member: module.exports.members()[0].id,
      category: 'payment',
      type: module.exports.paymentTypes()[3].code, // join table
      description: 'Some description',
      amount: 3050,
      reference: module.exports.references()[0].code.slice(1), // join table
      notes: 'This is a nice payment',
      date: new Date('2013')
    },
    {
      member: module.exports.members()[0].id,
      category: 'payment',
      type: module.exports.paymentTypes()[3].code, // join table
      description: 'Some description',
      amount: 5050,
      reference: module.exports.references()[0].code, // join table
      notes: 'This is a nice payment',
      date: new Date('2013')
    },
    {
      member: module.exports.members()[1].id, // richard
      category: 'subscription',
      description: 'Some description',
      amount: 1550,
      notes: 'This is a note',
      date: new Date('2011')
    },
    {
      member: module.exports.members()[2].id, //Ymouse
      category: 'donation',
      description: ':)',
      amount: 13700,
      notes: 'cool beans',
      date: new Date('2012, 9, 22')
    },
    {
      member: module.exports.members()[2].id,
      category: 'payment',
      amount: 10000,
      type: module.exports.paymentTypes()[3].code,
      reference: module.exports.references()[0].code.slice(1),
      notes: 'boss',
      date: new Date('2012, 11, 25')
    },
    {
      member: module.exports.members()[2].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[7].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[8].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[9].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[10].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[11].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[12].id,
      category: 'subscription',
      amount: 17500,
      notes: ':)',
      date: new Date('2013, 1, 1')
    },
    {
      member: module.exports.members()[2].id,
      category: 'payment',
      amount: 17500,
      type: module.exports.paymentTypes()[3].code,
      reference: module.exports.references()[0].code,
      notes: 'awesome',
      date: new Date('2013, 2, 3')
    },
    {
      member: module.exports.members()[6].id,
      category: 'subscription',
      type: module.exports.paymentTypes()[3].code,
      description: 'Some description',
      amount: 5050,
      notes: 'This is a note',
      date: new Date('2011')
    },
    {
      member: module.exports.members()[6].id,
      category: 'donation',
      description: 'Some description',
      amount: 2000,
      notes: 'This is a nice donation',
      date: new Date('2012')
    },
    {
      member: module.exports.members()[6].id,
      category: 'payment',
      type: module.exports.paymentTypes()[3].code,
      description: 'Some description',
      amount: 3050,
      reference: module.exports.references()[0].code.slice(1),
      notes: 'This is a nice payment',
      date: new Date('2013')
    },
    {
      member: module.exports.members()[6].id,
      category: 'payment',
      type: module.exports.paymentTypes()[3].code,
      description: 'Some description',
      amount: 5050,
      reference: module.exports.references()[0].code,
      notes: 'This is a nice payment',
      date: new Date('2016')
    }
  ]

  return payments
}

exports.deletionReasons = function () {
  var reasons = [{
    value: 'deceased',
    description: 'Deceased'
  }, {
    value: 'notResponding',
    description: 'Did not respond to reminders'
  }, {
    value: 'duplicate',
    description: 'Duplicate'
  }, {
    value: 'dissatisfied',
    description: 'Expressed dissatisfaction'
  }, {
    value: 'mailReturned',
    description: 'Mail returned to us'
  }, {
    value: 'moved',
    description: 'Moved away'
  }, {
    value: 'notifiedTermination',
    description: 'Notified termination'
  }, {
    value: 'other',
    description: 'Other'
  }
  ]

  return reasons
}

exports.membershipTypes = function () {
  var types = [{
    value: 'annual-single',
    description: 'Annual Single',
    amount: 1000
  }, {
    value: 'annual-double',
    description: 'Annual Double',
    amount: 1500
  }, {
    value: 'annual-family',
    description: 'Annual Family',
    amount: 2000
  }, {
    value: 'life-single',
    description: 'Life Single',
    amount: 17500
  }, {
    value: 'life-double',
    description: 'Life Double',
    amount: 25000
  }, {
    value: 'annual-group',
    description: 'Annual Group',
    amount: 2500
  }, {
    value: 'annual-corporate',
    description: 'Annual Corporate',
    amount: 15000
  }
  ]

  return types
}

exports.paymentTypes = function () {
  var types = [{
    code: 'cheque',
  }, {
    code: 'cash',
  }, {
    code: 'standing order',
  }, {
    code: 'bacs',
  }, {
    code: 'harbour office',
  }, {
    code: 'CAF',
  }
]

  return types
}

exports.references = function () {
  var references = [{
    code: 'DH47F',
    description: 'One'
  }, {
    code: 'DFH58',
    description: 'Two'
  }, {
    code: 'DF43D',
    description: 'Three'
  }
  ]

  return references
}

exports.events = function () {
  var yesterday = new Date()
  yesterday.setMonth(yesterday.getMonth() - 1)

  var today = new Date()

  var tomorrow = new Date()
  tomorrow.setMonth(tomorrow.getMonth() + 1)

  var afterTomorrow = new Date()
  afterTomorrow.setMonth(afterTomorrow.getMonth() + 2)

  var events = [
    {
      title: 'Past at Dan',
      reference: 'OOC6K',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
      date: yesterday,
      time: '19:00',
      location: 'London',
      host: 'Dan',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20
    }, {
      title: 'Today at Wil',
      reference: 'CH11D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
      date: today,
      time: '19:00',
      location: 'London',
      host: 'Wil',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20
    }, {
      title: 'Visit at Chichester',
      reference: 'YH77D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://mtbl1.vm.bytemark.co.uk/familydaysout/wp-content/uploads/Chichester-Solar-Boat-Harbour-8.jpg',
      date: tomorrow,
      time: '19:00',
      location: 'London',
      host: 'Bes',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20
    }, {
      title: 'Party in London',
      reference: 'YH56D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://www.splashmood.com/wp-content/uploads/2014/06/Yeh-Jawaani-Hai-Deewani-Night-Party-HD-Wallpaper.jpg',
      date: afterTomorrow,
      time: '21:00',
      location: 'London',
      host: 'Wil',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20
    }
  ]

  return events
}

exports.bookings = function () {
  var bookings = [
    {
      event_id: '1', // bes party
      head_member: '471800', // bes account
      number_of_members: 5,
      number_of_guests: 1
    }
  ]

  return bookings
}
