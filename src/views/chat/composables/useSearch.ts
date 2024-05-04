import { useSocket } from "@/composables/useSocket";
import { reactive, toRefs } from "vue";
import { useSocketStore } from "@/stores/socketStore";
const { socket } = useSocket();

const data = reactive({
  allData: new Map(),
  protoUrl: "/src/proto/SlotPoker.proto",
  socket: null
});

export function useSearch() {
  const init = params => {
    socket.on("open", event => {
      console.log("Connected to server", event);
      // socketStore.setSocket(socket);
    });
    socket.on("message", values => {
      const value = JSON.parse(values);
      data.allData.set(value.msgId, value);
    });
    socket.on("error", error => {
      console.error("WebSocket Error:", error);
    });
    socket.on("close", event => {
      console.log("Connection closed", event);
    });

    data.socket = socket;
    let initQuery = JSON.stringify(params);
    data.socket.send(initQuery);
  };

  const start = params => {
    let req = JSON.stringify(params);
    // sendMsg(req, getDataLists)
    data.socket.send(req);
  };

  return {
    ...toRefs(data),
    init,
    start
  };
}
