import express from 'express';
import { ProductController } from '~/controllers/ProductController';

const router = express.Router();

router.route('/add')
  .post(ProductController.createProduct);

router.route('/:id')
  .get(ProductController.getProduct)
  .put(ProductController.editProduct)
  .delete(ProductController.deleteProduct);

export const ProductRoutes = router;
