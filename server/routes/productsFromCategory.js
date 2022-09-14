const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();

//products from category OR subcategory

router.get("/:category", async function (req, res) {
    const result = await db.collection("products").find({$or: [{"category": req.params.category}, {"subcategory": req.params.category}]}).toArray();
    res.send(result);
  });
  
  module.exports = router;