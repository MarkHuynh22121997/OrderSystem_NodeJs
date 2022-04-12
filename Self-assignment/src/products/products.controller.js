const productsModel = require('./products.model');

exports.getProducts = (req, res) => {
    productsModel.getProducts(req, res, (users) => {
        if (!users) res.status(500).send('Error');
        res.status(200).json(users);
    });
}