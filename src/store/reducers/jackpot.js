const jackpot = {
  bets: {
    purple: [],
    pink: [],
  },
  topDay: {
    name: '---',
    avatar: '',
    win: 0,
  },
  odds: {
    pink: 2,
    purple: 2,
  },
  history: [],
  result: 0,
  request: undefined,
  timer: { time: 0, start: false },
}

export default function (state = jackpot, action) {
  switch (action.type) {
    case 'JACKPOT_REQUEST': {
      return {
        ...state,
        request: 'JACKPOT_REQUEST',
      }
    }
    case 'DAY_TOP': {
      return {
        ...state,
        topDay: action.payload,
      }
    }
    case 'JACKPOT_SUCCESS': {
      return {
        ...state,
        bets: { ...state.bets, ...action.payload.bets },
        odds: action.payload.odds,
        history: action.payload.history,
        topDay: {
          name: action.payload.day_top.user.name,
          avatar: action.payload.day_top.user.picture,
          win: action.payload.day_top.amount,
        },
        request: 'JACKPOT_SUCCESS',
      }
    }
    case 'JACKPOT_HISTORY': {
      return { ...state, history: action.payload }
    }
    case 'JACKPOT_FAIL': {
      return {
        ...state,
        request: 'JACKPOT_FAIL',
      }
    }

    case 'BET_REQUEST': {
      return {
        ...state,
        request: 'JACKPOT_REQUEST',
      }
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
        request: 'JACKPOT_SUCCESS',
      }
    }
    case 'BET_RESULT_SUCCESS': {
      return {
        ...state,
        timer: { time: 0, start: false },
        result: action.payload,
      }
    }
    case 'BET_FAIL': {
      return {
        ...state,
        request: 'JACKPOT_FAIL',
      }
    }
    case 'JACKPOT_RESULT_REQUEST': {
      return {
        ...state,
        request: 'JACKPOT_RESULT_REQUEST',
      }
    }
    case 'JACKPOT_RESULT_SUCCESS': {
      return {
        ...state,
        result: action.payload.result,
        request: 'JACKPOT_RESULT_SUCCESS',
      }
    }
    case 'JACKPOT_RESULT_FAIL': {
      return {
        ...state,
        request: 'JACKPOT_RESULT_FAIL',
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
