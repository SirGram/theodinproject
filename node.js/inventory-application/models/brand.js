const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Brand = new Schema({
    name: { type: String, required: true, maxLength: 100, minLength: 3 }, 
    year_foundation: {type:Date}
})

Brand.virtual('url').get( function(){    
  return `/catalog/brand/${this._id}`;
})
Brand.virtual('year_foundation_number').get( function(){    
  if (this.year_foundation instanceof Date && !isNaN(this.year_foundation)) {
    return this.year_foundation.getFullYear();
} else {
    return undefined;
}
})

module.exports = mongoose.model('Brand',Brand )