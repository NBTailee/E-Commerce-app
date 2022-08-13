const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const authController = async (req, res) => {
  const { username, password, email } = req.body;
  const newUser = User({
    username: username,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    email: email,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const loginController = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const decodePassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);
      if (password === decodePassword) {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "2d" }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });
      } else {
        res.status(401).json("Wrong credentials !!!");
      }
    } else {
      res.status(401).json("Wrong credentials !!!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { authController, loginController };
