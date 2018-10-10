import rootVue from './main'

let url = 'wss://zldtest.zlddata.cn/wsapi'
let ws = new WebSocket(url)
let arr = []
let log = []

function reConnect (url) {
  let ws = new WebSocket(url)
  return bridgeWs(ws)
}

function send (data) {
  if (data) {
    ws.send(JSON.stringify(data))
  } else {
    if (arr.length) {
      arr.forEach(item => {
        ws.send(JSON.stringify(item))
      })
    }
    arr = []
  }
}

function createRecord (msg, type) {
  msg = msg + ' ' + new Date() + ' ' + type.toUpperCase()
  log.push(msg)
}

function message (event) {
  var data = JSON.parse(event.data)
  // 处理后端推送消息
  rootVue.eventBus.$emit(data.command.path, data)
}

function close (event) {
  createRecord(event.reason, 'close')
}

function error () {
  createRecord('connection error ', 'error')
  console.log(JSON.stringify(log))
  ws = reConnect(url)
}

function open () {
  createRecord('connection established ', 'open')
}

function bridgeWs (ws) {
  console.log('bridge ws')
  ws.onmessage = message
  ws.onclose = close
  ws.onerror = error
  ws.onopen = open
  return ws
}

bridgeWs(ws)

export default {
  ws: ws,

  wsSend (path, parameters) {
    const data = {
      command: {
        path
      },
      parameters
    }
    if (ws.readyState === 0) {
      arr.push(data)
    } else if (ws.readyState === 2 || ws.readyState === 3) {
      ws.close()
      arr.push(data)
      ws = reConnect(url)
    } else {
      send(data)
    }
  }
}
