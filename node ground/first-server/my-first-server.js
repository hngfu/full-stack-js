const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/login')) {
        fs.readFile('./server1.html', (err, data) => {
            const { query } = url.parse(req.url);
            const { name } = qs.parse(query);
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 5);
            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `name = ${encodeURIComponent(name)}; Expires=${expires.toUTCString()}; HttpOnly; Path = /`
            })
            res.end(data);
        })
    } else if (req.headers.cookie) {
        res.end(`Cookie info: ${req.headers.cookie}`);
    } else {
        fs.readFile('./server2.html', (err, data) => {
            res.end(data);
        })
    }
}).listen(8080);

server.on('listening', () => {
    console.log('블리츠크랭크 왈: 인간 시대의 끝이 도래했다.');
});

server.on('error', (error) => {
    console.error(error);
});