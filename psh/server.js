import { createServer } from "http"
import next from "next"
import { WebSocketServer } from "ws";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const cycle = 100;
const userList = new Map();
const clientList = new Map();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wssPlay = new WebSocketServer({ noServer: true });
  const wssChat = new WebSocketServer({ noServer: true });
  //noserver:true => http서버를 생성하지않는다.
  //noserver:false => http서버를 생성해 자신의 서버로 ws요청을 받는다.

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url);

    if (pathname === "/api/play") {
      wssPlay.handleUpgrade(request, socket, head, (ws) => {
        wssPlay.emit("connection", ws, request); //connection 이벤트 발생
      });
    } else if (pathname === "/api/chat") {
      wssChat.handleUpgrade(request, socket, head, (ws) => {
        wssChat.emit("connection", ws, request);
      });
    } else {
      socket.destroy(); // 잘못된 경로는 연결 거부
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on port 3000");
  });

  wssPlay.on("connection", (ws) => {
    console.log("new client connected");

    ws.on("message", (message) => {
      const user = JSON.parse(message);
      userList.set(user.name, user);
      clientList.set(ws, user.name);
    });

    ws.on("close", () => {
      const cl = clientList.get(ws);
      console.log("delete : ", cl);
      userList.delete(cl);
      clientList.delete(ws);
      console.log("client is disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket 에러:", error);
      clearInterval(interval);
    });

    const interval = setInterval(() => {
      wssPlay.clients.forEach((client) => {
        const sendArray = Array.from(userList.entries());
        client.send(JSON.stringify(sendArray));
      }); //Map => iterable => array => Json 으로 보냄
    }, cycle);
  });

  wssChat.on("connection", (ws) => {
    console.log('chat client is connected');

    ws.on('message', (message) => {
      const data = JSON.parse(message);
      wssChat.clients.forEach((client) => client.send(JSON.stringify(data)));
    })
  })
});
