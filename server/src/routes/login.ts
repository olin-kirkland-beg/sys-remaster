import { LoginController } from '@/controllers/login-controller';
import { Router } from 'express';

const router = Router();
const loginController = new LoginController();

router.post('/login', loginController.login);

export default router;
