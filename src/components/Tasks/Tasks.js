import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import TaskItem from '../TaskItem'
import MiniBlockInfo from '../MiniBlockInfo'
import checkLang from '../../utils/checkLang'

import s from './styles.scss'

const Paymetns = () => {
  const { lang } = useSelector(({ lang: { data: lang } }) => ({ lang }))

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_tasks}>
        <h3>{checkLang(lang, 'day.tasks')}</h3>
        <div className={s.profile_content_user_tasks_info}>
          <MiniBlockInfo width={200} title={checkLang(lang, 'time.left')} description="13:20:20" />
        </div>
        <div className={s.profile_content_user_tasks_list}>
          <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={50} progress={{ current: 1, purpose: 5 }} />
          <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={150} progress={{ current: 19, purpose: 20 }} />
          <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={240} progress={{ current: 123, purpose: 150 }} />
        </div>
        <h3>{checkLang(lang, 'all.tasks')}</h3>
        <div className={s.profile_content_user_tasks_list}>
          <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={500} progress={{ current: 4, purpose: 5 }} />
          <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={50} progress={{ current: 2, purpose: 5 }} />
        </div>
      </div>
    </div>
  )
}

export default Paymetns
