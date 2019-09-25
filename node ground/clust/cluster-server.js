const http = require("http");
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    const worker = cluster.fork();
    worker.on("exit", (code, signal) => {
      console.log(`exited worker pid: ${worker.process.pid}`);
      cluster.fork();
    });
  }
} else {
  http
    .createServer((req, res) => {
      res.end(`${process.pid}`);
      setTimeout(() => {
        console.log(`process pid before exit: ${process.pid}`);
        process.exit();
      }, 1000);
    })
    .listen(8080);
  console.log(`starting... ${process.pid} process`);
}
