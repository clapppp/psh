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

    // WebSocket 서버를 별도의 경로에서 실행 (HMR 경로와 충돌 방지)
    const wss = new WebSocketServer({ server, path: '/api/socket' });

    // WebSocket 이벤트 처리
    wss.on('connection', (ws) => {
        console.log('새 클라이언트 연결됨');

        ws.on('message', (message) => {
            console.log('클라이언트로부터 받은 메시지:', message.toString());
            ws.send(`서버에서 받은 메시지: ${message}`);
        });

        ws.on('close', () => {
            console.log('클라이언트 연결이 끊겼습니다.');
        });

        ws.on('error', (error) => {
            console.error('WebSocket 에러:', error);
        });
    });

    // 서버 실행
    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on port 3000');
    });
});
