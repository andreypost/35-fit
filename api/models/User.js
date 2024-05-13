const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
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
