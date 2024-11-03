import express from "express";
import { CouponController } from "~/controllers/CouponController";

const router = express.Router();

router.route("/")
  .get(CouponController.getProducts)
  .post(CouponController.createProduct);

export const CouponRoutes = router;
