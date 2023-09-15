import express from 'express'
import data from './data.js'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
mongoose
    .connect('mongodb://localhost:27017/shoppify')
    .then(() => {
        console.log(`connection successful`);
    })
    .catch((e) => {
        console.log(e);
    });

const app = express();

// it is use to convert the form data of post request to json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sending the client paypal id so the payment placed in frontend
//it is api which came from sandbox paypal client and when we request for payment
//it will redirect to their payment page 
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
// here we can use our data of Product using this api 
app.use('/api/seed', seedRouter)

// demo method to send data from backend to frontend
// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

//main method which call productRoute 
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// so here come from userRoutes if any error then show msg
app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
})