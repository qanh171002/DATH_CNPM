import express from 'express';
import { OrderController } from '~/controllers/OrderController';

const router = express.Router();

router.route('/')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder);

router.route('/:id')
  .put(OrderController.editOrder)
  .delete(OrderController.deleteOrder);

export const OrderRoutes = router;
