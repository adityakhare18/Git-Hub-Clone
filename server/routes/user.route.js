const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller.js");

userRouter.get("/allUsers", userController.getAllUser);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.get("/getUserProfile", userController.getUserProfile);
userRouter.put("/updateUserProfile", userController.updateUserProfile);
userRouter.delete("/deleteUserProfile", userController.deleteUserProfile);
