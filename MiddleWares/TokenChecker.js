const { verifyJwt } = require("../Utils/Jwt");

const tokenChecker = (req, res, next) => {
  const token = req.headers["authorization"];
  const splitToken = token.split(" ")[1];

  if (!splitToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    console.log("🚀 ~ tokenChecker ~ token:", splitToken);
    const decoded = verifyJwt(splitToken);
    if (!decoded) {
      return res.status(401).json({ message: "Token is invalid." });
    }

    req.query.userId = decoded._id;
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }

    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = tokenChecker;
