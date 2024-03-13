// const mongoose = require('mongoose');

// const ProductSchema = new mongoose.Schema({
//     name: String,
//     price: Number
// });

// const Product = mongoose.model('Product', ProductSchema);

// module.exports = Product;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paginationSchema = new Schema({
    name: {
        type: String,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
