let UserModel = require("../models/UserModel.js")
// let bycrypt = 
module.exports = async (req, res) => {
    let is_email_exist = await UserModel.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id }
      });
    if (!is_email_exist) {
        let user = await UserModel.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    email: req.body.password,
                }
            }, { new: true })
    
        console.log(user);
        res.send({
            "result": "success",
            "message": 'Profile updated successfully.',
            "data": {
                "name": user.name,
                "email": user.email
            }
        })
    }else{
        res.send({
            "result": "fail",
            "message": 'User of this email already exist'
        })
    }
    
}