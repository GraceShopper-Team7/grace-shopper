const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('Product routes', () => {
	beforeEach(() => {
		return db.sync({ force: true });
	});

	describe('/api/products/', () => {
		const titleProduct = 'TeaTitle';

		beforeEach(() => {
			return Product.create({
				title: titleProduct
			});
		});

		it('GET /api/products', async () => {
			const res = await request(app).get('/api/products').expect(200);

			expect(res.body).to.be.an('array');
			expect(res.body[1].title).to.be.equal(titleProduct);
		});
		it('DELETE /api/products/:productId', async () => {
			const res = await request(app).delete('/api/products/1').expect(204);

			// expect(res.body).to.be.an('array');
			// expect(res.body[1].title).to.be.equal(titleProduct);
		});
	}); // end describe('/api/products')
}); // end describe('Product routes')
