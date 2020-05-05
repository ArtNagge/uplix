import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import checkLang from '../../utils/checkLang'
import SvgIcon from '../SvgIcon/SvgIcon'
import Media from 'react-media'

import s from './styles.scss'

const Jackpot = ({ percent, result, total, start, time }) => {
  const svgRef = useRef(null)
  const jackpotRef = useRef(null)
  const jackpotBorderRef = useRef(null)
  const [timeTimer, setTime] = useState(0)

  const { lang, diff } = useSelector(({ lang: { data: lang }, jackpot: { diff } }) => ({ lang, diff }))

  // componentDidMount

  useEffect(() => {
    const circle = jackpotRef.current
    const circleBorder = jackpotBorderRef.current
    const circumference = 2 * Math.PI * circle.r.baseVal.value
    const tr = window.screen.width < 1280

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circleBorder.style.strokeDasharray = `${tr ? circumference - 3 : circumference} ${circumference}`
    circle.style.strokeDashoffset = circumference
    circleBorder.style.strokeDashoffset = circumference - 10

    progress(percent)
  }, [])

  // updateTimer

  useEffect(() => {
    let interval
    if (start) {
      interval = setInterval(() => {
        const serverDiff = dayjs().valueOf() + diff
        const difference = 20 - parseInt((serverDiff - dayjs(time * 1000).valueOf()) / 1000)
        const count = difference <= 0 ? 0 : difference
        setTime(count)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [start, time])

  useEffect(() => {
    progress(percent)
  }, [percent])

  useEffect(() => {
    rotate()
  }, [result])

  const progress = (percent) => {
    const circle = jackpotRef.current
    const circleBorder = jackpotBorderRef.current
    const circumference = 2 * Math.PI * circle.r.baseVal.value

    const offset = circumference - (percent / 100) * circumference
    circle.style.strokeDashoffset = offset
    circleBorder.style.strokeDashoffset = offset - 10
  }

  const rotate = () => {
    const resultDeg = result ? (result * 360) / 100 + 3690.5 : 89.8
    const target = svgRef.current
    target.style.transform = result ? `rotate(-${resultDeg}deg)` : ''
  }

  const timerBlock = () => {
    const initTimer = 20
    const currentTimerWidth = 100 - (initTimer - timeTimer) * 5

    return (
      <div className={s.jackpot_game_info_timer}>
        <div className={s.jackpot_game_info_timer_counter}>
          <div className={s.jackpot_game_info_timer_counter_container}>
            <div className={s.jackpot_game_info_timer_counter_1}>{parseInt(timeTimer / 10)}</div>
            <div className={s.jackpot_game_info_timer_counter_2}>{timeTimer % 10}</div>
          </div>
          <span>{checkLang(lang, 'time')}</span>
        </div>
        <div className={s.jackpot_game_info_timer_bar}>
          <div className={s.jackpot_game_info_timer_bar_progress} style={{ width: `${currentTimerWidth}%` }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className={s.jackpot_game}>
      <SvgIcon icon="arrow" classes={s.jackpot_game_arrow} />
      <div className={s.jackpot_game_info}>
        {timerBlock()}
        <div className={s.jackpot_game_info_bank}>
          {checkLang(lang, 'games.bank')}
          <div className={s.jackpot_game_info_bank_total}>
            {total}
            <SvgIcon classes={s.jackpot_game_info_bank_total_icon} icon="gem" />
          </div>
        </div>
      </div>
      <Media query={{ maxWidth: 1280 }}>
        {(match) =>
          match ? (
            <svg className={s.jackpot} ref={svgRef} width={310} height={310}>
              <circle stroke="#bfbefc" strokeWidth={15} cx={155} cy={155} r={140}></circle>
              <circle
                ref={jackpotBorderRef}
                stroke="#232728"
                strokeWidth={17}
                cx={155}
                cy={155}
                r={140}
                style={{ transform: 'rotate(-1.5deg)', transformOrigin: '51% center', transition: 'all 0.1s ease 0s' }}
              ></circle>
              <circle
                ref={jackpotRef}
                style={{ transition: 'all 0.1s ease 0s' }}
                stroke="#6f7adc"
                strokeWidth={16}
                cx={155}
                cy={155}
                r={140}
              ></circle>
            </svg>
          ) : (
            <svg className={s.jackpot} ref={svgRef} width={470} height={470}>
              <circle stroke="#bfbefc" strokeWidth={20} cx={235} cy={235} r={212.5}></circle>
              <circle
                ref={jackpotBorderRef}
                stroke="#232728"
                strokeWidth={22}
                cx={235}
                cy={235}
                r={212.5}
                style={{ transform: 'rotate(-1.5deg)', transformOrigin: '51% center', transition: 'all 0.1s ease 0s' }}
              ></circle>
              <circle
                ref={jackpotRef}
                style={{ transition: 'all 0.1s ease 0s' }}
                stroke="#6f7adc"
                strokeWidth={20}
                cx={235}
                cy={235}
                r={212.5}
              ></circle>
            </svg>
          )
        }
      </Media>
    </div>
  )
}

export default Jackpot
