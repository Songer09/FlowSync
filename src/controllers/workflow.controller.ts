import { Request, Response } from 'express';
import {
    createWorkflow,
    getWorkflowsByUser,
    getWorkflowById,
    updateWorkflowStatus
} from '../services/workflow.service'
import { AppError } from '../utils/generalError';

export const create = async (req: Request, res: Response) => {
    try {
        const workflow = await createWorkflow(req.user!.id, req.body);
        res.status(201).json({ message: 'Flujo de trabajo creado', success: true, workflow })
    } catch(error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Error al crear flujo', 500);
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const workflows = await getWorkflowsByUser(req.user!.id);
        res.json({ success: true, workflows });
    } catch(error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Error al listar flujos', 500);
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const workflow = await getWorkflowById(req.params.id, req.user!.id);
        res.json({ success: true, workflow });
    } catch(error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Error al obtener flujo', 500);
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const workflow = await updateWorkflowStatus(req.params.id, req.user!.id, req.body.is_active);
        res.json({ success: true, workflow });
    } catch(error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Error al actualizar flujo', 500);
    }
};