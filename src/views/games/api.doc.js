const wsurl = `${process.env.VITE_APP_WS_URL}ws?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJzZXJ2aWNlXCI6NCxcInJvbGVJZFwiOjAsXCJpc1N1cGVyUm9sZVwiOmZhbHNlLFwidWlkXCI6MixcImFjY291bnRcIjpcInhpYW9saTEwMVwiLFwibG9naW5JcFwiOlwiMTE1LjE2NC4yMjEuMTU3XCIsXCJsb2dpbkRldmljZVwiOlwibm9uZVwiLFwibWVyY2hhbnRcIjpcInRlc3RcIn0iLCJpYXQiOjE3MTAyNTQwNDMsImV4cCI6MTcxMDg1ODg0M30.f2ma04jq3XS73tWqYYUkxy45hR6Qcb5Cosf5Lmt060U`;

ws = new WebSocket(wsurl);

ws.send(JSON.stringify({
  "msgId": 2000,
  "data": {
      "gameId": 10006
  }
}));


// 