import { useSocket } from "@/composables/useSocket";
import { useLoginStore } from "@/stores/login";
const { socket } = useSocket();

const eventMap = {
  "50": "crash",
  "51": "classicdice",
  "52": "ultimatedice",
  "53": "hashdice",
  "54": "limbo",
  "55": "keno",
  "56": "plinko",
  "57": "wheel",
  "60": "pggame"
};
const gameMap = {
  crash: 10006,
  classicdice: 10004,
  ultimatedice: 10005,
  hashdice: 10011,
  limbo: 10008,
  keno: 10007,
  plinko: 10009,
  wheel: 10010,
  rabbit: 12003,
  ox: 12004,
  mouse: 12005,
  dragontiger: 12006,
  pgtiger: 12007
};

export default class NetApi {
  constructor() {
    this.ws = null;
    this.name = null;
    const pgs = ["rabbit", "ox", "mouse", "dragontiger", "pgtiger"];

    this.events = {
      pggame: (a, b, c) => {
        pgs.forEach(k => {
          if (typeof this.events[k] === "function") {
            this.events[k](a, b, c);
          }
        });
      }
    };

    this.onOpen = null;
    this.init();
  }

  bindEvent(name, func) {
    this.name = name;
    if (typeof func !== "function") return;
    this.events[name] = func;
    if (!this.check()) {
      this.onOpen = _ => {
        const { access_token } = useLoginStore();
        this.send({
          service: 1,
          msgId: 1003,
          data: {
            token: access_token
          }
        });
        setTimeout(() => {
          this.send({
            msgId: 2000,
            data: {
              gameId: gameMap[name]
            }
          });
        }, 1000);
      };
    } else {
      this.send({
        msgId: 2000,
        data: {
          gameId: gameMap[name]
        }
      });
    }
  }

  leave() {
    this.send({
      msgId: 2001,
      data: {
        gameId: gameMap[this.name]
      }
    });
  }

  send(data) {
    if (!this.check()) {
      console.log("ws 未准备", this.ws);
      return;
    }
    console.log("send", data);
    this.ws.send(JSON.stringify(data));
    // this.ws.send(data);
  }
  check() {
    return this.ws && this.ws.readyState === 1;
  }
  init() {
    socket.on("open", e => {
      if (typeof this.onOpen === "function") {
        this.onOpen();
      }
    });

    socket.on("message", data => {
      try {
        const json = JSON.parse(data);
        this.onMessage(json);
      } catch (e) {
        console.log("解析数据出错", e, data);
      }
    });

    this.ws = socket.ws;
  }
  onMessage(msg) {
    const { msgId, data } = msg;
    const key = eventMap[Math.floor(msgId / 100)];
    if (key && typeof this.events[key] === "function") {
      this.events[key](msgId, data, msg);
    }
  }

  parseTime(startTimestamp) {
    let date = new Date(Number(startTimestamp));
    let Y = date.getFullYear();
    let M =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let m =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return H + ":" + m + ":" + s;
  }
}

// export default new NetApi();
