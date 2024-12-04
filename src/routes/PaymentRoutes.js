import express from 'express';
import { PaymentController } from '~/controllers/PaymentController';

const router = express.Router();

router.post('/', PaymentController.handleTransaction);
router.post('/callback', PaymentController.acceptTransaction);

export const PaymentRoutes = router;
