import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import formatFN from '../../utils/formatFN'

import s from './styles.scss'
import { useSelector } from 'react-redux'
import SvgIcon from '../SvgIcon/SvgIcon'
import bag from './img/bag.png'
import AvatarElips from '../AvatarElips/AvatarElips'
import checkLang from '../../utils/checkLang'
import clearMethod from '../../utils/clearMethod'
import sendSocket from '../../utils/sendSocket'

const Sidebar = ({ user, logoutUser, ws }) => {
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  const clickAuth = async () =>
    await sendSocket(ws, 3, { method: 'auth.getAuthUri', parameters: { social: 'vkontakte' } }, 'auth')

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
                <button onClick={() => logoutUser()}>
                  <SvgIcon icon="logout" classes={s.sidebar_userPanel_controlsInfo_icon} />
                </button>
              </div>
              <div className={s.sidebar_userPanel_controlsBalance}>
                <div className={s.sidebar_userPanel_controlsBalance_container}>
                  <SvgIcon classes={s.sidebar_userPanel_controlsBalance_container_icon} icon="gem" />
                  <span className={s.sidebar_userPanel_controlsBalance_balance}>{balance}</span>
                  <button className={s.sidebar_userPanel_controlsBalance_add}>
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
    <div className={s.sidebar}>
      <header className={s.sidebar_header}>
        <Link to="/">
          <SvgIcon icon="logo" classes={s.sidebar_header_icon} />
        </Link>
      </header>
      <section className={s.sidebar_user}>{userPanel()}</section>
      <div className={s.sidebar_scroll}>
        <nav className={s.sidebar_menu}>
          <NavLink className={s.sidebar_menu_link} activeClassName={s.sidebar_menu_link_active} to="/" exact>
            <SvgIcon classes={s.sidebar_menu_icon} icon="jackpot" />
            {checkLang(lang, 'game.jackpot')}
          </NavLink>
          <NavLink className={s.sidebar_menu_link} activeClassName={s.sidebar_menu_link_active} to="/leaderboard" exact>
            <SvgIcon classes={s.sidebar_menu_icon} icon="rating" />
            {checkLang(lang, 'leaders')}
          </NavLink>
          <NavLink className={s.sidebar_menu_link} activeClassName={s.sidebar_menu_link_active} to="/faq" exact>
            <SvgIcon classes={s.sidebar_menu_icon} icon="faq" />
            {checkLang(lang, 'faq')}
          </NavLink>
        </nav>
        <div className={s.sidebar_lottery}>
          <div className={s.sidebar_lottery_info}>
            <h4 dangerouslySetInnerHTML={{ __html: clearMethod(checkLang(lang, 'menu.bonus')) }} />
            <img src={bag} alt="" />
          </div>
          <a className={s.sidebar_lottery_link} href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'menu.bonus.button')}
          </a>
        </div>
        <nav className={s.sidebar_footer}>
          <a href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'rules')}
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            {checkLang(lang, 'terms')}
          </a>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
