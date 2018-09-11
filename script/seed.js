'use strict';

const db = require('../server/db');
const { User, Address, Category, Order, OrderProduct, Review, Role, Type } = require('../server/db/models');

async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');
	const Users = [
		{
			firstName: 'Joe',
			lastName: 'Thomas',
			phoneNumber: '609-555-5555',
			username: 'joe_thomas',
			email: 'joethomas123@gmail.com',
			password: '123'
		},
		{
			firstName: 'Peter',
			lastName: 'Smith',
			phoneNumber: '609-502-0955',
			username: 'peter_smith_007',
			email: 'petersmith1909@ymail.com',
			password: '456'
		},
		{
			firstName: 'Lauren',
			lastName: 'Taylor',
			phoneNumber: '609-129-7846',
			username: 'lauren_01_taylor',
			email: 'laur_taylor@gmail.com',
			password: '100'
		},
		{
			firstName: 'Rose',
			lastName: 'Taylor',
			phoneNumber: '714-535-5675',
			username: ' rose45_taylor',
			email: 'rosetaylor45@gmail.com',
			password: '109'
		},
		{
			firstName: 'Holly',
			lastName: 'Davies',
			phoneNumber: '818-893-7816',
			username: 'daviesholly75',
			email: 'daviesholly1975@gmail.com',
			password: '109'
		}
	];
	const Addresses = [
		{
			address: '1809 Plaza Dr',
			city: 'Woodbridge',
			state: 'NJ',
			country: 'USA',
			zipcode: '07008',
			isPrimary: true
		},
		{
			address: '41 Par Harbor Way',
			city: 'Salem',
			state: 'SC',
			country: 'USA',
			zipcode: '29676',
			isPrimary: false
		},
		{
			address: '2339 Macungie Dr',
			city: 'Macungie',
			state: 'PA',
			country: 'USA',
			zipcode: '18062',
			isPrimary: true
		},
		{
			address: '18 Canal View Dr',
			city: 'WaynesVille',
			state: 'NC',
			country: 'USA',
			zipcode: '28738',
			isPrimary: true
		},
		{
			address: ' 45 Main St',
			city: 'Woodbridge',
			state: 'NJ',
			country: 'USA',
			zipcode: '07008',
			isPrimary: false
		}
	];
	const Categories = [
		{
			name: 'Tea Bags',
			description:
				'A tea bag is a small, porous, sealed bag or packet containing dried plant material, which is immersed in boiling water to make a tea or an infusion.'
		},
		{
			name: 'Loose Leaf Tea',
			description:
				'Tea is an aromatic beverage commonly prepared by pouring hot or boiling water over cured leaves of the Camellia sinensis, an evergreen shrub(bush) native to Asia.'
		},
		{
			name: 'Iced Tea',
			description:
				'Iced tea (or ice tea) is a form of cold tea. Though usually served in a glass with ice, it can refer to any tea that has been chilled or cooled. It may be sweetened with sugar, syrup and/or apple slices.'
		}
	];
	const Orders = [
		{
			status: ' ordered',
			tracking: 'GS4536',
			stripeToken: 'tok_1AH2kcF89KLdg'
		},
		{
			status: 'shipped',
			tracking: 'GS3474',
			stripeToken: 'tok_Efu42LDeF89KL'
		},
		{
			status: 'delivered',
			tracking: 'GS1000',
			stripeToken: 'tok_i56WoP90BgDt4'
		},
		{
			status: 'delivered',
			tracking: 'GS8965',
			stripeToken: 'tok_i45GJk68NOe90'
		},
		{
			status: 'ordered',
			tracking: 'GS1078',
			stripeToken: 'tok_yO98JgHTR10dJ'
		}
	];
	const Reviews = [
		{
			rating: 4,
			content: 'The most delicious things to touch my tongue.'
		},
		{
			rating: 2,
			content: 'Bitter and too spicy!!!!'
		},
		{
			rating: 5,
			content: 'Hit the spot'
		},
		{
			rating: 3,
			content: 'I feel cleansed and pure but wish there was a stronger flavor'
		},
		{
			rating: 4,
			content:
				'Brewed some of this and squeezed it across the terrace to combat the ants, worked as planned though some stronger ones remained alive.'
		}
	];
	const Roles = [
		{
			role: 'admin'
		},
		{
			role: 'customer'
		},
		{
			role: 'admin'
		},
		{
			role: 'customer'
		}
	];
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
			caffeineStrength: 'none'
		}
	];

	const users = await Promise.all(
		Users.map((user) => {
			User.create(user);
		})
	);
	const addresses = await Promise.all(
		Addresses.map((address) => {
			Address.create(address);
		})
	);
	const categories = await Promise.all(
		Categories.map((category) => {
			Category.create(category);
		})
	);
	const orders = await Promise.all(
		Orders.map((order) => {
			Order.create(order);
		})
	);
	const reviews = await Promise.all(
		Reviews.map((review) => {
			Review.create(review);
		})
	);
	const roles = await Promise.all(
		Roles.map((role) => {
			Role.create(role);
		})
	);
	const types = await Promise.all(
		Types.map((type) => {
			Type.create(type);
		})
	);
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
