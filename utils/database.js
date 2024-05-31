import mongoose from "mongoose";

let isConnected  = false // allowering us to track th connection status

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("MongoDB is Connected..");
        return;
    }

    
    try{     //if not connected try to establish a connction

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDb is Connected")

    }catch(error){
        console.error("MongoDB connection error:", error);
    }
}