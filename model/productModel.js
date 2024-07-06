import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: String,
    price: String,
    image: String,
    mutiImg: String,
    details: String,
    // updatedAt: Date,
    // comments: [{
    //     user: String,
    //     content: String,
    //     votes: Number
    // }]
});

const Product = model('Product', productSchema);
export default Product;