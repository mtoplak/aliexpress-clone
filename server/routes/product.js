const getProduct = require("../db-calls").getProduct;
const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();

router.get("/:slug", async function (req, res) {
  const result = await getProduct(req.params.slug);
  res.send(result);
  /*
  const result = await db.collection("products").findOne({productName: req.params.slug});
  res.send(result);*/
});

module.exports = router;
