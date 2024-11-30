import express from 'express';
import { HomeController } from '~/controllers/HomeController';

const router = express.Router();

router.route('/')
  .get(HomeController.getProducts)
  .post(HomeController.createProduct);

export const HomeRoutes = router;
