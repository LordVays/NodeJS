const fs = require("fs");

fs.readFile("hello.txt", function(error, data) {

    if (error) {
        return console.log(error)
    } 

    console.log(data.toString());

});

console.log("Async reading file");


let data = fs.readFileSync("hello.txt");

console.log(data.toString());
console.log("Sync reading file");