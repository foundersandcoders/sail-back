import React from 'react'
import { connect } from 'react-redux'

import { send_newsletter_post
       , send_sub_reminder_post
       , toggle_recipient_list
       , show_letter
       } from '../redux/modules/letters/letters.js'

import PostMembersSection from '../dumb_components/letters/post_members_section.js'
import SubLettersSection from '../dumb_components/letters/sub_letters_section.js'

const Letters = ({ send_newsletter_post, send_sub_reminder_post, active_tab, ...other }) => {
  return (
    <div className='top-letter-container'>

      <button
        className={'letters-tab' + (active_tab === 'members' ? ' letters-tab-active' : '')}
        onClick={send_newsletter_post}>
        Post Members
      </button>

      <button
        className={'letters-tab' + (active_tab === 'letters' ? ' letters-tab-active' : '')}
        onClick={send_sub_reminder_post}>
        Subscription Reminders
      </button>

      <div>
        {active_tab &&
          (active_tab === 'letters'
           ? <SubLettersSection {...other} />
           : <PostMembersSection {...other} />)
          }
      </div>

    </div>
  )
}

const mapStateToProps = (state) => (
  { letters: state.letters
  , active_tab: state.letters.active_tab
  }
)

export default
  connect(mapStateToProps, { send_newsletter_post, send_sub_reminder_post, toggle_recipient_list, show_letter })(Letters)
