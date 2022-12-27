const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const ObjectId = require("mongodb").ObjectId;

router.post("/", async function (req, res) {
  //console.log(req.body);
  let userToUpdate = req.body.email;
  let check = {
    product: ObjectId(req.body.product),
    //quantity: {$in: [0, 1000]}
  };
  let check2 = {
    product: ObjectId(req.body.product),
    quantity: req.body.quantity,
  };

  const productId = req.body.product;
  const productQuantity = req.body.quantity;

  let query;
  console.log(req.body);

  switch (req.body.action) {
    case "remove":
      query = { cart: { product: ObjectId(req.body.product) } };
      var result = await db
        .collection("users")
        .updateOne({ email: userToUpdate }, { $pull: query });
      //console.log(result);
      console.log("removed");
      res.sendStatus(200);
      break;
    case "addOrUpdate":
      // check if the product is in the cart (any quantity)
      const count = await db.collection("users").countDocuments({
        email: userToUpdate,
        "cart.product": { $in: [ObjectId(productId)] },
      });
      query = {
        cart: {
          product: ObjectId(req.body.product),
          quantity: req.body.quantity,
        },
      };
      console.log("count: ");
      console.log(count);
      if (count == 0) {
        console.log("ni ga v bazi");
        var result = await db
          .collection("users")
          .updateOne({ email: userToUpdate }, { $addToSet: query });
        console.log(result);
        console.log("added to cart");
      } else {
        console.log("is already in cart");
        // check if the quantity is the same
        const count2 = await db.collection("users").countDocuments({
          email: userToUpdate,
          "cart.quantity": req.body.quantity, // { $in: [productQuantity] }
        });
        console.log(".........");
        console.log(count2);
        if (count2 == 0) {
          console.log("update quantity");
          const cart = await db
            .collection("users")
            .findOne(
              { email: userToUpdate },
              { projection: { email: 1, cart: 1, _id: 0 } }
            );
          console.log("user's cart: ");
          console.log(cart.cart);
          let indexInDb;
          cart.cart.forEach((element, index) => {
            if (element.product.toString() == productId) {
              console.log("index je " + index);
              indexInDb = index;
            }
          });
          console.log(indexInDb);
          let result = await db
            .collection("users")
            .updateOne(
              { email: userToUpdate },
              { $set: { [`cart.${indexInDb}.quantity`]: productQuantity } }
            );
          console.log(result);
        } else {
          console.log("quantity is the same");
          // has the same quantity
        }
      }
      res.sendStatus(200);
      break;

    case "getAll":
      console.log(req.body);
      let allProducts = await db
        .collection("users")
        .findOne({ email: userToUpdate }, { projection: { _id: 0, cart: 1 } });
      allProducts.cart.sort((a, b) =>
        a.product > b.product ? 1 : b.product > a.product ? -1 : 0
      );
      console.log(allProducts);
      res.send(allProducts);
      break;
  }
});

module.exports = router;
