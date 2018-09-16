// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const token = req.body.token
    const amount = req.body.amount
    const orderId = req.body.orderId
    await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      description: `GraceShopper Tea, Order #${orderId}`,
      source: token.id
    })
    // maybe we should add a table for stripe data.
    await Order.update(
      {status: 'ordered', stripeToken: token.id},
      {where: {id: orderId}}
    )
    res.json()
  } catch (err) {
    next(err)
  }
})
