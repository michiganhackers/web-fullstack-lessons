var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");

var app = express();

var bcrypt = require("bcrypt");

const db = new sqlite3.Database("database/db.sqlite3", (err) => {
  if (err) return console.error(err.message);
  console.log("Database opened");
});
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(64) NOT NULL,
      password VARCHAR(256) NOT NULL
    );
	`);
  db.run(`
    CREATE TABLE IF NOT EXISTS notes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(64) NOT NULL,
      body VARCHAR(2048) NOT NULL,
      created DATETIME DEFAULT CURRENT_TIMESTAMP,
      userid INTEGER NOT NULL REFERENCES users(id)
    );
	`);
  const hash1 = bcrypt.hashSync("iloveSQL", 10);
  const hash2 = bcrypt.hashSync("password123", 10);
  const hash3 = bcrypt.hashSync("letmein", 10);
  db.get(
    `
	SELECT 
		username
	FROM
		users`,
    [],
    function (err, row) {
      if (err) console.error("database issues");
      if (!row) {
        db.run(`
      INSERT OR IGNORE INTO users
        (id, username, password)
      VALUES
        (1, "adam", "${hash1}");
  	`);
        db.run(`
      INSERT OR IGNORE INTO users
        (id, username, password)
      VALUES
        (2, "ondrej", "${hash2}");
  	`);
        db.run(`
      INSERT OR IGNORE INTO users
        (id, username, password)
      VALUES
        (3, "keshav", "${hash3}");
  	`);
      }
    }
  );
});

app.locals.db = db;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    credentials: true,
  })
);
app.use("/testing", express.static("."));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
