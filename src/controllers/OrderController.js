import { OrderModel } from '~/models/OrderModel';
import { StatusCodes } from 'http-status-codes';
import { ProductController } from './ProductController';
import { faker } from '@faker-js/faker';

async function getOrders(req, res) {
  try {
    const buyerId = req.params.buyer_id;

    const orders = await OrderModel.getOrders(buyerId);

    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function storeOrderDetails(orderDetails, res) {
  try {
    await OrderModel.storeOrderDetails(orderDetails);
    const result = await ProductController.handleQuantity(orderDetails);

    if (result)
      res.status(StatusCodes.CREATED).json('Product added to order.');
    else {
      res.status(StatusCodes.BAD_REQUEST).json('Add product to order failed.');
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function createOrder(req, res) {
  try {
    const buyerId = req.params.buyer_id;
    const orderId = faker.string.uuid();
    const products = req.body;

    const orderDetails = products.map(product => ({
      ...product,
      order_id: orderId
    }));

    await OrderModel.createOrder(orderId, buyerId, new Date.now(), 'PENDING');
    await storeOrderDetails(orderDetails, res);

    res.status(StatusCodes.CREATED).json('Product added to cart');
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export const OrderController = {
  getOrders,
  createOrder
};
