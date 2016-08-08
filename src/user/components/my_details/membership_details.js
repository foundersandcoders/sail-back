import React from 'react'

import EditDetails from './edit_details.js'


export default (props) => {
  console.log(props);
  return (
    <div>
      <div className='end-membership'>
        {props.my_details.activation_status && props.my_details.activation_status.initial_value === 'activated'
          ? show_end_membership(props.my_details.activation_status)
          : <p>Please contact us if you would like to reinstate your membership.</p>}
      </div>
      <EditDetails {...props} />
    </div>
  )
}


//show end membership should be a form???

const show_end_membership = (status) => (
  <div>
  { status.value !== 'activated'
    ? <button onClick={() => console.log('change initial value')}>
        End Membership
      </button>
    : <div>
        <p>
          We are sorry to see you go. please let us know why you are leaving.
        </p>
        <textarea></textarea>
        <button>Confirm</button><button>Cancel</button>
      </div>
  }
</div>
)
