const chat = []

export default function(state = chat, action) {
  const { type, payload } = action
  switch (type) {
    case 'LOAD_MESSAGE':
      return payload
    default:
      return state
  }
}
