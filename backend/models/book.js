const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  publishedAt: Date,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
