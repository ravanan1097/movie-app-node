const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
require('./config/dbconfig').mongoosedb();
const router = require("./router/router");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/", router);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Listening on ", PORT)
})


