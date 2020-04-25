import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { AvatarElips } from '../../AvatarElips'

import s from '../styles.scss'

const ChatMessages = ({ messages }) => {
  const chatRef = useRef(null)

  const chatAutoScroll = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }

  useEffect(() => {
    chatAutoScroll()
  }, [messages])

  return (
    <div className={s.chat_messages} ref={chatRef}>
      <div className={s.chat_messages_container}>
        {messages.map((m, index) => (
          <div className={s.chat_message} key={index}>
            {AvatarElips(m.user.picture, 40, 40)}
            <div className={s.chat_message_info}>
              <span>{`${m.user.name}: `}</span>
              {m.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
ChatMessages.propTypes = {
  messages: PropTypes.array,
}
export default ChatMessages
