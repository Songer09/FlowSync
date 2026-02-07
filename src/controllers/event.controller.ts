import { Request, Response } from 'express';
import Trigger from '../models/Trigger';
import Action from '../models/Action'
import Workflow from '../models/Workflow';
import { AppError } from '../utils/generalError';

export const handleEvent = async (req: Request, res: Response) => {
  try {
    const { eventType, payload } = req.body;

    if (!eventType) throw new AppError('eventType requerido', 400);

    const triggers = await Trigger.findAll({ where: { type: eventType } });

    for (const trigger of triggers) {
      console.log(`[FlowSync] Disparando flujo ${trigger.workflow_id} para evento ${eventType}`);
      
    }

    res.json({ success: true, message: `Evento ${eventType} procesado`, triggered: triggers.length });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error al procesar evento', 500);
  }
};