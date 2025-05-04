const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

// Import routes
const fileRoutes = require("./routes/file.routes");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

// Start server function
function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // CORS middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

  // Routes
  app.use('/api/files', fileRoutes);

  try {
    // Try to load main router if it exists
    const mainRouter = require('./routes/main.route');
    app.use('/api', mainRouter);
  } catch (error) {
    console.log('Main router not found, skipping...');
  }

  // MongoDB connection
  const mongoURI = process.env.MONGODB_URL || process.env.MONGO_URI || "mongodb://localhost:27017/github-clone";
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB connected!");

      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}