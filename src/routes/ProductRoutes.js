import express from 'express';
import { ProductController } from '~/controllers/ProductController';
import { uploadCloud } from '~/config/cloudinary';
import { authentication, authorization } from '~/middlewares/verify';

const router = express.Router();

router.post('/add', uploadCloud.single('image'), authentication, authorization(['SELLER']), ProductController.createProduct);
router.get('/all', authentication, authorization(['SELLER']), ProductController.getAllProducts);
router.get('/sold', authentication, authorization(['SELLER']), ProductController.getSoldProducts);
router.put('/accept', ProductController.acceptProduct);

router.route('/:id')
  .get(ProductController.getProductReview)
  .put(ProductController.editProduct)
  .delete(ProductController.deleteProduct);

export const ProductRoutes = router;
