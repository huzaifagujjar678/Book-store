const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookname: {type: String, required: true, minlength: 3 },
  description: {type: String, required: true },
  author: {type: String, required: true , minlength: 3},
  image: {type: String, required: true },
  price: {type: Number, required: true }

});

module.exports = mongoose.model("books", bookSchema)