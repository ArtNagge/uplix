const appLoad = (load) => (dispatch) => {
  load ? dispatch({ type: 'LOAD_TRUE' }) : dispatch({ type: 'LOAD_FALSE' })
}

export { appLoad }
