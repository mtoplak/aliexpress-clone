const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const bcrypt = require("bcrypt");

router.post("/", function (req, res) {
  db.collection("users").findOne(
    { email: req.body.email },
    async function (err, user) {
      if (err) throw err;
      if (user != null) {
        return res.status(400).send({ msg: "This email already exists." });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        db.collection("users").insertOne(
          {
            email: req.body.email,
            name: req.body.name,
            password: hashedPass,
            dateJoined: Date(),
          },
          function (err, user) {
            if (err) throw err;
            console.log("new user!", user);
            return res.status(200).send({
              message: "Register Successful",
            });
          }
        );
        
      }
    }
  );
});

module.exports = router;
