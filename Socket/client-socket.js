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

// Подключаемся к серверу
const socket = io.connect(`http://127.0.0.1:8888`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nickname = null;

// Функция для красивого вывода сообщений, не мешая вводу
const displayMessage = (message) => {
    // Сохраняем текущую строку ввода
    const currentLine = rl.line;
    // Очищаем текущую строку в терминале
    readline.clearLine(process.stdout, 0);
    // Перемещаем курсор в начало
    readline.cursorTo(process.stdout, 0);
    // Выводим сообщение
    console.log(message);
    // Восстанавливаем строку ввода
    rl.prompt(true);
};

socket.on("connect", () => {
    console.log("Успешно подключено к серверу!");

    rl.question("Введите ваш никнейм: ", (answer) => {
        nickname = answer.trim();
        // Отправляем никнейм на сервер для регистрации
        socket.emit('register', nickname);

        // Устанавливаем красивый промпт для ввода
        rl.setPrompt(`${nickname}> `);
        rl.prompt();

        // Начинаем слушать ввод в консоли
        rl.on('line', (input) => {
            const message = input.trim();
            if (message) {
                // Отправляем текст сообщения на сервер
                socket.emit('message', message);
            }
            // Снова показываем промпт
            rl.prompt();
        });
    });
});

// Слушаем входящие сообщения от других пользователей
socket.on("message", (msg) => {
    const messageString = `[${msg.time}] ${msg.sender}: ${msg.text}`;
    displayMessage(messageString);
});

// Слушаем системные сообщения о подключении нового пользователя
socket.on("user connected", (systemMessage) => {
    displayMessage(`\x1b[32m[СИСТЕМА] ${systemMessage}\x1b[0m`); // Зеленый цвет
});

// Слушаем системные сообщения об отключении пользователя
socket.on("user disconnected", (systemMessage) => {
    displayMessage(`\x1b[31m[СИСТЕМА] ${systemMessage}\x1b[0m`); // Красный цвет
});

socket.on('disconnect', () => {
    console.log('Вы были отключены от сервера.');
    process.exit();
});

socket.on('connect_error', (err) => {
    console.error('Ошибка подключения:', err.message);
    process.exit();
});