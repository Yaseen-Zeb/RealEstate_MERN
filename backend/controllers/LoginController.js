const User = require('../models/UserModel.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = 'skey';

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const Is_Email_Ok = await User.findOne({ email });
    let user 
    if (Is_Email_Ok) {
        user = Is_Email_Ok.toObject();
    }else{
        user = Is_Email_Ok
    }

    let Is_Password_Ok;
    if (!user) {
        res.send({ "result": "fail", "message": "Incorrect Credentials!" })
    } else {
        Is_Password_Ok = await bcrypt.compare(password, user.password);
        if (!Is_Password_Ok) {
            res.send({ "result": "fail", "message": "Incorrect Credentials!" })
        } else {
            const generateToken = (user) => {
                const expiresIn = '1h';
                const token = jwt.sign(user, secretKey, { expiresIn });
                return token;
            };
            delete user.password
            res.send({
                "result": "success", "message": 'Loged successfully',
                "data": user,
                "token": generateToken(user)
            })
        }
    }
};

