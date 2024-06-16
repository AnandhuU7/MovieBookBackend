const express=require("express");
const { newBooking } = require("../controllers/booking_controller");
const bookingRouter=express.Router();

bookingRouter.post("/",newBooking);


module.exports=bookingRouter;