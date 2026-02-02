const User = require("../models/User");

exports.createUser = async(req,res) => {
    const {name,email} = req.body;


    if(!name || !email){
        return res.status(400).json({message: "All fields required"});

    }

    const user = await User.create({name,email});
    res.status(201).json(user);
};

exports.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
}