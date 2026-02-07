import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface WorkflowAttributes {
  id: string;
  user_id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

interface WorkflowCreationAttributes
  extends Optional<
    WorkflowAttributes,
    "id" | "created_at" | "updated_at" | "description" | "is_active"
  > {}

class Workflow
  extends Model<WorkflowAttributes, WorkflowCreationAttributes>
  implements WorkflowAttributes
{
  public id!: string;
  public user_id!: string;
  public name!: string;
  public description!: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Workflow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "workflows",
  }
);

export default Workflow;
