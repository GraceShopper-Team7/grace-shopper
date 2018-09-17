const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('created', 'ordered', 'delivered', 'shipped'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tracking: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  stripeToken: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
