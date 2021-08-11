const db = require('../db')
const shortid = require('shortid')

const productMiddleware = require('../validate/product.validate')

module.exports = {
	index(req, res) {
		let page = parseInt(req.query.page) || 1
		let perPage = 8
		let pageAmount = 5

		let countAr = []
		for (let i=1; i < pageAmount+1; i++) {
			countAr.push(page+i-3)
		}

    	res.render('products/index', {
    		productions: db.get('productions').value().slice((page - 1) * perPage, page*perPage),
    		countAr,
    		curPage: page
    	})
	},

	create(req, res, next) {
    	res.render('products/create')
	},

	postCreate(req, res, next) {
		req.body.id = shortid.generate()

	    if (productMiddleware.createProductValidate(req, res, next).length === 0) {
	    	db.get('productions').push(req.body).write() 
			res.redirect('/products')
	    }
	}
}