const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// rest object
const app = express();

// Port config
dotenv.config();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routing
app.use('/user', userRoutes);
app.use("/blog", blogRoutes);


// listening
app.listen(PORT, () => {
    console.log(`Listening on ${process.env.DEV_MODE} at port ${PORT}`.bgCyan.white);
})