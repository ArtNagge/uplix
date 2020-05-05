const user = {
  user: {
    auth: false,
    id: null,
    social: undefined,
    social_id: null,
    name: '',
    income: 0,
    invited: 0,
    picture: '',
    balance: 0,
  },
  access_token: undefined,
  history: [],
  payments: [],
  tasks: {},
  guests: {
    id: null,
    name: '',
    picture: '',
    tasks: {},
    history: [],
  },
}

export default function (state = user, action) {
  switch (action.type) {
    case 'USER_BALANCE_SUCCESS': {
      return {
        ...state,
        user: {
          ...state.user,
          balance: action.payload,
        },
      }
    }

    case 'USER_BET': {
      const { bet } = action.payload
      const { balance } = state
      return bet <= balance ? { ...state, balance: balance - bet } : { ...state }
    }

    case 'USER_GET_INFO_SUCCESS': {
      const { access_token, user } = action.payload
      return {
        ...state,
        user: {
          auth: true,
          ...user,
        },
        access_token,
      }
    }

    case 'USER_AUTH_SUCCESS': {
      localStorage.setItem('access_token', action.payload)
      return {
        ...state,
        access_token: action.payload,
      }
    }

    case 'USER_LOGOUT': {
      localStorage.removeItem('access_token')
      return user
    }

    case 'USER_PAY_HISTORY': {
      return {
        ...state,
        payments: action.payload,
      }
    }

    case 'USER_GAME_HISTORY': {
      return {
        ...state,
        history: action.payload,
      }
    }

    case 'USER_ALL_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      }
    }

    case 'GUESTS_USER_INFO': {
      return {
        ...state,
        guests: { ...state.guests, ...action.payload },
      }
    }
    case 'GUESTS_USER_TASKS': {
      return {
        ...state,
        guests: { ...state.guests, tasks: action.payload },
      }
    }
    case 'GUESTS_USER_HISTORY': {
      return {
        ...state,
        guests: { ...state.guests, history: action.payload },
      }
    }

    default:
      return state
  }
}
