const mongoose = require("mongoose");
const express = require("express");
const fetchRouter = require("./routers/fetchData.routers");
const fetchByType = require("./routers/fetchByType.routers");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
const path = require("path");

/** MIDDLEWARES */
app.use(express.json());
app.use(cors());
/** ROUTERS */
app.use("/", fetchRouter);
app.use("/filter", fetchByType);

/** Static Files */
app.use(express.static(path.join(__dirname, "./assignment/build")));
app.get("*",(req,res)=>{
return res.sendFile(path.join(__dirname,"./assignment/build/index.html"))
})

/** DATABASE CONNECTION */
const databaseURL = process.env.DATABASE_URL;
const atlasdatabaseURL = process.env.ATLAS_DATABASE_URL;
mongoose
  .connect(atlasdatabaseURL)
  .then(() => {
    console.log("Database is Connected Successfully...");
  })
  .catch(() => {
    console.log("Error to connect from Database");
  });

/** SERVER CONNECTION */
try {
  app.listen(PORT, () => {
    console.log(
      `Server is connected successfully on PORT: http://localhost:${PORT}`
    );
  });
} catch (error) {
  console.log("Error to start the Server");
}
