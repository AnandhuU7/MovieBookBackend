const express=require("express");
const { addAdmin, addminLogin, getAdmins} = require("../controllers/admin_controller");
const adminRouter=express.Router();


adminRouter.post("/add",addAdmin);
adminRouter.post("/login",addminLogin)
adminRouter.get("/get",getAdmins)

module.exports=adminRouter;