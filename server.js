const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const storeRouter = require("./Route/store.route");
const bookRouter = require("./Route/book.route");
const userRouter = require("./Route/user.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { Server } = require("socket.io");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
//res.json("server started....")

// routes middleware
app.use("/api-store-book", storeRouter);
app.use("/api-store-book", bookRouter);
app.use("/api-store-book", userRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Expose node module
app.use("/static", express.static("node_modules"));

// socket io server

const server = app.listen(port, () =>
  console.log(`server started.... and listening on port ${port}!`)
);

const io = new Server(server,{
    connectionStateRecovery: {} });

io.on('connection', function (socket) {
    console.log("Connected successfully to the socket ...");
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("my other event", (data) => {
    console.log(data);
  });
});

module.exports = app;
