import { Router } from 'express';
import { IsTokenValid } from '../../middleware/isTokenValidMiddleware';
import AuthController from './authController';

const router: Router = Router();
const authController = new AuthController();

router.get('/test', authController.test);
router.post('/register', authController.signup);
router.post('/login', authController.login);
router.post('/send-verification-link', authController.sendVerificationLink);
router.post('/forgot-password', IsTokenValid, authController.forgotPassword);

const authRoute: Router = router;

export default authRoute;
