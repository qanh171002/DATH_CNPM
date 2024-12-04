import express from 'express';
import { authentication } from '~/middlewares/verify';
import { AuthController } from '~/controllers/AuthController';

const router = express.Router();

router.get('/protected', authentication, (res, req) => {
  res.json({ message: `Welcome, User ${req.user.id}` });
});
router.post('/login', AuthController.login);
router.post('/signup', AuthController.createUser);
router.post('/logout', AuthController.logout);
router.post('/google', AuthController.loginByGoogle);

export const AuthRoutes = router;
