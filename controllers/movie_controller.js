const Movie = require("../models/Movie");
const Admin=require("../models/Admin")
const jwt = require("jsonwebtoken");
const mongoose=require("mongoose")

exports.addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  let adminId;
  //verify
  const privatekeyAdmin = process.env.PRIVATEKEY_ADMIN;

  try {
    const decrypted = jwt.verify(extractedToken, privatekeyAdmin);
    adminId = decrypted.id;
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  const { title, description, releaseDate, posterUrl, featured,actors } = req.body;
  if (
    !title || title.trim() === "" ||
    !description || description.trim() === "" ||
    !posterUrl || posterUrl.trim() === "" ||
    !actors || actors.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  try {
    const movie = new Movie({
      title,
      description,
      releaseDate: new Date(releaseDate),
      posterUrl,
      featured,
      actors,
      admin:adminId
    });

    await movie.save();

    // Optionally, update admin's movie list
    const admin = await Admin.findById(adminId);
    if (admin) {
      admin.addMovies.push(movie);
      await admin.save();
    }

    
    if(!movie){
        return res.status(500).json({message:'invalid inputs'})
    }
    return res.status(201).json({movie})

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllMovies=async(req,res,next)=>{
    try{
        const movies= await Movie.find();
        if(!movies || movies.length===0){
            return res.status(500).json({message:"No movies"})
        }
        return res.status(200).json({movies})

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Request failed"})
    }
}
exports.getAllMoviesById=async(req,res,next)=>{
    const id=req.params.id;
    try{
       const  movie=await Movie.findById(id);
        if(!movie){
            return res.status(404).json({message:"No movies"})
        }
        return res.status(201).json({movie})

    }catch(error){
        console.log(error);
       return res.status(500).json({message:"Internal server error"}) 
    }
}