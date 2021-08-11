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

		// get count of productions in cart
		let sessionId = req.signedCookies.sessionId
		let x = db.get('sessions')
			.find({ id: sessionId })
			.value()
			.cart
		let countCartAr = []
		for (let key in x) {
			countCartAr.push(x[key])
		}
		let countProductInCart = countCartAr.reduce((total, count) => total + count)
		res.locals.countProductInCart = countProductInCart

    	res.render('products/index', {
    		productions: db.get('productions').value().slice((page - 1) * perPage, page*perPage),
    		countAr,
    		curPage: page
    	})
	},

	create(req, res, next) {
    	res.render('products/create')
	},


	search(req, res) {
	    var q = req.query.q.toLowerCase()
	    var matchProductions = db.get('productions').value().filter(product => product.name.toLowerCase().includes(q))
	    res.render('products/index', { productions: matchProductions, countAr: null })
	},

	postCreate(req, res, next) {
		req.body.id = shortid.generate()

	    if (productMiddleware.createProductValidate(req, res, next).length === 0) {
	    	db.get('productions').push(req.body).write() 
			res.redirect('/products')
	    }
	}
}