import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post
       , send_sub_reminder_post
       , toggle_recipient_list
       , send_subscription_due_post
       , show_letter
       , SEND_NEWSLETTER_POST
       , SEND_SUB_REMINDER_POST
       , SEND_SUBSCRIPTION_DUE_POST
       } from '../redux/modules/letters/letters.js'

import PostMembersSection from '../dumb_components/letters/post_members_section.js'
import SubLettersSection from '../dumb_components/letters/sub_letters_section.js'

const Letters = ({ send_newsletter_post, send_sub_reminder_post, active_tab, send_subscription_due_post, ...other }) => {
  return (
    <div className='top-letter-container'>

      <button
        className={'letters-tab' + (active_tab === SEND_NEWSLETTER_POST ? ' letters-tab-active' : '')}
        onClick={send_newsletter_post}>
        Post Members
      </button>

      <button
        className={'letters-tab' + (active_tab === SEND_SUB_REMINDER_POST ? ' letters-tab-active' : '')}
        onClick={send_sub_reminder_post}>
        Subscription Reminders
      </button>

      <button
        className={'letters-tab' + (active_tab === SEND_SUBSCRIPTION_DUE_POST ? ' letters-tab-active' : '')}
        onClick={send_subscription_due_post}>
        Subscriptions Due
      </button>

      <div>
        {active_tab && map_tab[active_tab]({...other})}
      </div>
    </div>
  )
}

const map_tab =
  { [SEND_NEWSLETTER_POST]: other => <PostMembersSection {...other} />
  , [SEND_SUB_REMINDER_POST]: other => <SubLettersSection {...other} />
  , [SEND_SUBSCRIPTION_DUE_POST]: other => <SubLettersSection {...other} />
}


const mapStateToProps = (state) => (
  { letters: state.letters
  , active_tab: state.letters.active_tab
  }
)

export default
  connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post, toggle_recipient_list, send_subscription_due_post, show_letter })(Letters)
