import mongoose from "mongoose";
import moment from "moment";

const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
  yearPublication:String,
  registerDate: { type: Date, default: Date.now },
  gender: String,
  pages: String,
  price: Number,
});

const books = mongoose.model("books", booksSchema);

export default books;
