const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const { Pool } = require("pg");

const config = require("../config/config");
const userRoute = require("./routes/users");

const app = express();

// use middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(bodyParser.json());

// connect to database;
const pool = new Pool(config);
pool.connect()
    .then(() => {
        console.log("Connected to PostgreSQL!")
    })
    .catch(err => {
        console.log("There is an Error:", err)
    });

//route middleware
app.use("/api/users", userRoute);

//create 404 errors and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

//error handler
app.use(function(err, req, res) {
    //Save error message to res.locals only in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    //render the error page
    res.status(err.status || 500);
    res.render("error");
});

//set up port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});