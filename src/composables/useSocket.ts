import { onUnmounted } from "vue";
import { useLoginStore } from "@/stores/login";
// import { useRouter } from "vue-router";
import router from "../router";
import { useLoadStore } from "@/stores/loading";
import { useRegister } from "@/stores/userRegister.pinia";
import { useSocketStore } from "@/stores/socketStore";
const loading = useLoadStore();

// const router = useRouter()

interface SocketOptions {
  heartbeatInterval?: number;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

class Socket {
  url: string;
  ws: WebSocket | null = null;
  opts: SocketOptions;
  reconnectAttempts: number = 0;
  listeners: { [key: string]: Function[] } = {};
  heartbeatInterval: number | null = null;

  constructor(url: string, opts: SocketOptions = {}) {
    this.url = url;
    this.opts = {
      heartbeatInterval: 3000,
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      ...opts
    };
    this.ws = new WebSocket(this.url);
    this.init();
  }

  init() {
    loading.hideLoading();
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onclose = this.onClose.bind(this);

    const { access_token } = useLoginStore();
    if (!access_token) {
      router && router.push({ name: "login" });
    }
    const loginRequest = {
      service: 1,
      msgId: 1003,
      data: {
        token: access_token
      }
    };
    setTimeout(() => {
      this.send(JSON.stringify(loginRequest));
    }, 1000);
  }

  onOpen(event: Event) {
    this.reconnectAttempts = 0;
    this.startHeartbeat();
    this.emit("open", event);
  }

  onMessage(event: MessageEvent) {
    this.emit("message", event.data);
  }

  onError(event: Event) {
    console.error("WebSocket error:", event);
    this.emit("error", event);
  }

  onClose(event: CloseEvent) {
    console.log("WebSocket closed:", event);
    this.stopHeartbeat();
    this.emit("close", event);

    if (this.reconnectAttempts < this.opts.maxReconnectAttempts!) {
      setTimeout(() => {
        loading.showLoading();
        this.reconnectAttempts++;
        this.init();
      }, this.opts.reconnectInterval);
    }
  }

  startHeartbeat() {
    if (!this.opts.heartbeatInterval) return;

    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
      }
    }, this.opts.heartbeatInterval);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  send(data: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.error("WebSocket is not open. Cannot send:", data);
    }
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string) {
    if (this.listeners[event]) {
      delete this.listeners[event];
    }
  }

  emit(event: string, data: any) {
    this.listeners[event]?.forEach(callback => {
      callback(data);
    });
  }
}

export function useSocket(opts?: SocketOptions) {
  const { access_token } = useLoginStore();

  if (!access_token) {
    router && router.push({ name: "login" });
  }
  const store = useSocketStore();
  if (!store.socket) {
    const StoreRegister = useRegister();
    const user_device = StoreRegister.device;

    store.setSocket(
      new Socket(
        `${process.env.VITE_APP_WS_URL}ws?device=${user_device}&domain=${process.env.VITE_APP_HOSTNAME? process.env.VITE_APP_HOSTNAME: window.location.hostname}`,
        opts
      )
    );
  }

  onUnmounted(() => {
    store.socket.off("open");
    store.socket.off("message");
    store.socket.off("error");
    store.socket.off("close");
  });

  return {
    socket: store.socket,
    send: store.socket.send.bind(store.socket),
    on: store.socket.on.bind(store.socket),
    off: store.socket.off.bind(store.socket)
  };
}
