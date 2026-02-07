import  Action  from '../models/Action';
import { AppError } from '../utils/generalError';

export const addActionToWorkflow = async (
  workflowId: string,
  userId: string,
  actionType: string,
  config: object,
  orderIndex: number
) => {
  // Verificar propiedad (opcional aquí, pero ideal en controlador)
  const action = await Action.create({
    workflow_id: workflowId,
    type: actionType,
    config,
    order_index: orderIndex,
  });
  return action;
};

export const getActionsByWorkflow = async (workflowId: string, userId: string) => {
  // Aquí deberías validar que el flujo pertenece al usuario (mejor en capa superior)
  return await Action.findAll({
    where: { workflow_id: workflowId },
    order: [['order_index', 'ASC']],
  });
};