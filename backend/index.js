const express = require("express");
const {default: mongoose } = require("mongoose");
const connect = require("./databse/connection");
const skillRouter = require("./routes/skillRoutes");
const path = require("path");
const projectRoute = require("./routes/projectRoutes");
const app = express();
app.use(express.json());
const cors = require('cors')
require("dotenv").config();
const bodyParser = require("body-parser");
connect()
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://adminportfolio.vercel.app","https://arjit-portfolio.vercel.app"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'))
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"));
})
app.use('/skill',skillRouter)
app.use('/project',projectRoute)

mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
  app.listen(5000, () =>
    console.log(`Running on port `)
  );
})
mongoose.connection.on("error", (err) => {
  console.log("hi "+err);
});
