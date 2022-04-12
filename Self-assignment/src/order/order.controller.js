const cartModel = require('../cart/cart.model');
const orderModel = require('./order.model');
const inventoryModel = require('../inventory/inventory.model');

const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();

const csv = require('express-csv');

exports.createOrder = (req, res) => {
    const cartId = req.body.cartId;
    const userId = req.body.userId;
    cartModel.getCartItemsByCartIdAndUserId(cartId, userId, (cartItems) => {
        let amount = 0;
        cartItems.forEach(cartItem => {
            amount += cartItem.price * cartItem.quantity;
        });
        const order = {
            cartId,
            amount
        }
        orderModel.insertOrder(order, (orderId) => {
            res.status(200).json(orderId);
        })
    });
}

exports.payOrder = (req, res) => {
    const orderId = req.body.orderId;
    orderModel.payOrder(orderId, () => {
        cartModel.getCartItemsByOrderId(orderId, (cartItems) => {
            cartItems.forEach(cartItem => {
                inventoryModel.updateInventory(cartItem.quantity, cartItem.productsId, (cartItemUpdatedQuantity) => {
                });
            });
            res.status(200).send("Successful update");
        });
    });
}

exports.getCartItemsByOrderId = (req, res) => {
    const orderId = req.query.orderId;
    const exportToCSV = req.query.exportToCSV;
    const savePdfFile = req.query.savePdfFile;
    cartModel.getCartItemsByOrderId(orderId, (cartItems) => {
        if (savePdfFile) {
            // Saving the pdf file in root directory.
            doc.pipe(fs.createWriteStream('example.pdf'));

            doc
            .addPage()
            .fontSize(15)
            .text(JSON.stringify(cartItems), 100, 100);

            // Finalize PDF file
            doc.end();
        }
        
        if (exportToCSV) {
            let headers = {};
            for (key in cartItems[0]) {
                headers[key] = key;
            }
            cartItems.unshift(headers);
            res.status(200).csv(cartItems); 
        } else {
            res.status(200).json(cartItems); 
        }
    });
}