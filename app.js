const port = process.env.PORT || 3000;
const FILE_PATH = process.env.FILE_PATH || '/tmp';
const UUID = process.env.UUID;
const http = require('http');
const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');
const OPENHTTP = process.env.OPENHTTP || '0';

const startScriptPath = `./start.sh`;
const startScript = spawn(startScriptPath, [], {
    env: {
        ...process.env,
        OPENHTTP: OPENHTTP
    }
});
startScript.stdout.on('data', (data) => {
    console.log(`${data}`);
});
startScript.stderr.on('data', (data) => {
    console.error(`${data}`);
});
startScript.on('error', (error) => {
    console.error(`boot error: ${error}`);
    process.exit(1);
});

if (OPENHTTP === '1') {
    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200);
            res.end('hello world');
        } else {
            res.writeHead(404);
            res.end('Not found');
        }
    });
    server.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
} else if (OPENHTTP === '0') {
    console.log(`server is listening on port ${port}`);
}
