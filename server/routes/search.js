const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();

router.get("/:slug", async function (req, res) {
  var re = new RegExp(req.params.slug, 'i');

  const result = await db
    .collection("products")
    .find({
      $or: [
        { productName: re },
        { category: re },
        { subcategory: re },
      ],
    })
    .toArray();
  res.send(result);
});

module.exports = router;
