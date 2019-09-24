const http = require('http');
const fs = require('fs');

const users = {};

const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.url === '/') {
                fs.readFile('./rest.html', (err, data) => {
                    res.end(data);
                });
            } else if (req.url === '/users') {
                res.end(JSON.stringify(users));
            } else {
                fs.readFile(`.${req.url}`, (err, data) => {
                    res.end(data);
                });
            }
            break;
        case 'POST':
            let body = '';
            if (req.url === '/users') {
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    const { name } = JSON.parse(body);
                    const id = +new Date();
                    users[id] = name;
                    res.writeHead(201);
                    res.end();
                });
            }
            break;
        case 'PUT':
            if (req.url.startsWith('/users')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk;
                });
                req.on('end', () => {
                    users[key] = JSON.parse(body).name;
                    res.end();
                });
            }
            break;
        case 'DELETE':
            if (req.url.startsWith('/users')) {
                const key = req.url.split('/')[2];
                delete users[key];
                res.end();
            }
            break;
        default:
            break;
    }
}).listen(8080);

server.on('listening', () => {
    console.log('고블린 왈: 시간은 금이라구 친구');
});