// src/controllers/trigger.controller.ts
import { Request, Response } from 'express';
import { setTriggerForWorkflow } from '../services/trigger.service';
import  Workflow  from '../models/Workflow'; // ← Importa Workflow aquí
import { AppError } from '../utils/generalError';

export const setTrigger = async (req: Request, res: Response) => {
  try {
    const { id: workflowId } = req.params;
    const { type, config } = req.body;
    const userId = req.user!.id;

    if (!type) throw new AppError('Tipo de trigger requerido', 400);

    const workflow = await Workflow.findOne({
      where: { id: workflowId, user_id: userId },
    });

    if (!workflow) {
      throw new AppError('Flujo no encontrado o acceso denegado', 404);
    }

    const trigger = await setTriggerForWorkflow(workflowId, type, config || {});
    res.status(200).json({ success: true, data: trigger });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error al configurar trigger', 500);
  }
};