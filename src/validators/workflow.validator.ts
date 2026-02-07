import { z } from "zod";

export const createWorkflowSchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string().optional(),
});

export const updateWorkflowSchema = z.object({
    is_active: z.boolean(),
})