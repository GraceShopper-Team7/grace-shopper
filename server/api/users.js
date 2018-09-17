const router = require('express').Router()
const {Address, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/addresses', async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: {userId: req.params.userId}
    })
    res.json(addresses)
  } catch (err) {
    next(err)
  }
})
