const Sequelize = require('sequelize')
const db = require('../db')

const Role = db.define('role', {
  role: {
    type: Sequelize.ENUM('admin', 'customer'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Role
