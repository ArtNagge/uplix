const user = {
  user: {
    auth: false,
    id: null,
    social: undefined,
    social_id: null,
    name: '',
    picture: '',
    balance: 0,
  },
  access_token: undefined,
}

export default function (state = user, action) {
  switch (action.type) {
    case 'USER_BALANCE_REQUEST':
    case 'USER_BALANCE_FAIL': {
      return state
    }
    case 'USER_BALANCE_SUCCESS': {
      return {
        ...state,
        user: {
          ...state.user,
          balance: action.payload,
        },
      }
    }
    // USER_BET
    case 'USER_BET':
      const { bet } = action.payload
      const { balance } = state
      return bet <= balance ? { ...state, balance: balance - bet } : { ...state }

    // USER_GET
    case 'USER_GET_INFO_REQUEST':
    case 'USER_GET_INFO_FAIL': {
      return state
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

    // USER_AUTH
    case 'USER_AUTH_FAIL':
    case 'USER_AUTH_REQUEST': {
      return state
    }

    case 'USER_AUTH_SUCCESS': {
      const { access_token, user } = action.payload
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('lang_hash', user.lang_hash)
      return {
        ...state,
        user: {
          auth: true,
          ...user,
        },
        access_token,
      }
    }

    // USER_LOGOUT
    case 'USER_LOGOUT': {
      localStorage.removeItem('access_token')
      return user
    }

    default:
      return state
  }
}
