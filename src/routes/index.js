import express from 'express';
import { HomeRoutes } from '~/routes/HomeRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { CartRoutes } from '~/routes/CartRoutes';
import { ReviewsRoutes } from '~/routes/ReviewsRoutes';
import { CouponRoutes } from './CouponRoutes';
const router = express.Router();

router.use('/home', HomeRoutes);
router.use('/product', ProductRoutes);
router.use('/cart', CartRoutes);
router.use('/reviews', ReviewsRoutes);
router.use('/coupon', CouponRoutes);

export const API = router;
