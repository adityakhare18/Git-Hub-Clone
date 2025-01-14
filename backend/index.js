const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();



app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.get('/', (req, res) => {
    res.send("Hello world");
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});