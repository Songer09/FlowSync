import Action from '../models/Action';
import  Workflow from '../models/Workflow'
import Trigger from '../models/Trigger';
import { AppError } from '../utils/generalError';

export const createWorkflow = async (userId: string, { name, description }: { name: string; description?: string }) => {
  const workflow = await Workflow.create({
    user_id: userId,
    name,
    description: description || '',
  });
  return workflow;
};


export const getWorkflowsByUser = async (userId: string) => {
    return await Workflow.findAll({
        where: { user_id: userId },
        attributes: ['id', 'name', 'description', 'is_active', 'created_At', 'updated_At'],
        order: [['created_At', 'DESC']],
    })
};

export const getWorkflowById = async (id: string, userId: string) => {
  const workflow = await Workflow.findOne({
    where: { id, user_id: userId },
  });
  if (!workflow) throw new AppError('Flujo no encontrado o acceso denegado', 404);
  return workflow;
};

export const updateWorkflowStatus = async (id: string, userId: string, is_active: boolean) => {
  const workflow = await Workflow.findOne({ where: { id, user_id: userId } });
  if (!workflow) throw new AppError('Flujo no encontrado o acceso denegado', 404);

  workflow.is_active = is_active;
  await workflow.save();
  return workflow;
};