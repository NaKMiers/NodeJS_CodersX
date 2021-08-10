const db = require('../db')
const shortid = require('shortid')

module.exports = {
	index(req, res) {
    	res.render('users/index', { users: db.get('users').value() })
	},

	search(req, res) {
	    var q = req.query.q
	    var matchUsers = db.get('users').value().filter(user => user.name.toLowerCase().includes(q.toLowerCase()))
	    res.render('users/index', { users: matchUsers })
	},

	create(req, res) {
	    res.render('users/create')
	},

	get(req, res) {
	    var id = req.params.id
	    var user = db.get('users').find({ id: id }).value()
	    res.render('users/view', { user })
	},

	postCreate(req, res) {
	    req.body.id = shortid.generate()
	    var errors = []

	    if (!req.body.name) {
	    	errors.push('Name is required')
	    }

	    if (!req.body.phone) {
	    	errors.push('Phone is required')
	    }

	    if (errors.length) {
	    	res.render('users/create', { errors, values: req.body })
	    	return 
	    }

	    db.get('users').push(req.body).write()
	    res.redirect('/users')
	},
}