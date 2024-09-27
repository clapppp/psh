const { createServer } = require("http");
const next = require("next");
const { WebSocketServer } = require("ws");
const { parse } = require("url");

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

    const wss = new WebSocketServer({ server, path: '/api/socket' });

    wss.on('connection', (ws) => {
        console.log('new client connected');

        ws.on('message', (message) => {
            const user = JSON.parse(message);
            userList.set(user.name, user);
            clientList.set(ws, user.name);
        });

        ws.on('close', () => {
            const cl = clientList.get(ws);
            console.log("delete : ", cl);
            userList.delete(cl);
            clientList.delete(ws);
            console.log('client is disconnected');
        });

        ws.on('error', (error) => {
            console.error('WebSocket 에러:', error);
            clearInterval(interval);
        });

        const interval = setInterval(() => {
            wss.clients.forEach((client) => {
                const sendArray = Array.from(userList.entries());
                client.send(JSON.stringify(sendArray));
            }) //Map => iterable => array => Json 으로 보냄
        }, cycle);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on port 3000');
    });
});
