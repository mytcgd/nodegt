const port = process.env.PORT || 3000;
const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200);
        res.end('hello world');
    } else if (req.url === '/healthcheck') {
        res.writeHead(200);
        res.end('ok');
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

// run
const startScriptPath = `/app/start.sh`;
const childProcess = spawn(startScriptPath, [], {
    detached: false,
    stdio: 'inherit',
});

server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
