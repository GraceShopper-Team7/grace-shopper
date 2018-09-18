'use strict'

const db = require('../server/db')
const {
  User,
  Address,
  Category,
  Order,
  OrderProduct,
  Review,
  Role,
  Type,
  Product
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const roles = [
    {
      role: 'admin'
    },
    {
      role: 'customer'
    }
  ]
  const users = [
    {
      firstName: 'Joe',
      lastName: 'Thomas',
      phoneNumber: '6095555555',
      username: 'joe_thomas',
      email: 'joethomas123@gmail.com',
      password: '123',
      roleId: 1
    },
    {
      firstName: 'Peter',
      lastName: 'Smith',
      phoneNumber: '6095020955',
      username: 'peter_smith_007',
      email: 'petersmith1909@ymail.com',
      password: '456',
      roleId: 1
    },
    {
      firstName: 'Lauren',
      lastName: 'Taylor',
      phoneNumber: '6091297846',
      username: 'lauren_01_taylor',
      email: 'laur_taylor@gmail.com',
      password: '100',
      roleId: 2
    },
    {
      firstName: 'Rose',
      lastName: 'Taylor',
      phoneNumber: '7145355675',
      username: ' rose45_taylor',
      email: 'rosetaylor45@gmail.com',
      password: '109',
      roleId: 1
    },
    {
      firstName: 'Holly',
      lastName: 'Davies',
      phoneNumber: '8188937816',
      username: 'daviesholly75',
      email: 'daviesholly1975@gmail.com',
      password: '109',
      roleId: 2
    }
  ]
  const products = [
    {
      title: 'Invisibilitea',
      imageUrl: 'INVISIBILITEA.PNG',
      price: 183,
      description:
        'feeling a bit conspicuous? drink this tea to fade in the background for a moment or so. Fragrant and subtle flavors with soft floral notes.',
      typeId: 1,
      ingredients: ['honeysuckle', 'unicorn tears', 'leprechaun yawns'],
      inventoryQty: 56
    },
    {
      title: 'Honestea',
      imageUrl: 'HONESTEA.PNG',
      price: 764,
      description:
        'trying to catch someone in a lie? brew the culprit a bit of Honestea. this black tea will sniff out the whitest of lies.',
      typeId: 2,
      ingredients: ['licorice', 'fairy dust', 'cobwebs'],
      inventoryQty: 88
    },
    {
      title: 'Raritea',
      //imageUrl: 'img3.jpg',
      price: 999,
      description:
        'Like a black swan, this tea is hard stuff to find. If it is in stock, gab it while you can--you will not regret it. Smooth and sweet with a bit of bite.',
      typeId: 3,
      ingredients: ['sun dried fig', 'hazel', 'four leaf clover'],
      inventoryQty: 2
    },
    {
      title: 'Electricitea',
      //imageUrl: 'img3.jpg',
      price: 678,
      description:
        'Put somes pep in your step and edge to your soul. Impossibly incandescent.Slimy and suave like an electric eel. Ginger and firefly flavors blend to give a unique rounding out to this tea',
      typeId: 4,
      ingredients: ['black pepper', 'crushed fireflies', 'ginger'],
      inventoryQty: 50
    },
    {
      title: 'Toxicitea',
      imageUrl: 'TOXICITEA.PNG',
      price: 678,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      typeId: 3,
      ingredients: ['hemlock', 'rattlesnake venom', 'fennel'],
      inventoryQty: 968
    },
    {
      title: 'Puritea',
      imageUrl: 'PURITEA.PNG',
      price: 1111,
      description:
        'Tast the angelic, innocent and clean qualities of the tea. Even just a whiff will give your soul short refuge from all your sins. The acidity of the lemon plays with the spiky texture of the crushed pearl. Warning: this tea has a particular flavor and may give you cottonmouth. ',
      typeId: 2,
      ingredients: ['pearl', 'cotton', 'lemon'],
      inventoryQty: 14
    },
    {
      title: 'Expressivitea',
      imageUrl: 'EXPRESSIVITEA.PNG',
      price: 1111,
      description:
        'Free your souls and let your flag--however it looks, feels,sounds-FLY! Free yourself on inhibitions and find the courage to let go of your inhibitions. Give this tea to your uptight friend (you know the one)...or your mother. This flavor is fresh, clear and a bit earthy.',
      typeId: 1,
      ingredients: ['juniper berry', 'tea tree oil', 'acorn essence'],
      inventoryQty: 16
    },
    {
      title: 'High Tea',
      //imageUrl: 'img3.jpg',
      price: 420,
      description:
        'A crowd pleaser, this special tea may still be illegal in some states. Please drink with care. The plant is carefully cultivated and hearvested annually on the April full moon at the 20th hour. Will cause languid attitudes and laid back behaviors in most. ',
      typeId: 2,
      ingredients: ['canabis bud', 'mountain yam', 'sea mist'],
      inventoryQty: 420
    },
    {
      title: 'Vitalitea',
      //imageUrl: 'img3.jpg',
      price: 778,
      description:
        'Banish your lethargic behavior, weak breathing and downcast outlook with a cup of Vitalitea. Feel as strong an ox, as invicible as a bull--as pulsing as a beating heart in love. Tangy and metallic notes permeated this tea.',
      typeId: 3,
      ingredients: ['freckled banana peel', 'marrow', 'rose hips'],
      inventoryQty: 50
    },
    {
      title: 'Obscenitea',
      imageUrl: 'OBSCENITEA.PNG',
      price: 659,
      description:
        'For your worst enemy, or just your frenemey. Help show the world who they really are. Brew them a cup of this and you will have them spewing @#%$, *@$% & @%^&%s all week long. Be sure to brew for ten minutes in 89.9 degree water.',
      typeId: 1,
      ingredients: ['brass', 'hibiscus', 'distilled acid rain salt'],
      inventoryQty: 50
    },
    {
      title: 'Invincibilitea',
      //imageUrl: 'img3.jpg',
      price: 5988,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 2,
      ingredients: ['lotus blossom', 'fine coral', 'pheonix egg'],
      inventoryQty: 50
    },
    {
      title: 'Eccentricitea',
      //imageUrl: 'img3.jpg',
      price: 7988,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 2,
      ingredients: ['hibiscus', 'ground pebble', 'river currents'],
      inventoryQty: 50
    },
    {
      title: 'Tranquilitea',
      //imageUrl: 'img3.jpg',
      price: 7988,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 3,
      ingredients: ['soft fern', 'stream silt', 'blackberry currant'],
      inventoryQty: 50
    },
    {
      title: 'Responsibilitea',
      //imageUrl: 'img3.jpg',
      price: 1076,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 1,
      ingredients: ['flint', 'lemongrass', 'dried orange peel'],
      inventoryQty: 50
    },
    {
      title: 'Paradoxicalitea',
      //imageUrl: 'img3.jpg',
      price: 1076,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 2,
      ingredients: ['manuka honey', 'dandelion', 'cloud whisp'],
      inventoryQty: 50
    },
    {
      title: 'Creativitea',
      //imageUrl: 'img3.jpg',
      price: 3057,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 3,
      ingredients: ['puka whiskers', 'lavender', 'pine cone bits'],
      inventoryQty: 50
    },
    {
      title: 'Integritea',
      //imageUrl: 'img3.jpg',
      price: 3057,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 3,
      ingredients: ['lava powder', 'shaved snake skin', 'raspberry leaf'],
      inventoryQty: 50
    },
    {
      title: 'Conformitea',
      imageUrl: 'CONFORMITEA.PNG',
      price: 3057,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 1,
      ingredients: ['sheeps wool', 'vermillion thread', 'red ant legs'],
      inventoryQty: 50
    },
    {
      title: 'Impossibilitea',
      //imageUrl: 'img3.jpg',
      price: 3057,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 2,
      ingredients: ['royal jelly', 'gold dust', 'sun beam'],
      inventoryQty: 50
    },
    {
      title: 'Tealeportation',
      //imageUrl: 'img3.jpg',
      price: 3057,
      description:
        '***Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      typeId: 2,
      ingredients: ['dove feather', 'puffed corn kernel', 'mountain shadow'],
      inventoryQty: 50
    }
  ]
  // const categories = [
  // 	{
  // 		name: 'tea bag',
  // 		description:
  // 			'A tea bag is a small, porous, sealed bag or packet containing dried plant material, which is immersed in boiling water to make a tea or an infusion.'
  // 	},
  // 	{
  // 		name: 'loose leaf',
  // 		description:
  // 			'Tea is an aromatic beverage commonly prepared by pouring hot or boiling water over cured leaves of the Camellia sinensis, an evergreen shrub(bush) native to Asia.'
  // 	},
  // 	{
  // 		name: 'iced tea',
  // 		description:
  // 			'Iced tea (or ice tea) is a form of cold tea. Though usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar, syrup and/or apple slices.'
  // 	}
  // ];
  const types = [
    {
      name: 'black tea',
      caffeineStrength: 'strong'
    },
    {
      name: 'green tea',
      caffeineStrength: 'weak'
    },
    {
      name: 'white tea',
      caffeineStrength: 'mild'
    },
    {
      name: 'herbal tea',
      caffeineStrength: 'none',
      categoryId: 2
    }
  ]
  const addresses = [
    {
      address: '41 Par Harbor Way',
      city: 'Salem',
      state: 'SC',
      country: 'USA',
      zipcode: '29676',
      isPrimary: true,
      userId: 1
    },
    {
      address: '2339 Macungie Dr',
      city: 'Macungie',
      state: 'PA',
      country: 'USA',
      zipcode: '18062',
      isPrimary: true,
      userId: 2
    },
    {
      address: '18 Canal View Dr',
      city: 'WaynesVille',
      state: 'NC',
      country: 'USA',
      zipcode: '28738',
      isPrimary: true,
      userId: 3
    },
    {
      address: '45 Main St',
      city: 'Woodbridge',
      state: 'NJ',
      country: 'USA',
      zipcode: '07008',
      isPrimary: false,
      userId: 3
    }
  ]

  const orders = [
    {
      status: 'created',
      userId: 1
    },
    {
      status: 'shipped',
      tracking: 'GS3474',
      stripeToken: 'tok_Efu42LDeF89KL',
      userId: 1
    },
    {
      status: 'delivered',
      tracking: 'GS1000',
      stripeToken: 'tok_i56WoP90BgDt4',
      userId: 1
    },
    {
      status: 'ordered',
      stripeToken: 'tok_i45GJk68NOe90',
      userId: 2
    },
    {
      status: 'ordered',
      stripeToken: 'tok_yO98JgHTR10dJ',
      userId: 3
    }
  ]
  const ordersProducts = [
    {
      quantity: 1,
      price: 183,
      orderId: 1,
      productId: 1
    },
    {
      quantity: 2,
      price: 1528,
      orderId: 2,
      productId: 2
    },
    {
      quantity: 3,
      price: 2997,
      orderId: 3,
      productId: 3
    },
    {
      quantity: 4,
      price: 2712,
      orderId: 4,
      productId: 4
    },
    {
      quantity: 5,
      price: 3390,
      orderId: 5,
      productId: 5
    },
    {
      quantity: 6,
      price: 6666,
      orderId: 1,
      productId: 6
    },
    {
      quantity: 2,
      price: 2222,
      orderId: 4,
      productId: 7
    },
    {
      quantity: 1,
      price: 420,
      orderId: 5,
      productId: 8
    }
  ]

  const reviews = [
    {
      rating: 4,
      content: 'The most delicious things to touch my tongue.',
      userId: 1,
      productId: 1
    },
    {
      rating: 2,
      content: 'Bitter and too spicy!!!!',
      userId: 2,
      productId: 1
    },
    {
      rating: 5,
      content: 'Hit the spot',
      userId: 3,
      productId: 2
    },
    {
      rating: 3,
      content: 'I feel cleansed and pure but wish there was a stronger flavor',
      userId: 4,
      productId: 3
    },
    {
      rating: 4,
      content:
        'Brewed some of this and squeezed it across the terrace to combat the ants, worked as planned though some stronger ones remained alive.',
      userId: 5,
      productId: 1
    }
  ]

  // const typesCategories = [
  // 	{
  // 		typeId: 1,
  // 		categoryId: 2
  // 	},
  // 	{
  // 		typeId: 2,
  // 		categoryId: 2
  // 	},
  // 	{
  // 		typeId: 1,
  // 		categoryId: 1
  // 	}
  // ];
  for (let i = 0; i < roles.length; i++) {
    await Role.create(roles[i])
  }
  for (let i = 0; i < types.length; i++) {
    await Type.create(types[i])
  }
  // for (let i = 0; i < categories.length; i++) {
  // 	await Category.create(categories[i]);
  // }
  for (let i = 0; i < users.length; i++) {
    await User.create(users[i])
  }
  for (let i = 0; i < addresses.length; i++) {
    await Address.create(addresses[i])
  }
  for (let i = 0; i < orders.length; i++) {
    await Order.create(orders[i])
  }
  for (let i = 0; i < products.length; i++) {
    await Product.create(products[i])
  }
  for (let i = 0; i < reviews.length; i++) {
    await Review.create(reviews[i])
  }
  for (let i = 0; i < ordersProducts.length; i++) {
    await OrderProduct.create(ordersProducts[i])
  }

  // for (let i = 0; i < typesCategories.length; i++) {
  // 	await db.TypeCategory.create(typesCategories[i]);
  // }

  // await Category.addTypes(Types);
  // await Type.addCategories(Categories);
  // for (let i = 0; i < TypesCategories.length; i++) {
  // 	await .create(TypesCategories[i]);
  // }
  // const reviews = await Reviews.map((review) => {
  // 	Review.create(review);
  // });
  // const orderproducts = await OrdersProducts.map((orderproduct) => {
  // 	OrderProduct.create(orderproduct);
  // });
  // // const typescategories = await Promise.all(
  // // 	TypesCategories.map((typecategory) => {
  // // 		TypeCategory.create(typecategory);
  // // 	})
  // // );

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
