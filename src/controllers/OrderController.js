import { OrderModel } from '~/models/OrderModel';
import { StatusCodes } from 'http-status-codes';

async function getOrders(req, res) {
  try {
    const buyerId = req.params.buyerId;

    const orders = await OrderModel.getOrders(buyerId);

    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function createOrder(buyerId, status, items, numberOfProducts, amount) {
  try {
    const order = await OrderModel.createOrder(buyerId, status, numberOfProducts, amount);
    const orderDetails = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity
    }));

    await OrderModel.storeOrderDetails(orderDetails);

    return order;
  } catch (error) {
    return error;
  }
}

export const OrderController = {
  getOrders,
  createOrder
};
