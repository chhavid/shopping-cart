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

const cartHandler = (request, response) => {
  request.cart.add(request);
  response.statusCode = 302;
  response.setHeader('location', '/cart.html');
  response.end('');
  return true;
};

const handler = () => {
  return (request, response, serveFrom = './public') => {
    if (request.url.pathname === '/addToCart') {
      return cartHandler(request, response);
    }

    if (request.url.pathname === '/cart.html') {
      return showCart(request, response);
    }

    const fileName = serveFrom + request.url.pathname;
    if (!fs.existsSync(fileName)) {
      return false;
    }

    response.setHeader('content-type', determineContentType(fileName));
    const content = fs.readFileSync(fileName);
    response.end(content);
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

const handlers = [addRequest('src/product.json'), handler()];
// const handlers = [handler];

module.exports = { handlers };
