require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./config/database.js");
const authRoutes = require("./routers/authRoutes.js");
const doctorRoutes = require("./routers/doctorRoutes.js");
const appointmentRoutes = require("./routers/appointmentRoutes.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.options("*", cors());

const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);

connectToDB()
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
