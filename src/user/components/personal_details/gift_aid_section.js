import React from 'react'

export default ({toggle_gift_aid}) => {
  const handleSubmit = e => {
    e.preventDefault()
    toggle_gift_aid()
  }
  return (
    <div>
      <h3>You have not made a Gift Aid Declaration</h3>
      <p>
        You can boost the value of your subscription/donation to the Friends by 25p of
        Gift Aid for every £1 subscribed/donated. Gift Aid is reclaimed by the Friends
        from the tax you pay for the current tax year. If you wish to Gift Aid your
        subscription/donations to the Friends for this year, future years and the past
        4 years please tick the box below.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='checkbox' required/>
          <p>
            I wish to make a Gift Aid Declaration to the Friends. I am a UK taxpayer and
            understand that if I pay less Income Tax and/or Capital Gains Tax than the
            amount of Gift Aid claimed on all my donations in that tax year it is my
            responsibility to pay any difference.
          </p>
        </div>
        <button type='submit'>Confirm Gift Aid</button>
      </form>
    </div>
  )
}
