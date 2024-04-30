const path = require('path');
const fs = require('fs');

// Create folder
fs.mkdir(path.join(__dirname, '/test'), {}, err => {
    if (err) throw err;
    console.log('Folder created');

    // Create file
    fs.writeFile(path.join(__dirname, '/test', 'hello.txt'), 'Hello world', err => {
        if (err) throw err;
        console.log('.txt created');

        // Append content to file
        fs.appendFile(path.join(__dirname, '/test', 'hello.txt'), '\nI love node.js', err => {
            if (err) throw err;
            console.log('.txt appended new content');
        });
    });
});

//Read file
fs.readFile(path.join(__dirname, '/test', 'hello.txt'), 'utf-8', (err,data)=>{
    if (err) throw console.error;
    console.log(data)
})
//Rename file
fs.rename(path.join(__dirname, '/test', 'hello.txt'),path.join(__dirname, '/test', 'helloworld.txt'),  (err)=>{
    if (err) throw console.error;
    console.log('File renamed. ')
})