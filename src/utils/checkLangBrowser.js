export default () => {
  const client = window.navigator
    ? window.navigator.language || window.navigator.systemLanguage || window.navigator.userLanguage
    : 'err'

  return client.search('-') > 0 ? client.substring(0, client.search('-')).toLowerCase() : client.toLowerCase()
}
