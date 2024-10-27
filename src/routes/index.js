import express from "express";
import { HomeRoutes } from "~/routes/HomeRoutes";
import { ProductRoutes } from "~/routes/ProductRoutes";

const router = express.Router();

router.use("/home", HomeRoutes);
router.use("/product", ProductRoutes);

export const API = router;
