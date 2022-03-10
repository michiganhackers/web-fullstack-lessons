var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // render the index view (index.jade)
  res.render("index", { title: "Express" });
});

// Make this render the notes view
router.get("/notes", function (req, res, next) {
  // Comment out the below code to start
  res.status(500)
  res.send("Not implemented")
});

module.exports = router;
