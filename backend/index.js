import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv'; // Correct import statement
dotenv.config();

import userRouter from './routes/user.route.js';
import { connectToDB } from './config/db.js';

// Connect to the database
connectToDB();

const app = express(); // Use `app` instead of `router` for the main application

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route handling
app.use('/user', userRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
