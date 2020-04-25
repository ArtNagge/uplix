import cn from 'classnames'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { faq } from '../../utils/config'

import s from './styles.scss'
import SvgIcon from '../../components/SvgIcon'
import checkLang from '../../utils/checkLang'

const JackpotPage = () => {
  const [openId, setOpenId] = useState(undefined)
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  const question = (f, index) => {
    const { title, description } = f

    return (
      <div key={index} className={s.faq_wrapper_item}>
        <div className={s.faq_wrapper_item_title} onClick={() => handleClickDropDown(index)}>
          <span>{`${index + 1}. ${title}`}</span>
          <SvgIcon
            icon="faqArrow"
            classes={cn(s.faq_wrapper_item_title_icon, index === openId && s.faq_wrapper_item_title_icon_active)}
          />
        </div>
        {index === openId && (
          <div className={s.faq_wrapper_item_description} dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
    )
  }

  const handleClickDropDown = (index) => (openId === index ? setOpenId(undefined) : setOpenId(index))

  return (
    <div className={s.faq_wrapper}>
      <h5 className={s.faq_wrapper_heading}>{checkLang(lang, 'faq')}</h5>
      <div className={s.faq_wrapper_container}>{faq.map((f, index) => question(f, index))}</div>
    </div>
  )
}

export default JackpotPage
