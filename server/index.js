const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const mongoDb = require('./mongodb-connection');

mongoDb.connectToServer(function (err) {
  //App goes online once this callback occurs
  //Main Routes
  const productsRouter = require('./routes/sortedProducts');
  const categoriesRouter = require('./routes/categories');
  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  //Handle 404
  app.use(function (req, res, next) {
  next(createError(404));
  });
  //Handle 500
  app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send('Error')
  });
  })

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

/*
app.get("/products", (req, res) => {
  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("aliexpress-clone");
    dbo
      .collection("products")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        result.sort(
          (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
        );
        res.send(result);
        db.close();
      });
  });
});

app.get("/categories", (req, res) => {
  var MongoClient = require("mongodb").MongoClient;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("aliexpress-clone");
    dbo.collection("products").distinct("category", {}, function(err, result) {
      if (err) throw err;
      res.send(result);
      db.close();
    });
})});*/

app.listen(3001, () => {
  console.log("listening on port 3001");
});
