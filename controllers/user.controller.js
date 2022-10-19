const { signUpService } = require("../services/user.services");

exports.singUp = async (req, res, next) => {
  try {
    const user = await signUpService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully signed Up",
      user: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Fail",
      error: error.message,
    });
  }
};
