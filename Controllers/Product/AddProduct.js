const ProductModel = require("../../Models/ProductModel");

const addProduct = async (req, res) => {
  try {
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

    const product = new ProductModel({
      name,
      price,
      imageUrl: imageUrl || "",
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = addProduct;
