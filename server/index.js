require("dotenv").config();

const express = require("express");
const connectToDB = require("./config/database.js");
const authRouter = require("./routers/authRouter.js");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/auth", authRouter);

connectToDB()
  .then(() => {
    console.log("Connected to DB successfully");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => console.log(err.message));
