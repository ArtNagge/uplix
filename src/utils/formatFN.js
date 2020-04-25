export default (name) => {
  if (name.length >= 12) {
    const names = name.split(' ')
    return `${names[0]} ${names[1].substring(0, 1)}.`
  }
  return name
}
