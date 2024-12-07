import express from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
const router = express.Router();

router.get('/:cate', CategoryController.getProductsByCategory);

export const CategoriesRoutes = router;
