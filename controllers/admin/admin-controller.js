const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const updateAdminProfile = async (req, res) => {
  const { selectId, userName, phoneNumber } = req.body;

  const adminId = selectId;

  try {
    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!!",
      });
    }

    if (userName) adminUser.userName = userName;
    if (phoneNumber) adminUser.phoneNumber = phoneNumber;

    await adminUser.save();

    res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      user: {
        userName: adminUser.userName,
        phoneNumber: adminUser.phoneNumber,
        id: adminUser._id,
        role: adminUser.role,
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

const updateAdminPassword = async (req, res) => {
  const { selectId, currentPassword, newPassword } = req.body;
  const adminId = selectId;

  try {
    const adminUser = await User.findById(adminId);

    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!!",
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
      adminUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect!",
      });
    }

    adminUser.password = await bcrypt.hash(newPassword, 12);
    await adminUser.save();

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

module.exports = { updateAdminProfile, updateAdminPassword };
