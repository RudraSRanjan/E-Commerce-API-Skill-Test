import mongoose from "mongoose";

export const countSchema= new mongoose.Schema({

    //name is unique identifier to keep track of specific ID
    name:{
        type:String,
        required:true
    }, 

    value:{
        type:Number, 
        required:true
    }
});