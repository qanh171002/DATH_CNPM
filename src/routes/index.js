import express from "express";
import { HomeRoutes } from "~/routes/HomeRoutes";

const router = express.Router();

router.use("/home", HomeRoutes);

export const API = router;
