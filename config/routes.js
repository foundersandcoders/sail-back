module.exports.routes = {
  'GET /testing': {
    controller: 'Test',
    action: 'test'
  },
  // -------------------------------------------------------------------------
  // Public
  // -------------------------------------------------------------------------
  'GET /api/current_events': {
    controller: 'Events',
    action: 'getCurrentEvents'
  },
  'GET /events': {
    controller: 'Events',
    action: 'showView'
  },
  'GET /event_info/:id': {
    controller: 'Events',
    action: 'showViewEvent'
  },
  'GET /api/event_info/:id': {
    controller: 'Events',
    action: 'singleEventInfo'
  },
  'GET /api/my_events': {
    controller: 'Members',
    action: 'getMyEvents'
  },
  // -------------------------------------------------------------------------
  // Events endpoints
  // -------------------------------------------------------------------------
  'POST /book_event': {
    controller: 'BookingRecords',
    action: 'book'
  },
  // -------------------------------------------------------------------------
  // SignIn process
  // -------------------------------------------------------------------------
  'GET /': {
    controller: 'Public',
    action: 'showHome'
  },
  'GET /user': {
    controller: 'Private',
    action: 'showUserHome'
  },
  'GET /signout': {
    controller: 'Public',
    action: 'adminSignout'
  },
  'GET /member-signout': {
    controller: 'Public',
    action: 'memberSignout'
  },
  'POST /signin': {
    controller: 'Public',
    action: 'ServiceSignIn'
  },
  'POST /forgotPassword': {
    controller: 'Public',
    action: 'forgotPassword'
  },
  // -------------------------------------------------------------------------
  // SignUp process
  // -------------------------------------------------------------------------
  'POST /signup': {
    controller: 'SignUpProcess',
    action: 'create'
  },
  // -------------------------------------------------------------------------
  // User endpoints
  // -------------------------------------------------------------------------
  'GET /api/account': {
    controller: 'Members',
    action: 'accountInfo'
  },
  'PUT /api/account': {
    controller: 'Members',
    action: 'updateAccountInfo'
  },
  'GET /client_token': {
    controller: 'Payments',
    action: 'clientToken'
  },
  'POST /make_payment': {
    controller: 'Payments',
    action: 'makePayment'
  },
  'POST /newsletter_online': {
    controller: 'User',
    action: 'newsletterToOnline'
  },
  'POST /api/add_donation': {
    controller: 'Payments',
    action: 'addDonation'
  },
  'GET /api/get_balance_due': {
    controller: 'Payments',
    action: 'getBalanceDue'
  },

  // -------------------------------------------------------------------------
  // Private
  // -------------------------------------------------------------------------

  'GET /admin': {
    controller: 'Private',
    action: 'showAdminHome'
  },
  'POST /addmember': {
    controller: 'Private',
    action: 'addmember'
  },
  'GET /members/:id': {
    controller: 'Private',
    action: 'showMember'
  },
  'GET /api/members/:id/events': {
    controller: 'Members', //to change
    action: 'admin_get_user_events'
  },
  'POST /api/members/welcome': {
    controller: 'Members', //to change
    action: 'welcome'
  },
  'POST /api/subscription-due': {
    controller: 'Private',
    action: 'subsDue'
  },
  'GET /api/subscription-due-correspondence': {
    controller: 'Private',
    action: 'subsDueCorrespondence'
  },
  'GET /api/newsletter-alert': {
    controller: 'Private',
    action: 'sendNewsletterAlert'
  },
  'GET /api/custom-email': {
    controller: 'Private',
    action: 'sendCustomEmail'
  },
  'GET /api/newsletter-labels': {
    controller: 'Private',
    action: 'getNewsletterLabels'
  },
  'POST /upload': {
    controller: 'Private',
    action: 'upload'
  },

  'GET /api/payingin/:ref': {
    controller: 'Payments',
    action: 'payingInReport'
  },

  'GET /api/noncheque/:type': {
    controller: 'Payments',
    action: 'nonChequeReport'
  },

  'GET /api/reminders': {
    controller: 'Private',
    action: 'subsReminder'
  },

  'GET /api/post-sub-reminders': {
    controller: 'Private',
    action: 'subsReminderPost'
  },

  'POST /api/submit-email': {
    controller: 'Private',
    action: 'submit_email'
  },

  'GET /api/get-bounced': {
    controller: 'Private',
    action: 'get_bounced'
  },

// ------------------------------------------------------------------------
// Analyses
// ------------------------------------------------------------------------

  'GET /api/list-gift-aid/:status': {
    controller: 'Private',
    action: 'list_gift_aid'
  },

  'GET /api/list-deliverers': {
    controller: 'Private',
    action: 'list_deliverers'
  },

  'GET /api/list-by-deliverer/:deliverer': {
    controller: 'Private',
    action: 'list_by_deliverer'
  },

  'GET /api/list-120-overdue': {
    controller: 'Private',
    action: 'list_120_overdue'
  },

  'GET /api/list-email-bounced/:status': {
    controller: 'Private',
    action: 'list_email_bounced'
  },

  'GET /api/get-numbers-report': {
    controller: 'Private',
    action: 'get_numbers_report'
  },

  'GET /api/list-by-membership/:membership': {
    controller: 'Private',
    action: 'list_by_membership'
  }

// -------------------------------------------------------------------------
}
