import express from "express";

import {connectUsingMongoose} from "./config/mongoose.config.js";
import productRouter from "./features/product/routes.js";

//Create server using express
const server= express();

//Parsing JSON data 
server.use(express.json());

server.get("/",(req,res)=>{
    res.send("Welcome to E-Commerce API");
});

server.use("/api/products",productRouter);


server.listen(4000,()=>{

    console.log("Server listening on port 4000");
    connectUsingMongoose();

});



