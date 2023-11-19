const express = require('express')
const cors = require('cors');
const bodyParser = require("body-parser");
const storeRouter = require('./Route/store.route');
const bookRouter = require('./Route/book.route');

const app = express()
const port = 3000


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.json('server started....') )
// routes middleware
app.use("/api-store-book", storeRouter);
app.use("/api-store-book", bookRouter);

app.listen(port, () => console.log(`server started.... and listening on port ${port}!`))
