const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");

exports.newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  try {
    if (!movie || !date || !seatNumber || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingMovie = await Movie.findById(movie);
    const existingUser = await User.findById(user);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const existingBooking = await Booking.findOne({
      movie,
      date: new Date(date),
      seatNumber,
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Seat already booked for this movie and date" });
    }
    const booking = new Booking({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });
    
    await booking.save();
   
    return res.status(201).json({ message: "booked", booking: booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
