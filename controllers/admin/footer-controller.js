const AdminInfo = require("../../models/AdminInfo");
const Message = require("../../models/Message");
const SocialLink = require("../../models/SocialLink");

const addAddress = async (req, res) => {
  try {
    const { address, city, state, country, pincode, phone } = req.body;

    let adminInfo = await AdminInfo.findOne();

    if (adminInfo) {
      adminInfo.address = address || adminInfo.address;
      adminInfo.city = city || adminInfo.city;
      adminInfo.state = state || adminInfo.state;
      adminInfo.country = country || adminInfo.country;
      adminInfo.pincode = pincode || adminInfo.pincode;
      adminInfo.phone = phone || adminInfo.phone;

      await adminInfo.save();
    } else {
      adminInfo = await AdminInfo.create({
        address,
        city,
        state,
        country,
        pincode,
        phone,
      });
    }

    res.status(200).json({
      success: true,
      message: "Footer info updated successfully",
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

const getAdminInfo = async (req, res) => {
  try {
    const adminInfo = await AdminInfo.findOne();
    if (!adminInfo) {
      return res.status(404).json({
        success: false,
        message: "Admin info not found",
      });
    }
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

const addSocialMediaLinks = async (req, res) => {
  try {
    const { whatsapp, instagram, facebook, xtwitter } = req.body;

    let mediaLinks = await SocialLink.findOne();

    if (mediaLinks) {
      mediaLinks.whatsapp = whatsapp || mediaLinks.whatsapp;
      mediaLinks.instagram = instagram || mediaLinks.instagram;
      mediaLinks.facebook = facebook || mediaLinks.facebook;
      mediaLinks.xtwitter = xtwitter || mediaLinks.xtwitter;

      await mediaLinks.save();
    } else {
      mediaLinks = await SocialLink.create({
        whatsapp,
        instagram,
        facebook,
        xtwitter,
      });
    }

    res.status(200).json({
      success: true,
      message: "Social media links updated!!",
      data: mediaLinks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getMediaLinks = async (req, res) => {
  try {
    const mediaLinks = await SocialLink.findOne();
    if (!mediaLinks) {
      return res.status(404).json({
        success: false,
        message: "Social media links not found",
      });
    }
    res.status(200).json({
      success: true,
      data: mediaLinks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const fetchAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ created_at: -1 });
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);

    if (!message)
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  addAddress,
  getAdminInfo,
  addSocialMediaLinks,
  getMediaLinks,
  fetchAllMessages,
  deleteMessage,
};
