const User = require("../models/User");

exports.createUser = async(req,res) => {
    try {
        const {name,email} = req.body;

        if(!name || !email){
            return res.status(400).json({message: "All fields required"});
        }

        const user = await User.create({name,email});
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error creating user", error: err.message});
    }
};

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error fetching users", error: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if(!name || !email){
            return res.status(400).json({message: "All fields required"});
        }

        const user = await User.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true, runValidators: true }
        );
        
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id); 
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json({ message: "user deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};
