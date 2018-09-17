const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'default.jpg'
    //allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = Product
