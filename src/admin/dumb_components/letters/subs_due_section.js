import React from 'react'
import SubLettersSection from './sub_letters_section.js'


export default ({send_subscription_due_post, ...props}) => {
  const send_request = (e) => {
    e.preventDefault();
    const [ start, end ] = e.target
    send_subscription_due_post({ start: start.value, end: end.value })
  }

  return (
    <div>
      <form onSubmit={send_request}>
        <input type='text' placeholder='From date' />
        <input type='text' placeholder='To date' />
        <button type='submit'>{`Submit Subscription's Due`}</button>
      </form>

      {props.sub_letters.length > 0
        && <SubLettersSection {...props}/> }
    </div>
  )
}
