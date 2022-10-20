const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).json({
        status: "Fail",
        error: "You are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    // const user = await User.findOne({email: decoded.email})

    req.user = decoded /* user */;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      error: "Invalid token",
    });
  }
};
