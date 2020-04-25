export default (ws, code, data, seq) => ws.send(JSON.stringify([code, data, seq]))
