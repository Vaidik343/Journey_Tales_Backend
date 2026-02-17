const {User} = require('../models');

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    try {

        const exists = await User.findOne({email});
        if(exists)
        {
            return res.status(400).json({message: "Email already exists"})
        }

        const user = await User.create({
            name, email, password
        })

        res.status(201).json(user);
        
    } catch (error) {
        next(error)
    }

}

const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

        res.status(200).json(users);
    } catch (error) {
        next(error)   
    }

}

const updateUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const {name, email, password} = req.body
        const user = await User.findByIdAndUpdate(
            userId,
                {name,email, password},
            {new: true}
        )
        res.status(200).json({message: "update successfully", user})
    } catch (error) {
        next(error)  
    }

}
const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {

        const user = await User.findByIdAndDelete(
            userId
        )
         res.status(200).json({message: "delete successfully", user})
    } catch (error) {
        next(error)  
    }

}

module.exports.userController = {getAllUser, createUser, updateUser, deleteUser}