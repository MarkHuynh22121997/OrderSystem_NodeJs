const updateInventory = "UPDATE inventory SET quantity = quantity - $1 WHERE \"productsId\" = $2";
const getProductsInventory = "SELECT * FROM inventory i JOIN products p ON i.\"productsId\" = p.\"id\" WHERE p.\"id\" = $1";
const getAllProductsInventory = "SELECT * FROM inventory i JOIN products p ON i.\"productsId\" = p.\"id\" ORDER BY p.\"id\"";

module.exports = {
    updateInventory,
    getProductsInventory,
    getAllProductsInventory
}