import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

// here Product is the model of storing items info
// User is the model of storing user information
seedRouter.get('/', async (req, res) => {
    await Product.deleteMany({});
    // here we put our data in Product model and use all of there
    const createdProducts = await Product.insertMany(data.products);
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
});
export default seedRouter;