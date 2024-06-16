require('dotenv').config()
const express=require("express");
const mongoose= require("mongoose");
const bodyparser=require("body-parser")
const userRouter=require("./routes/user_routes");
const adminRouter = require('./routes/admin_routes');
const movieRouter = require('./routes/movie_routes');
const bookingRouter = require('./routes/booking');



const app=express();
app.use(express.json());
// app.use(bodyparser.json())

const mongoDB="mongodb://127.0.0.1/moviebook";
mongoose.connect(mongoDB);
let db=mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
})
db.once('open',()=>{
    console.log("db connected")
})

//middileware
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter)
app.use("/booking",bookingRouter)

app.listen(8080,()=>{
    console.log("server is running in port")
})
