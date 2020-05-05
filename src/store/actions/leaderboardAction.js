const getLeaderboard = (payload) => (dispatch) => {
  console.log(payload)
  try {
    const data = {
      type: 'LEADERBOARD',
      payload,
    }
    return dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

export { getLeaderboard }
