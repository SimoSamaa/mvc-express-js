const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'carts.json');

module.exports = class Cart {
  static addProductCart(id, productsPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[ existingProductIndex ];
      let updatedProduct;
      if(existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [ ...cart.products ];
        cart.products[ existingProductIndex ] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [ ...cart.products, updatedProduct ];
      }
      cart.totalPrice = cart.totalPrice + +productsPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProductInCart(id, productPrice) {
    fs.readFile(filePath, (err, fileContent) => {
      if(err) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };

      const product = updatedCart.products.find(prod => prod.id === id);
      if(!product) return;

      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );

      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

      console.log(updatedCart);

      fs.writeFile(filePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static fetchCarts(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
