import cn from 'classnames'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { appLoad } from '../../store/actions/appAction'

import s from './styles.scss'
import SvgIcon from '../../components/SvgIcon'
import checkLang from '../../utils/checkLang'

const JackpotPage = () => {
  const [openId, setOpenId] = useState(undefined)
  const dispatch = useDispatch()
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  useEffect(() => {
    dispatch(appLoad(false))
    return () => {
      dispatch(appLoad(true))
    }
  }, [])

  const question = (f, index) => {
    const { question, answer } = f

    return (
      <div key={index} className={s.faq_wrapper_item}>
        <div className={s.faq_wrapper_item_title} onClick={() => handleClickDropDown(index)}>
          <span>{`${index + 1}. ${question}`}</span>
          <SvgIcon
            icon="faqArrow"
            classes={cn(s.faq_wrapper_item_title_icon, index === openId && s.faq_wrapper_item_title_icon_active)}
          />
        </div>
        {index === openId && (
          <div className={s.faq_wrapper_item_description} dangerouslySetInnerHTML={{ __html: answer }} />
        )}
      </div>
    )
  }

  const handleClickDropDown = (index) => (openId === index ? setOpenId(undefined) : setOpenId(index))
  const questions = checkLang(lang, 'faq.questions')

  return (
    <div className={s.faq_wrapper}>
      <h5 className={s.faq_wrapper_heading}>{checkLang(lang, 'faq.name')}</h5>
      <div className={s.faq_wrapper_container}>
        {typeof questions !== 'string' ? questions.map((f, index) => question(f, index)) : null}
      </div>
    </div>
  )
}

export default JackpotPage
