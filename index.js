import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import Quran from "./Schima.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongobduri);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  res.send(
    "Welcome to Quran-api to find a surah simply write /surah?surah={surah number}"
  );
});

app.get("/surah", async (req, res) => {
  const data = await Quran.findOne({ name: req.query.surah });
  res.json(data);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
