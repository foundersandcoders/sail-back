const formatDate = require('app/format_date').format_due_date
const { formatPounds } = require('app/monies')

const getOverdue = (days) => {
  if (days > 90) return 90
  return days > 60 ? 60 : 30
}

exports.sub_reminder_SO = (member) => (
  `Dear ${member.first_name || member.title + ' ' + member.last_name },
  We notice that your Standing Order which is normally paid on ${formatDate(member.due_date)} each year has not been paid this year and ${formatPounds(member.amount)} has now been unpaid for over ${getOverdue(member.overdue)} days. We assume that this is probably an administrative error and would be very grateful if you could look into it.
  If, alternatively, your intention is to cancel your membership of the Friends we’d be grateful if you could let the Membership Secretary (Pam Marrs, 42 Bracklesham Road, Hayling Island PO11 9SJ) know that that is your intention.
  If you have already sorted the problem out, our apologies and please ignore this letter.`
)


exports.sub_reminder = (member) => (
  `Dear ${member.first_name || member.title + ' ' + member.last_name },
  We would be very grateful for payment of your annual subscription of ${formatPounds(member.amount)} which has now been outstanding for over ${getOverdue(member.overdue)} days.
  Payment can be made by direct bank transfer to Friends of Chichester Harbour, Account No: 87037440,  Sort Code 52-41-20 quoting your membership number ${member.id}.
  Or you can send a cheque, quoting your membership number ${member.id} to Pam Marrs, Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ.
  If you have already paid, our apologies and please ignore this letter.`
)

exports.subscription_due = (member) => (
  `Dear ${member.first_name || member.title + ' ' + member.last_name },
  Your annual subscription of ${formatPounds(member.amount)} becomes due on ${formatDate(member.due_date)} and we do hope that you will renew your membership of the Friends of Chichester Harbour. To renew your membership log in online to friendsch.org where you can pay by Credit Card, Debit Card or PayPal. Payment can be made by direct bank transfer to Friends of Chichester Harbour, Account No: 87037440, Sort Code 52-41-20 quoting your membership number ${member.id}. Or you can send a cheque, quoting your membership number ${member.id} to Pam Marrs, Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ. If you have already paid, our apologies and please ignore this email.`
)
