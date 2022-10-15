const mongoDb = require("./mongodb-connection");
const db = mongoDb.getDb();

const getProduct = async function (product) {
  const result = await db.collection("products").findOne({ productName: product });
  console.log(result);
  return result;
};

const function2 = async function (){
    //...
}


module.exports = { getProduct, function2 };