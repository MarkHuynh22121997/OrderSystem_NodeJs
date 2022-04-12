const getCartItemsByCartIdAndUserId = "SELECT * FROM \"cartItems\" ci JOIN products p ON p.\"id\" = ci.\"productsId\" JOIN cart c ON ci.\"cartId\" = c.\"id\" WHERE ci.\"cartId\" = $1 AND c.\"userId\" = $2 ORDER BY ci.id ASC";
const insertCart = "INSERT INTO cart(\"userId\") VALUES ($1) RETURNING id";
const insertCartItem = "INSERT INTO \"cartItems\" (\"cartId\", \"productsId\", \"quantity\") VALUES ($1, $2, $3) RETURNING id";
const removeCartItem = "DELETE FROM \"cartItems\" WHERE \"cartId\" = $1 AND \"productsId\" = $2";
const updateCartItemQuantity = "UPDATE \"cartItems\" SET \"quantity\" = $1 WHERE \"cartId\" = $2 AND \"productsId\" = $3";
const getAvailableCart = "SELECT * FROM cart WHERE \"userId\" = $1 AND paid = false";
const getCartItemsByOrderId = "SELECT * FROM \"cartItems\" ci JOIN products p ON p.\"id\" = ci.\"productsId\" JOIN cart c ON ci.\"cartId\" = c.\"id\" JOIN \"order\" o ON o.\"cartId\" = c.\"id\" WHERE o.\"id\" = $1 ORDER BY ci.\"id\" ASC";

module.exports = {
    getCartItemsByCartIdAndUserId,
    insertCart,
    insertCartItem,
    removeCartItem,
    updateCartItemQuantity,
    getAvailableCart,
    getCartItemsByOrderId
}