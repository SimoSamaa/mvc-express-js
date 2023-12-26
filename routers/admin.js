const express = require('express');
const Rouer = express.Router();

const adminController = require('../controllers/admin');

Rouer.get('/add-product', adminController.getAddProduct);

Rouer.post('/add-product', adminController.postAddProduct);

Rouer.get('/products', adminController.getProducts);

Rouer.get('/edit-product/:productId', adminController.getEditProduct);

Rouer.post('/edit-product', adminController.postEditProduct);

Rouer.post('/delete-product', adminController.postDeleteProduct);

module.exports = Rouer;