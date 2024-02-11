const express = require("express");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv").config();
const colors = require("colors");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/send-mail", require("./routes/contactRoute"));
app.use(errorHandler);

app.listen(port, () => console.log(`server is listenng on port ${port}`));
