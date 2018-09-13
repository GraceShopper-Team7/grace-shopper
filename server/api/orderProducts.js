const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await OrderProduct.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
