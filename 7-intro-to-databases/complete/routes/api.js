var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

// require user to be logged in before proceeding
const requireLogin = (req, res, next) => {
  if (req.cookies.username) {
    req.username = req.cookies.username;
    next();
  } else {
    res.status(403).send("Access denied, you are not logged in.");
  }
};

// List all existing notes
router.get("/notes", (req, res, next) => {
  const { db } = req.app.locals;
  db.all(
    `
	SELECT 
		notes.id, 
		notes.title, 
		notes.body, 
		notes.created, 
		notes.userid,
		users.username
	FROM 
		notes
	INNER JOIN users ON notes.userid = users.id;
	`,
    [],
    (err, rows) => {
      if (err) return console.error(err);
      res.json(rows);
    }
  );
});

// List all notes from a user
router.get("/:username/notes", requireLogin, (req, res, next) => {
  const { db } = req.app.locals;
  const { username } = req.params;
  if (req.username !== username) {
    res.status(403).send(`Access denied, you are not logged in to user ${username}.`);
  }
  db.all(
    `
	SELECT 
		notes.id, 
		notes.title, 
		notes.body, 
		notes.created, 
		notes.userid,
		users.username
	FROM 
		notes
	INNER JOIN 
		users ON notes.userid = users.id
	WHERE 
		users.username = ?`,
    [username],
    (err, rows) => {
      if (err) return console.error(err);
      if (rows) {
        res.json(rows);
      } else res.json([]);
    }
  );
});

// create a note
router.post("/notes", requireLogin, (req, res, next) => {
  const { db } = req.app.locals;
  const { title, body } = req.body;

  db.run(
    `
	INSERT INTO 
		notes (
			title, 
			body, 
			userid
		) 
	SELECT
		$title,
		$body,
		users.id
	FROM
		users
	WHERE
		users.username = $username
	`,
    { $title: title, $body: body, $username: req.username },
    function (err) {
      if (err) return console.error(err);
        res.status(201).json({ id: this.lastID });
    }
  );
});

// get a single note
router.get("/notes/:id", requireLogin, (req, res, next) => {
    const { db } = req.app.locals;
    const { id } = req.params;
    db.get(
        `
	SELECT 
		notes.id, 
		notes.title, 
		notes.body, 
		notes.created, 
		notes.userid,
		users.username
	FROM 
		notes
	JOIN 
		users ON notes.userid = users.id
	WHERE 
		notes.id = ?
	`,
        [id],
        function (err, row) {
            if (err) return console.error(err);
            res.json(row);
        }
    );
});

// delete a note
router.delete("/notes/:id", requireLogin, (req, res, next) => {
  const { db } = req.app.locals;
  const { id } = req.params;
  db.get(
    `
	SELECT 
		username
	FROM
		users 
	WHERE id IN
		(SELECT 
			userid
		FROM
			notes
		WHERE 
			id = ?);
	`,
    [id],
    function (err, row) {
      if (err) return res.json({ msg: err });
      if (!row) {
          return res.status(404).json({ msg: "Couldn't find that note." })};
      if (row.username !== req.username) {
          return res.status(403).json({
          msg: "You can't delete a note that you didn't post!",
        });
      }
      db.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
        if (err) return res.json({ msg: err });
        res.json({ msg: "success!" });
      });
    }
  );
});

// modify a note
router.put("/notes/:id", requireLogin, (req, res, next) => {
  console.log("putting");
  const { db } = req.app.locals;
  const { id } = req.params;
  const { title, body } = req.body;
  db.get(
    `
	SELECT 
		username
	FROM
		users 
	WHERE id IN
		(SELECT 
			userid
		FROM
			notes
		WHERE 
			id = ?);
	`,
    [id],
    function (err, row) {
      if (err) return res.json({ msg: err });
      if (!row) {
          res.status(404);
          return res.json({ msg: "Couldn't find that note." })};
      if (row.username !== req.username) {
          res.status(403);
        return res.json({ msg: "You can't edit a note that you didn't post!" });
      }
      //FIXME: you can selectively update the fields that are non-empty strings instead of comparing to the previous note
      //	Also id is automatic don't manually mess with it.
      db.run(
        `UPDATE notes SET title = ?, body = ? WHERE id = ?`,
        [title, body, id],
        (err) => {
          if (err) return res.json({ msg: err });
          res.json({
            msg: `Updated note ${id} with title "${title}" and body "${body}".`,
          });
        }
      );
    }
  );
});

// login
router.post("/login", (req, res, next) => {
  const { db } = req.app.locals;
  const { username, password } = req.body;
  if (!username || !password) {
      res.status(400);
    return res.json({ msg: "Please enter a username & password." });
  }
  db.get(
    `SELECT password FROM users WHERE username = ?`,
    [username],
    (err, row) => {
      if (err) return res.json({ msg: err });
      if (!row) {
          res.status(404);
          return res.json({ msg: "That user doesn't exist!" })};
      if (bcrypt.compareSync(password, String(row.password))) {
        res.cookie("username", username, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: false,
          sameSite: "none",
          secure :true,
        });

        res.json({ msg: "Your login was successful." });
      } else {
        res.status(401).json({ msg: "Incorrect password." });
      }
    }
  );
});

module.exports = router;
