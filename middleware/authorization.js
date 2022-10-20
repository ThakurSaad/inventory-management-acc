module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "Fail",
        error: "You are not unauthorized to access this",
      });
    }

    next();
  };
};
