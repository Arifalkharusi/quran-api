import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import Quran from "./Schima.js";
mongoose.connect(process.env.mongobduri);

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", async (req, res) => {
  const data = await Quran.findOne({ name: req.query.surah });
  res.json(data);
});
app.post("/create", async (req, res) => {
  const response = await fetch(
    "https://api.alquran.cloud/v1/quran/quran-uthmani"
  );
  const quran = await response.json();
  const { surahs } = quran.data;

  surahs.forEach(
    async (x, i) =>
      await Quran.create({
        name: i + 1,
        ayahs: x.ayahs,
      })
  );

  res.send("created");
});
app.put("/update", async (req, res) => {
  await Quran.updateOne({ name: req.query.name }, { name: req.query.newname });
  res.send("updated");
});

app.delete("/delete", async (req, res) => {
  await Quran.deleteOne({ name: req.query.name });
  res.send(`deleted ${req.query.name}`);
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
