const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const CSVToJSON = require('csvtojson');
const config = JSON.parse(fs.readFileSync("package.json")).config;
const logDir = path.resolve(__dirname, "./logs");
const logFile = path.resolve(logDir, "performance.csv");

const server = express();
if (config["compress"]) {
  server.use(compression({ filter: () => true }));
}

server.use((req, res, next) => {
  setTimeout(next, config["delay"]);
});

server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
//   res.setHeader("Cache-Control", "max-age=31536000"); // seconds
  next();
});

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, "time,url,dcl,load,fcp,lcp,cls,fid\n", {
    flag: "wx",
  });
}

server.post(
  "/api/performance",
  bodyParser.json({ type: "*/*" }),
  (req, res, next) => {
    const now = new Date().getTime();
    const record = `${now},${req.body.url},${req.body.dcl},${req.body.load},${req.body.fcp},${req.body.lcp},${req.body.cls},${req.body.fid}`;
    console.log(record);

    fs.appendFile(logFile, `${record}\n`, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
      next();
    });
  }
);

server.get("/api/performance", (req, res) => {
    CSVToJSON().fromFile('./logs/performance.csv')
    .then(data => {
        res.json({data});
    }).catch(err => {
        console.log(err);
    });
});

server.use(express.static("./", { etag: false }));

const port = parseInt(config["port"], 10);
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}/`);
});

