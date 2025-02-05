// import express from 'express';
// import session from 'express-session';
// import passport from 'passport';
// import dotenv from 'dotenv'; // Correct import statement
// dotenv.config();

// import userRouter from './routes/user.route.js';
// import { connectToDB } from './config/db.js';

// // Connect to the database
// connectToDB();

// const app = express(); // Use `app` instead of `router` for the main application

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// // Route handling
// app.use('/user', userRouter);

// // Start server
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require('./controllers/commit.js')
const { pushRepo } = require('./controllers/push.js')
const { pullRepo } = require('./controllers/pull.js')
const { revertRepo } = require('./controllers/revert.js')

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to a repository",
    (yargs) => {
      yargs.positional("file",{
        describe:"File to add to a staging area",
        type:"string",
      });
    },
    (argv)=>{
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit files in the staging area",
    (yargs) => {
      yargs.positional("message",{
        describe:"Commit message",
        type:"string",
      });
    },
    (argv)=>{
      commitRepo(argv.message);
    }
  )
  .command("push","Push commits to S3", {}, pushRepo)
  .command("pull","Pull commits from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID",{
        describe:"Commit ID to revert to",
        type:"string",
      });
    },
    revertRepo
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;
