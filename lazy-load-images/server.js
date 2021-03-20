const fs = require("fs");
const express = require("express");
const config = JSON.parse(fs.readFileSync("package.json")).config;

const server = express();

server.use(express.static('./', { etag: false }));

const port = parseInt(config["port"], 10);
server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}/`);
});