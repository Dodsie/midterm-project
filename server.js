// load .env data into process.env
require("dotenv").config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_SID);

//require DB setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect(()=>{console.log(`connected to db ${process.env.DB_PORT}`)});

const db = require('./dbqueries');

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");



// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
console.log(__dirname)
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const ordersRoutes = require("./routes/orders");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
//app.use("/widgets", widgetsRoutes(db));

// localhost:8080/orders/
app.use("/orders", ordersRoutes(db));
// Note: mount other resources here, using the same pattern above
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let templateVars = {userID: req.cookies['user']};
  res.render("index", templateVars);
  //console.log(process.env)
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

