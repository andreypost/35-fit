const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
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
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
  },
  {
    timestamps: false,
  }
);

// Hash password before saving a new user
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;

// module.exports = (DataTypes, sequelize) => {
//   const User = sequelize.define("User", {
//     id: {
//       type: DataTypes.INTEGER,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     lastEmail: {
//       type: DataTypes.TIME,
//     },
//   });
//   return User;
// };
