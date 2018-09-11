const Sequelize = require('sequelize')
const db = require('../db')

const Type = db.define('type', {
  name: {
    type: Sequelize.ENUM('green tea', 'black tea', 'white tea', 'herbal tea'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  caffeineStrength: {
    type: Sequelize.ENUM('strong', 'mild', 'weak', 'none'),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Type;
