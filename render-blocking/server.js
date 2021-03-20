// Simulator

const fs = require("fs");
const express = require("express");
const config = JSON.parse(fs.readFileSync("package.json")).config;

const server = express();

server.use((req, res, next) => {
    if(req.url.endsWith('style1.css') || req.url.endsWith('color.css')) {
        setTimeout(next, 3000);
    }else{
        next();
    }
});

server.use(express.static('./', { etag: false }));

const port = parseInt(config["port"], 10);
server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/`);
});