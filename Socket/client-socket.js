const io = require('socket.io-client');
const readline = require('readline');
const socket = io.connect(`http://127.0.0.1:${port}`, { reconnection: true });

const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout 

});