import books from "../models/books.js";

const registerBooks = async (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender|| !req.body.price)
    return res.status(400).send("incomplete data");

  const existingBooks = await books.findOne({ name: req.body.name });
  if (existingBooks) return res.status(400).send("the book already exist");

  const booksSchema = new books({
    name: req.body.name,
    author: req.body.author,
    yearPublication:req.body.yearPublication,
    pages:req.body.pages,
    gender: req.body.gender,
    price:req.body.price,
  });

  const result = await booksSchema.save();
  if (!result) return res.status(400).send("failed to register books");

  return res.status(200).send({ result});

};

const listBooks = async (req,res) => {
  const booksSchema = await books.find();
  if(!booksSchema ||booksSchema.length == 0) return res.status(400).send("Emply book list")
  return res.status(200).send({booksSchema})

};

const findBooks = async (req, res) => {
  const booksId = await books.findById({ _id: req.params["_id"] });
  return !booksId
    ? res.status(400).send("no search results")
    : res.status(200).send({ booksId });
};

const deleteBooks = async (req , res) => {
  const booksDelete = await books.findByIdAndDelete({ _id: req.params["_id"] });

  return !booksDelete
    ? res.status(400).send("Book not found")
    : res.status(200).send("Book deleted");
};

const updateBooks = async (req, res) => {
  if (!req.body.name || !req.body.author || !req.body.yearPublication || !req.body.pages || !req.body.gender|| !req.body.price)
    return res.status(400).send("incomplete data");

  const existingBooks = await books.findOne({
    name: req.body.name,
    author: req.body.author,
    yearPublication:req.body.yearPublication,
    pages:req.body.pages,
    gender: req.body.gender,
    price:req.body.price,
  });
  if (existingBooks) return res.status(400).send("the Book already exist");

  const booksUpdate = await books.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
    yearPublication:req.body.yearPublication,
    pages:req.body.pages,
    gender: req.body.gender,
    price:req.body.price,
  });

  return !booksUpdate
    ? res.status(400).send("error editing Book")
    : res.status(200).send({ booksUpdate });
};

export default {registerBooks, listBooks, updateBooks, findBooks, deleteBooks};