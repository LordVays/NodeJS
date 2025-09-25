const path = require("path");

const notes = "C:/Users/DzaurovUM24/Desktop/node.js/Работа с путями/node.txt";

console.log(path.dirname(notes));
console.log(path.basename(notes));
console.log(path.extname(notes)); 
console.log(path.parse(notes));