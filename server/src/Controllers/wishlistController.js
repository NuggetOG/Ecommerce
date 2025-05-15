const { prisma } = require("../prisma");

// ✅ Create/Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    // Check if already exists (optional, to prevent duplicates)
    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId },
    });
    if (existing) {
      return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }

    const wishlistEntry = await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return res.status(200).json({ success: true, message: "Added to wishlist", wishlistEntry });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};

// ✅ Get User's Wishlist
const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true, // To get product details
      },
    });

    return res.status(200).json({ success: true, wishlistItems });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};

// ✅ Delete from Wishlist
const deleteWishlistItem = async (req, res) => {
  try {
    const wishlistId = Number(req.params.id);

    await prisma.wishlist.delete({
      where: { id: wishlistId },
    });

    return res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  addToWishlist,
  getUserWishlist,
  deleteWishlistItem,
};
