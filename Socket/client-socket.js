// const io = require('socket.io-client');
// const readline = require('readline');
// const socket = io.connect(`http://127.0.0.1:8888`, { reconnection: true });

// const rl = readline.createInterface({

//     input: process.stdin,
//     output: process.stdout

// });


// let nickname = null;

// socket.on("connect", () => {


//     console.log("Connect!");

//     rl.question("Write your nickname:", (newNickname) => {

//         nickname = newNickname

//         mess();

//     });


// });


// socket.on("message", (newMessage) => {

//     console.log(toMessage(newMessage));

// });


// const mess = () => {


//     rl.question("", (newMessage, time = new Date) => {

//         socket.emit("message", pack({ nick_name: nickname, text: newMessage, date: time.toLocaleTimeString() }));

//         mess();

//     });


// };


// const pack = (obj) => {

//     return JSON.stringify(obj);

// };


// const toMessage = (str) => {

//     let time = new Date

//     let obj = JSON.parse(str);

//     return time.toLocaleTimeString() + " " + obj.nick_name + ": " + obj.text

// };


const io = require('socket.io-client');
const readline = require('readline');
const socket = io.connect(`http://127.0.0.1:8888`);

const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout

});

let nickname = null;

const displayMessage = (message) => {

    const currentLine = rl.line;

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    console.log(message);

    rl.prompt(true);

};

socket.on("connect", () => {

    console.log("Успешно подключено к серверу!");

    rl.question("Введите ваш никнейм: ", (answer) => {

        nickname = answer.trim();

        socket.emit('register', nickname);

        rl.setPrompt(`${nickname}> `);
        rl.prompt();
        rl.on('line', (input) => {

            const message = input.trim();

            if (message) {

                socket.emit('message', message);

            }

            rl.prompt();

        });

    });

});


socket.on("message", (msg) => {

    const messageString = `[${msg.time}] ${msg.sender}: ${msg.text}`;
    displayMessage(messageString);

});


socket.on("user connected", (systemMessage) => {

    displayMessage(`\x1b[32m[СИСТЕМА] ${systemMessage}\x1b[0m`);
    
});


socket.on("user disconnected", (systemMessage) => {

    displayMessage(`\x1b[31m[СИСТЕМА] ${systemMessage}\x1b[0m`);

});

socket.on('disconnect', () => {

    console.log('Вы были отключены от сервера.');
    process.exit();

});

socket.on('connect_error', (err) => {

    console.error('Ошибка подключения:', err.message);
    process.exit();

});