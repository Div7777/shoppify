import express, { response } from 'express';
//import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
//import { isAuth, isAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

//here we check the requested api from frontend is present in Product or not and response
//.get here send last /value of api and in server .use add this /value in their main api 
//ex= /api/product+/slug/:slug
productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
export default productRouter;