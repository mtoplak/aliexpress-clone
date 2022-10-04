const express = require("express");
const router = express.Router();
const mongoDb = require("../mongodb-connection");
const db = mongoDb.getDb();
const bcrypt = require("bcrypt");
//const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/", async function (req, res) {
  db.collection("users").findOne(
    { email: req.body.email },
    async function (err, user) {
      if (err) throw err;
      console.log(user);
      if (user == null) {
        console.log("wrong email");
        //wrong email
        return res
          .status(400)
          .send({ msg: "Your account name or password is incorrect." });
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (validPassword == true) {
          //ok
          console.log("vse kul");
          /*const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
          );*/
          console.log(token);
          return res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        } else {
          console.log("wrong password");
          //wrong password
          return res
            .status(400)
            .send({ msg: "Your account name or password is incorrect." });
        }
      }
    }
  );
});

module.exports = router;
