const express=require("express");
const { newBooking, getBookingById } = require("../controllers/booking_controller");
const bookingRouter=express.Router();

bookingRouter.post("/",newBooking);
bookingRouter.get("/:id",getBookingById);


module.exports=bookingRouter;