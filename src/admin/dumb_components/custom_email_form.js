const React = require('react')
const { map, objOf, zipWith, merge, compose, indexBy, prop, converge, dissoc } = require('ramda')

export default ({ members, submit }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    submit(members, e.target)
  }
  return (
    <div className='custom-email-container'>
      <p><i>Write out your custom email.</i></p>
      <form onSubmit={onSubmit}>
        <input type='text' className='custom-email-subject' placeholder='Subject'></input>
        <textarea className='custom-email' placeholder='Email body' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
