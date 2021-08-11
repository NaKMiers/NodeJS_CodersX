const db = require('../db')
const shortid = require('shortid')

module.exports = {
    create(req, res, next) {
        res.render('transfer/create', {
            csrfToken: req.csrfToken(),
        })
    },

    postCreate(req, res, next) {
        var data = {
            id: shortid.generate(),
            amount: parseInt(req.body.amount),
            accountId: req.body.accountId,
            userId: req.signedCookies.userId,
        }

        db.get('transfers').push(data).write()
        res.redirect('/transfer/create')
    },
}
