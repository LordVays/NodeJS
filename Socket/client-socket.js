const io = require('socket.io-client');
const readline = require('readline');
const socket = io.connect(`http://127.0.0.1:8888`, { reconnection: true });

const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout 

});


let nickname = null;

socket.on("connect", () => {


    console.log("Connect!");

    rl.question("Write your nickname:", (newNickname) => {

        nickname = newNickname

        mess();

    });


});


socket.on("message", (newMessage) => {

    console.log(toMessage(newMessage));

});


const mess = () => {


    rl.question("", (newMessage, time = new Date) => {

        socket.emit("message", pack({ nick_name: nickname, text: newMessage, date: time.toLocaleTimeString() }));

        mess();

    });


};


const pack = (obj) => {
    
    return JSON.stringify(obj);
    
};


const toMessage = (str) => {

    let time = new Date

    let obj = JSON.parse(str);

    return time.toLocaleTimeString() + " " + obj.nick_name + ": " + obj.text

};