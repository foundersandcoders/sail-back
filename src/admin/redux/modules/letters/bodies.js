const formatDate = require('app/format_date')

const getOverdue = (days) => {
  if (days > 90) return 90
  return days > 60 ? 60 : 30
}

exports.sub_reminder = (members) => (
  `Dear ${members.first_name || members.title + ' ' + members.last_name },
  We notice that your Standing Order which is normally paid on ${formatDate(members.due_date)} each year has not been paid this year and £${members.amount} has now been unpaid for over ${getOverdue(members.overdue)} days. We assume that this is probably an administrative error and would be very grateful if you could look into it.
  If, alternatively, your intention is to cancel your membership of the Friends we’d be grateful if you could let the Membership Secretary (Pam Marrs, 42 Bracklesham Road, Hayling Island PO11 9SJ) know that that is your intention.
  If you have already sorted the problem out, our apologies and please ignore this letter.`
)
