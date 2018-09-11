'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

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
	const users = await Users.map((user) => {
		User.create({
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			username: user.username,
			email: user.email,
			password: user.password
		});
	});

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
