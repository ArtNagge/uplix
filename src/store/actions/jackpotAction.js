const getJackpot = ({ response, status }) => (dispatch) => {
  try {
    if (status === 'success') {
      const {
        data: { bets, odds },
        history,
        day_top,
        time,
      } = response

      const data = {
        type: 'JACKPOT',
        payload: { bets, odds, history, day_top },
      }

      time && dispatch({ type: 'TIMER_START', payload: time })

      dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const clientServerDiff = (payload) => (dispatch) => {
  const data = {
    type: 'SERVER_CLIENT_DIFF',
    payload,
  }
  return dispatch(data)
}

const makeBet = ({ bet, odds, is_spin, reopen, spin, timer_start, time, is_history, history, day_top, who }) => (
  dispatch
) => {
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
        type: 'BET_RESULT',
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
    console.log(error)
  }
}

export { getJackpot, makeBet, clientServerDiff }
