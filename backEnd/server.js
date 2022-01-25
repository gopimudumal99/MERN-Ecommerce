const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./configs/db");
const errorHander = require("./middleware/error");

// config
dotenv.config({ path: "backEnd/configs/config.env" });

//Connecting to Database
connectDatabase();

//middleware Error hander
app.use(errorHander);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listing on port http://localhost:${process.env.PORT}`);
});

// Unhandle Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandle Promise Rejections`);
  server.close(() => {
    process.exit(1);
  });
});

