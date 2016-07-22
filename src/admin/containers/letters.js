import React from 'react'
import { connect } from 'react-redux'
import { isEmpty, compose } from 'ramda'

import { send_newsletter_post
       , send_sub_reminder_post
       , send_subscription_due_post
       , subscription_due_post_tab
       , toggle_recipient_list
       , show_letter
       , SEND_NEWSLETTER_POST
       , SEND_SUB_REMINDER_POST
       , SUBSCRIPTION_DUE_POST_TAB
       } from '../redux/modules/letters/letters.js'

import post_members_section from '../dumb_components/letters/post_members_section.js'
import sub_letters_section from '../dumb_components/letters/sub_letters_section.js'
import sub_due_section from '../dumb_components/sub_due_section.js'

const Letters = ({ send_newsletter_post, send_sub_reminder_post, active_tab, subscription_due_post_tab, ...other }) => {
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
        className={'letters-tab' + (active_tab === SUBSCRIPTION_DUE_POST_TAB ? ' letters-tab-active' : '')}
        onClick={subscription_due_post_tab}>
        Subscriptions Due
      </button>

      <div>
        {active_tab && map_tab[active_tab]({...other})}
      </div>
    </div>
  )
}

const sub_due = props => (
  { ...props
  , fetch_sub_due: props.send_subscription_due_post
  , checker: !isEmpty(props.sub_letters)
  , component: sub_letters_section
  }
)

const map_tab =
  { [SEND_NEWSLETTER_POST]: post_members_section
  , [SEND_SUB_REMINDER_POST]: sub_letters_section
  , [SUBSCRIPTION_DUE_POST_TAB]: compose(sub_due_section, sub_due)
}

const mapStateToProps = ({ letters: { sub_letters, post_members, active_tab, shown, shown_letter_index } }) => (
  { sub_letters
  , post_members
  , active_tab
  , shown
  , shown_letter_index
  }
)

export default
  connect(mapStateToProps,
    { send_newsletter_post
    , send_sub_reminder_post
    , toggle_recipient_list
    , subscription_due_post_tab
    , send_subscription_due_post
    , show_letter
  })(Letters)
