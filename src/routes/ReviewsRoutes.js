import express from 'express';
import { ReviewsController } from '~/controllers/ReviewsController';

const router = express.Router();

router.get('/:buyer_id', ReviewsController.getReviews);
router.post('/', ReviewsController.createReview);
router.put('/:buyer_id/:product_id', ReviewsController.updateReview);
router.delete('/:buyer_id/:product_id', ReviewsController.deleteReview);
export const ReviewsRoutes = router;
