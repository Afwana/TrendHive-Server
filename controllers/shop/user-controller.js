const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const updateUserProfile = async (req, res) => {
  const { selectId, userName, phoneNumber } = req.body;

  const userId = selectId;

  try {
    const clientUser = await User.findById(userId);
    if (!clientUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    if (userName) clientUser.userName = userName;
    if (phoneNumber) clientUser.phoneNumber = phoneNumber;

    await clientUser.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: {
        userName: clientUser.userName,
        phoneNumber: clientUser.phoneNumber,
        id: clientUser._id,
        role: clientUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const updateUserPassword = async (req, res) => {
  const { selectId, currentPassword, newPassword } = req.body;
  const userId = selectId;

  try {
    const clientUser = await User.findById(userId);

    if (!clientUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both current and new passwords are required",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      clientUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect!",
      });
    }

    clientUser.password = await bcrypt.hash(newPassword, 12);
    await clientUser.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { updateUserProfile, updateUserPassword };
