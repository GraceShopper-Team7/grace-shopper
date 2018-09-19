const Address = require('./address')
const Category = require('./category')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const Product = require('./product')
const Review = require('./review')
const Role = require('./role')
const Type = require('./type')
const User = require('./user')

User.hasMany(Address)
Address.belongsTo(User)

Review.belongsTo(User)
Review.belongsTo(Product)
User.hasMany(Review)
Product.hasMany(Review)

// Category.hasMany(Product);
// Product.belongsTo(Category);

Role.hasMany(User)
User.belongsTo(Role)

// Category.belongsToMany(Type, { through: 'TypeCategory' });
// Type.belongsToMany(Category, { through: 'TypeCategory' });

Type.hasMany(Product)
Product.belongsTo(Type)
// Product.belongsToMany(Category, { through: 'ProductCategory' });

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: OrderProduct})

module.exports = {
  Address,
  // Category,
  Order,
  OrderProduct,
  Product,
  Review,
  Role,
  Type,
  User
}
