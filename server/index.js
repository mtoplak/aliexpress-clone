const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/products", (req, res) => {
  var MongoClient = require("mongodb").MongoClient;
  // Put this into constant end export it into config.js
  var url = "mongodb://0.0.0.0:27017/";

  // Decouple this endpoint from database layer
  // Put mongodb connection into different module and import that module here, just to initialise the mongodb
  // Create different folder with routers and this kind of logic in db layer and then export router and initialise routers with express app in this file
  // e.g.
  // Routers/Products.js <-- This file then calls Db/Products.js which exports function getAllProducts
  // Try using async await instead of chaining with callbacks
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("aliexpress-clone");
    dbo
      .collection("products")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
