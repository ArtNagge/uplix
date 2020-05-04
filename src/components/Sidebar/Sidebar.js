import cn from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'
import Media from 'react-media'
import { Link, NavLink } from 'react-router-dom'

import bag from './img/bag.png'
import SvgIcon from '../SvgIcon/SvgIcon'
import formatFN from '../../utils/formatFN'
import checkLang from '../../utils/checkLang'
import sendSocket from '../../utils/sendSocket'
import clearMethod from '../../utils/clearMethod'
import AvatarElips from '../AvatarElips/AvatarElips'
import s from './styles.scss'

const Sidebar = ({ user, ws, activeMenu, onClick, handleModal }) => {
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  const clickAuth = async () =>
    await sendSocket(ws, 3, { method: 'auth.getAuthUri', parameters: { social: 'vkontakte', dev: 1 } }, 'auth')

  const userPanel = () => {
    const { auth, name, balance, picture } = user.user
    return (
      <div className={s.sidebar_userPanel}>
        {auth ? (
          <>
            <Link to="/profile">{AvatarElips(picture, 90, 90)}</Link>
            <div className={s.sidebar_userPanel_controls}>
              <div className={s.sidebar_userPanel_controlsInfo}>
                <Link to="/profile">{formatFN(name)}</Link>
                <button onClick={() => handleModal('exit')}>
                  <SvgIcon icon="logout" classes={s.sidebar_userPanel_controlsInfo_icon} />
                </button>
              </div>
              <div className={s.sidebar_userPanel_controlsBalance}>
                <div className={s.sidebar_userPanel_controlsBalance_container}>
                  <SvgIcon classes={s.sidebar_userPanel_controlsBalance_container_icon} icon="gem" />
                  <span className={s.sidebar_userPanel_controlsBalance_balance}>{balance}</span>
                  <button className={s.sidebar_userPanel_controlsBalance_add} onClick={() => handleModal('balance')}>
                    <SvgIcon icon="plus" classes={s.sidebar_userPanel_controlsBalance_add_icon} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={s.sidebar_userPanel_dontAuth}>
            <span className={s.sidebar_userPanel_dontAuth_heading}>{checkLang(lang, 'welcome')}</span>
            <button
              onClick={clickAuth}
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={s.sidebar_userPanel_dontAuth_link}
            >
              {checkLang(lang, 'authorization.through')}
              <SvgIcon icon="vk" classes={s.sidebar_userPanel_dontAuth_icon} />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn(s.sidebar, activeMenu && s.sidebar_active)}>
      <Media query={{ maxWidth: 1280 }}>
        {(match) =>
          match ? null : (
            <>
              <header className={s.sidebar_header}>
                <Link to="/">
                  <SvgIcon icon="logo" classes={s.sidebar_header_icon} />
                </Link>
              </header>
              <section className={s.sidebar_user}>{userPanel()}</section>
            </>
          )
        }
      </Media>
      <div className={s.sidebar_scroll}>
        <nav className={s.sidebar_menu}>
          <NavLink
            onClick={onClick}
            className={s.sidebar_menu_link}
            activeClassName={s.sidebar_menu_link_active}
            to="/"
            exact
          >
            <SvgIcon classes={s.sidebar_menu_icon} icon="jackpot" />
            {checkLang(lang, 'game.jackpot')}
          </NavLink>
          <NavLink
            onClick={onClick}
            className={s.sidebar_menu_link}
            activeClassName={s.sidebar_menu_link_active}
            to="/"
            exact
          >
            <SvgIcon classes={s.sidebar_menu_icon} icon="classic" />
            {checkLang(lang, 'game.classic')}
          </NavLink>
          <NavLink
            onClick={onClick}
            className={s.sidebar_menu_link}
            activeClassName={s.sidebar_menu_link_active}
            to="/leaderboard"
            exact
          >
            <SvgIcon classes={s.sidebar_menu_icon} icon="rating" />
            {checkLang(lang, 'leaders')}
          </NavLink>
          <NavLink
            onClick={onClick}
            className={s.sidebar_menu_link}
            activeClassName={s.sidebar_menu_link_active}
            to="/faq"
            exact
          >
            <SvgIcon classes={s.sidebar_menu_icon} icon="faq" />
            {checkLang(lang, 'faq')}
          </NavLink>
        </nav>
        <div className={s.sidebar_lottery}>
          <div className={s.sidebar_lottery_info}>
            <h4 dangerouslySetInnerHTML={{ __html: clearMethod(checkLang(lang, 'menu.bonus')) }} />
            <img src={bag} alt="" />
          </div>
          <a onClick={onClick} className={s.sidebar_lottery_link} href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'menu.bonus.button')}
          </a>
        </div>
        <nav className={s.sidebar_footer}>
          <a onClick={onClick} href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'rules')}
          </a>
          <a onClick={onClick} href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'terms')}
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
