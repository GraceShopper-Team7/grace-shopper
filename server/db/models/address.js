const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true
    }
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
  },
  isPrimary: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Address
