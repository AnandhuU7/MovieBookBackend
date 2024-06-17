const express=require("express");
const { getAllUsers, signUp, updateUser, deleteUser, login, loginUser, getAllBookingsOfUser } = require("../controllers/user_controller");
const userRouter=express.Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup",signUp);
userRouter.put("/update/:id",updateUser)
userRouter.delete("/delete/:id",deleteUser);
userRouter.post("/login",loginUser);
userRouter.get("/bookings/:id",getAllBookingsOfUser);

module.exports=userRouter;