const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        console.log('cookie: ', req.headers.cookie, req.url);
        if (err) {
            throw err;
        }
        res.end(data);
        res.writeHead(200, {
            'Set-Cookie': 'hngfu cookie = delicious'
        });
    })
}).listen(8080);

server.on('listening', () => {
    console.log('블리츠크랭크 왈: 인간 시대의 끝이 도래했다.');
});

server.on('error', (error) => {
    console.error(error);
});