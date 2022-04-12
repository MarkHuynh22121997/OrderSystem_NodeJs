const insertOrder = "INSERT INTO \"order\" (\"cartId\", amount, paid) VALUES ($1, $2, false) RETURNING id";
const payOrder = "UPDATE \"order\" SET paid = true WHERE id = $1";

module.exports = {
    insertOrder,
    payOrder
}