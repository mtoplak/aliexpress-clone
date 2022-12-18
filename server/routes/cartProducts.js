const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const ObjectId = require("mongodb").ObjectId;

router.post("/", async function (req, res) {
  console.log("----");

  let ids = req.body.ids;
  console.log(ids);
  let myQuantities = [];
  for (let i = 0; i < ids.length; i++) {
    myQuantities.push(ids[i].quantity);
  }

  for (let i = 0; i < ids.length; i++) {
    ids[i] = ObjectId(ids[i].product);
  }

  console.log(ids);
  db.collection("products")
    .find({ _id: { $in: ids } })
    .toArray(function (err, result) {
      if (err) throw err;
      console.log("result: ");
      //console.log(result);
      result.forEach((element, index) => {
        element.price = element.price.toString();
        element.price = element.price.replace(".", ",");
        if (element.price.split(",")[1].length === 1) {
          element.price = element.price + "0";
        }
      });
      console.log(result);
      res.send({ products: result, myQuantities: myQuantities });
    });
});

module.exports = router;
