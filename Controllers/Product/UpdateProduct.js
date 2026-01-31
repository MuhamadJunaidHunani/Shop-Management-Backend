const ProductModel = require("../../Models/ProductModel");

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Content cannot be empty",
        type: "VALIDATION_ERROR",
        errors: {
          name: "Required",
          price: "Required",
        },
      });
    }

    const { name, price, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
        type: "VALIDATION_ERROR",
        errors: {
          ...(!name ? { name: "Required" } : {}),
          ...(!price ? { price: "Required" } : {}),
        },
      });
    }

    const existingProduct = await ProductModel.findOne({
      name: name.trim(),
      _id: { $ne: productId },
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with this name already exists",
        type: "DUPLICATE_ERROR",
        errors: {
          name: "Product name must be unique",
        },
      });
    }

    const product = await ProductModel.findByIdAndUpdate(
      productId,
      { name, price, imageUrl: imageUrl || "" },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = updateProduct;
