const getLeaderboard = () => (dispatch) => {
  dispatch({ type: 'LEADERBOARD_REQUEST' })

  try {
    const data = {
      type: 'LEADERBOARD_SUCCESS',
      payload: {},
    }
    return dispatch(data)
  } catch {
    dispatch({ type: 'LEADERBOARD_FAIL' })
  }
}

export { getLeaderboard }
