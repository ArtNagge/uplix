const socketConnect = (ws, connect, subscribe) => (dispatch) => {
  const data = {
    type: 'SOCKET_CONNECT',
    payload: { ws, connect, subscribe },
  }
  return dispatch(data)
}

const connectCounter = (payload) => (dispatch) => {
  return dispatch({ type: 'SOCKET_CONNECT_COUNT', payload })
}

export { socketConnect, connectCounter }
