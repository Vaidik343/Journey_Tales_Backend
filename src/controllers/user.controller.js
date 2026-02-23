const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokens');

console.log({
  generateAccessToken: typeof generateAccessToken,
  generateRefreshToken: typeof generateRefreshToken,
}); 

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    try {

        const exists = await User.findOne({email});
        if(exists)
        {
            return res.status(400).json({message: "Email already exists"})
        }

        const user = await User.create({
            name, email, password:hashedPassword,
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
const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

//password hash
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

const login = async (req, res, next) => {
    const {email, password} = req.body;

  try {
      const user = await User.findOne({email})

    if(!user)
    {
        return res.status(401).json({message: "email not exists!"});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  console.log("🚀 ~ login ~ accessToken:", accessToken)
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error)
  }
}


const logout = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(400).json({ message: "No refresh token found" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("refreshToken").json({ message: "Logged out successfully" });
  } catch (err) {
    res.clearCookie("refreshToken").json({ message: "Logged out" });
  }
};


const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};
module.exports.userController = {getAllUser,getUserById,refreshToken, createUser,login,logout, updateUser, deleteUser}