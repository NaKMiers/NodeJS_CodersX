module.exports = {
    postCreate(req, res, next) {
        var errors = []
        if (!req.body.name) {
            errors.push('Name is required')
        }
        if (!req.body.phone) {
            errors.push('Phone is required')
        }
        if (!req.body.email) {
            errors.push('Email is required')
        }
        if (!req.body.password) {
            errors.push('Password is required')
        }
        if (!req.file) {
            errors.push('Avatar is required')
        }
        if (errors.length) {
            res.render('users/create', { errors, values: req.body })
            return
        }

        next()
    },
}
