const bookRouter = require("express").Router();
const Book = require("../models/book");

bookRouter.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    response.json(books);
  } catch (error) {
    console.error(error);
  }
});

bookRouter.post("/", async (request, response) => {
  try {
    const book = new Book(request.body);

    const result = await book.save();

    response.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});

bookRouter.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    await Book.findByIdAndRemove(id);

    response.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

bookRouter.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const { title, author, url, likes } = request.body;

    const newBook = await Book.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true }
    );

    response.send(newBook);
  } catch (error) {
    console.error(error);
  }
});

bookRouter.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const book = await Book.findById(id);
    response.json(book);
  } catch (error) {
    console.error(error);
  }
});

module.exports = bookRouter;
