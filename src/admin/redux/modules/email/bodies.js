const format = require('app/format_date').format_due_date
const { formatPounds } = require('app/monies')
const end_membership_email_footer = require('app/end_membership_email_footer')

exports.newsletter_alert = ({ greeting }) =>
`Friends of Chichester Harbour
Dear ${greeting},
You'll be pleased to hear that a new edition of the Newsletter for the Friends of Chichester Harbour has just been put up on the Friends website. Please do go online to friendsch.org to read it.
Sarah Newman, Editor, FOCH
${end_membership_email_footer}
`

exports.newsletter_reminder = ({ greeting }) =>
`Friends of Chichester Harbour
Dear ${greeting},
If you haven’t already been online and read the most recent edition of the Newsletter for the Friends of Chichester Harbour please do go online to friendsch.org and read it.
Sarah Newman, Editor, FOCH
${end_membership_email_footer}
`

const late = n => ({ greeting, amount, id }) =>
`Friends of Chichester Harbour
Dear ${greeting}
The renewal of your annual membership for the Friends of Chichester Harbour is now ${n} days overdue. We very much hope that you will continue your membership in support of our voluntary activities around the harbour.  Your membership subscription is critical to the significant financial assistance we give to the Conservancy and other organisations around the harbour.  The grants we provide support projects and activities that otherwise just would not take place, and help to conserve, preserve and educate for the future.  As well as the considerable financial assistance we give, the Friends provide work parties, every week all year round, which take part in essential maintenance and repairs to the footpaths and nature reserves across the harbour.  If you would like more details about the projects we support or the work parties we organise, please visit our website at www.friendsch.org
Your annual subscription is ${formatPounds(amount)} and payment can be made by one of the following three methods:
● Credit Card or PayPal online from your PC, Mac, smartphone or tablet.  To do so, go to http://friendsch.org and click on Member Sign-In on the Home page.
● By direct bank transfer to Friends of Chichester Harbour, Account No: 87037440, Sort Code 52-41-20 quoting your membership number ${id}
● By cheque, quoting your membership number ${id} to Pam Marrs, Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ
If you do not wish to renew your membership, or if you have any problems doing so, please let us know by emailing me at membership@friendsch.org
Please do not reply to the messenger address above.
If you have already paid, our apologies and please ignore this email.

Yours sincerely,

Pam Marrs
Membership Secretary
${end_membership_email_footer}
`

exports.lates = [ 30, 60, 90 ].map(late)

const standing = n => ({ greeting, amount, due_date }) =>
`Friends of Chichester Harbour
Dear ${greeting},
We notice that your Standing Order which is normally paid on ${format(due_date)} each year has not been paid this year and ${formatPounds(amount)} has now been unpaid for over ${n} days. We assume that this is probably an administrative error and would be very grateful if you could look into it. If, alternatively, your intention is to cancel your membership of the Friends we’d be grateful if you could email the Membership Secretary on membership@friendsch.org to that effect. If you have already sorted the problem out, our apologies and please ignore this email.
Please do not reply to the messenger address above. If you wish to reply please use membership@friendsch.org.
Chris Williams, Treasurer FoCH
${end_membership_email_footer}
`

exports.standing = [ 30, 60, 90 ].map(standing)

exports.subscription_due = ({ greeting, amount, due_date, id}) =>
`Friends of Chichester Harbour
Dear ${greeting},

Your annual membership for the Friends of Chichester Harbour is due for renewal on ${format(due_date)}
I very much hope that you will continue your membership in support of our voluntary activities around the harbour.  Your membership subscription is critical to the significant financial assistance we give to the Conservancy and other organisations around the harbour.  The grants we provide support projects and activities that otherwise just would not take place, and help to conserve, preserve and educate for the future. Further information about some of the recent grants we have provided can be found through the following link http://friendsch.org/grants/
As well as the considerable financial assistance we give, the Friends provide work parties, every week all year round, which take part in essential maintenance and repairs to the footpaths and nature reserves across the harbour.  You can find more details about the work parties we organise through the following link http://friendsch.org/work-parties/

Your annual subscription is ${formatPounds(amount)} and payment can be made by one of the following three methods:
Credit Card or PayPal online from your PC, Mac, smartphone or tablet.
To do so, go to http://friendsch.org and click on Member Sign-In on the Home page.

Direct bank transfer to Friends of Chichester Harbour, Account No: 87037440,
Sort Code 52-41-20 quoting your membership number ${id}

Sending a cheque, quoting your membership number ${id} to Pam Marrs,
Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ

Please let us know if you have any problems by emailing me at membership@friendsch.org,
Please do not reply to the messenger address above.


Yours sincerely,

Pam Marrs
Membership Secretary
${end_membership_email_footer}
`
