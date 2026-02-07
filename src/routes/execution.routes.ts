import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as executionController from '../controllers/execution.controller';

const router = Router();
router.use(authenticate);

router.get('/:id/executions', executionController.getExecutionsByWorkflow);

export default router;