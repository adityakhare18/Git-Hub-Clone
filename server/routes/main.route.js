const express = require('express');
const userRouter = require('./user.route');

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);

mainRouter.get("/", (req, res) => {
    res.send("Hello World");
});



module.exports = mainRouter;