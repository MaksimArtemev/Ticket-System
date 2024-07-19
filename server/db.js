const mongoose = require("mongoose")

module.exports = () => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database successfully")
    } catch(error) {
        console.log(error);
        console.log("could not connect to database!");
    }
}