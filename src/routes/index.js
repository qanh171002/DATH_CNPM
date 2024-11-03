import express from "express";
import { HomeRoutes } from "~/routes/HomeRoutes";
import { ProductRoutes } from "~/routes/ProductRoutes";
import { CouponRoutes } from "~/routes/CouponRoutes";

const router = express.Router();

router.use("/home", HomeRoutes);
router.use("/product", ProductRoutes);
router.use("/coupon", CouponRoutes);

export const API = router;
