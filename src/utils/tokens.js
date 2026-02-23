const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
      algorithm: "HS256",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
      algorithm: "HS256",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
