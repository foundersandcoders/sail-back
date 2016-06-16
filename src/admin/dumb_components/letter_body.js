import React from 'react'

export default (props) => {
  const {
    id,
    first_name,
    last_name,
    due_date,
    title,
    overdue,
    amount
  } = props.letters

  const calculateOverdue = (overdueDays) => {
    if (overdueDays > 90) {
      return 90
    } else {
      return overdueDays > 60 ? 60 : 30
    }
  }

  return (
    <div className='letter'>
      <h3>Membership Number: {id}</h3>

      <p>Dear {first_name || title + ' ' + last_name},</p>

      <p>
        We notice that your Standing Order which is normally paid on {due_date}
        each year has not been paid this year and  £{amount}  has now been unpaid
        for over {calculateOverdue(overdue)} days.  We assume that this is probably
        an administrative error and would be very grateful if you could look into it.
      </p>

      <p>
        If, alternatively, your intention is to cancel your membership of the Friends
        we’d be grateful if you could let the Membership Secretary
        (Pam Marrs, 42 Bracklesham Road, Hayling Island PO11 9SJ) know that that is your intention.
      </p>

      <p>
        If you have already sorted the problem out, our apologies and please ignore this email.
      </p>

      <p>Sincerely</p>

      Richard Evans, <br />
      Treasurer, <br />
      Friends of Chichester Harbour <br />
    </div>
  )
}
