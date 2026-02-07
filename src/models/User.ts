// src/models/User.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Método para comparar contraseñas
  public async comparePassword(candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [6, 100],
      },
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
    tableName: "users",
    hooks: {
      beforeCreate: async (user: User) => {
        const saltRounds = parseInt(process.env.BCRYPT_SALT || "12", 10);
        user.password = await bcrypt.hash(user.password, saltRounds);
      },
    },
  }
);

export default User;
