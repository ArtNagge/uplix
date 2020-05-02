import React from 'react'
import { useSelector } from 'react-redux'

import TaskItem from '../TaskItem'
import MiniBlockInfo from '../MiniBlockInfo'
import checkLang from '../../utils/checkLang'
import sendSocket from '../../utils/sendSocket'

import s from './styles.scss'

const Paymetns = ({ guestId }) => {
  const { lang, tasks, ws, gTasks } = useSelector(
    ({
      lang: { data: lang },
      user: {
        tasks,
        guests: { tasks: gTasks },
      },
      socket: { ws },
    }) => ({
      lang,
      tasks,
      ws,
      gTasks,
    })
  )

  const pickUp = (task) => {
    sendSocket(ws, 3, { method: 'tasks.ID', parameters: { task } }, 'tasksPickUp')
  }

  return (
    <div className={s.profile_content_user}>
      <div className={s.profile_content_user_tasks}>
        {!guestId && (
          <>
            <h3>{checkLang(lang, 'day.tasks')}</h3>
            <div className={s.profile_content_user_tasks_info}>
              <MiniBlockInfo width={200} title={checkLang(lang, 'time.left')} description="13:20:20" />
            </div>
            <div className={s.profile_content_user_tasks_list}>
              <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={50} progress={{ current: 1, purpose: 5 }} />
              <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={150} progress={{ current: 19, purpose: 20 }} />
              <TaskItem event="Сыграть в режим “Классик” 5 раз" prize={240} progress={{ current: 123, purpose: 150 }} />
            </div>
          </>
        )}
        <h3>{checkLang(lang, 'all.tasks')}</h3>
        <div className={s.profile_content_user_tasks_list}>
          {Object.keys(guestId ? gTasks : tasks).map((task, index) => {
            const { lang_key, current_progress: current, end_progress: purpose, amount, can_activate } = guestId
              ? gTasks[task]
              : tasks[task]
            return (
              <TaskItem
                key={index}
                event={checkLang(lang, lang_key)}
                can_activate={can_activate}
                prize={amount}
                onClick={() => pickUp(task)}
                progress={{ current, purpose }}
                guestId={guestId}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Paymetns
