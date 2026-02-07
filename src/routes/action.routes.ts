import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as actionController from '../controllers/action.controller';

const router = Router();
router.use(authenticate);

router.post('/:id/actions', actionController.addAction);

export default router;