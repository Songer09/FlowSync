import { Includeable } from 'sequelize';
import axios from "axios";
import { Workflow, Trigger, Action, Execution } from "../models/index";
import { AppError } from "../utils/generalError";
import Logger from "../utils/logger";

export const executeWorkflowsForEvent = async (
  eventType: string,
  payload: object,
) => {
  Logger.info(`[FlowSync] Disparando evento: ${eventType}`);

  // 1. Buscar triggers activos para este evento
  const triggers = await Trigger.findAll({
    where: { type: eventType },
    include: [
      {
        model: Workflow,
        where: { is_active: true },
        required: true,
      },
    ] as Includeable[],
  });

  if (triggers.length === 0) {
    Logger.info(`[FlowSync] No hay flujos activos para el evento ${eventType}`);
    return;
  }

  // 2. Para cada trigger, ejecutar su flujo
  for (const trigger of triggers) {
    const workflow = trigger.Workflow!;
    Logger.info(
      `[FlowSync] Ejecutando flujo ${workflow.id} para evento ${eventType}`,
    );

    // Registrar ejecución inicial
    const execution = await Execution.create({
      workflow_id: workflow.id,
      trigger_type: eventType,
      payload,
      status: "pending",
    });

    try {
      // Obtener acciones ordenadas
      const actions = await Action.findAll({
        where: { workflow_id: workflow.id },
        order: [["order_index", "ASC"]],
      });

      // Ejecutar cada acción
      for (const action of actions) {
        await executeAction(action.type, action.config, payload);
      }

      // Marcar como éxito
      await execution.update({ status: "success", finished_at: new Date() });
      Logger.info(`[FlowSync] Flujo ${workflow.id} ejecutado con éxito`);
    } catch (error: any) {
      // Registrar fallo
      await execution.update({
        status: "failed",
        error_message: error.message || "Error desconocido",
        finished_at: new Date(),
      });
      Logger.error(`[FlowSync] Error en flujo ${workflow.id}:`, error.message);
    }
  }
};

// Ejecuta una acción específica
async function executeAction(type: string, config: any, payload: object) {
  switch (type) {
    case "webhook":
      await callWebhook(config.url, config.method || "POST", {
        ...payload,
        ...config.body,
      });
      break;

    case "log_event":
      Logger.info(
        `[Custom Log] ${config.message || "Evento registrado"}`,
        payload,
      );
      break;

    default:
      Logger.warn(`[FlowSync] Acción desconocida: ${type}`);
  }
}

async function callWebhook(url: string, method: string, data: object) {
  try {
    await axios({
      url,
      method: method.toLowerCase(),
      data,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    throw new Error(`Webhook falló (${url}): ${error.message}`);
  }
}
