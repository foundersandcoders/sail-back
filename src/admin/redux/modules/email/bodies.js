const format = require('app/format_date').format_due_date
const { formatPounds } = require('app/monies')


exports.newsletter_alert = ({ greeting }) =>
`Friends of Chichester Harbour
Dear ${greeting},
You'll be pleased to hear that a new edition of the Newsletter for the Friends of Chichester Harbour has just been put up on the Friends website. Please do go online to friendsch.org to read it.
Sarah Newman, Editor, FOCH`

exports.newsletter_reminder = ({ greeting }) =>
`Friends of Chichester Harbour
Dear ${greeting},
If you haven’t already been online and read the most recent edition of the Newsletter for the Friends of Chichester Harbour please do go online to friendsch.org and read it.
Sarah Newman, Editor, FOCH`

const late = n => ({ greeting, amount, id }) =>
`Friends of Chichester Harbour
Dear ${greeting},
We would be very grateful for payment of your annual subscription of ${formatPounds(amount)} which has now been outstanding for over ${n} days. Payment can be made by direct bank transfer to Friends of Chichester Harbour, Account No: 87037440, Sort Code 52-41-20 quoting your membership number ${id}. Or you can send a cheque, quoting your membership number ${id} to Pam Marrs, Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ. If you have already paid, our apologies and please ignore this email.
Richard Evans, Treasurer FoCH`

exports.lates = [ 30, 60, 90 ].map(late)

const standing = n => ({ greeting, amount, due_date }) =>
`Friends of Chichester Harbour
Dear ${greeting},
We notice that your Standing Order which is normally paid on ${format(due_date)} each year has not been paid this year and ${formatPounds(amount)} has now been unpaid for over ${n} days. We assume that this is probably an administrative error and would be very grateful if you could look into it. If, alternatively, your intention is to cancel your membership of the Friends we’d be grateful if you could email the Membership Secretary on membership@friendsch.org to that effect.
If you have already sorted the problem out, our apologies and please ignore this email.
Richard Evans, Treasurer FoCH`

exports.standing = [ 30, 60, 90 ].map(standing)

exports.subscription_due = ({ greeting, amount, due_date, id}) =>
`Friends of Chichester Harbour
Dear ${greeting},
Your annual subscription of ${formatPounds(amount)} becomes due on ${format(due_date)} and we do hope that you will renew your membership of the Friends of Chichester Harbour. Payment can be made by direct bank transfer to Friends of Chichester Harbour, Account No: 87037440, Sort Code 52-41-20 quoting your membership number ${id}. Or you can send a cheque, quoting your membership number ${id} to Pam Marrs, Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ. If you have already paid, our apologies and please ignore this email.
Richard Evans, Treasurer FoCH`
