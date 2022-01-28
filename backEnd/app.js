const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser());

//Router Import
const product = require('./routes/productRoute')
const user = require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1", user)


// middleware for Errors
app.use(errorMiddleware)


module.exports = app


