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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // https://docconnect-mern.vercel.app
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);

const port = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    console.log("✅ Connected to DB successfully");
    app.listen(port, () => {
      console.log(`🚀 Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Startup Error:", err.message);
    process.exit(1);
  });
