import React, { useRef, useEffect } from 'react'

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
            <a href={`/profile/${m.id}`}>{AvatarElips(m.user.picture, 40, 40)}</a>
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

export default ChatMessages
