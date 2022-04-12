const express = require('express');
const createError = require('http-errors');
require('express-async-errors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;

dotenv.config();

const authRouter = require('./src/auth/auth.routes');
const userRouter = require('./src/users/users.routes');
const productsRouter = require('./src/products/products.routes');
const cartRouter = require('./src/cart/cart.routes');
const orderRouter = require('./src/order/order.routes');
const inventoryRouter = require('./src/inventory/inventory.routes');

const app = express();

app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('APP IS RUNNING');
});
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/order', orderRouter);
app.use('/inventory', inventoryRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res) => {
	console.log(err.stack);
	res.status(err.status || 500).send(err.message);
});

const server = app.listen(3000, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});