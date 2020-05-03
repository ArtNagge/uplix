const getLangResourse = ({ response, status }) => (dispatch) => {
  try {
    if (status === 'success') {
      const data = {
        type: 'GET_LANGUAGE',
        payload: response,
      }
      return dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

const getStorageResourse = (payload) => (dispatch) => {
  try {
    if (payload) {
      const data = {
        type: 'GET_RESOURSE',
        payload,
      }
      return dispatch(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export { getLangResourse, getStorageResourse }
