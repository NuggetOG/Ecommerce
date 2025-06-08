const { prisma } = require("../prisma");
const { sendOrderConfirmationEmail } = require("../Utils/emailConfirmation");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch cart items from DB for this user
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
        size: true,
      },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty" });
    }

    // Compute total amount
    const totalAmount = cartItems.reduce((total, item) => {
      const price = item.product.price || 0;
      return total + price * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid total amount" });
    }

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        totalPrice: totalAmount,
        status: 'PENDING',
    },
    });

    // Create order items based on the cart items
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        return await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            sizeId: item.sizeId,
            quantity: item.quantity,
          },
        });
      })
    );

    // Optionally, clear the user's cart after order is placed
    await prisma.cart.deleteMany({ where: { userId } });

    return res.status(200).json({ success: true, order, orderItems });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};


const getUserOrders = async(req,res)=>{
    try {
        const userId = req.user.id;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true, // Include product details
                        size: true     // Include size details
                    }
                }
            }
        });
        return res.status(200).json({ success: true, orders});
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}

const getOrderById = async(req,res)=>{
    try{
        const userId = req.user.id;
        const orderId = Number(req.params.id);
        if(orderId <=0 || isNaN(orderId)){
            return res.status(400).json({success:false, message:"Invalid order ID"});
        }
        const order = await prisma.order.findUnique({
            where: { id: orderId, userId },
            include: {
                Items: {
                    include: {
                        product: true, // Include product details
                        size: true     // Include size details
                    }
                }
            }
        });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.status(200).json({ success: true, order });
    }
    catch(error){
        console.error('Error fetching order by ID:', error);
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}

const approveOrder = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    if (orderId <= 0 || isNaN(orderId)) {
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }
    // Check if the order is already approved
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (existingOrder.status === "APPROVED") {
      return res.status(400).json({ success: false, message: "Order is already approved" });
    }

    // Update the order status to APPROVED
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: "APPROVED" },
    });

    // Send confirmation email to user
    const user = await prisma.user.findUnique({ where: { id: order.userId } });
    if (user && user.email) {
      await sendOrderConfirmationEmail(user.email, order);
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error approving order:", error);
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};

const pendingOrder = async(req,res)=>{
    try {
        const orderId = Number(req.params.OrderId);
        if (orderId <= 0 || isNaN(orderId)) {
            return res.status(400).json({ success: false, message: "Invalid order ID" });
        }
        const order = await prisma.order.findMany({
            where: { status: 'PENDING' },
            include: {
                orderItems: {
                    include: {
                        product: true, // Include product details
                        size: true     // Include size details
                    }
                }
            }
        });
        return res.status(200).json({ success: true, order });
    }catch (error) {
        console.error('Error updating order status to pending:', error);
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
}
const deleteOrder = async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    console.log("Order ID received:", orderId); // Debugging

    if (!orderId || isNaN(orderId) || orderId <= 0) {
      console.log("Invalid order ID"); // Debugging
      return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    // Check if the order exists
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    console.log("Order fetched from DB:", order); // Debugging

    if (!order) {
      console.log("Order not found"); // Debugging
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Delete the order
    const deletedOrderItems = await prisma.orderItem.deleteMany({
      where: { orderId },
    });
    console.log("Order items deleted successfully:", deletedOrderItems); // Debugging
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });
    console.log("Order deleted successfully:", deletedOrder); // Debugging

    return res.status(200).json({ success: true, message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error); // Debugging
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};
// ✅ Exporting the functions

module.exports = {
    approveOrder,
    createOrder,
    getUserOrders,
    getOrderById,
    pendingOrder,
    deleteOrder
};

