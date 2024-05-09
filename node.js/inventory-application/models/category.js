const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Category = new Schema({
    name: { type: String, required: true, maxLength: 100, minLength: 3 }, 
    description: { type: String, required: true, maxLength: 500, minLength: 3 }, 
})

Category.virtual('url').get( function(){    
  return `/catalog/category/${this._id}`;
})

module.exports = mongoose.model('Category',Category)