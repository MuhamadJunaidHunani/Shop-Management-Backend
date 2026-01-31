const ProductModel = require("../../Models/ProductModel");
const validateObjectId = require("../../Utils/validation");

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      if (!validateObjectId(id, res)) return;
    }
    const data = id
      ? await ProductModel.findById(id)
      : await ProductModel.find().sort({ createdAt: -1 });

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(404).json({
        success: false,
        message: id ? "Product not found" : "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: id
        ? "Product fetched successfully"
        : "All products fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = getProduct;
