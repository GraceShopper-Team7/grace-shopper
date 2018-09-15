const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router
const Sequelize = require('sequelize')

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId

    const products = await Order.findAll({
      where: {
        userId
      },
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

router.delete('/:productId', async (req, res, next) => {
  try {
    console.log('GOT IN HERE, the delete route for adding product to cart!')
    const productId = req.params.productId
    const userId = req.user.dataValues.id
    console.log('productId: ', productId)

    const orderToRemoveProductFrom = await Order.findOne({
      where: {
        status: 'created',
        userId
      }
    })

    const orderId = orderToRemoveProductFrom.dataValues.id
    const theProduct = await OrderProduct.findOne({
      where: {
        orderId,
        productId
      }
    })

    if (!theProduct) {
      res.sendStatus(404)
    } else {
      const removedProduct = theProduct
      await theProduct.destroy()

      const removeQuantity = removedProduct.quantity
      const newProductQty = await Product.findById(productId)
      await newProductQty.increment('inventoryQty', {by: removeQuantity})

      res.json()
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('GOT IN HERE, the post route for adding product to cart!')

    const product = req.body.product
    const user = req.body.user

    const openOrderForUser = await Order.findOne({
      where: {
        userId: user.id,
        status: 'created'
      }
    })
    //console.log('ORDERID*****: ', openOrderForUser.dataValues.id)

    const addQuantity = product.quantity
    const newProductQty = await Product.findById(product.id)

    if (openOrderForUser) {
      const checkOrderProduct = await OrderProduct.findOne({
        where: {
          productId: product.id,
          orderId: openOrderForUser.dataValues.id
        }
      })

      await newProductQty.decrement('inventoryQty', {by: addQuantity})

      if (checkOrderProduct) {
        const newOrderProduct = await OrderProduct.update(
          {
            quantity: Sequelize.literal('quantity + 1')
          },
          {
            where: {
              productId: product.id,
              orderId: openOrderForUser.dataValues.id
            }
            // include: [
            //   {
            //     model: Product
            //   }
            // ]
          }
        )
        //example
        // const products = await Order.findAll({
        //   where: {
        //     userId
        //   },
        //   include: [
        //     {
        //       model: Product
        //     }
        //   ]
        // })

        console.log('newOrderProduct: ', newOrderProduct)
        res.json(newOrderProduct)
      } else {
        const newOrderProduct = await OrderProduct.create({
          quantity: 1,
          price: product.price,
          orderId: openOrderForUser.dataValues.id,
          productId: product.id
        })
        console.log('newOrderProduct: ', newOrderProduct)
        res.json(newOrderProduct)
      }
    } else {
      const createNewOrderForUser = await Order.create({
        userId: user.id,
        status: 'created',
        tracking: 'we will generateupon checkout321',
        stripeToken: 'this will be generated'
      })
      console.log('createNewOrderForUser: ', createNewOrderForUser)
      await newProductQty.decrement('inventoryQty', {by: addQuantity})
      const newOrderProduct = await OrderProduct.create({
        quantity: 1,
        price: product.price,
        orderId: createNewOrderForUser.id,
        productId: product.id
      })
      console.log('newOrderProduct: ', newOrderProduct)
      res.json(newOrderProduct)
    }
  } catch (err) {
    console.log(
      'ERROR: GOT IN HERE, the post route for adding product to cart!'
    )
    console.error(err)
    next(err)
  }
})

//check if there is a 'created' order in the Orders table
//if not a make a new 'create' order
//add item to OrderProducts table, orderId as the 'created' order
//--->delete 1 from inventory quantity in products table
