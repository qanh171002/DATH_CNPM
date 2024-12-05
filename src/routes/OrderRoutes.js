import express from 'express';
import { OrderController } from '~/controllers/OrderController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.get('/:buyerId', authentication, OrderController.getOrders);

export const OrderRoutes = router;
