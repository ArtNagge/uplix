const chat = []

export default function (state = chat, action) {
  const { type, payload } = action
  switch (type) {
    case 'CHAT_SUCCESS': {
      return payload.map((m) => ({ id: m.user.id, message: m.message, time: m.time, user: m.user }))
    }
    case 'CHAT_MESSAGE_SUCCESS': {
      return [payload, ...state]
    }
    case 'CHAT_MESSAGE_REQUEST':
    case 'CHAT_MESSAGE_FAIL':
    case 'CHAT_REQUEST':
    case 'CHAT_FAIL': {
      return state
    }
    default:
      return state
  }
}
