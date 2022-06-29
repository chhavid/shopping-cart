const fs = require("fs");
const { Cart, showCart } = require("./cart");

const contentType = {
  html: 'text/html',
  jpeg: 'image/jpeg',
  png: 'image/png'
};

const determineContentType = (fileName) => {
  const extension = fileName.split('.').slice(-1);
  return contentType[extension] || 'text/plain';
};

const cartHandler = (request, response, cart, products) => {
  cart.add(request, products);
  response.statusCode = 302;
  response.setHeader('location', '/cart.html');
  response.send('');
  return true;
};

const handler = (fileName) => {

  return (request, response, serveFrom = './public') => {
    if (request.path === '/addToCart') {
      return cartHandler(request, response, cart, products);
    }

    if (request.path === '/cart.html') {
      return showCart(request, response, cart);
    }

    const fileName = serveFrom + request.path;
    if (!fs.existsSync(fileName)) {
      return false;
    }

    response.setHeader('content-type', determineContentType(fileName));
    const content = fs.readFileSync(fileName);
    response.send(content);
    return true;
  };
};

const addRequest = (fileName) => {
  const products = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  const cart = new Cart();
  return (request, response) => {
    request.products = products;
    request.cart = cart;
  }
};

const handlers = [addRequest(fileName), handler];

module.exports = { handler };
