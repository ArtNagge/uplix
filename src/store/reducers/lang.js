const lang = {}

export default (state = lang, action) => {
  switch (action.type) {
    case 'GET_LANGUAGE': {
      localStorage.setItem('lang_source', JSON.stringify(action.payload))
      return {
        ...state,
        ...action.payload,
      }
    }
    case 'GET_RESOURSE': {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}
