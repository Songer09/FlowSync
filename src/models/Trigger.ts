import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import type Workflow  from './Workflow'

interface TriggerAttributes {
  id: string;
  workflow_id: string;
  type: string;
  config: object;
  created_at: Date;
  updated_at: Date;
}

interface TriggerCreationAttributes
  extends Optional<TriggerAttributes, "id" | "created_at" | "updated_at"> {}

class Trigger
  extends Model<TriggerAttributes, TriggerCreationAttributes>
  implements TriggerAttributes
{
  declare Workflow?: Workflow;
  public id!: string;
  public workflow_id!: string;
  public type!: string;
  public config!: object;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Trigger.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workflow_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "workflows",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    config: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "triggers",
  }
);

export default Trigger;
