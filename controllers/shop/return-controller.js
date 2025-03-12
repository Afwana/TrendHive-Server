const Order = require("../../models/Order");
const Return = require("../../models/Return");

const returnOrder = async (req, res) => {
  try {
    const { orderId, reason } = req.body;

    if (!orderId || !reason) {
      return res
        .status(400)
        .json({ message: "Order ID and reason are required." });
    }

    const existingReturn = await Return.findOne({ orderId });

    if (existingReturn) {
      return res.status(400).json({
        message: "A return request for this order already exists.",
      });
    }

    const newReturn = new Return({
      orderId,
      reason,
      status: "Pending", // Default status
      createdAt: new Date(),
    });

    await newReturn.save();

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: "Returned" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Send return request details to WhatsApp
    const returnDetails = formatReturnOrderForWhatsApp(newReturn);
    const whatsappLink = generateWhatsAppLink(returnDetails);

    res.status(200).json({
      success: true,
      whatsappLink,
      data: newReturn,
      message:
        "Return request submitted successfully, and order status updated.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const generateWhatsAppLink = (message) => {
  const phoneNumber = "916238933760";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

const formatReturnOrderForWhatsApp = (order) => {
  return `*Return Request for Order #${order.orderId}*

*Order Details:*
Order ID: ${order.orderId}
Return Reason: ${order.reason}
Return Request Date: ${order.createdAt.toLocaleDateString()}

Thank you for your request. We will process it shortly.`;
};

module.exports = {
  returnOrder,
};
