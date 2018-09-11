const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0,
      max: 1000
    }
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderProduct
