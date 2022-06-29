const fs = require("fs");
const { Cart, showCart } = require("./cart");

const addToCartHandler = (request, response) => {
  request.cart.add(request);
  response.statusCode = 302;
  response.setHeader('location', '/cart.html');
  response.end('');
  return true;
};

const cartHandler = (fileName) => {
  const products = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  const cart = new Cart();
  return (request, response) => {
    if (request.url.pathname === '/addToCart') {
      request.products = products;
      request.cart = cart;
      return addToCartHandler(request, response);
    }

    if (request.url.pathname === '/cart.html') {
      request.products = products;
      request.cart = cart;
      return showCart(request, response);
    }
    return false;
  };
};

module.exports = { cartHandler };
