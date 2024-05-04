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

const audiosSrc = ["betClick", "bombChoose", "cardChoose", "curChoose", "cashout"];
const audio = {};
forEach(audiosSrc, src => {
  audio[src] = useAudio(`/audio/mines/${src}.mp3`);
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
      case 3005:
        value.data.boom ? audio["bombChoose"].signPlay() : audio["curChoose"].signPlay();
        break;
      case 3020:
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
    let initQuery = JSON.stringify({ msgId: 2000, data: { gameId: 10001 } });
    data.socket.send(initQuery);
  };

  const start = () => {
    let req = JSON.stringify({ msgId: 3008, data: {} });
    audio["betClick"].signPlay();
    data.socket.send(req);
  };

  const betChoose = val => {
    let req = JSON.stringify({ msgId: 3002, data: val });
    data.socket.send(req);
  };

  const BomChoose = val => {
    let req = JSON.stringify({ msgId: 3004, data: val });
    audio["cardChoose"].signPlay();
    data.socket.send(req);
  };

  const CashOut = () => {
    let req = JSON.stringify({ msgId: 3010, data: {} });
    audio["betClick"].signPlay();
    data.socket.send(req);
  };

  const Jackpot = () => {
    let req = JSON.stringify({ msgId: 3006, data: {} });
    data.socket.send(req);
  };

  const Rank = () => {
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
    BomChoose,
    CashOut,
    Jackpot,
    Rank
  };
}
