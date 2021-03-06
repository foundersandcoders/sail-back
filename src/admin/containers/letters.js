import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, compose, converge, merge, pick, prop } from 'ramda'

import { send_sub_reminder_post
       , send_subscription_due_post
       , subscription_due_post_tab
       , toggle_recipient_list
       , show_letter
       , SEND_SUB_REMINDER_POST
       , SUBSCRIPTION_DUE_POST_TAB
       } from '../redux/modules/letters/letters.js'

import sub_letters_section from '../components/letters/sub_letters_section.js'
import subs_due_correspondence from '../components/subs_due_correspondence.js'

const Letters = ({ send_sub_reminder_post, active_tab, subscription_due_post_tab, ...other }) =>
  <div className='top-letter-container'>

    <button
      className={'tabs' + (active_tab === SUBSCRIPTION_DUE_POST_TAB ? ' tabs-active' : '')}
      onClick={subscription_due_post_tab}
    >
      Subscription Due Letter
    </button>

    <button
      className={'tabs' + (active_tab === SEND_SUB_REMINDER_POST ? ' tabs-active' : '')}
      onClick={send_sub_reminder_post}
    > Balance Overdue Letter
    </button>

    <div className='letter-components'>
      {active_tab && map_tab[active_tab]({...other})}
    </div>
  </div>

const sub_due = props => (
  { ...props
  , fetch_sub_due: props.send_subscription_due_post
  , checker: !isEmpty(props.sub_letters)
  , component: sub_letters_section
  }
)


const map_tab =
  { [SEND_SUB_REMINDER_POST]: sub_letters_section
  , [SUBSCRIPTION_DUE_POST_TAB]: compose(subs_due_correspondence, sub_due)
}

export default connect
    ( prop('letters')
    , { send_sub_reminder_post
      , toggle_recipient_list
      , subscription_due_post_tab
      , send_subscription_due_post
      , show_letter
    })(Letters)
