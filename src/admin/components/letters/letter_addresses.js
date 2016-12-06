import React from 'react'
const format_date = require('app/format_date')

export default ({ address }) => {
  return (
    <div className='addresses'>
      <div className='receiver-address'>
        {address.filter(x => !!x)
          .map((line, i) => <div key={i}>{line}<br /></div>)}
        <span><p>{format_date(Date.now())}</p></span>
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
  )
}
