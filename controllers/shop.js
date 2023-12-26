const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchProducts((products) => {
    res.render('shop/product-list', {
      pageTitle: 'Products',
      path: '/products',
      products: products
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-details', {
      pageTitle: product.title,
      path: '/products',
      product: product
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchProducts((products) => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      products: products
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.fetchCarts((carts) => {
    Product.fetchProducts((products) => {
      const productsCart = [];
      const totalPrice = carts.totalPrice;
      products.forEach(prod => {
        const cartData = carts.products.find((cart) => cart.id === prod.id);
        if(cartData) {
          productsCart.push(
            {
              prod: prod,
              qty: cartData.qty,
            }
          );
        }
      });

      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        carts: productsCart,
        totalPrice: totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProductCart(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.deleteProductInCart(prodId);
  res.redirect('/cart');
};