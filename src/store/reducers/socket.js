const socket = {
  ws: undefined,
  connect: false,
  countConnect: 1,
}

export default (state = socket, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECT_COUNT': {
      return {
        ...state,
        countConnect: action.payload,
      }
    }
    case 'SOCKET_CONNECT': {
      const { ws, connect } = action.payload

      return {
        ...state,
        ws,
        connect,
      }
    }
    default:
      return state
  }
}
