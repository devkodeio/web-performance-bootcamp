const fs = require("fs");
const express = require("express");
const compression = require("compression");
const config = JSON.parse(fs.readFileSync("package.json")).config;

const server = express();

if (config["compress"]) {
  server.use(compression({ filter: () => true }));
}
server.use((req, res, next) => {
  // if(req.url.slice(-2) == 'js') {
  //     setTimeout(next, config["delay"]);
  // }else{
  //     next();
  // }
  setTimeout(next, config["delay"]);
});

server.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    // res.setHeader("Cache-Control", "max-age=31536000"); // seconds
    next();
  });
server.use(express.static("./", { etag: false }));

const port = parseInt(config["port"], 10);
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}/`);
});
