import Router from 'koa-router';
import { registerUser, loginUser, getUser } from './user.controller';
import Protect from '../../../middleware/auth';

const router = Router({ prefix: '/users/' });

router.post('register', registerUser);
router.post('login', loginUser);
router.get(':id', Protect, getUser);

export default router;
