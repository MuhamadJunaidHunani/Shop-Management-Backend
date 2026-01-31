const mongoose = require("mongoose");

const validateObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid Product ID",
    });
    return false;
  }
  return true;
};

module.exports = validateObjectId;
