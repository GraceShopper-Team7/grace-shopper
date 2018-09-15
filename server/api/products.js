const router = require('express').Router()
const {Product, Type} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    // const products = await Product.findAll({
    //   inlclude: [model: {Type}]
    // })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const product = await Product.findById(id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const [numAffectedRows, [updatedProduct]] = await Product.update(
      req.body.product,
      {
        where: {id: req.params.productId},
        returning: true,
        fields: Object.keys(req.body.product)
      }
    )
    if (!numAffectedRows) {
      res.sendStatus(404)
      return
    }
    res.json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const numAffectedRows = await Product.destroy({
      where: {id: req.params.productId}
    })

    if (!numAffectedRows) {
      res.sendStatus(404)
      return
    }
    res.status(204).json()
  } catch (err) {
    next(err)
  }
})
