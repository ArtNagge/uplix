const getLeaderboard = () => (dispatch) => {
  try {
    const data = {
      type: 'LEADERBOARD',
      payload: {},
    }
    return dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

export { getLeaderboard }
