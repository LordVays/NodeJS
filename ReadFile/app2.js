const fs = require("fs");

const pathToFile = "doc.txt";

const data = fs.readFileSync(pathToFile, {encoding: 'utf8', flag: 'r'});
console.log(typeof data);

let dataArray = data.split('\r\n');
dataArray = dataArray.filter(line => line.trim() != "");
console.log(dataArray);