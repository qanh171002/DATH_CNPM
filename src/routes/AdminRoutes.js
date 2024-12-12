import express from 'express';
import { AdminController } from '~/controllers/AdminController';
import { authentication, authorization } from '~/middlewares/verify';

const router = express.Router();

router.get('/all-users', authentication, authorization(['ADMIN']), AdminController.getAllUsers);
router.delete('/delete-user/:userId', authentication, authorization(['ADMIN']), AdminController.deleteUser);

export const AdminRoutes = router;
