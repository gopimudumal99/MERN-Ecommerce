const express = require("express");
const app = express();
app.use(express.json())

//Router Import
const product = require('./routes/productRoute')
const user = require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1", user)

module.exports = app


