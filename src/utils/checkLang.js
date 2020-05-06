function checkLang(lang, exp) {
  const keys = exp.split('.')
  let expression = lang

  keys.forEach((e) => {
    if (expression === null || expression === undefined || expression[e] === undefined) {
      return (expression = '')
    }
    expression = expression[e]
  })

  return expression
}

export default checkLang
