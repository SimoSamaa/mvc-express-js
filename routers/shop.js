const express = require('express');
const Rouer = express.Router();

const shopController = require('../controllers/shop');

Rouer.get('/', shopController.getIndex);

Rouer.get('/products', shopController.getProducts);

Rouer.get('/products/:productId', shopController.getProduct);

Rouer.get('/cart', shopController.getCart);

Rouer.post('/cart', shopController.postCart);

Rouer.post('/delete-cart', shopController.postDeleteCart);

module.exports = Rouer;