// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../config/database";
// import bcrypt from "bcrypt";

// interface UserAttributes {
//   id: number;
//   email: string;
//   password: string;
//   name?: string;
// }

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// class User
//   extends Model<UserAttributes, UserCreationAttributes>
//   implements UserAttributes
// {
//   public id!: number;
//   public email!: string;
//   public password!: string;
//   public name?: string;

//   // public readonly createdAt!: Date;
//   // public readonly updatedAt!: Date;

//   public async checkPassword(inputPassword: string): Promise<boolean> {
//     return bcrypt.compare(inputPassword, this.password);
//   }
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     tableName: "Users",
//     timestamps: false,
//   }
// );

// User.beforeCreate(async (user: UserAttributes) => {
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
// });

// export default User;
