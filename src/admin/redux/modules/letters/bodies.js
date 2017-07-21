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


  If you have already sorted the problem out, our apologies and please ignore this letter.



  Sincerely,

  Chris Williams,
  Treasurer,
  Friends of Chichester Harbour
`)

exports.sub_reminder = ({ title, first_name, last_name, overdue, amount, id }) => (
`Dear [Friend /name]

The renewal of your annual membership for the Friends of Chichester Harbour is now overdue
${getOverdue(overdue)} days.  I very much hope that you will continue your membership in support of our voluntary activities around the harbour.  If you would like more details about the projects we support or the work parties we organise, please visit our website at www.friendsch.org

Your annual subscription is ${formatPounds(amount)} and payment can be made by one of the following three methods:
Credit Card or PayPal online from your PC, Mac, smartphone or tablet.
To do so, go to http://friendsch.org and click on Member Sign-In on the Home page.

Direct bank transfer to Friends of Chichester Harbour, Account No: 87037440,
Sort Code 52-41-20 quoting your membership number ${id}

Sending a cheque, quoting your membership number ${id} to Pam Marrs,
Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ

If you do not wish to renew your membership, or if you have any problems doing so, please let us know by emailing me at membership@friendsch.org, or by writing to me at the above address.

If you have already paid, our apologies and please ignore this letter.


Yours sincerely,

Pam Marrs
Membership Secretary`
)

exports.subscription_due = ({ id, title, first_name, last_name, due_date, amount}) => (
`Dear ${first_name || title + ' ' + last_name }

Your annual membership for the Friends of Chichester Harbour is due for renewal on ${formatDate(due_date)}.

I very much hope that you will continue your membership in support of our voluntary activities around the harbour.  Your membership subscription is critical to the significant financial assistance we give to the Conservancy and other organisations around the harbour.  The grants we provide support projects and activities that otherwise just would not take place, and help to conserve, preserve and educate for the future.  As well as the considerable financial assistance we give, the Friends provide work parties, every week all year round, which take part in essential maintenance and repairs to the footpaths and nature reserves across the harbour.  If you would like more details about the grants we have provided, or the work parties we organise, please visit our website at www.friendsch.org.
If as part of your membership you would like to be more involved please let us know.

Your annual subscription is ${formatPounds(amount)} and payment can be made by one of the following three methods:
Credit Card or PayPal online from your PC, Mac, smartphone or tablet.
To do so, go to http://friendsch.org and click on Member Sign-In on the Home page.

Direct bank transfer to Friends of Chichester Harbour, Account No: 87037440,
Sort Code 52-41-20 quoting your membership number ${id}

Sending a cheque, quoting your membership number ${id} to Pam Marrs,
Membership Secretary FOCH, 42 Bracklesham Road, Hayling Island PO11 9SJ

Please let us know if you have any problems by emailing me at membership@friendsch.org,
or by writing to me at the above address.


Yours sincerely,

Pam Marrs
Membership Secretary`
)
