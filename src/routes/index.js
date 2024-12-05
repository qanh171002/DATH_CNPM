import express from 'express';
import { HomeRoutes } from '~/routes/HomeRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { CartRoutes } from '~/routes/CartRoutes';
import { ReviewsRoutes } from '~/routes/ReviewsRoutes';
import { CouponRoutes } from '~/routes/CouponRoutes';
import { PaymentRoutes } from '~/routes/PaymentRoutes';
import { AuthRoutes } from './AuthRoutes';
import { UserRoutes } from './UserRoutes';
import { OrderRoutes } from './OrderRoutes';

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/home', HomeRoutes);
router.use('/product', ProductRoutes);
router.use('/cart', CartRoutes);
router.use('/reviews', ReviewsRoutes);
router.use('/coupon', CouponRoutes);
router.use('/payment', PaymentRoutes);
router.use('/user', UserRoutes);
router.use('/order', OrderRoutes);

export const API = router;
