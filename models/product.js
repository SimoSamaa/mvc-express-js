const fs = require('fs');
const path = require('path');
const id = require('uuid');
const Cart = require('./cart');

const filePath = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if(err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class product {
  constructor (id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {

      if(this.id) {
        const existingProductIndex = products.findIndex((prod) =>
          prod.id === this.id
        );

        const updatedProduct = [ ...products ];
        updatedProduct[ existingProductIndex ] = this;

        fs.writeFile(filePath, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });

      } else {
        this.id = id.v4();

        products.push(this);

        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteProduct(id) {
    getProductsFromFile((products) => {
      const product = products.find(prod => prod.id === id);
      const deletedProduct = products.filter(prod => prod.id !== id);
      fs.writeFile(filePath, JSON.stringify(deletedProduct), (err) => {
        console.log(err);
        if(!err) {
          Cart.deleteProductInCart(id, product.price);
        }
      });
    });
  }

  static fetchProducts(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }
};