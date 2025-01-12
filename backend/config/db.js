const mongoose = require('mongoose');
require('dotenv').config();

function connectToDB(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to the database");
    }).catch((err)=>{
        console.log("Error connecting to the database", err);
    });
}

module.exports = connectToDB;