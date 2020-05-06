const socket = {
  ws: undefined,
  connect: false,
  countConnect: 1,
  subscribe: undefined,
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
      const { ws, connect, subscribe } = action.payload

      return {
        ...state,
        ws,
        connect,
        subscribe,
      }
    }
    default:
      return state
  }
}
