const leaderboard = []

export default function (state = leaderboard, action) {
  switch (action.type) {
    case 'LEADERBOARD':
      return action.payload
    default:
      return state
  }
}
