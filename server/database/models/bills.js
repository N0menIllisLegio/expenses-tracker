const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    _id: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 250
    },
    cost: {
        type: Number,
        required: true
    }
})

const BillSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 250
    },
    products: [ProductSchema],
    date: Date,
  })
  
  module.exports = mongoose.model('Bill', BillSchema)