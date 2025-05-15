const { prisma } = require("../prisma");

const createCart = async(req,res)=>{
    try{
        const userId = req.user.id;
        const { productId, sizeId, quantity} = req.body
        if(!productId || !sizeId || !quantity){
            return res.status(404).json({success:false, message:"invalid cart/missing required fields"});
        }
        const cartEntry = await prisma.cart.create({
            data: {
                userId,
                productId,
                sizeId,
                quantity,
            },
        });
        return res.status(200).json({success: true, message:`added to cart successfully:- ${cartEntry}`});
    }
    catch(error){
        return res.status(401).json({success:false ,message:`internal server error : ${error.message}`});
    }
}
const getUserCart = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const cartItems = await prisma.cart.findMany({
        where: { userId },
        include: {
          product: true, // to also fetch product info (optional but useful)
          size: true     // fetch size info
        }
      });
  
      return res.status(200).json({ success: true, cartItems });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
  };
  const updateCartQuantity = async (req, res) => {
    try {
      const cartId = Number(req.params.id);
      const quantity = Number(req.body.quantity);
  
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ success: false, message: "Invalid quantity" });
      }
  
      const updatedCart = await prisma.cart.update({
        where: { id: cartId },
        data: { quantity },
      });
  
      return res.status(200).json({ success: true, message: "Cart quantity updated", updatedCart });
    } catch (error) {
      console.error('Error updating cart:', error);
      return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
  };
  const deleteCartItem = async (req, res) => {
    try {
      const cartId = Number(req.params.id);
  
      await prisma.cart.delete({
        where: { id: cartId },
      });
  
      return res.status(200).json({ success: true, message: "Cart item deleted" });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
  };
  
    module.exports = {
        createCart,
        updateCartQuantity,
        getUserCart,
        deleteCartItem
    }