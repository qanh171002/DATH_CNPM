
import express from 'express';
import { CouponController } from '~/controllers/CouponController';

const router = express.Router();

router.route('/')
  .get(CouponController.getCoupons)
  .post(CouponController.createCoupon);

router.route('/:id')
  .put(CouponController.editCoupon)
  .delete(CouponController.deleteCoupon);

router.post('/decrease', CouponController.decreaseQuantity);

export const CouponRoutes = router;
