const CONNECTION_URL = require("./config").url;

const DATABASE_NAME = require("./config").name;

const MongoClient = require("mongodb").MongoClient;

let _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(CONNECTION_URL, function (err, client) {
      _db = client.db(DATABASE_NAME);
      console.log("Connected to database: " + DATABASE_NAME);
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
