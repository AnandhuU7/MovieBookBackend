const express=require("express");
const { newBooking, getBookingById, deleteBooking } = require("../controllers/booking_controller");
const bookingRouter=express.Router();

bookingRouter.post("/",newBooking);
bookingRouter.get("/:id",getBookingById);
bookingRouter.delete("/:id",deleteBooking);


module.exports=bookingRouter;