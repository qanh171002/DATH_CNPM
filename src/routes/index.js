import express from 'express';
import { HomeRoutes } from '~/routes/HomeRoutes';
import { ProductRoutes } from '~/routes/ProductRoutes';
import { CartRoutes } from '~/routes/CartRoutes';
import { ReviewsRoutes } from '~/routes/ReviewsRoutes';
const router = express.Router();

router.use('/home', HomeRoutes);
router.use('/product', ProductRoutes);
router.use('/cart', CartRoutes);
router.use('/reviews', ReviewsRoutes);
export const API = router;
