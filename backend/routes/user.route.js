import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()


import User from '../models/user.model.js'
import passport from '../config/passport.js'

const route = express.Router();


// route.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

route.post('/signup', async (req, res) => {
  const { username, fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, fullname, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send('Error registering user: ' + err.message);
  }
});

route.post(
  '/login',
  // passport.authenticate('local', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/login',
  //   failureFlash: false,
  // })
);

route.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      res.send(`Welcome, ${req.user.username}`);
    } else {
      res.redirect('/login');
    }
  });


    route.post('/logout', (req, res) => {
      req.logout((err) => {
        if (err) return res.status(500).send('Error logging out');
        res.send('Logged out successfully');
      });
    });
  
export default route