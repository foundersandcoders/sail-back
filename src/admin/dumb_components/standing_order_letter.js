import React from 'react'


const Field = require('../components/field.js')

export default (props) => {
  console.log('props',  props);
  if (!props.letters) {return <p>no member chosen</p>}
  const {
    id
    , address1
    , address2
    , address3
    , address4
    , postcode
    , first_name
    , last_name
    , due_date
    , title
    , overdue
    , county
    , amount
  } = props.letters
  const calculateOverdue = (overdue) => {
    if (overdue > 90){return 90}
    else return overdue > 60 ? 60 : 30
  }
  const address = [ address1, address2, address3, address4, county, postcode ]
  return (
    <div className='main-container letter-page'>
      <div className='header'>
        <h1>Friends of Chichester Harbour</h1>
        <h3>Registered Charity No: 1051162</h3>
        <img src='/images/logo.png' className='letter-logo'></img>
      </div>
      <div className='addresses'>
        <div className='receiver-address'>
          { address.filter(x => !!x)
            .map((line, i) => <div key={i}>{line}<br /></div>) }
        </div>
        <div className='sender-address'>
          Correspondence to: <br />
          Membership Secretary, <br />
          Friends of Chichester Harbour, <br />
          42 Bracklesham Road, <br />
          Hayling Island, Hampshire <br />
          PO11 9SJ <br />
          e-mail: membershipsecretary@friendsch.org
        </div>
      </div>
      <div className='letter'>
        <h3>Membership Number: { id }</h3>

        <p>Dear { first_name || title + ' ' + last_name },</p>

        <p>We notice that your Standing Order which is normally paid on {due_date} each year has not been paid this year and  £{amount}  has now been unpaid for over { calculateOverdue(overdue) } days.  We assume that this is probably an administrative error and would be very grateful if you could look into it.</p>

        <p>If, alternatively, your intention is to cancel your membership of the Friends we’d be grateful if you could let the Membership Secretary (Pam Marrs, 42 Bracklesham Road, Hayling Island PO11 9SJ) know that that is your intention.</p>

        <p>If you have already sorted the problem out, our apologies and please ignore this email.</p>

        <p>Sincerely</p>

        Richard Evans, <br />
        Treasurer, <br />
        Friends of Chichester Harbour <br />
      </div>
    </div>
  )
}


// Letter.displayName = 'LetterPage'
