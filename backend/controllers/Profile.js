const jwt = require('jsonwebtoken');
let UserModel = require("../models/UserModel")

module.exports = async (req,res) =>{
    let profileData = await UserModel.findOne({ email: req.params.id }) 
    res.json("hello");  
}