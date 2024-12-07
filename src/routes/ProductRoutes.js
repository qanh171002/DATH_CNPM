import express from 'express';
import { ProductController } from '~/controllers/ProductController';
import { uploadCloud } from '~/config/cloudinary';

const router = express.Router();

router.post('/add', uploadCloud.single('image'), ProductController.createProduct);

router.route('/:id')
  .get(ProductController.getProductReview)
  .put(ProductController.editProduct)
  .delete(ProductController.deleteProduct);

export const ProductRoutes = router;
