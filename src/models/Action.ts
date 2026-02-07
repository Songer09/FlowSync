import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface ActionAttributes {
  id: string;
  workflow_id: string;
  type: string;
  config: object;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

interface ActionCreationAttributes extends Optional<ActionAttributes, "id" | "created_at" | "updated_at" > {}

class Action
  extends Model<ActionAttributes, ActionCreationAttributes>
  implements ActionAttributes
{
  public id!: string;
  public workflow_id!: string;
  public type!: string;
  public config!: object;
  public order_index!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Action.init(
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
      allowNull: false,
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "actions",
  }
);

export default Action;
