import cn from 'classnames'
import React from 'react'
import SvgIcon from '../SvgIcon'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import sendSocket from '../../utils/sendSocket'
import checkLang from '../../utils/checkLang'
import formatFN from '../../utils/formatFN'
import AvatarElips from '../AvatarElips'

import s from './styles.scss'

const HeaderMobile = ({ handleInvisible, activeMenu, activeChat, handleModal }) => {
  const { user, lang, ws } = useSelector(({ user: { user }, lang: { data: lang }, socket: { ws } }) => ({
    user,
    lang,
    ws,
  }))
  const { auth, balance, name, picture } = user

  const clickAuth = async () =>
    await sendSocket(ws, 3, { method: 'auth.getAuthUri', parameters: { social: 'vkontakte' } }, 'auth')

  return (
    <>
      <header className={s.header}>
        <button data-value="activeMenu" className={s.header_menu} onClick={handleInvisible}>
          <SvgIcon icon="burgerMenuLeft" classes={cn(s.header_menu_icon, activeMenu && s.header_menu_icon_active)} />
        </button>
        <Link to="/">
          <SvgIcon icon="logo" classes={s.header_logo} />
        </Link>
        <button data-value="activeChat" className={s.header_chat} onClick={handleInvisible}>
          <SvgIcon icon="chat" classes={cn(s.header_chat_icon, activeChat && s.header_chat_icon_active)} />
        </button>
      </header>
      <div className={s.header_sub}>
        {auth ? (
          <>
            <div className={s.header_sub_balance}>
              <div className={s.header_sub_balance_container}>
                <SvgIcon classes={s.header_sub_balance_container_icon} icon="gem" />
                <span className={s.header_sub_balance_container_balance}>{balance}</span>
                <button className={s.header_sub_balance_container_add} onClick={() => handleModal('balance')}>
                  <SvgIcon icon="plus" classes={s.header_sub_balance_container_add_icon} />
                </button>
              </div>
            </div>
            <div className={s.header_sub_user}>
              <Link className={s.header_sub_user_info} to="/profile">
                <span>{formatFN(name)}</span>
                {AvatarElips(picture, 25, 25, true)}
              </Link>
              <button onClick={() => handleModal('exit')}>
                <SvgIcon icon="logout" classes={s.header_sub_user_icon} />
              </button>
            </div>
          </>
        ) : (
          <div className={s.header_sub_dontAuth}>
            <span className={s.header_sub_dontAuth_heading}>{checkLang(lang, 'authorization.through')}</span>
            <button
              onClick={clickAuth}
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.header_sub_dontAuth_link}
            >
              <SvgIcon icon="vk" classes={s.header_sub_dontAuth_link_icon} />
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default HeaderMobile
