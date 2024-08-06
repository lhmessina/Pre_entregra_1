import mongoose from "mongoose";
import envs  from "./env.conf.js"
export const connectMongoDB = async () => {

    try{
        
       
            
        mongoose.connect(envs.MONGO_A_URL)
        console.log( "MongoDB connected")
    }
    catch (err){
        console.log (`${err}`)


    }
    
} 

