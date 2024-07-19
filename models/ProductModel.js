const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        required: true,
    }
})
const Product = mongoose.model('Product',productSchema);

module.exports = Product;