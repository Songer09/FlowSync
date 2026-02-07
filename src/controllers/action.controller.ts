import { Request, Response } from "express";
import {
  addActionToWorkflow,
  getActionsByWorkflow,
} from "../services/action.service";
import { AppError } from "../utils/generalError";
import Workflow from "../models/Workflow";

export const addAction = async (req: Request, res: Response) => {
  try {
    const { id: workflowId } = req.params;
    const { type, config, orderIndex } = req.body;

    if (!type || !config || orderIndex === undefined) {
      throw new AppError("Faltan campos: type, config, orderIndex", 400);
    }

    const workflow = await Workflow.findOne({
      where: { id: workflowId, user_id: req.user!.id },
    });
    if (!workflow) {
      throw new AppError("Flujo no encontrado o acceso denegado", 404);
    }

    const action = await addActionToWorkflow(
      workflowId,
      req.user!.id,
      type,
      config,
      orderIndex,
    );
    res.status(201).json({ success: true, data: action });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error al agregar acción", 500);
  }
};
