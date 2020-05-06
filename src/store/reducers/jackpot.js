const jackpot = {
  bets: {
    purple: [],
    pink: [],
  },
  day_top: {
    name: '',
    avatar: '',
    win: 0,
  },
  odds: {
    pink: 2,
    purple: 2,
  },
  history: [],
  result: 0,
  timer: { time: 0, start: false },
  diff: 0,
}

export default function (state = jackpot, action) {
  switch (action.type) {
    case 'DAY_TOP': {
      return {
        ...state,
        day_top: action.payload,
      }
    }
    case 'SERVER_CLIENT_DIFF': {
      return {
        ...state,
        diff: action.payload,
      }
    }
    case 'JACKPOT': {
      return {
        ...state,
        bets: { ...state.bets, ...action.payload.bets },
        odds: action.payload.odds,
        history: action.payload.history,
        ...(action.payload.day_top && {
          day_top: {
            name: action.payload.day_top.user.name,
            avatar: action.payload.day_top.user.picture,
            win: action.payload.day_top.amount,
          },
        }),
      }
    }
    case 'JACKPOT_HISTORY': {
      return { ...state, history: action.payload }
    }
    case 'BET_SUCCESS': {
      const { bet, odds } = action.payload
      const { color, user, amount } = bet
      const colorBets = state.bets[color]
      const currentBet = colorBets.find(({ user: { id } }) => id === user.id)
      const indexCurrentBet = currentBet && colorBets.findIndex(({ user: { id } }) => id === user.id)
      const newItem = {
        user: currentBet ? currentBet.user : user,
        bets: currentBet ? Number(currentBet.bets) + Number(amount) : Number(amount),
      }

      const newArr = transform(colorBets, newItem, currentBet ? indexCurrentBet : -1).sort((a, b) => b.bet - a.bet)

      return {
        ...state,
        bets: { ...state.bets, [color]: newArr },
        odds: odds,
      }
    }
    case 'BET_RESULT': {
      return {
        ...state,
        timer: { time: 0, start: false },
        result: action.payload,
      }
    }
    case 'JACKPOT_RESULT': {
      return {
        ...state,
        result: action.payload.result,
      }
    }
    case 'TIMER_START': {
      return {
        ...state,
        timer: { time: action.payload, start: true },
      }
    }
    case 'JACKPOT_REOPEN': {
      return {
        ...state,
        bets: jackpot.bets,
        odds: jackpot.odds,
        timer: jackpot.timer,
        result: 0,
      }
    }
    default:
      return state
  }
}

function transform(allPosts, item, idx) {
  if (idx < 0) {
    return [...allPosts, item]
  }
  return [...allPosts.slice(0, idx), item, ...allPosts.slice(idx + 1)]
}
