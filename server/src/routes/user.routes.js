const express = require("express");
const User = require("../models/User");

const user = express.Router();

user.get("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const doc = await User.findOne({ username: username });
    res.json(doc);
  } catch (err) {
    console.log(err);
    res.json({ message: "Someting went wrong", ...err });
  }
});

user.post("/create-user", async (req, res) => {
  try {
    const user = new User();
    user.username = req.body.username;
    user.name = req.body.name;

    const doc = await User.findOne({ username: user.username });
    if (doc) {
      res.json({ error: "Username already exists" });
    } else {
      const doc = await user.save();
      res.json({ message: "New User Created", ...doc._doc });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "Someting went wrong", ...err });
  }
});

module.exports = user;
