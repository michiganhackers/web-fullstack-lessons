var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');

const requireLogin = (req, res, next) => {
	if (req.cookies.username) {
		req.username = req.cookies.username;
		next();
	}
	else {
		res.status(403);
		res.send("Access denied, you are not logged in.");
	}
}

// List existing notes
router.get("/notes", (req, res, next) => {
	const { db } = req.app.locals;
	db.all(`SELECT id, title, body, created, userid FROM notes`, [], (err, rows) => {
		if (err) return console.error(err);
		res.render("notes", { notes: rows });
	})
});

router.get("/:id/notes", requireLogin, (req, res, next) => {
	const { db } = req.app.locals;
	const { id } = req.params;
	db.all(`SELECT id, title, body, created, userid FROM notes WHERE userid = ?`, [id], (err, rows) => {
		if (err) return console.error(err);
		if (rows) {
			res.render("notes", { notes: rows });
		}
		else
			res.render("notes", { notes: [] });
	})
})

router.post("/notes", (req, res, next) => {
	const { db } = req.app.locals;
	const { title, body } = req.body;
	db.run(`INSERT INTO notes(title, body, userid) VALUES (?, ?, ?)`, [title, body, 0], function (err) {
		if (err) return console.error(err);
		res.json({id: this.lastID});
	})
})

router.delete("/notes/:id", (req, res, next) => {
	const { db } = req.app.locals;
	const { id } = req.params;
	db.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
		if (err) return res.json({msg: err});
		res.json({msg: 'success!'});
	})
})

router.put("/notes/:id", (req, res, next) => {
	const { db } = req.app.locals;
	const { id } = req.params;
	const { title, body } = req.body;
	db.run(`UPDATE notes SET title = ?, body = ? WHERE id = ?`, [title, body, id], (err) => {
		if (err) return res.json({msg: err});
		res.json({msg: `Updated note ${id} with title "${title}" and body "${body}".`})
	})
})

router.post("/login", (req, res, next) => {
	const { db } = req.app.locals;
	const { username, password } = req.body;
	if (!username || !password) return res.json({msg: "Please enter a username & password."})
	db.get(`SELECT password FROM users WHERE username = ?`, [username], (err, row) => {
		if (err) return res.json({msg: err});
		if (!row) return res.json({msg: "That user doesn't exist!"});
		if (bcrypt.compareSync(password, String(row.password))) {
			res.cookie("username", username, { 
				maxAge: 7*24*60*60*1000, 
				httpOnly: false
			});
			res.json({msg: "Your login was successful."});
		}
		else {
			res.json({msg: "Incorrect password."});
		}
	})
})

module.exports = router;