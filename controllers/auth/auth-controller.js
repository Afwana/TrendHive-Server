const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
  const { userName, phoneNumber, password } = req.body;

  try {
    const checkUser = await User.findOne({ phoneNumber });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "User Already exists with the same phone number! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      phoneNumber,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: `Some error occured,${e}`,
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const checkUser = await User.findOne({ phoneNumber });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        phoneNumber: checkUser.phoneNumber,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: checkUser._id,
        phoneNumber: checkUser.phoneNumber,
        role: checkUser.role,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const cookieToken = req.cookies.token;

  const headerToken = req.headers.authorization?.split(" ")[1];

  const token = cookieToken || headerToken;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user! No token provided",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  const { phoneNumber, newPassword } = req.body;

  try {
    if (!phoneNumber || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Phone number and new password are required",
      });
    }

    // Find user by phone number
    const clientUser = await User.findOne({ phoneNumber });
    if (!clientUser) {
      return res.status(404).json({
        success: false,
        message: "User with this phone number not found",
      });
    }

    // Update the password
    clientUser.password = await bcrypt.hash(newPassword, 12);
    await clientUser.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred during password reset",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  resetPassword,
};
