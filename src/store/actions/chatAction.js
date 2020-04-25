const initChat = ({ response, status }) => (dispatch) => {
  dispatch({ type: 'CHAT_REQUEST' })

  if (status === 'success') {
    const data = {
      type: 'CHAT_SUCCESS',
      payload: response,
    }
    return dispatch(data)
  }
  return dispatch({ type: 'CHAT_FAIL' })
}

const chat = ({ message, time, user }) => (dispatch) => {
  dispatch({ type: 'CHAT_MESSAGE_REQUEST' })

  try {
    const payload = {
      id: user.id,
      message,
      time,
      user,
    }
    const data = {
      type: 'CHAT_MESSAGE_SUCCESS',
      payload,
    }
    return dispatch(data)
  } catch (error) {
    return dispatch({ type: 'CHAT_MESSAGE_FAIL' })
  }
}

export { initChat, chat }
