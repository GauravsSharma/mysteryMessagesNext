import mongoose from "mongoose";

type connectionObject = {
    isConnected?:Number
}
const connection:connectionObject={}

const connectToDb = async()=>{
    if(connection.isConnected){
        console.log("Database already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI||"");
        connection.isConnected = db.connections[0].readyState
        console.log("Database connected");

    } catch (error) {
        console.log(error); 
        process.exit(1)
    }
}
export default connectToDb;