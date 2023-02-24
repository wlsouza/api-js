import mongoose from "mongoose";

export function connect() {
    mongoose.connect(
        "mongodb://root:root@127.0.0.1:27017/",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(
        ()=> console.log("MongoDB connected")
    ).catch(
        (error)=> console.log(error) 
    )
};
