import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import todoRouter from "../Routes/todoRoute"

const app = express();
const port = process.env.PORT || 5000;
const mongodbURI = process.env.MONGODB_URI

mongoose
  .connect(mongodbURI)
  .then(() => {
    console.log("Database Connected Successfully.");
  })
  .catch((err) => {
    console.log(err);
  });
  app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  }));

app.use(express.json());
app.use("/api/todo",todoRouter);
app.listen(port, () => {
  console.log(`Backend Server is running on port : ${port}`);
});

module.exports = app;