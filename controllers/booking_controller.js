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

    existingUser.bookings.push(booking._id);
    await existingUser.save();
    existingMovie.bookings.push(booking._id);
    await existingMovie.save();

    booking.movie = existingMovie;
    booking.user = existingUser;

    return res
      .status(201)
      .json({ message: "Booking successful", booking: booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// const savedBooking = await Booking.findById(booking._id)
//   .populate('movie')
//   .populate('user');

exports.getBookingById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(201).json({ Booking: booking });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
