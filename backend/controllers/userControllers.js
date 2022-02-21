const Users = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const authenticateUser = asyncHandler(async (req, res) => {
  const { name, email, password, __id } = req.body;

  const userFound = await Users.findOne({ email });
  if (userFound && userFound.matchPassword(password)) {
    res.json({
      name,
      email,
      token: generateToken(userFound.__id),
    });
  } else {
    res.status(401);
    throw new Error("Nom d’utilisateur ou mot de passe invalidés.");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userFound = await Users.findOne({ email });
  if (userFound) {
    return {
      name: userFound.name,
      email: userFound.email,
    };
  } else {
    req.status("404");
    throw new Error("L’utilisateur que vous cherchez n’existe pas.");
  }
});

module.exports = { authenticateUser, getUserProfile };
