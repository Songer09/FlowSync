import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as triggerController from '../controllers/trigger.controller';

const router = Router();
router.use(authenticate);

router.post('/:id/triggers', triggerController.setTrigger);

export default router;