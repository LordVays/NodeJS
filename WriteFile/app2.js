const fs = require('fs');

const dataText = "Флаги «r» и «w» в Node.js указывают на поведение открываемого файла в методах работы с файловой системой (например, fs.open() из модуля fs). \nЭти флаги могут быть частью параметра flags в объекте options.";

const pathToFile = "doc.txt";

fs.writeFileSync(pathToFile, dataText, {encoding: 'utf8', flag: 'a'});