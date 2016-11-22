var today = new Date()

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
  }, {
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
    id: '1001',
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
    gift_aid_signed: true,
    date_gift_aid_signed: '2015-02-02',
    date_joined: new Date(),
    deliverer: 'jonny',
    membership_type: module.exports.membershipTypes()[0].value,
    news_type: 'post',
    standing_order: true
  }, {
    id: '1002',
    title: 'Mr',
    initials: 'JM',
    address1: 'XYZ',
    address2: 'XYZ',
    address3: 'XYZ',
    gift_aid_signed: true,
    date_gift_aid_cancelled: '2015-02-02',
    address4: 'XYZ',
    county: 'XYZ',
    postcode: 'E1 0SY',
    first_name: 'Jack',
    last_name: 'Murphy',
    primary_email: 'jmurphy.web@gmail.com',
    password: 'correct',
    privileges: 'member',
    activation_status: 'activated',
    date_joined: new Date(),
    deliverer: 'jonny',
    membership_type: module.exports.membershipTypes()[0].value,
    news_type: 'online'
  }, {
    id: '1003',
    title: 'Mr',
    initials: 'SM',
    address1: 'XYZ',
    address2: 'XYZ',
    address3: 'XYZ',
    gift_aid_signed: true,
    date_gift_aid_cancelled: '2015-02-02',
    address4: 'XYZ',
    county: 'XYZ',
    postcode: 'E1 0SY',
    first_name: 'Smelly',
    last_name: 'Andrew',
    primary_email: 'andrew@smelly.com',
    password: 'correct',
    privileges: 'member',
    activation_status: 'activated',
    date_joined: new Date(),
    deliverer: 'Jen',
    membership_type: module.exports.membershipTypes()[2].value,
    news_type: 'online'
  }, {
    id: '1004',
    title: 'Mr',
    initials: 'AW',
    address1: 'XYZ',
    address2: 'XYZ',
    address3: 'XYZ',
    gift_aid_signed: true,
    date_gift_aid_cancelled: '2015-02-02',
    address4: 'XYZ',
    county: 'XYZ',
    postcode: 'E1 0SY',
    first_name: 'Alan',
    last_name: 'Watts',
    primary_email: 'alan@watts.com',
    password: 'correct',
    privileges: 'member',
    activation_status: 'activated',
    date_joined: new Date(),
    deliverer: 'Buddha',
    membership_type: module.exports.membershipTypes()[1].value,
    news_type: 'online'
  }, {
    id: '1005',
    title: 'Mr',
    initials: 'SG',
    gift_aid_signed: true,
    date_gift_aid_cancelled: '2015-02-02',
    postcode: 'E1 0SY',
    first_name: 'Siddharta',
    last_name: 'Gautama',
    primary_email: 'siddharta@nirvana.com',
    password: 'correct',
    privileges: 'member',
    activation_status: 'activated',
    date_joined: new Date(),
    deliverer: 'Buddha',
    membership_type: module.exports.membershipTypes()[0].value,
    news_type: 'online'
  }]

  return members
}

exports.payments = function () {
  var payments = [{
    member: module.exports.members()[2].id,
    category: 'subscription',
    type: module.exports.paymentTypes()[3].code,
    description: 'Subscription charge',
    amount: 1000,
    date: new Date((today.getFullYear() - 1) + ', 12, 25')
  }, {
    member: module.exports.members()[2].id,
    category: 'payment',
    description: 'Payment of subscription',
    amount: 1000,
    date: new Date(today.getFullYear() + ', 1, 1')
  }, {
    member: module.exports.members()[3].id,
    category: 'subscription',
    type: module.exports.paymentTypes()[3].code,
    description: 'Subscription charge',
    amount: 2100,
    date: new Date((today.getFullYear() + 1) + ', 12, 25')
  }, {
    member: module.exports.members()[4].id,
    category: 'subscription',
    description: 'Subscription charge',
    amount: 5000,
    date: new Date((today.getFullYear() + 1) + ', 12, 25')
  }, {
    member: module.exports.members()[4].id,
    category: 'payment',
    description: 'Payment for event',
    amount: 1500,
    date: new Date(today.getFullYear() + ', 1, 1')
  }, {
    member: module.exports.members()[5].id,
    category: 'subscription',
    description: 'Subscription charge',
    amount: 2600,
    date: new Date((today.getFullYear() + 1) + ', 12, 25')
  }, {
    member: module.exports.members()[5].id,
    category: 'payment',
    description: 'part payment',
    amount: 1000,
    date: new Date(today.getFullYear() + ', 1, 1')
  }, {
    member: module.exports.members()[5].id,
    category: 'payment',
    description: 'part payment',
    amount: 1000,
    date: new Date(today.getFullYear() + ', 1, 2')
  }, {
    member: module.exports.members()[5].id,
    category: 'payment',
    description: 'part payment',
    amount: 1000,
    date: new Date(today.getFullYear() + ', 1, 3')
  }, {
    member: module.exports.members()[6].id,
    category: 'payment',
    description: 'part payment',
    amount: 500,
    date: new Date(today.getFullYear() + ', 1, 1')
  }, {
    member: module.exports.members()[6].id,
    category: 'payment',
    description: 'part payment',
    amount: 500,
    date: new Date(today.getFullYear() + ', 1, 2')
  }, {
    member: module.exports.members()[6].id,
    category: 'subscription',
    description: 'subscription payment',
    amount: 1000,
    date: new Date(today.getFullYear() + ', 1, 3')
  }]

  return payments
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
  }, {
    value: 'accounts',
    description: 'Accounts',
    amount: null
  }]

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
    code: 'caf',
  }, {
    code: 'credit card',
  }, {
    code: 'refund'
  }, {
    code: 'paypal',
  }]

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
  }]

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

  var events = [{
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
  }]

  return events
}

exports.bookings = function () {
  var bookings = [{
    event_id: '1', // bes party
    head_member: '471800', // bes account
    number_of_members: 5,
    number_of_guests: 1
  }]

  return bookings
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
  }]

  return reasons
}
