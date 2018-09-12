const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})
/*
router.delete('/:productId', async (req, res, next) => {
	try {
		const id = req.params.productId;
		await Product.destroy({ where: { id } });
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});*/
