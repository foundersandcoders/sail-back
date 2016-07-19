import React from 'react'
import SubLettersSection from './sub_letters_section.js'


export default ({send_subscription_due_post, ...props}) => {
  const send_request = (e, form) => {
    e.preventDefault();
    send_subscription_due_post()
  }

  return (
    <div>
      <form>
        <input type='text' placeholder='From date' />
        <input type='text' placeholder='To date' />
        <button onClick={send_request}>{`Submit Subscription's Due`}</button>
      </form>

      {props.sub_letters.length > 0
        && <SubLettersSection {...props}/> }
    </div>
  )
}
