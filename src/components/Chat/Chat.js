import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'
import SvgIcon from '../SvgIcon/SvgIcon'
import { ChatMessages } from './ChatMessages'
import clearMethod from '../../utils/clearMethod'

const header = (online = 0) => {
  return (
    <div className={s.chat_header}>
      <span className={s.chat_header_heading}>Онлайн чат</span>
      <span className={s.chat_header_online}>{online}</span>
    </div>
  )
}

const Chat = (props) => {
  const [chat, setChat] = useState('')
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  const chatForm = () => {
    const {
      user: {
        user: { auth },
      },
      ws,
    } = props

    const sendMessage = () => {
      sendSocket(ws, 3, { method: 'chat.send', parameters: { message: chat } }, 'chatSend')
      return setChat('')
    }

    return auth ? (
      <div className={s.chat_form}>
        <textarea
          type="text"
          value={chat.value}
          placeholder={lang && lang['chat.area']}
          onInput={(evt) => setChat(evt.target.value)}
        ></textarea>
        <button onClick={() => sendMessage()}>
          <SvgIcon icon="send" classes={s.chat_form_icon} />
        </button>
      </div>
    ) : (
      <div className={s.chat_form}>
        <div className={s.chat_form_dontAuth}>
          <span dangerouslySetInnerHTML={{ __html: lang && clearMethod(lang['chat.authorization_required']) }} />
        </div>
      </div>
    )
  }

  const { messages, online } = props

  return (
    <div className={s.chat}>
      {header(online)}
      {ChatMessages(messages)}
      {chatForm()}
    </div>
  )
}

Chat.propTypes = {
  messages: PropTypes.array,
  user: PropTypes.shape({
    auth: PropTypes.boolean,
    name: PropTypes.string,
    avatar: PropTypes.string,
    balance: PropTypes.number,
    id: PropTypes.number,
  }),
}

export default Chat
