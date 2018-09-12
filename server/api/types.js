const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:typeId', async (req, res, next) => {
  try {
    const typeId = req.params.typeId
    const products = await Product.findAll({
      where: {
        typeId
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})
