const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount, cartId } = req.body;
    console.log(req.body);

    for (let item of cartItems) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.title} not found`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${item.title}. Available: ${product.totalStock}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "Pending",
      paymentMethod: "Cash On Delivery",
      paymentStatus: "Pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    await newOrder.save();

    const orderDetails = formatOrderForWhatsApp(newOrder, addressInfo);

    const whatsappLink = generateWhatsAppLink(orderDetails);

    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }

    res.status(201).json({
      success: true,
      whatsappLink,
      orderId: newOrder._id,
      message: "Order created successfully. Share via WhatsApp to confirm.",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const formatOrderForWhatsApp = (order, addressInfo) => {
  const itemsList = order.cartItems
    .map(
      (item) =>
        `• ${item.title} 
Quantity : ${item.quantity} 
Price : INR ${item.price}
Total : INR ${(item.price * item.quantity).toFixed(2)}
${item.thumbnail}`
    )
    .join("\n\n");

  // Format the complete message
  return `
*New Order #${order._id}*

*Order Items*

${itemsList}

*Total Amount:* INR ${order.totalAmount.toFixed(2)}

*Delivery Address*
${addressInfo.name}
${addressInfo.address},
${addressInfo.city}, ${addressInfo.state},
${addressInfo.country}
${addressInfo.pincode}
${addressInfo.phone}
Note : ${addressInfo.notes}

*Order Date:* ${order.orderDate.toLocaleDateString()}

Thank you for your order! We'll contact you shortly to confirm.
`;
};

const generateWhatsAppLink = (message) => {
  const phoneNumber = "916238933760";

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    order.orderStatus = "confirmed";
    order.orderUpdateDate = new Date();

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.title} not found`,
        });
      }

      if (product.totalStock < item.quantity) {
        return res.status(400).josn({
          success: false,
          message: `Not enough stock for ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  confirmOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
