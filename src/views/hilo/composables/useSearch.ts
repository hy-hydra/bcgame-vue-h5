import { useSocket } from "@/composables/useSocket";
import { reactive, toRefs } from "vue";
import { useSocketStore } from "@/stores/socketStore";
import { forEach } from "lodash-es";
import useAudio from "@/utils/hooks/useAudio";
const store = useSocketStore();

const data = reactive({
  allData: new Map(),
  protoUrl: "/src/proto/SlotPoker.proto",
  socket: null
});

const audiosSrc = ["cardWin", "cashout", "pokerChoose", "start"];
const audio = {};
forEach(audiosSrc, src => {
  audio[src] = useAudio(`/audio/hilo/${src}.mp3`);
});

if (!data.socket) {
  data.socket = useSocket();
}

watchEffect(() => {
  data.socket?.on("open", event => {
    console.log("Connected to server", event);
  });
  data.socket?.on("message", values => {
    const value = JSON.parse(values);
    switch (value.msgId) {
      case 4001:
        audio["start"].signPlay();
        break;
      case 4003:
        if (!value.data.finish && !!Number(value.data.winRate)) audio["cardWin"].signPlay();
        break;
      case 4005:
        audio["cashout"].signPlay();
        break;

      default:
        break;
    }
    data.allData.set(value.msgId, value);
  });
  data.socket?.on("error", error => {
    console.error("WebSocket Error:", error);
  });
  data.socket?.on("close", event => {
    console.log("Connection closed", event);
  });
  store.setSocket(data.socket);
});

export function useSearch() {
  const search = () => {
    let initQuery = JSON.stringify({ msgId: 2000, data: { gameId: 10002 } });
    data.socket.send(initQuery);

    PokerJackpot();
    PokerRank();
  };

  const start = () => {
    let req = JSON.stringify({ msgId: 4000, data: {} });
    data.socket.send(req);
  };

  const betChoose = val => {
    let req = JSON.stringify({ msgId: 4010, data: val });
    data.socket.send(req);
  };

  const PokerChoose = val => {
    audio["pokerChoose"].signPlay();
    let req = JSON.stringify({ msgId: 4002, data: val });
    // sendMsg(req, getDataLists)
    data.socket.send(req);
  };

  const PokerCashOut = () => {
    let req = JSON.stringify({ msgId: 4004, data: {} });
    // sendMsg(req, getDataLists)
    data.socket.send(req);
  };

  const PokerJackpot = () => {
    let req = JSON.stringify({ msgId: 4006, data: {} });
    data.socket.send(req);
  };

  const PokerRank = () => {
    let req = JSON.stringify({ msgId: 4008, data: {} });
    data.socket.send(req);
  };

  const LeaveGame = () => {
    let req = JSON.stringify({ msgId: 2001, data: {} });
    data.socket.send(req);
  };

  onUnmounted(() => {
    LeaveGame();
  });

  return {
    ...toRefs(data),
    search,
    start,
    betChoose,
    PokerChoose,
    PokerCashOut,
    PokerJackpot,
    PokerRank
  };
}
