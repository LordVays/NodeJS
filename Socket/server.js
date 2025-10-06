// const io = require('socket.io').listen(8888);

// io.Socket.on("connection", (socket) => {


//     console.log("New connection");


//     socket.on("message", (message) => {

//         console.log(message);

//         socket.broadcast.emit("message", message);

//     });


// });


// const server = require('http').createServer();
// const options = {};
// const io = require('socket.io')(server, options);
// const port = 8888;

// io.on('connection', (socket) => {


//     console.log('New connection');


//     socket.on("message", (message) => {

//         console.log(message);

//         socket.emit("message", message);

//     });


// });

// server.listen(port);
// console.log(`Server was start on port ${port}`);



const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath = '.' + req.url;

    if (filePath === './') {

        filePath = './index.html';

    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {

        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',

    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {

        if (error) {

            if (error.code == 'ENOENT') {

                res.writeHead(404);
                res.end('Error: File not found');

            } else {

                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');

            }

        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }

    });

});


const io = require('socket.io')(server, {

    cors: {

        origin: "*",
        methods: ["GET", "POST"]

    }

});

const port = 8888;

const users = {};

io.on('connection', (socket) => {

    console.log(`Новое подключение: ${socket.id}`);

    socket.on('register', (nickname) => {

        console.log(`Пользователь ${socket.id} выбрал никнейм: ${nickname}`);
        socket.nickname = nickname;
        users[socket.id] = nickname;
        socket.broadcast.emit('user connected', `${nickname} присоединился к чату.`);

    });

    socket.on('message', (messageText) => {

        if (!messageText.trim()) {

            return;

        }

        const senderNickname = socket.nickname || 'Аноним';

        console.log(`Сообщение от ${senderNickname}: ${messageText}`);

        const messagePayload = {

            text: messageText,
            sender: senderNickname,
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })

        };

        io.emit('message', messagePayload);

    });

    socket.on('disconnect', () => {

        const nickname = socket.nickname || 'Кто-то';

        if(socket.nickname) {

            console.log(`Пользователь ${nickname} отключился.`);
            delete users[socket.id];
            io.emit('user disconnected', `${nickname} покинул чат.`);

        }

    });

});


server.listen(port, () => {

    console.log(`Сервер запущен на порту ${port}. Откройте http://127.0.0.1:${port} в браузере.`);

});