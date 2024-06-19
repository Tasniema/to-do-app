const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      "Reem Janina super secret key",
      async (err, decodedToken) => {
        if (err) {
              return res.status(401).json({success: false, error: err});
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            req.user = user;
            next();
          }
          else {
            return res.status(401).json({ success: false, error: 'User not Found!'});
          }
        }
      }
    );
  } else {
    res.status(401).json({ success: false, error: 'Token not Found!'});
  }
};