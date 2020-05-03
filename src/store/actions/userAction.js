const userBet = (bet) => (dispatch) => {
  const data = {
    type: 'USER_BET',
    payload: { bet },
  }

  return dispatch(data)
}

const guestsInfo = (payload) => (dispatch) => {
  const { id, name, picture } = payload
  const data = {
    type: 'GUESTS_USER_INFO',
    payload: { id, name, picture },
  }

  dispatch(data)
}

const guestsTasks = (payload) => (dispatch) => {
  const data = {
    type: 'GUESTS_USER_TASKS',
    payload,
  }

  dispatch(data)
}

const guestsHistory = (payload) => (dispatch) => {
  const data = {
    type: 'GUESTS_USER_HISTORY',
    payload,
  }

  dispatch(data)
}

const gameHistory = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_GAME_HISTORY',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const paymentsHistory = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_PAY_HISTORY',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const allTasks = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_ALL_TASKS',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const authUser = ({ response, status }) => (dispatch) => {
  try {
    if (status === 'success') {
      const { access_token, user } = response

      const data = {
        type: 'USER_AUTH_SUCCESS',
        payload: { access_token, user },
      }
      dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const logoutUser = () => (dispatch) =>
  dispatch({
    type: 'USER_LOGOUT',
  })

const getUserInfo = ({ response, status }, access_token) => async (dispatch) => {
  try {
    if (status === 'success') {
      const data = {
        type: 'USER_GET_INFO_SUCCESS',
        payload: { access_token, user: response },
      }
      await dispatch({ type: 'CHAT_ONLINE_INIT', payload: response.online })
      await dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const getBalance = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_BALANCE_SUCCESS',
      payload,
    }
    return dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

export {
  userBet,
  authUser,
  getUserInfo,
  logoutUser,
  getBalance,
  gameHistory,
  paymentsHistory,
  allTasks,
  guestsInfo,
  guestsTasks,
  guestsHistory,
}
