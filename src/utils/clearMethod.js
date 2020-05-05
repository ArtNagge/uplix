export default (text) => (text && typeof text === 'string' ? text.replace('\n', '<br />') : '')
