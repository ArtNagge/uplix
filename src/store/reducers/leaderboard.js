const leaderboard = [
  {
    name: 'Ян Гринберг',
    avatar: 'https://sun9-35.userapi.com/c851336/v851336611/1602c1/n9_P4A8hTxY.jpg',
    userId: 1,
    refs: 213,
    income: 764782
  },
  {
    name: 'Ян Гринберг',
    avatar: 'https://sun9-35.userapi.com/c851336/v851336611/1602c1/n9_P4A8hTxY.jpg',
    userId: 2,
    refs: 213,
    income: 764782
  },
  {
    name: 'Ян Гринберг',
    avatar: 'https://sun9-35.userapi.com/c851336/v851336611/1602c1/n9_P4A8hTxY.jpg',
    userId: 3,
    refs: 213,
    income: 764782
  }
]

export default function(state = leaderboard, action) {
  const { type, payload } = action
  switch (type) {
    case 'LEADERBOARD_REQUEST':
    case 'LEADERBOARD_SUCCESS':
    case 'LEADERBOARD_FAIL':
      return state
    default:
      return state
  }
}
