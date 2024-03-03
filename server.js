const express = require("express");
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const storeRouter = require("./Route/store.route");
const bookRouter = require("./Route/book.route");
const userRouter = require("./Route/user.route");
const signInRouter = require("./Route/signIn.route");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { Server } = require("socket.io");

const app = express();

// port
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
// app.use(express.urlencoded({extended:true}))
app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/index.html')));
//res.json("server started....")
// limit requests per one person per minute
var limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // Limit each IP to 100 requests per `window` (here, 15 minutes)
    message: "server is busy please try again after some time"
});
app.use(limiter)
// routes middleware
app.use("/api-store-book", storeRouter);
app.use("/api-store-book", bookRouter);
app.use("/api-store-book", userRouter);
app.use("/api-store-book", signInRouter);
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
