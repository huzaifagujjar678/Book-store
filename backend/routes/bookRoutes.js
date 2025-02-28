const router = require('express').Router();
const bookModel = require("../models/booksModel")


//Post request to add books in DB :1
router.post("/add", async (req, res) => {
  try {
    const newBook = await new bookModel(req.body)
    newBook.save().then(() => {
      res.status(200).json({ message: "book added sussfully" })
    })
  } catch (error) {
    return res.status(400).json({ error: "Server error" })
  }
})


// GET Request to Get Books :2
router.get("/get", async (req, res) => {
  let books;
  try {
    books = await bookModel.find();
    res.status(200).json({ books })
  } catch (error) {
    return res.status(400).json({ error: "Server error" })
  }
})



// GET Request to Get Books by their id :3
router.get("/get/:id", async (req, res) => {
  let books;
  const id = req.params.id;
  try {
    books = await bookModel.findById(id);
    res.status(200).json({ books })
  } catch (error) {
    return res.status(400).json({ error: "Server error" })
  }
})



//Update data by their id "Using PUT REQUEST" :4
router.put("/update/:id", async (req, res) => {
  let books;
  const id = req.params.id;
  const { bookname, description, author, image, price } = req.body;
  try {
    books = await bookModel.findByIdAndUpdate(id, {
      bookname,
      description,
      author,
      image,
      price
    })
    await books.save().then(() => {
      res.status(200).json({ message: "Data has updated successfuly" })
    })
  } catch (error) {
    return res.status(400).json({ error: "Server error" })
  }
})



//Delete request :5
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await bookModel.findByIdAndDelete(id).then(()=>{
      res.status(200).json({ message:"Book deleted succesfully"})
    })
  } catch (error) {
    return res.status(400).json({ error: "SERVER ERROR" })
  }
})

module.exports = router;