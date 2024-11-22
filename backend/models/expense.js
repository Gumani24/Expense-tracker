const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('.User');
const Category = require('./Category');
const PaymentMethod = require('./PaymentMethod');

const Expense = sequelize.define('Expense', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: true
});

// Define relationships
Expense.belongsTo(User, { foreignKey: 'userId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });
Expense.belongsTo(PaymentMethod, { foreignKey: 'paymentMethodId' });

module.exports = Expense;