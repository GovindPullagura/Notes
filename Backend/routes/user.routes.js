const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// registration:
userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  try {
    // number-5 denotes the salt-rounds
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration is successful" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.send({
            msg: "Login Successful",
            token: jwt.sign({ userID: user._id }, "bruce"),
          });
        } else {
          res.status(400).send({ msg: "Incorrct Password" });
        }
      });
    } else {
      res.status(400).send({ msg: "User not found." });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
