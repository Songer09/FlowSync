import  Trigger  from '../models/Trigger';
import { AppError } from '../utils/generalError';

export const setTriggerForWorkflow = async (
  workflowId: string,
  triggerType: string,
  config: object = {}
) => {
  const existing = await Trigger.findOne({ where: { workflow_id: workflowId } });

  if (existing) {
    await Trigger.update(
      { type: triggerType, config },
      { where: { workflow_id: workflowId } }
    );
    return await Trigger.findOne({ where: { workflow_id: workflowId } });
  } else {
    return await Trigger.create({
      workflow_id: workflowId,
      type: triggerType,
      config,
    });
  }
};