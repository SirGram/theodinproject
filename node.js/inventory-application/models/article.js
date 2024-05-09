const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Article = new Schema({
    name:{type:String, required:true, minLength: 3, maxLength: 30},
    description:{type:String, minLength:3, maxLength: 500},
    price:{type:Number, required:true },
    brand: {type:Schema.Types.ObjectId, ref:'Brand'},
    category: [{type:Schema.Types.ObjectId, ref:'Category'}]
})

Article.virtual('url').get( function(){    
  return `/catalog/article/${this._id}`;
})

module.exports = mongoose.model( 'Article',Article)

