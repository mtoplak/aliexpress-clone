const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoDb = require("./mongodb-connection");
const { application } = require("express");

mongoDb.connectToServer(function (err) {
  //App goes online once this callback occurs
  //Main Routes
  const productsRouter = require("./routes/sortedProducts");
  const categoriesRouter = require("./routes/categories");
  const productRouter = require("./routes/product");
  const productsFromCategoryRouter = require("./routes/productsFromCategory");
  const subcategoryRouter = require("./routes/subcategories");
  const registerRouter = require("./routes/register");
  const signInRouter = require("./routes/signIn");
  const searchRouter = require("./routes/search");
  const wishlistRouter = require("./routes/wishlist");
  const userRouter = require("./routes/user");
  const wishlistProductsRouter = require("./routes/wishlistProducts");
  const cartRouter = require("./routes/cart");
  const cartProductsRouter = require("./routes/cartProducts");
  app.use("/products", productsRouter);
  app.use("/categories", categoriesRouter);
  app.use("/product", productRouter);
  app.use("/c", productsFromCategoryRouter);
  app.use("/subcategories", subcategoryRouter);
  app.use("/register", registerRouter);
  app.use("/signIn", signInRouter);
  app.use("/search", searchRouter);
  app.use("/wishlist", wishlistRouter);
  app.use("/user", userRouter);
  app.use('/wishlistProducts', wishlistProductsRouter);
  app.use('/cart', cartRouter);
  app.use('/cartProducts', cartProductsRouter);

  //Handle 404
  app.use(function (req, res, next) {
    next(createError(404));
  });
  //Handle 500
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500).send("Error");
  });
});

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
