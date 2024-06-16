const express=require("express");
const { addMovie, getAllMovies,getAllMoviesById } = require("../controllers/movie_controller");
const movieRouter=express.Router();


movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getAllMoviesById);
movieRouter.post("/",addMovie);



module.exports=movieRouter;