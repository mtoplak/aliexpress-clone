const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();

router.get("/", function (req, res) {
  db.collection("products")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      results.sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
      );
      res.send(results);
    });
});

module.exports = router;
