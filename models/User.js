const Sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
    Uname: {
        type: Sequelize.STRING,
        allowNull: false
    },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
        tableName: 'users',
        timestamps: false
});

module.exports = User;
