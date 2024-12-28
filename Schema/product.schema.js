import mongoose from "mongoose";

export const productSchema= new mongoose.Schema({

    _id: {
        type: Number,
        required:true
    },

    name: {
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        required:true
    }
})