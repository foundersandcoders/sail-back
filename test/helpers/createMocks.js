'use strict'

module.exports = {
  member: member,
  payment: payment,
  eventItem: eventItem,
  getEvents: getEvents,
  getMembers: getMembers
}

function member (id) {
  var member = {
    id: id || 9999,
    title: 'Mr',
    initials: 'B H',
    last_name: 'Hoxhaj',
    primary_email: 'besart@hoxhaj.com',
    password: 'secret',
    membership_type: 'annual-double',
    address1: 'Moon',
    address2: 'Street',
    address3: '24',
    address4: 'Second floor',
    postcode: 'J89 001',
    gift_aid_signed: false
  }

  member.payments = [
    payment({
      memberId: member.id,
      category: 'donation',
      type: 'CHQ',
      date: '08-11-12'
    }),
    payment({
      memberId: member.id,
      date: '09-11-11',
      category: 'donation'
    }),
    payment({
      memberId: member.id,
      category: 'subscription',
      type: 'BACSA',
      date: '10-11-11'
    }),
    payment({
      memberId: member.id,
      category: 'donation',
      date: '11-11-11'
    }),
    payment({
      memberId: member.id,
      date: '12-11-11',
      category: 'donation'
    })
  ]

  return member
}

function payment (opts) {
  var dateString = opts ? (opts.date || '') : ''
  var randomNum = parseInt(Math.random() * 100000)

  return {
    member: opts ? (opts.memberId || randomNum) : randomNum,
    category: opts ? (opts.category || 'payment') : 'payment',
    type: opts ? (opts.type || 'CASH')    : 'CASH',
    description: 'Hello world!',
    amount: parseInt(Math.random() * 100),
    date: new Date(dateString)
  }
}

function eventItem (places) {
  return {
    title: 'Dinner at Bes',
    reference: 'YH77D',
    short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
    photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
    date: new Date('11-11-11'),
    time: '19:00',
    location: 'London',
    host: 'Bes',
    price_per_member: 15,
    price_per_guest: 20,
    max_number_of_guests: 5,
    total_places_available: places || 20
  }
}

function getEvents () {
  return [
    {
      title: 'Party in London',
      reference: 'YH56D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://www.splashmood.com/wp-content/uploads/2014/06/Yeh-Jawaani-Hai-Deewani-Night-Party-HD-Wallpaper.jpg',
      date: '2015-09-20T23:00:00.000Z',
      time: '21:00',
      location: 'London',
      host: 'Wil',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20,
      open_for_booking: false,
      disability_note: null,
      id: 1,
      createdAt: '2015-07-20T23:46:46.000Z',
      updatedAt: '2015-07-20T23:46:46.000Z'
    },
    {
      title: 'Today at Wil',
      reference: 'CH11D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://stanford.edu/~siejeny/Dinner.jpg',
      date: '2015-07-20T23:00:00.000Z',
      time: '19:00',
      location: 'London',
      host: 'Wil',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20,
      open_for_booking: false,
      disability_note: null,
      id: 3,
      createdAt: '2015-07-20T23:46:46.000Z',
      updatedAt: '2015-07-20T23:46:46.000Z'
    },
    {
      title: 'Visit at Chichester',
      reference: 'YH77D',
      short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel gravida velit. Vivamus porttitor neque nec nibh aliquam, vehicula accumsan justo pellentesque. Curabitur eu nisi purus. Vestibulum id orci dictum, auctor enim ut, ullamcorper risus. Maecenas vulputate euismod nibh, aliquam lacinia elit pharetra ac. Maecenas eu venenatis sapien.',
      photo_url: 'http://mtbl1.vm.bytemark.co.uk/familydaysout/wp-content/uploads/Chichester-Solar-Boat-Harbour-8.jpg',
      date: '2015-08-20T23:00:00.000Z',
      time: '19:00',
      location: 'London',
      host: 'Bes',
      price_per_member: 15,
      price_per_guest: 20,
      max_number_of_guests: 5,
      total_places_available: 20,
      open_for_booking: false,
      disability_note: null,
      id: 4,
      createdAt: '2015-07-20T23:46:46.000Z',
      updatedAt: '2015-07-20T23:46:46.000Z'
    }
  ]
}

function getMembers () {
  return [
    {
      id: 1234,
      last_name: 'Fisher',
      first_name: 'William',
      title: 'Mr',
      initials: 'S',
      membership_type: 'annual-single',
      payments: []
    },
    {
      id: 4321,
      last_name: 'Shyti',
      first_name: 'Besart',
      title: 'Mr',
      initials: 'H',
      membership_type: 'life',
      payments: []
    },
    {
      id: 1111,
      last_name: 'Sofer',
      first_name: 'Dan',
      title: 'Mdm.',
      initials: '',
      membership_type: 'annual-double',
      payments: []
    },
    {
      id: 4444,
      last_name: 'Lees',
      first_name: 'Bonji',
      title: 'Snr.',
      initials: 'M',
      membership_type: 'annual-single',
      payments: []
    }
  ]
}
