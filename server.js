if(process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
    
const express = require("express");
const expressLayouts= require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const indexRouter = require("./routes/index.js");
const directorRouter = require("./routes/directors.js");
const movieRouter = require("./routes/movies.js");

const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",error => console.error(error));
db.once("open",() => console.log("Connected successfully with MongoDB"));

app.set("view engine","ejs");
app.set("views", __dirname+ "/views");
app.set("layout","layouts/layouts");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({limit:"10mb",extended:false}));

app.use("/",indexRouter);
app.use("/directors",directorRouter);
app.use("/movies",movieRouter);

app.listen(process.env.PORT || 3000);
console.log("Server is running on port 3000");
