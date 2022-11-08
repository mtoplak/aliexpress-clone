const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const ObjectId = require("mongodb").ObjectId;

router.post("/", async function (req, res) {
  //console.log(req.body);
  let userToUpdate = req.body.email;
  let query = { wishlistItems: ObjectId(req.body.product) };

  switch (req.body.action) {
    case "remove":
      var result = await db
        .collection("users")
        .updateOne({ email: userToUpdate }, { $pull: query });
      //console.log(result);
      console.log("removed");
      res.sendStatus(200);
      break;
    case "add":
      var result = await db
        .collection("users")
        .updateOne({ email: userToUpdate }, { $addToSet: query });
      //console.log(result);
      console.log("added");
      res.sendStatus(200);
      break;
    case "getAll":
      console.log(req.body);
      let allProducts = await db
        .collection("users")
        .findOne(
          { email: userToUpdate },
          { projection: { _id: 0, wishlistItems: 1 } }
        );
      console.log(allProducts);
      res.send(allProducts);
      break;
  }
});

module.exports = router;
