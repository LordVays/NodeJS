const fs = require("fs");
const path = require('path');

const fold = 'C:/Users/DzaurovUM24/Desktop/node.js/Работа с директориями';


// try {
    
//     if (!fs.existsSync("fold")) {
        
//         fs.mkdirSync("fold");

//     }

// } catch (err) {
    
//     console.log(err);

// }


// const folder = 'C:/Users/DzaurovUM24/Desktop/node.js/Работа с директориями/folder';

// console.log(fs.readdirSync(folder));
// console.log(path.extname(fs.readdirSync(folder)[1]));


// const folder = 'C:/Users/DzaurovUM24/Desktop/node.js/Работа с директориями/folder';
// const newNameFolder = 'C:/Users/DzaurovUM24/Desktop/node.js/Работа с директориями/folder22222';

// fs.rename(folder, newNameFolder, (err) => {

//     if (err) {

//         console.log(err);
//         return

//     }

// });


// const newNameFolder = 'C:/Users/DzaurovUM24/Desktop/node.js/Работа с директориями/folder22222';

// fs.rmdir(newNameFolder, { recursive: true },  (err) => {

//     if (err) {

//         console.log(err);
//         return

//     }

// });