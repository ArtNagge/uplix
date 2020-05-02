const getLangResourse = ({ response, status }) => (dispatch) => {
  dispatch({ type: 'GET_LANGUAGE_REQUEST' })

  if (status === 'success') {
    const data = {
      type: 'GET_LANGUAGE',
      payload: response,
    }
    return dispatch(data)
  }

  return dispatch({ type: 'GET_LANGUAGE_FAIL' })
}

const getStorageResourse = (payload) => (dispatch) => {
  dispatch({ type: 'GET_RESOURSE_REQUEST' })

  if (payload) {
    const data = {
      type: 'GET_RESOURSE',
      payload,
    }
    return dispatch(data)
  }

  return dispatch({ type: 'GET_RESOURSE_FAIL' })
}

export { getLangResourse, getStorageResourse }
