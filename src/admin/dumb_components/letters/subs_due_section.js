import React from 'react'
import SubLettersSection from './sub_letters_section.js'


export default ({...props, send_subscription_due_post}) => {
  console.log('action in sub due section',send_subscription_due_post);
  return(
  <div>
    <form>
      <input type='text' placeholder='From date' />
      <input type='text' placeholder='To date' />
      <button onClick={props.send_subscription_due_post}>{`Submit Subscription's Due`}</button>
    </form>

    <SubLettersSection {...props}/>
  </div>
)
}
