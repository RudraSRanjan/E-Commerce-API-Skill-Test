import mongoose from "mongoose";

const url= "mongodb://localhost:27017/Ecom";

export const connectUsingMongoose= async()=>{

    try {
        await mongoose.connect(url);
    
        console.log("MongoDB using mongoose is connected");
        
    } catch (error) {
        console.log("Error while connecting to database");
        console.log(error);
    }
    
}

 