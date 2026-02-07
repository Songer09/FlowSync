import { Router} from "express";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import {
    createWorkflowSchema,
    updateWorkflowSchema,
} from '../validators/workflow.validator';
import * as workflowController from '../controllers/workflow.controller';

const router = Router();

router.use(authenticate);

router.post('/', validate(createWorkflowSchema), workflowController.create);
router.get('/', workflowController.list);
router.get('/:id', workflowController.getById);
router.patch('/:id', validate(updateWorkflowSchema), workflowController.updateStatus);

export default router;
