const initChat = ({ response, status }) => (dispatch) => {
  try {
    if (status === 'success') {
      const data = {
        type: 'CHAT',
        payload: response,
      }
      dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const chat = ({ message, time, user }) => (dispatch) => {
  try {
    const payload = {
      id: user.id,
      message,
      time,
      user,
    }
    const data = {
      type: 'CHAT_MESSAGE',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const timerInit = (payload) => (dispatch) => {
  return dispatch({ type: 'CHAT_ONLINE_INIT', payload })
}

export { initChat, chat, timerInit }
