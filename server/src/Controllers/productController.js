
const { prisma } = require("../prisma");

const createProduct = async (req, res) => {
  try {
    const { productName, price, imgUrl, sizes, category } = req.body;

    // ✅ Validate required fields
    if (!productName || !price || !imgUrl || !sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ success: false, error: "All fields (productName, price, imgUrl, sizes[]) are required." });
    }

    // ✅ Optional: Validate sizes structure
    const validSizes = sizes.every(size => size.sizeName && typeof size.quantity === "number");
    if (!validSizes) {
      return res.status(400).json({ success: false, error: "Each size must have sizeName and quantity (number)." });
    }
    // ✅ Prisma payload
    const data = {
      productName,
      price: parseFloat(price),
      imgUrl,
      sizes: {
        create: sizes.map(size => ({
          sizeName: size.sizeName,
          quantity: size.quantity
        }))
      }
    };

    // ✅ Only include category if your model has it
    if (category) data.category = category;

    // ✅ Create product
    const newProduct = await prisma.product.create({
      data,
      include: {
        sizes: true
      }
    });

    return res.status(201).json({ success: true, product: newProduct });

  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // 🌱 Filter condition
    const whereCondition = category ? { category } : {};

    // 🌐 Get total count (for frontend pagination)
    const totalProducts = await prisma.product.count({ where: whereCondition });

    // 📦 Get paginated products
    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        sizes: true,
      },
      skip: parseInt(skip),
      take: parseInt(limit),
    });
    console.log(`${products.map(product => product.sizes)}`);
    return res.status(200).json({
      success: true,
      products,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
    });

  } catch (error) {
    console.error("Get Products Error:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const bulkCreateProducts = async (req, res) => {
  try {
    const { products } = req.body;

    const createdProducts = await Promise.all(
      products.map(async (product) => {
        return await prisma.product.create({
          data: {
            productName: product.productName,
            price: product.price,
            category: product.category,
            imgUrl: product.imageUrl,
            sizes: {
              create: product.sizes,
            },
          },
          include: {
            sizes: true,
          },
        });
      })
    );

    return res.status(200).json({
      success: true,
      message: "Products created successfully",
      products: createdProducts,
    });

  } catch (error) {
    console.error("Bulk create Products Error:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id); // get id from params

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: req.body, // only fields you send here will be updated!
    });

    res.status(200).json({
      success: true,
      updatedProduct,
    });

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
    });
  }
};

const getProductById = async (req,res)=>{
  try{
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }    

    const product = await prisma.product.findUnique({
      where:{
        id: productId,
      },
      include:{
        sizes:true,
      }
    })
    if(!product){
      return res.status(404).json({success:false, message:`no product with id: ${productId} found`});
    }
    return res.status(202).json({success:true,message:`successfully found product with id ${productId}`,product});
  }
  catch(error){
    return res.status(500).json({success: false, message:`internal server error ${error.message}`});
  }
}

const deleteProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id); // get id from params

    // First delete related sizes
    await prisma.size.deleteMany({
      where: { productId },
    });

    // Then delete product
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    res.status(200).json({
      success: true,
      message: `Product with ID ${productId} deleted successfully`,
      deletedProduct,
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
    });
  }
};



module.exports = {
    createProduct,
    getAllProducts,
    bulkCreateProducts,
    updateProductById,
    getProductById,
    deleteProductById
  };
