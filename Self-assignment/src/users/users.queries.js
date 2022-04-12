const getUsers = 'SELECT * FROM users ORDER BY id ASC';
const getUserByEmail = 'SELECT * FROM users WHERE email = $1';
const insertUser = 'INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id';
const updateRefreshToken = 'UPDATE users SET refreshToken = $1 WHERE id = $2';
module.exports = {
  getUsers,
  getUserByEmail,
  insertUser,
  updateRefreshToken
}