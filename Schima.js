import { Schema, model } from "mongoose";

const QuranSchima = new Schema({
  name: String,
  ayahs: Array,
});

const Quran = model("Product", QuranSchima);
export default Quran;
