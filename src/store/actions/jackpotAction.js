const getJackpot = ({ response, status }) => async (dispatch) => {
  dispatch({ type: 'JACKPOT_REQUEST' })

  if (status === 'success') {
    const {
      data: { bets, odds },
      time,
    } = response
    const data = {
      type: 'JACKPOT_SUCCESS',
      payload: { bets, odds, time },
    }
    return dispatch(data)
  }
  return dispatch({ type: 'JACKPOT_FAIL' })
}

const makeBet = ({ bet, odds, is_spin, reopen, spin, timer_start, time }) => async (dispatch) => {
  dispatch({ type: 'BET_REQUEST' })

  try {
    if (!is_spin && !reopen && !timer_start && !time) {
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
    if (timer_start && time) {
      return dispatch({ type: 'TIMER_START' })
    }
    if (reopen) {
      dispatch({ type: 'JACKPOT_REOPEN' })
    }
  } catch (error) {
    dispatch({ type: 'BET_FAIL' })
  }
}

export { getJackpot, makeBet }
