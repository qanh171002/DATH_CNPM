import express from 'express';
import { OrderController } from '~/controllers/OrderController';

const router = express.Router();

router.route('/:buyer_id')
  .get(OrderController.getOrders)
  .post(OrderController.createOrder);

export const OrderRoutes = router;
