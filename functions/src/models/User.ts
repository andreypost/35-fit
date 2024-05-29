import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcrypt";

class User extends Model {
  public email!: string;
  public password!: string;
  public name?: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

// Hash password before saving a new user
User.beforeCreate(async (user: User) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default User;
