const fs = require('fs');



// Открытие и чтение файла (дескрептор)

// fs.open("./node.txt", 'r', (err, fd) => {

//     console.log(err);
//     console.log(fd);

// });


// try {

//     const data = fs.openSync("./node.txt", 'r');
//     console.log(data);

// } catch (error) {

//     console.log(error);

// }



// Данные о файлах

// fs.stat("./node.txt", (err, stats) => {

//     if (err) {

//         console.log(err);
//         return

//     } 

//     console.log(stats);

// });


try {
    
    const stats = fs.statSync("./node.txt");
    console.log(stats.isDirectory());

} catch (error) {
    
    console.log(error);

}  