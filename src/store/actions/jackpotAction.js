const getJackpot = ({ response, status }) => (dispatch) => {
  dispatch({ type: 'JACKPOT_REQUEST' })

  if (status === 'success') {
    const {
      data: { bets, odds },
      history,
      day_top,
      time,
    } = response
    const data = {
      type: 'JACKPOT_SUCCESS',
      payload: { bets, odds, history, day_top },
    }
    time && dispatch({ type: 'TIMER_START', payload: time })
    return dispatch(data)
  }
  return dispatch({ type: 'JACKPOT_FAIL' })
}

const makeBet = ({ bet, odds, is_spin, reopen, spin, timer_start, time, is_history, history, day_top, who }) => (
  dispatch
) => {
  dispatch({ type: 'BET_REQUEST' })

  try {
    if (!is_spin && !reopen && !timer_start && !time && !is_history && !day_top) {
      const data = {
        type: 'BET_SUCCESS',
        payload: { bet, odds },
      }
      return dispatch(data)
    }
    if (is_spin) {
      const data = {
        type: 'BET_RESULT_SUCCESS',
        payload: spin,
      }
      return dispatch(data)
    }
    if (day_top) {
      const {
        user: { name, picture },
        amount,
      } = who
      const data = {
        type: 'DAY_TOP',
        payload: {
          name,
          avatar: picture,
          win: amount,
        },
      }

      return dispatch(data)
    }
    if (timer_start && time) {
      return dispatch({ type: 'TIMER_START', payload: time })
    }
    if (reopen) {
      return dispatch({ type: 'JACKPOT_REOPEN' })
    }
    if (is_history) {
      return dispatch({ type: 'JACKPOT_HISTORY', payload: history })
    }
  } catch (error) {
    return dispatch({ type: 'BET_FAIL' })
  }
}

export { getJackpot, makeBet }
