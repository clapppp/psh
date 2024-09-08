const { createServer } = require("http");
const next = require("next");
const { WebSocketServer } = require("ws");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // HTTP 서버 생성
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const userList = new Map();

    // WebSocket 서버를 별도의 경로에서 실행 (HMR 경로와 충돌 방지)
    const wss = new WebSocketServer({ server, path: '/api/socket' });

    // WebSocket 이벤트 처리
    wss.on('connection', (ws) => {
        console.log('새 클라이언트 연결됨');

        ws.on('message', (message) => { //message : JSON
            console.log("message.toString = ", message.toString());
            const user = JSON.parse(message);
            console.log("JSON.parse(message) = ", user);
            userList.set(user.name , user);
        });

        ws.on('close', () => {
            console.log('클라이언트 연결이 끊겼습니다.');
        });

        ws.on('error', (error) => {
            console.error('WebSocket 에러:', error);
            clearInterval(interval);
        });

        const interval = setInterval(() => {
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(Object.fromEntries(userList)));
            })
        }, 3000);
    });

    // 서버 실행
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on port 3000');
    });
});
