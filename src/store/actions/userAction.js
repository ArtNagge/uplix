const userBet = (bet) => (dispatch) => {
  const data = {
    type: 'USER_BET',
    payload: { bet },
  }

  return dispatch(data)
}

const authUser = ({ response, status }) => (dispatch) => {
  dispatch({ type: 'USER_AUTH_REQUEST' })

  if (status === 'success') {
    const { access_token, user } = response

    const data = {
      type: 'USER_AUTH_SUCCESS',
      payload: { access_token, user },
    }
    return dispatch(data)
  }

  return dispatch({ type: 'USER_AUTH_FAIL' })
}

const logoutUser = () => (dispatch) =>
  dispatch({
    type: 'USER_LOGOUT',
  })

const getUserInfo = ({ response, status }, access_token) => (dispatch) => {
  dispatch({ type: 'USER_GET_INFO_REQUEST' })

  if (status === 'success') {
    const data = {
      type: 'USER_GET_INFO_SUCCESS',
      payload: { access_token, user: response },
    }
    dispatch({ type: 'CHAT_ONLINE_INIT', payload: response.online })
    return dispatch(data)
  }

  dispatch({ type: 'USER_GET_INFO_FAIL' })
}

const getBalance = (payload) => (dispatch) => {
  dispatch({ type: 'USER_BALANCE_REQUEST' })

  try {
    const data = {
      type: 'USER_BALANCE_SUCCESS',
      payload,
    }
    return dispatch(data)
  } catch (error) {
    dispatch({ type: 'USER_BALANCE_FAIL' })
  }
}

export { userBet, authUser, getUserInfo, logoutUser, getBalance }
