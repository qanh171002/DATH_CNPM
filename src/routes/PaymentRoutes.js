import express from 'express';
import { PaymentController } from '~/controllers/PaymentController';
import { authentication } from '~/middlewares/verify';

const router = express.Router();

router.post('/cash', authentication, PaymentController.handleTransactionByCash);
router.post('/', authentication, PaymentController.handleTransaction);
router.post('/callback', PaymentController.acceptTransaction);

export const PaymentRoutes = router;
