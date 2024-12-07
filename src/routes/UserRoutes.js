import express from 'express';
import { authentication } from '~/middlewares/verify';
import { UserController } from '~/controllers/UserController';

const router = express.Router();

router.get('/', authentication, UserController.getInfo);
router.get('/address', authentication, UserController.getAddress);
router.post('/store-address', authentication, UserController.storeAddress);
router.put('/update-address', authentication, UserController.updateAddress);
router.post('/delete-address', authentication, UserController.deleteAddress);

export const UserRoutes = router;
