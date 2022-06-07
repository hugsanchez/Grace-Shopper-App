const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

//passport config
require("../passport")(passport);

// API Imports
const userAPI = require("./api/users");
const adminAPI = require("./api/admins");
const productsAPI = require("./api/products");
const ordersAPI = require("./api/orders");
const reviewsAPI = require("./api/reviews");
const categoriesAPI = require("./api/categories");
const authAPI = require("./api/auth");
const cartAPI = require("./api/cart");
const artistsAPI = require("./api/artists");
const stripeAPI = require("./api/stripeCheckout");

// Database Imports
const {
  syncAndSeed,
  model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./db");

// Serve Static Folder
app.use(express.static(path.join(__dirname, "../public")));
/* Its a utility method, Give me a folder and I will create a route matching each file name in that 
    folder at the route you specified 
      public (CSS file, HTML file, IMG file)
*/

// Server Request Parsing
app.use(express.json());
/* It waits for a request to come into your server it listens for data to be admitted as part of the request,
    for all those chunks to arrive on your computer and then tries to interpret that string as a JSON, takes that
      JSON and attaches it to the request as {req.body}
*/
app.use(express.urlencoded({ extended: true }));
/* This takes an arguement setting, when set false I only want you to interpret the data if its clearly from a form
                                    when set true it takes everything

    *Forms encode all their data in the URL*
*/
// Middleware Logging
app.use(morgan("dev"));

//Session
app.use(
  session({
    secret: "keyboard cat",
    //Used to sign the session ID
    resave: false,
    //We don't want to save a session if nothing is modified
    saveUninitialized: false,
    //Don't create a session until something is stored
  })
);

/* 
  * Because HTTP is stateless in order to associate a request from any other request, you need a way to store
      user data between HTTP requests

  * The solution is to store the data server side give it an "id" and let the client only know 
      (and pass back at every HTTP request) that "id"
*/

// ** Express Session should be established before working with Passport Session **

//Passport middleware
app.use(passport.initialize());
//Initialize required to initialize passport
app.use(passport.session());
//must be used for persistant login sessions

/* 
  The difference is that a normal session ends when the user closes the browser, whereas a persistant login
    session ends at a specified (any) date in the future

    * The user will be able to return to your site and NOT have to log in again

*/

// API Routes
app.use("/api/users", userAPI);
app.use("/api/admins", adminAPI);
app.use("/api/products", productsAPI);
app.use("/api/orders", ordersAPI);
app.use("/api/reviews", reviewsAPI);
app.use("/api/categories", categoriesAPI);
app.use("/api/artists", artistsAPI);
app.use("/api/auth", authAPI);
app.use("/api/cart", cartAPI);
app.use("/api/checkout", stripeAPI);

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
