const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();





app.get('/api', (req, res) => {
    console.log("Hello world");
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});