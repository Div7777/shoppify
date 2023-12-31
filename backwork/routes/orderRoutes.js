import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

// at last for the authentication and verification we use req.user
// which came from utils by isAuth function
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });

        const order = await newOrder.save();
        res.status(201).send({ message: 'New Order Created', order });
    })
);

// it will send the detail of all orders done by that user id
orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' })
        }
    })
);
orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'email name'
        );
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();
            res.send({ message: 'Order Paid', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);
export default orderRouter;