const md5 = require('md5')
const db = require('../db')

module.exports = {
	login(req, res) {
    	res.render('auth/login')
	},

	postLogin(req, res) {
		let email = req.body.email
		let password = req.body.password

		let user = db.get('users').find({ email: email }).value()

		if (!user) {
			res.render('auth/login', { errors: [ 'User does not exist.' ], values: req.body })
			return
		}

		if (!password) {
			res.render('auth/login', { errors: [ 'Password is required' ], values: req.body })
			return
		}

		var hashPasword = md5(password)
``
		if (user.password !== hashPasword) {
			res.render('auth/login', { errors: [ 'Wrong password' ], values: req.body })
		} else {
			res.cookie('userId', user.id, {
				signed: true
			})
			res.redirect('/users')
		}
	}
}