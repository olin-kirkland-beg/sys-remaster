import { UsersController } from '@/controllers/users-controller';
import { Router } from 'express';

const router = Router();
const usersController = UsersController.getInstance();

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.get('/', usersController.getAllUsers);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

export default router;
