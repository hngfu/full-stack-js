const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hngfu</h1>');
    res.end('<h2>Hello World</h2>');
}).listen('8081', () => {
    console.log('서버가 실행되었습니다.');
})