const router = require('express').Router()
const {OrderProduct, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Order.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
