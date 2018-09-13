const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router
router.post('/', async (req, res, next) => {
  try {
    const product = await Review.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})
