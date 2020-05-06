import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'

const userBet = (bet) => (dispatch) => {
  try {
    const data = {
      type: 'USER_BET',
      payload: { bet },
    }

    return dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const withdrawal = ({ data: vData, action, amount }, guest) => (dispatch) => {
  try {
    if (guest) {
      if (action === 3) {
        const data = {
          type: 'WITHDRAWAL_GUEST',
          payload: {
            section: 'history',
            el: { id: uuid(), time: dayjs().valueOf() / 1000, data: vData, value: amount, action: 3 },
          },
        }
        return dispatch(data)
      }
    } else {
      if (action === 3) {
        const data = {
          type: 'WITHDRAWAL',
          payload: {
            section: 'history',
            el: { id: uuid(), time: dayjs().valueOf() / 1000, data: vData, value: amount, action: 3 },
          },
        }
        return dispatch(data)
      }
      if (action === 2) {
        const data = {
          type: 'WITHDRAWAL',
          payload: {
            section: 'payments',
            el: { id: uuid(), time: dayjs().valueOf() / 1000, data: vData, value: amount, action: 3 },
          },
        }
        return dispatch(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const guestsInfo = (payload) => (dispatch) => {
  try {
    const { id, name, picture } = payload
    const data = {
      type: 'GUESTS_USER_INFO',
      payload: { id, name, picture },
    }

    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const guestsTasks = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'GUESTS_USER_TASKS',
      payload,
    }

    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const guestsHistory = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'GUESTS_USER_HISTORY',
      payload,
    }

    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const gameHistory = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_GAME_HISTORY',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const paymentsHistory = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_PAY_HISTORY',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const allTasks = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_ALL_TASKS',
      payload,
    }
    dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

const authUser = ({ response, status }) => (dispatch) => {
  try {
    if (status === 'success') {
      const data = {
        type: 'USER_AUTH_SUCCESS',
        payload: response,
      }
      dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const logoutUser = () => (dispatch) =>
  dispatch({
    type: 'USER_LOGOUT',
  })

const getUserInfo = ({ response, status }, access_token) => async (dispatch) => {
  try {
    if (status === 'success') {
      const data = {
        type: 'USER_GET_INFO_SUCCESS',
        payload: { access_token, user: response },
      }
      await dispatch({ type: 'CHAT_ONLINE_INIT', payload: response.online })
      await dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const getBalance = (payload) => (dispatch) => {
  try {
    const data = {
      type: 'USER_BALANCE_SUCCESS',
      payload,
    }
    return dispatch(data)
  } catch (error) {
    console.log(error)
  }
}

export {
  userBet,
  authUser,
  getUserInfo,
  logoutUser,
  getBalance,
  gameHistory,
  paymentsHistory,
  allTasks,
  guestsInfo,
  guestsTasks,
  guestsHistory,
  withdrawal,
}
