const chat = {
  messages: [],
  online: 0,
}

export default function (state = chat, action) {
  const { type, payload } = action
  switch (type) {
    case 'CHAT': {
      return {
        ...state,
        messages: payload.map((m) => ({ id: m.user.id, message: m.message, time: m.time, user: m.user })),
      }
    }
    case 'CHAT_MESSAGE': {
      return {
        ...state,
        messages: [payload, ...state.messages],
      }
    }
    case 'CHAT_ONLINE_INIT': {
      return {
        ...state,
        online: payload,
      }
    }
    default:
      return state
  }
}
