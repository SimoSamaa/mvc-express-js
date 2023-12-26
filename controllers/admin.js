const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const newProduct = new Product(
    null,
    title,
    imageUrl,
    price,
    description
  );

  newProduct.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  if(!editMode) return res.redirect('/');
  Product.findById(prodId, (product) => {
    res.render('admin/edit-product', {
      pageTitle: 'update product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updateProd = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );

  updateProd.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchProducts((products) => {
    res.render('admin/products', {
      pageTitle: 'Products',
      path: '/admin/products',
      products: products
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteProduct(prodId);
  res.redirect('/admin/products');
};