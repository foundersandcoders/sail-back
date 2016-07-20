import React from 'react'

export default ({ fetch_sub_due, component, checker, ...props }) => {
  const send_request = (e) => {
    e.preventDefault();
    const [ start, end ] = e.target
    fetch_sub_due({ start: start.value, end: end.value })
  }
  return (
    <div>
      {checker
        ? component(props)
        : <form className='date-boundaries-form' onSubmit={send_request}>
            <input type='text' placeholder='From date' />
            <input type='text' placeholder='To date' />
            <button type='submit'>{`Submit Subscription's Due`}</button>
          </form>
      }
    </div>
  )
}
