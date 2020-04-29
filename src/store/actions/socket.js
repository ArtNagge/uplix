const socketConnect = (ws, connect) => (dispatch) => {
  const data = {
    type: 'SOCKET_CONNECT',
    payload: { ws, connect },
  }
  return dispatch(data)
}

const connectCounter = (payload) => (dispatch) => {
  return dispatch({ type: 'SOCKET_CONNECT_COUNT', payload })
}

export { socketConnect, connectCounter }
