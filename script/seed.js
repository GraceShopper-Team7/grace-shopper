'use strict';

const db = require('../server/db');
const { User, Address, Category, Order, OrderProduct, Review, Role, Type, Product } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const Roles = [
		{
			role: 'admin'
		},
		{
			role: 'customer'
		}
	];
	const Users = [
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
	];
	const Products = [
		{
			title: 'Invisibilitea',
			imageUrl: 'img1.jpg',
			price: 18.56,
			description:
				'feeling a bit conspicuous? drink this tea to fade in the background for a moment or so. Fragrant and subtle flavors with soft floral notes.',
			typeId: 1,
			categoryId: 2,
			ingredients: [ 'honeysuckle', 'unicorn tears', 'leprechaun yawns' ],
			inventoryQty: 56
		},
		{
			title: 'Honestea',
			imageUrl: 'img2.jpg',
			price: 76.55,
			description:
				'trying to catch someone in a lie? brew the culprit a bit of Honestea. this black tea will sniff out the whitest of lies.',
			typeId: 2,
			categoryId: 2,
			ingredients: [ 'licorice', 'fairy dust', 'cobwebs' ],
			inventoryQty: 88
		},
		{
			title: 'Raritea',
			imageUrl: 'img3.jpg',
			price: 99.99,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			typeId: 3,
			categoryId: 1,
			ingredients: [ 'sun dried fig', 'hazel', 'four leaf clover' ],
			inventoryQty: 2
		}
	];
	// const Categories = [
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
	const Types = [
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
	];
	const Addresses = [
		{
			address: '41 Par Harbor Way',
			city: 'Salem',
			state: 'SC',
			country: 'USA',
			zipcode: '29676',
			isPrimary: false,
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
	];

	const Orders = [
		{
			status: 'ordered',
			tracking: 'GS4536',
			stripeToken: 'tok_1AH2kcF89KLdg',
			userId: 1
		},
		{
			status: 'shipped',
			tracking: 'GS3474',
			stripeToken: 'tok_Efu42LDeF89KL',
			userId: 2
		},
		{
			status: 'delivered',
			tracking: 'GS1000',
			stripeToken: 'tok_i56WoP90BgDt4',
			userId: 3
		},
		{
			status: 'delivered',
			tracking: 'GS8965',
			stripeToken: 'tok_i45GJk68NOe90',
			userId: 2
		},
		{
			status: 'ordered',
			tracking: 'GS1078',
			stripeToken: 'tok_yO98JgHTR10dJ',
			userId: 4
		}
	];
	const OrdersProducts = [
		{
			quantity: 5,
			price: 12.24,
			orderId: 2,
			productId: 1
		},
		{
			quantity: 20,
			price: 30.56,
			orderId: 1,
			productId: 2
		}
	];

	const Reviews = [
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
	];

	// const TypesCategories = [
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
	for (let i = 0; i < Roles.length; i++) {
		await Role.create(Roles[i]);
	}
	for (let i = 0; i < Types.length; i++) {
		await Type.create(Types[i]);
	}
	// for (let i = 0; i < Categories.length; i++) {
	// 	await Category.create(Categories[i]);
	// }
	for (let i = 0; i < Users.length; i++) {
		await User.create(Users[i]);
	}
	for (let i = 0; i < Addresses.length; i++) {
		await Address.create(Addresses[i]);
	}
	for (let i = 0; i < Orders.length; i++) {
		await Order.create(Orders[i]);
	}
	for (let i = 0; i < Products.length; i++) {
		await Product.create(Products[i]);
	}
	for (let i = 0; i < Reviews.length; i++) {
		await Review.create(Reviews[i]);
	}
	for (let i = 0; i < OrdersProducts.length; i++) {
		await OrderProduct.create(OrdersProducts[i]);
	}

	// for (let i = 0; i < TypesCategories.length; i++) {
	// 	await db.TypeCategory.create(TypesCategories[i]);
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

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
