import connectDB from "./config/db.js";
import app from "./config/app.js"
import http from "http"

const port = 5000;

connectDB();

const server = http .createServer(app);
server.listen(port, onConnect);
server.on('error', onError);

function onConnect() {
  console.log(`Server connected and listening at port ${port}`)
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}