const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const ObjectId = require("mongodb").ObjectId;

router.post("/", async function (req, res) {
  db.collection("users")
    .find({
      $and: [
        { email: req.body.user.email },
        { wishlistItems: ObjectId(req.body.product) },
      ],
    })
    .project({ _id: 0, wishlistItems: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length == 0) {
        res.send({ msg: "not found" });
      } else {
        res.send({ msg: "found" });
      }
    });
});

module.exports = router;
