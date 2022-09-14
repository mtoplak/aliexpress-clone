const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();

router.get("/:category", async function (req, res) {
    db.collection("products").distinct("subcategory", {"category": req.params.category}, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
