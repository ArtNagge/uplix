import cn from 'classnames'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'
import SvgIcon from '../SvgIcon/SvgIcon'
import { ChatMessages } from './ChatMessages'
import clearMethod from '../../utils/clearMethod'

class Chat extends PureComponent {
  state = {
    chat: '',
  }

  get header() {
    const { online } = this.props
    return (
      <div className={s.chat_header}>
        <span className={s.chat_header_heading}>Онлайн чат</span>
        <span className={s.chat_header_online}>{online}</span>
      </div>
    )
  }

  sendMessage = (evt) => {
    evt.preventDefault()
    const { chat } = this.state
    const { ws } = this.props

    this.setState({ chat: '' }, sendSocket(ws, 3, { method: 'chat.send', parameters: { message: chat } }, 'chatSend'))
  }

  handleInput = (e) => {
    const { value } = e.target
    this.setState({ chat: value })
  }

  keyDown = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      this.sendMessage(e)
    }
  }

  get chatForm() {
    const {
      user: {
        user: { auth },
      },
      lang,
    } = this.props
    const { chat } = this.state

    return auth ? (
      <div className={s.chat_form}>
        <form onSubmit={this.sendMessage}>
          <textarea
            type="text"
            value={chat}
            placeholder={lang && lang['chat.area']}
            onChange={this.handleInput}
            onKeyDown={this.keyDown}
          ></textarea>
          <button>
            <SvgIcon icon="send" classes={s.chat_form_icon} />
          </button>
        </form>
      </div>
    ) : (
      <div className={s.chat_form}>
        <div className={s.chat_form_dontAuth}>
          <span dangerouslySetInnerHTML={{ __html: lang && clearMethod(lang['chat.authorization_required']) }} />
        </div>
      </div>
    )
  }

  render() {
    const { messages, activeChat } = this.props

    return (
      <div className={cn(s.chat, activeChat && s.chat_active)}>
        {this.header}
        <ChatMessages messages={messages} />
        {this.chatForm}
      </div>
    )
  }
}

const mapStateToProps = ({ lang: { data: lang } }) => ({ lang })

export default connect(mapStateToProps, {})(Chat)
