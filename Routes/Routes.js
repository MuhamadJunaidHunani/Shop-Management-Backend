const express = require("express");
const routes = express.Router();
const loginUser = require("../Controllers/AuthApis/Login");
const tokenChecker = require("../MiddleWares/TokenChecker");
const getMe = require("../Controllers/AuthApis/getMe");

// post APIs
routes.post("/login", loginUser);

// get APIs
routes.get("/get-me", tokenChecker, getMe);

module.exports = { routes };
