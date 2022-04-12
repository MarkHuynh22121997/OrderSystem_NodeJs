const inventoryModel = require('./inventory.model');

exports.getProductsInventoryByProductsId = (req, res) => {
    const productsId = req.query.productsId;
    inventoryModel.getProductsInventory(productsId, (productsInventory) => {
        if (!productsInventory) res.status(500).send('Error');
        res.status(200).json(productsInventory);
    });
}

exports.getAllProductsInventoryByProductsId = (req, res) => {
    inventoryModel.getAllProductsInventory((productsInventories) => {
        if (!productsInventories) res.status(500).send('Error');
        res.status(200).json(productsInventories);
    });
}