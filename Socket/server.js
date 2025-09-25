// const io = require('socket.io').listen(8888);

// io.Socket.on("connection", (socket) => {


//     console.log("New connection");


//     socket.on("message", (message) => {

//         console.log(message);

//         socket.broadcast.emit("message", message);

//     });


// });


const server = require('http').createServer();
const options = {};
const io = require('socket.io')(server, options);
const port = 8888;

io.on('connection', (socket) => {


    console.log('New connection');


    socket.on("message", (message) => {

        console.log(message);

        socket.message("message", message);

    });


});

server.listen(port);
console.log(`Server was start on port ${port}`);