import User from "./User";
import Workflow from "./Workflow";
import Trigger from "./Trigger";
import Action from "./Action";
import Execution from "./Execution";

//Relaciones
User.hasMany(Workflow, { foreignKey: 'user_id' });
Workflow.belongsTo(User, { foreignKey: 'user_id' });

Workflow.hasOne(Trigger, { foreignKey: 'workflow_id' });
Trigger.belongsTo(Workflow, { foreignKey: 'workflow_id' });

Workflow.hasMany(Action, { foreignKey: 'workflow_id' });
Action.belongsTo(Workflow, { foreignKey: 'workflow_id' });

export {
  User,
  Workflow,
  Trigger,
  Action,
  Execution,
};