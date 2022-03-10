var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/notes", function (req, res, next) {
  res.render("notes", {notes: req.app.locals.notes})
});

module.exports = router;
