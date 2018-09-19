const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

router.get('/orders', async (req, res, next) => {
  try {
    const ordered = await Order.findAll({
      where: {status: 'ordered'},
      order: ['updatedAt'],
      include: [Product]
    })
    res.json(ordered)
  } catch (err) {
    next(err)
  }
})

router.put('/orders/:orderId', async (req, res, next) => {
  try {
    const [, [shippedOrder]] = await Order.update(
      {status: 'shipped', tracking: req.body.tracking},
      {
        where: {id: req.params.orderId},
        returning: true
      }
    )

    res.json(shippedOrder)
  } catch (err) {
    next(err)
  }
})
