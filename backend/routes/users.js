const express = require("express");
const router = express.Router();

const db = require("../../db/index");

router.get("/", (req, res) => {
    db.query("SELECT * FROM USERS LIMIT 5")
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log("There is an err: ", err);
        })
});

module.exports = router;