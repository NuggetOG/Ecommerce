const {prisma} = require("../prisma");
const getUserInfo = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        Cart: true,
        Wishlist: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User info fetched successfully",
      data: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success :true,user});
  }
};
const updateUserById = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { firstName, lastName, email },
    });

    return res.status(200).json({
      message: "User updated successfully",
      data: {
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success :true,user});
  }
};
module.exports = {getUserInfo,updateUserById};