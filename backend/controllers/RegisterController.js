const User = require('../models/UserModel.js');
const bcrypt = require("bcrypt");
let salt = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'skey';

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.send({ "result": "fail", "message": "Your Entered Email Aleady Exsist!" })
  } else {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        alert(err)
      }
      const newUser = new User({
        name: name,
        email: email,
        password: hash,
      });
      let user = await newUser.save();
      user = user.toObject();


      const generateToken = (user) => {
        const expiresIn = '1h';
        const token = jwt.sign(user, secretKey, { expiresIn });
        return token;
      };
      delete user.password
      res.send({
        "result": "success", "message": 'User added successfully',
        data: {
          ...user
        },
        "token": generateToken(user)
      })
    })

  }
};