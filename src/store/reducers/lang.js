const lang = {}

export default (state = lang, action) => {
  switch (action.type) {
    case 'GET_LANGUAGE_SUCCESS': {
      localStorage.setItem('lang_source', JSON.stringify(action.payload))
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'GET_RESOURSE_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'GET_RESOURSE_REQUEST':
    case 'GET_RESOURSE_FAIL':
    case 'GET_LANGUAGE_REQUEST':
    case 'GET_LANGUAGE_FAIL':
      return state
    default:
      return state
  }
}
