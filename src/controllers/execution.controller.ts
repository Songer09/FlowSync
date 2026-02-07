import { Request, Response } from 'express';
import { Execution, Workflow } from '../models';
import { AppError } from '../utils/generalError';

export const getExecutionsByWorkflow = async (req: Request, res: Response) => {
  try {
    const { id: workflowId } = req.params;
    const userId = req.user!.id;

    // Validar que el flujo pertenece al usuario
    const workflow = await Workflow.findOne({
      where: { id: workflowId, user_id: userId },
    });
    if (!workflow) {
      throw new AppError('Flujo no encontrado o acceso denegado', 404);
    }

    const executions = await Execution.findAll({
      where: { workflow_id: workflowId },
      order: [['started_at', 'DESC']],
      attributes: ['id', 'trigger_type', 'status', 'error_message', 'started_at', 'finished_at'],
    });

    res.json({ success: true, data: executions });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error al obtener ejecuciones', 500);
  }
};