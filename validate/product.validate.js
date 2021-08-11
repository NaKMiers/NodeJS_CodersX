const db = require('../db')

module.exports = {
    createProductValidate(req, res, next) {
        let name = req.body.name
        let description = req.body.description
        let price = req.body.price
        let image = req.body.image

        let errors = []

        if (name.length <= 0) {
            errors.push('Name is required')
            res.render('product/create', { errors, values: req.body })
            return
        }

        if (description <= 0) {
            errors.push('Description is required')
            res.render('product/create', { errors, values: req.body })
            return
        }

        if (price.length <= 0) {
            errors.push('Price is required')
            res.render('product/create', { errors, values: req.body })
            return
        }

        if (price < 0) {
            errors.push('Price is greater than or equal to 0$')
            res.render('product/create', { errors, values: req.body })
            return
        }

        function validURL(str) {
            var pattern = new RegExp(
                '^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$',
                'i',
            ) // fragment locator
            return !!pattern.test(str)
        }

        if (image.length <= 0) {
            errors.push('Image is required')
            res.render('product/create', { errors, values: req.body })
            return
        }

        if (!validURL(image)) {
            errors.push('Image must be url')
            res.render('product/create', { errors, values: req.body })
            return
        }

        return errors
    },
}
