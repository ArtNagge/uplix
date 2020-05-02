const app = {
  load: true,
}

export default (state = app, action) => {
  switch (action.type) {
    case 'LOAD_TRUE':
      return {
        ...state,
        load: true,
      }
    case 'LOAD_FALSE':
      return {
        ...state,
        load: false,
      }
    default:
      return state
  }
}
