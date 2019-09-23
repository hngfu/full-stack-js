const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    })
}).listen(8080, () => {
    console.log('서버가 실행되었습니다.');
})