const express = require("express");
const routes = express.Router();
const loginUser = require("../Controllers/Auth/Login");
const tokenChecker = require("../MiddleWares/TokenChecker");
const getMe = require("../Controllers/Auth/getMe");
const addProduct = require("../Controllers/Product/AddProduct");

// post APIs
routes.post("/login", loginUser);
routes.post("/add-product", tokenChecker, addProduct);

// get APIs
routes.get("/get-me", tokenChecker, getMe);

module.exports = { routes };
