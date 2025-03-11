const AdminInfo = require("../../models/AdminInfo");
const Message = require("../../models/Message");

const addMessages = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newMessage = new Message({
      userId,
      message,
    });

    await newMessage.save();
    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAdminInfo = async (req, res) => {
  try {
    const adminInfo = await AdminInfo.findOne();
    res.status(200).json({
      success: true,
      data: adminInfo,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getUserMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const userMessages = await Message.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
    });
    res.status(200).json(userMessages);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  addMessages,
  getAdminInfo,
  getUserMessage,
};
