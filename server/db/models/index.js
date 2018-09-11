const Address = require('./address')
const Category = require('./category')
const Order = require('./Order')
const OrderProduct = require('./OrderProduct')
const Product = require('./product')
const Review = require('./review')
const Role = require('./role')
const Type = require('./type')
const User = require('./user')

Address.belongsTo(User)
User.hasMany(Address)

Review.belongsTo(User)
Review.belongsTo(Product)
User.hasMany(Review)
Product.hasMany(Review)

Category.hasMany(Type)
Type.belongsToMany(Category, {through: 'TypeCategory'})

Type.hasMany(Product)
Product.belongsTo(Type)
Product.belongsToMany(Category, {through: 'ProductCategory'})

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {through: OrderProduct})
Order.hasMany(Product)

module.exports = {
  Address,
  Category,
  Order,
  OrderProduct,
  Product,
  Review,
  Role,
  Type,
  User
}
