const express=require("express");
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');

//Import Route
const authRoute=require("./routes/auth");

dotenv.config();//To access everthing in this dotenv file

//Connect to database
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true});

app.use(express.json());

//Routes MiddleWare
app.use('/api/user',authRoute);//Everything in auth route will have this prefix


app.listen(7000,()=>console.log('Server is up and running'));


//Database Schema
