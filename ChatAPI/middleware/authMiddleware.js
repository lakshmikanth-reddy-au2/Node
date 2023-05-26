const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const jwt = require('jsonwebtoken');

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
        console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");

      console.log(req.user);
      next();
    }
  } catch {
    res.status(401);
    throw new Error("Not authorised, token failed");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

module.exports = protect;
