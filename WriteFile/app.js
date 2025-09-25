const fs = require("fs");
const data = "Мультифункциональный переводчик на 35 языков. Работает на базе нейросетей, учитывает контекст.";

// fs.writeFile("hello.txt", data, function(error) {

//     if (error) {
//         return console.log(error);
//     }

//     console.log("File is successfully recording");

// });


// fs.appendFile("hello.txt", data + "\n" , function(error) {

//     if (error) {
//         return console.log(error);
//     }

//     console.log("File is successfully recording");

// });


fs.appendFileSync("hello.txt", "Hello World!");

console.log("File recording")