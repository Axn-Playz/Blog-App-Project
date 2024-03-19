const mongoose = require("mongoose");
const dotenv = require("dotenv");

// url config
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

// connection
mongoose.connect(MONGO_URL)
.then(()=>console.log('Connection established successfully'.bgGreen.white))
.catch((err)=>console.log(`error at ${err}`.bgRed.white));

