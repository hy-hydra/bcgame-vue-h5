import { useLoginStore } from "@/stores/login";
const { access_token } = useLoginStore();
import { useRouter } from "vue-router";
import { useRegister } from "@/stores/userRegister.pinia";

// import { sock } from '@/utils/websocket'
// 定义要加载的 .proto 文件 URL

let messageRef = null;
let MyMessage = null;
let ws = null;
let getSock = null;
let query = null;
let getStartSock = null;
const sock = async (MyMessage, messageRef) => {
  const router = useRouter();
  if (!access_token) {
    router.push({ name: "login" });
  }
  const StoreRegister = useRegister();
  const user_device = StoreRegister.device;
  console.log("device type websocket.ts");
  console.log(user_device);
  var wsSrc = `${process.env.VITE_APP_WS_URL}ws?device=${user_device}&domain=${process.env.VITE_APP_HOSTNAME? process.env.VITE_APP_HOSTNAME: window.location.hostname}`;
  // 创建 WebSocket 连接
  ws = ws || new WebSocket(wsSrc);

  // 监听 WebSocket 连接成功事件
  ws.addEventListener("open", () => {
    console.log("WebSocket connected!");

    // // 序列化消息对象，并将其发送给服务器
    // const response = MyMessage.create({ text: '客户端1连接了' });
    // // 序列化消息对象，并将其发送给服务器
    // const buffer = MyMessage.encode(response).finish();
    // ws.send(buffer);
    getStartSock();
    if (query) {
      ws.send(query);
    }
    return true;
  });

  // 监听 WebSocket 收到服务器发送过来的消息事件
  ws.addEventListener("message", async event => {
    // 解析二进制数据为 Protobuf 消息
    //   const blob: Blob = event.data;
    //   // Uint8Array 接收的是arrayBuffer对象这里一定要注意如果是Blob格式的数据一定要先转为arrayBuffer
    //   const buffer = await blob.arrayBuffer();
    //   const data = new Uint8Array(buffer);
    //   const message = MyMessage.decode(data);
    //   console.log(`Receive message from server: ${JSON.stringify(message)}`);
    // console.log(event)

    getSock(JSON.parse(event.data));
    //   // 更新视图显示收到的消息内容
    //   messageRef.value = message.text;
  });

  // 监听 WebSocket 出错事件
  ws.addEventListener("error", event => {
    console.error(event);
  });

  // 监听 WebSocket 关闭事件
  ws.addEventListener("close", event => {
    console.warn(event);
  });
};
export const MessageProtoApi = async (
  url,
  name,
  startSock: Function,
  querys?: any,
  callback?: Function
) => {
  // 定义响应消息的状态
  query = querys;
  getSock = callback;
  getStartSock = startSock;
  messageRef = ref("");
  // const response = await fetch(url);
  // const content = await response.text();
  // // 解析 .proto 文件中的消息结构
  // const root = await protobuf.parse(content).root;
  // MyMessage = root.lookupType(name);
  // console.log(MyMessage)
  return await sock(MyMessage, messageRef);
};

export const sendMsg = (data, callback) => {
  // const message = MyMessage.create(data);
  // // 序列化消息对象，并将其发送给服务器
  // const buffer = MyMessage.encode(message).finish();
  ws.send(data);
  getSock = callback;
};
