// src/models/Execution.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ExecutionAttributes {
  id: string;
  workflow_id: string;
  trigger_type: string;
  status: 'pending' | 'success' | 'failed';
  error_message: string | null;
  payload: object;
  started_at: Date;
  finished_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ExecutionCreationAttributes
  extends Optional<
    ExecutionAttributes,
    'id' | "started_at" |  'created_at' | 'updated_at' | 'finished_at' | 'error_message'
  > {}

class Execution
  extends Model<ExecutionAttributes, ExecutionCreationAttributes>
  implements ExecutionAttributes
{
  public id!: string;
  public workflow_id!: string;
  public trigger_type!: string;
  public status!: 'pending' | 'success' | 'failed';
  public error_message!: string | null;
  public payload!: object;
  public started_at!: Date;
  public finished_at!: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Execution.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workflow_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'workflows', key: 'id' },
    },
    trigger_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    finished_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'executions',
    timestamps: true,
  }
);

export default Execution;