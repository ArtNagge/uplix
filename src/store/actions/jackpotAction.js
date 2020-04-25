const getJackpot = ({ response, status }) => async (dispatch) => {
  dispatch({ type: 'JACKPOT_REQUEST' })

  if (status === 'success') {
    const {
      data: { bets, odds },
      time,
      history,
      day_top,
    } = response
    const data = {
      type: 'JACKPOT_SUCCESS',
      payload: { bets, odds, time, history, day_top },
    }
    return dispatch(data)
  }
  return dispatch({ type: 'JACKPOT_FAIL' })
}

const makeBet = ({ bet, odds, is_spin, reopen, spin, timer_start, time, is_history, history }) => async (dispatch) => {
  dispatch({ type: 'BET_REQUEST' })

  try {
    if (!is_spin && !reopen && !timer_start && !time && !is_history) {
      const data = {
        type: 'BET_SUCCESS',
        payload: { bet, odds },
      }
      dispatch(data)
    }
    if (is_spin) {
      const data = {
        type: 'BET_RESULT_SUCCESS',
        payload: spin,
      }
      dispatch(data)
    }
    if (timer_start && time) {
      dispatch({ type: 'TIMER_START' })
    }
    if (reopen) {
      dispatch({ type: 'JACKPOT_REOPEN' })
    }
    if (is_history) {
      dispatch({ type: 'JACKPOT_HISTORY', payload: history })
    }
  } catch (error) {
    dispatch({ type: 'BET_FAIL' })
  }
}

export { getJackpot, makeBet }
